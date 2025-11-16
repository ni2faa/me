# GitHub Actions Monitoring Scripts

These scripts allow you to monitor GitHub Actions workflow status from your local machine without needing to visit the GitHub website.

## Setup

1. **Create `.env` file** (copy from example):
   ```bash
   cp .env.example .env
   ```

2. **Get GitHub Personal Access Token**:
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Name it: "Workflow Monitor"
   - Select scopes:
     - ✅ `repo` (Full control of private repositories)
     - ✅ `workflow` (Update GitHub Action workflows)
   - Click "Generate token"
   - Copy the token (starts with `ghp_`)

3. **Add token to `.env`**:
   ```bash
   # Edit .env file
   GITHUB_TOKEN=ghp_your_token_here
   ```

## Usage

### Monitor workflow (with live updates):
```bash
# Monitor latest run on feat/infra branch
.github/scripts/monitor-workflow.sh

# Monitor specific branch
.github/scripts/monitor-workflow.sh main
```

This will:
- Show current workflow status
- Monitor progress in real-time if workflow is running
- Display job status for each step
- Show final conclusion (success/failure)

### Quick status check (no monitoring):
```bash
# Quick check for feat/infra branch
.github/scripts/monitor-workflow-simple.sh

# Check specific branch
.github/scripts/monitor-workflow-simple.sh main
```

This will:
- Show current workflow status
- Display job summary
- Exit immediately (no monitoring)

## Requirements

- `curl` - Usually pre-installed
- `jq` - JSON processor (install with `brew install jq`)
- `.env` file with `GITHUB_TOKEN`

## Troubleshooting

### Error: "GITHUB_TOKEN not set"
- Make sure `.env` file exists
- Check that token is set correctly in `.env`
- Token should start with `ghp_`

### Error: "jq: command not found"
```bash
brew install jq
```

### Error: "No workflow runs found"
- Check that branch name is correct
- Make sure workflow has run at least once
- Verify repository name in `.env` if using custom repo

## Security Note

- `.env` file is gitignored (not tracked in git)
- Never commit your GitHub token
- Token has read-only access to workflows (safe)
- Rotate token if compromised

