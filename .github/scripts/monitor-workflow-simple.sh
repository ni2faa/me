#!/bin/bash
# Simple workflow status checker - quick status without monitoring

set -e

# Load environment variables
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

GITHUB_TOKEN="${GITHUB_TOKEN:-}"
REPO="${GITHUB_REPO:-ni2faa/me}"
BRANCH="${1:-feat/infra}"

if [ -z "$GITHUB_TOKEN" ]; then
    echo "✗ Error: GITHUB_TOKEN not set in .env file"
    echo ""
    echo "1. Copy .env.example to .env:"
    echo "   cp .env.example .env"
    echo ""
    echo "2. Edit .env and add your GitHub token"
    exit 1
fi

echo "=== Workflow Status Check ==="
echo "Repository: ${REPO}"
echo "Branch: ${BRANCH}"
echo ""

# Get latest workflow run
RUN_JSON=$(curl -s -H "Authorization: token ${GITHUB_TOKEN}" \
    "https://api.github.com/repos/${REPO}/actions/runs?branch=${BRANCH}&per_page=1")

RUN_ID=$(echo "$RUN_JSON" | jq -r '.workflow_runs[0].id')
RUN_STATUS=$(echo "$RUN_JSON" | jq -r '.workflow_runs[0].status')
RUN_CONCLUSION=$(echo "$RUN_JSON" | jq -r '.workflow_runs[0].conclusion // "pending"')
RUN_URL=$(echo "$RUN_JSON" | jq -r '.workflow_runs[0].html_url')
CREATED_AT=$(echo "$RUN_JSON" | jq -r '.workflow_runs[0].created_at')
WORKFLOW_NAME=$(echo "$RUN_JSON" | jq -r '.workflow_runs[0].name')

if [ -z "$RUN_ID" ] || [ "$RUN_ID" = "null" ]; then
    echo "✗ No workflow runs found for branch ${BRANCH}"
    exit 1
fi

echo "Workflow: ${WORKFLOW_NAME}"
echo "Run ID: ${RUN_ID}"
echo "Status: ${RUN_STATUS}"
echo "Conclusion: ${RUN_CONCLUSION}"
echo "Created: ${CREATED_AT}"
echo "URL: ${RUN_URL}"
echo ""

# Get job summary
JOBS_JSON=$(curl -s -H "Authorization: token ${GITHUB_TOKEN}" \
    "https://api.github.com/repos/${REPO}/actions/runs/${RUN_ID}/jobs")

echo "=== Jobs ==="
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
elif [ "$RUN_CONCLUSION" = "failure" ]; then
    echo "✗ Deployment failed"
    echo "View logs: ${RUN_URL}"
fi

