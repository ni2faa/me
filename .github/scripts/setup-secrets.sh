#!/bin/bash
# Helper script to set up GitHub Secrets for CI/CD
# Run this script to get the values you need to add to GitHub Secrets

set -e

echo "=========================================="
echo "GitHub Secrets Setup Helper"
echo "=========================================="
echo ""
echo "This script will help you set up the required GitHub Secrets."
echo "Copy the values below and add them to:"
echo "  Settings → Secrets and variables → Actions → New repository secret"
echo ""
echo "=========================================="
echo ""

# Get repository name from git
REPO_NAME=$(basename -s .git $(git config --get remote.origin.url 2>/dev/null || echo "ni2faa/me") | sed 's/.*\///')
PROJECT_NAME="${REPO_NAME#*/}"  # Extract name after slash if present

echo "1. TF_VAR_project_name"
echo "   Value: ${PROJECT_NAME}"
echo "   Description: Project identifier"
echo ""

echo "2. TF_VAR_namespace"
echo "   Value: ${PROJECT_NAME}"
echo "   Description: Kubernetes namespace"
echo ""

echo "3. TF_VAR_domain"
echo "   Value: ni2faa.ddns.net"
echo "   Description: Your domain (update if different)"
echo ""

echo "4. TF_VAR_base_path"
echo "   Value: /"
echo "   Description: Base path for ingress"
echo ""

echo "5. TF_VAR_replicas_web"
echo "   Value: 1"
echo "   Description: Number of pod replicas"
echo ""

echo "6. TF_VAR_resources_web"
echo "   Value (copy exactly, including braces):"
echo "   {"
echo "     limits_cpu    = \"1000m\""
echo "     limits_memory = \"1Gi\""
echo "     requests_cpu    = \"200m\""
echo "     requests_memory = \"256Mi\""
echo "   }"
echo ""

echo "7. REGISTRY_HOST_IP (Optional - defaults to 192.168.1.100)"
echo "   Value: 192.168.1.48"
echo "   Description: Your registry host IP (update if different)"
echo ""

echo "8. REGISTRY_USERNAME (Optional - if registry requires auth)"
echo "   Value: admin"
echo "   Description: Registry username"
echo ""

echo "9. REGISTRY_PASSWORD (Optional - if registry requires auth)"
echo "   Value: <your-registry-password>"
echo "   Description: Registry password"
echo ""

echo "=========================================="
echo "Quick Setup Instructions:"
echo "=========================================="
echo ""
echo "1. Go to: https://github.com/ni2faa/me/settings/secrets/actions"
echo "2. Click 'New repository secret' for each secret above"
echo "3. Copy the Name and Value exactly as shown"
echo "4. For TF_VAR_resources_web, copy the entire block including braces"
echo ""
echo "Note: TF_VAR_secret_data is optional (only if you need app secrets)"
echo ""
echo "=========================================="

