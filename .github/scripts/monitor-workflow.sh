#!/bin/bash
# Monitor GitHub Actions workflow status from local machine

set -e

# Load environment variables
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

# Configuration
GITHUB_TOKEN="${GITHUB_TOKEN:-}"
REPO_OWNER="${GITHUB_REPO_OWNER:-ni2faa}"
REPO_NAME="${GITHUB_REPO_NAME:-me}"
REPO="${GITHUB_REPO:-${REPO_OWNER}/${REPO_NAME}}"
WORKFLOW_NAME="Build and Deploy Application"
BRANCH="${1:-feat/infra}"  # Default to feat/infra, can pass as argument

if [ -z "$GITHUB_TOKEN" ]; then
    echo "✗ Error: GITHUB_TOKEN not set in .env file"
    echo ""
    echo "1. Copy .env.example to .env:"
    echo "   cp .env.example .env"
    echo ""
    echo "2. Edit .env and add your GitHub token"
    echo ""
    echo "3. Get token from: https://github.com/settings/tokens"
    echo "   Required scopes: repo, workflow (read access)"
    exit 1
fi

API_URL="https://api.github.com/repos/${REPO}"

echo "=== Monitoring GitHub Actions Workflow ==="
echo "Repository: ${REPO}"
echo "Workflow: ${WORKFLOW_NAME}"
echo "Branch: ${BRANCH}"
echo ""

# Get workflow ID
echo "Fetching workflow information..."
WORKFLOW_ID=$(curl -s -H "Authorization: token ${GITHUB_TOKEN}" \
    "${API_URL}/actions/workflows" | \
    jq -r ".workflows[] | select(.name == \"${WORKFLOW_NAME}\") | .id")

if [ -z "$WORKFLOW_ID" ] || [ "$WORKFLOW_ID" = "null" ]; then
    echo "✗ Error: Workflow '${WORKFLOW_NAME}' not found"
    exit 1
fi

echo "✓ Found workflow ID: ${WORKFLOW_ID}"
echo ""

# Get latest run
echo "Fetching latest workflow run..."
RUN_JSON=$(curl -s -H "Authorization: token ${GITHUB_TOKEN}" \
    "${API_URL}/actions/workflows/${WORKFLOW_ID}/runs?branch=${BRANCH}&per_page=1")

RUN_ID=$(echo "$RUN_JSON" | jq -r '.workflow_runs[0].id')
RUN_STATUS=$(echo "$RUN_JSON" | jq -r '.workflow_runs[0].status')
RUN_CONCLUSION=$(echo "$RUN_JSON" | jq -r '.workflow_runs[0].conclusion // "pending"')
RUN_URL=$(echo "$RUN_JSON" | jq -r '.workflow_runs[0].html_url')
CREATED_AT=$(echo "$RUN_JSON" | jq -r '.workflow_runs[0].created_at')

if [ -z "$RUN_ID" ] || [ "$RUN_ID" = "null" ]; then
    echo "✗ No workflow runs found for branch ${BRANCH}"
    exit 1
fi

echo "Run ID: ${RUN_ID}"
echo "Status: ${RUN_STATUS}"
echo "Conclusion: ${RUN_CONCLUSION}"
echo "Created: ${CREATED_AT}"
echo "URL: ${RUN_URL}"
echo ""

# Monitor if running
if [ "$RUN_STATUS" = "in_progress" ] || [ "$RUN_STATUS" = "queued" ]; then
    echo "⏳ Workflow is ${RUN_STATUS}..."
    echo ""
    echo "Monitoring progress (press Ctrl+C to stop)..."
    echo ""
    
    while [ "$RUN_STATUS" = "in_progress" ] || [ "$RUN_STATUS" = "queued" ]; do
        sleep 5
        
        RUN_JSON=$(curl -s -H "Authorization: token ${GITHUB_TOKEN}" \
            "${API_URL}/actions/runs/${RUN_ID}")
        
        RUN_STATUS=$(echo "$RUN_JSON" | jq -r '.status')
        RUN_CONCLUSION=$(echo "$RUN_JSON" | jq -r '.conclusion // "pending"')
        
        # Get job status
        JOBS_JSON=$(curl -s -H "Authorization: token ${GITHUB_TOKEN}" \
            "${API_URL}/actions/runs/${RUN_ID}/jobs")
        
        echo -n "$(date '+%H:%M:%S') - Status: ${RUN_STATUS}"
        if [ "$RUN_STATUS" = "completed" ]; then
            echo " - Conclusion: ${RUN_CONCLUSION}"
        else
            echo ""
        fi
        
        # Show job progress
        echo "$JOBS_JSON" | jq -r '.jobs[] | "  - \(.name): \(.status) (\(.conclusion // "in_progress"))"' | head -5
        echo ""
    done
    
    echo ""
    echo "=== Final Status ==="
fi

# Final status
RUN_JSON=$(curl -s -H "Authorization: token ${GITHUB_TOKEN}" \
    "${API_URL}/actions/runs/${RUN_ID}")

RUN_STATUS=$(echo "$RUN_JSON" | jq -r '.status')
RUN_CONCLUSION=$(echo "$RUN_JSON" | jq -r '.conclusion // "pending"')

echo "Status: ${RUN_STATUS}"
echo "Conclusion: ${RUN_CONCLUSION}"
echo "URL: ${RUN_URL}"
echo ""

# Get job details
echo "=== Job Details ==="
JOBS_JSON=$(curl -s -H "Authorization: token ${GITHUB_TOKEN}" \
    "${API_URL}/actions/runs/${RUN_ID}/jobs")

echo "$JOBS_JSON" | jq -r '.jobs[] | "\(.name): \(.status) - \(.conclusion // "N/A")"' | while read line; do
    if echo "$line" | grep -q "failure\|cancelled"; then
        echo "✗ $line"
    elif echo "$line" | grep -q "success"; then
        echo "✓ $line"
    else
        echo "  $line"
    fi
done

echo ""
if [ "$RUN_CONCLUSION" = "success" ]; then
    echo "✓ Deployment successful!"
    exit 0
elif [ "$RUN_CONCLUSION" = "failure" ]; then
    echo "✗ Deployment failed. Check logs: ${RUN_URL}"
    exit 1
else
    echo "⚠ Status: ${RUN_CONCLUSION}"
    exit 0
fi

