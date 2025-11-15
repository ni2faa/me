# Required GitHub Secrets

This document lists all the GitHub Secrets that need to be configured in your repository for the CI/CD pipeline to work.

## Workflow Overview

- **`deploy.yml`**: Automatically runs on push to `main` - full application deployment (builds image, deploys everything)
- **Secrets/Config**: Managed locally via Terraform using `infra/local/terraform.tfvars` - run `terraform apply` manually from your local machine

## How to Add Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret listed below

## Required Secrets

### Kubernetes Configuration

#### `KUBECONFIG` (Usually NOT needed for k3s self-hosted runners)
- **Description**: Base64-encoded kubeconfig file for accessing your Kubernetes cluster
- **When to use**: 
  - **NOT NEEDED** if your workflow runs on a k3s self-hosted runner (the workflow automatically finds `/etc/rancher/k3s/k3s.yaml`)
  - **Only needed** if:
    - Your k3s kubeconfig is in a non-standard location
    - You want to use a different kubeconfig than the default
    - You're using a remote cluster (not the local k3s)
- **For k3s self-hosted runners**: 
  - **Skip this secret** - the workflow will automatically detect and use `/etc/rancher/k3s/k3s.yaml`
  - No action needed!
- **If you do need it** (rare cases):
  ```bash
  # For k3s default location:
  cat /etc/rancher/k3s/k3s.yaml | base64 -w 0
  # Or on macOS:
  cat /etc/rancher/k3s/k3s.yaml | base64
  ```
- **Note**: 
  - For k3s self-hosted runners, this secret is **optional** and usually **not required**
  - The workflow automatically handles kubeconfig detection

### Terraform Variables

All Terraform variables are passed as environment variables with the `TF_VAR_` prefix.

#### `TF_VAR_project_name`
- **Description**: Project identifier used in Kubernetes resources
- **Example**: `ni2faa-profile`
- **Type**: String

#### `TF_VAR_namespace`
- **Description**: Kubernetes namespace where resources will be deployed
- **Example**: `ni2faa-profile`
- **Type**: String

#### `TF_VAR_domain`
- **Description**: External domain for the ingress
- **Example**: `profile.example.com`
- **Type**: String

#### `TF_VAR_base_path`
- **Description**: Base path prefix under the domain
- **Example**: `/`
- **Type**: String

#### `TF_VAR_replicas_web`
- **Description**: Number of pod replicas for the Next.js application
- **Example**: `2`
- **Type**: Number

#### `TF_VAR_resources_web`
- **Description**: Resource limits and requests in HCL map format
- **Example**: 
  ```hcl
  {
    limits_cpu    = "1000m"
    limits_memory = "1Gi"
    requests_cpu    = "200m"
    requests_memory = "256Mi"
  }
  ```
- **Type**: HCL map format (as a string)
- **Note**: 
  - This will be inserted directly into the terraform.tfvars file
  - Must be valid HCL syntax
  - Include the curly braces and all key-value pairs

#### `TF_VAR_secret_data` (Optional)
- **Description**: Secret data in HCL map format (base64 encoded values)
- **Required**: No - if not provided, an empty map `{}` will be used
- **When to use**: Only if your application needs environment variables from Kubernetes secrets
- **Example** (if you have secrets):
  ```hcl
  {
    DATABASE_URL = "cG9zdGdyZXNxbDovL3VzZXI6cGFzc0Bob3N0OjU0MzIvZGI="
    API_KEY      = "eW91ci1hcGkta2V5"
  }
  ```
- **Type**: HCL map format (as a string)
- **Note**: 
  - **For most projects**: You can skip this secret entirely
  - Values should be base64 encoded if you do use it
  - Use `echo -n "your-secret" | base64` to encode values
  - If not set, defaults to empty map `{}`

## Optional Secrets

### `GITHUB_TOKEN`
- **Description**: Automatically provided by GitHub Actions
- **Note**: No action needed - this is automatically available for pushing to GHCR

## Example Setup Script

**Note**: For k3s self-hosted runners, you typically **don't need** this script since the workflow automatically detects the kubeconfig.

Only use this if you need a custom kubeconfig:

```bash
#!/bin/bash
# encode-kubeconfig.sh (Only needed for custom kubeconfig locations)

echo "Encoding kubeconfig..."
# For k3s default location:
KUBECONFIG_B64=$(cat /etc/rancher/k3s/k3s.yaml | base64 -w 0)
# Or for custom location:
# KUBECONFIG_B64=$(cat ~/.kube/config | base64 -w 0)
echo "Add this as KUBECONFIG secret in GitHub (if needed):"
echo "$KUBECONFIG_B64"
```

## Verification

After adding all secrets, you can verify the workflow will work by:

1. Making a small change to your code
2. Committing and pushing to `main` branch
3. Checking the Actions tab in GitHub to see if the workflow runs successfully

## Security Best Practices

1. **Never commit secrets** to your repository
2. **Rotate secrets regularly**, especially `KUBECONFIG`
3. **Use least privilege** - ensure the kubeconfig has only necessary permissions
4. **Review secret access** - regularly audit who has access to repository secrets
5. **Use environment-specific secrets** if you have multiple environments (dev, staging, prod)

## Troubleshooting

### Workflow fails with "kubectl: command not found"
- The workflow uses `azure/setup-kubectl@v3` which should install kubectl automatically
- If issues persist, check the workflow logs

### Terraform fails with "variable not set"
- Ensure all `TF_VAR_*` secrets are set
- Check that secret names match exactly (case-sensitive)

### Image push fails with "unauthorized"
- Ensure `GITHUB_TOKEN` is available (should be automatic)
- Check repository permissions for GitHub Packages

### Kubernetes connection fails
- Verify `KUBECONFIG` secret is correctly base64 encoded
- Ensure the kubeconfig file is valid and has proper cluster access
- Check that the cluster is accessible from GitHub Actions runners

