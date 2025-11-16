#!/bin/bash
# Validate GitHub Actions workflow YAML syntax

set -e

WORKFLOW_FILE=".github/workflows/deploy.yml"

echo "=== Validating GitHub Actions Workflow ==="
echo "File: $WORKFLOW_FILE"
echo ""

# Method 1: Try actionlint (best tool for GitHub Actions)
if command -v actionlint &> /dev/null; then
    echo "Using actionlint..."
    actionlint "$WORKFLOW_FILE"
    echo "✓ actionlint validation passed"
    exit 0
fi

# Method 2: Try yamllint
if command -v yamllint &> /dev/null; then
    echo "Using yamllint..."
    yamllint "$WORKFLOW_FILE"
    echo "✓ yamllint validation passed"
    exit 0
fi

# Method 3: Try Python yaml module
if python3 -c "import yaml" 2>/dev/null; then
    echo "Using Python yaml module..."
    python3 -c "
import yaml
import sys
try:
    with open('$WORKFLOW_FILE', 'r') as f:
        yaml.safe_load(f)
    print('✓ YAML syntax is valid')
except yaml.YAMLError as e:
    print(f'✗ YAML syntax error: {e}')
    sys.exit(1)
"
    exit 0
fi

# Method 4: Try Node.js js-yaml
if command -v node &> /dev/null && npm list -g js-yaml &> /dev/null; then
    echo "Using js-yaml..."
    node -e "
const yaml = require('js-yaml');
const fs = require('fs');
try {
    yaml.load(fs.readFileSync('$WORKFLOW_FILE', 'utf8'));
    console.log('✓ YAML syntax is valid');
} catch (e) {
    console.error('✗ YAML syntax error:', e.message);
    process.exit(1);
}
"
    exit 0
fi

# Fallback: Basic check
echo "⚠ No YAML validator found. Installing actionlint..."
echo ""
echo "To install actionlint (recommended):"
echo "  brew install actionlint"
echo ""
echo "Or install yamllint:"
echo "  brew install yamllint"
echo ""
echo "Or use Python:"
echo "  pip3 install pyyaml"
echo ""
echo "For now, checking basic YAML structure..."

# Basic checks
if ! grep -q "^name:" "$WORKFLOW_FILE"; then
    echo "✗ Missing 'name:' field"
    exit 1
fi

if ! grep -q "^on:" "$WORKFLOW_FILE"; then
    echo "✗ Missing 'on:' field"
    exit 1
fi

if ! grep -q "^jobs:" "$WORKFLOW_FILE"; then
    echo "✗ Missing 'jobs:' field"
    exit 1
fi

echo "✓ Basic structure looks OK (but full validation recommended)"
echo ""
echo "Note: GitHub Actions will validate on push, but local validation"
echo "is faster. Install actionlint for best results."

