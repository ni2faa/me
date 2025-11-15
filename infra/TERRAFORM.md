# Terraform Infrastructure Implementation Guide

This guide explains how to implement and deploy the infrastructure for the ni2faa-profile Next.js application using Terraform.

## Prerequisites

1. **Terraform** installed (>= 1.5.0)
   ```bash
   terraform version
   ```

2. **Kubernetes cluster** access configured
   - Ensure `kubectl` is installed and configured
   - Verify cluster access: `kubectl cluster-info`

3. **kubeconfig** file path
   - Default location: `~/.kube/config`
   - Or specify custom path in `terraform.tfvars`

4. **Docker image** for your Next.js app
   - Build and push to a container registry (Docker Hub, GCR, ECR, etc.)

## Project Structure

```
infra/
├── main.tf              # Main Terraform configuration
├── variables.tf          # Variable definitions
├── providers.tf         # Provider configurations
├── backend.tf            # Backend configuration
├── outputs.tf           # Output values
├── versions.tf          # Version constraints
├── terraform.tfvars     # Variable values (create this)
└── modules/
    ├── application/     # Namespace, secrets, config maps
    ├── compute/         # Deployments and services
    └── networking/      # Ingress configuration
```

## Quick Start

### 1. Configure Variables

Create `terraform.tfvars` in the `infra/` directory:

```hcl
# Kubernetes Configuration
kubeconfig_path = "~/.kube/config"

# Project Configuration
project_name = "ni2faa-profile"
namespace    = "ni2faa-profile"

# Domain Configuration
domain    = "yourdomain.com"
base_path = "/"

# Container Image
web_image = "your-registry/ni2faa-profile:latest"

# Replica Configuration
replicas_web = 2

# Resource Limits
# Next.js typically needs more memory for server-side rendering
resources_web = {
  limits_cpu    = "1000m"
  limits_memory = "1Gi"
  requests_cpu    = "200m"
  requests_memory = "256Mi"
}

# Secrets (base64 encoded)
secret_data = {
  # Add your secrets here
  # Example: DATABASE_URL = base64encode("postgresql://...")
}
```

### 2. Initialize Terraform

```bash
cd infra
terraform init
```

This will:
- Download required providers (kubernetes, helm)
- Initialize the backend
- Set up modules

### 3. Review Plan

```bash
terraform plan
```

Review the changes that will be made to your Kubernetes cluster.

### 4. Apply Configuration

```bash
terraform apply
```

Type `yes` when prompted to confirm.

### 5. Verify Deployment

```bash
# Check namespace
kubectl get namespace ni2faa-profile

# Check deployments
kubectl get deployments -n ni2faa-profile

# Check services
kubectl get services -n ni2faa-profile

# Check ingress
kubectl get ingress -n ni2faa-profile

# Check pods
kubectl get pods -n ni2faa-profile

# Check pod logs
kubectl logs -n ni2faa-profile -l app=ni2faa-profile-web
```

## Next.js-Only Deployment

This Terraform configuration is optimized for a Next.js-only application:
- Single deployment and service for the Next.js app
- Container port set to 3000 (Next.js default)
- Ingress routes all traffic to the web service
- Simplified resource management

## Backend Configuration

### Local Backend (Current - Development Only)

The current `backend.tf` uses local state:
```hcl
terraform {
  backend "local" {
    path = "./terraform.tfstate"
  }
}
```

**⚠️ Warning**: Local backend is not suitable for production or team collaboration.

### Remote Backend (Recommended for Production)

Update `backend.tf` for remote state storage:

#### AWS S3 Backend
```hcl
terraform {
  backend "s3" {
    bucket = "your-terraform-state-bucket"
    key    = "ni2faa-profile/terraform.tfstate"
    region = "us-east-1"
    # Optional: Enable versioning and encryption
    # dynamodb_table = "terraform-state-lock"
    # encrypt        = true
  }
}
```

#### Google Cloud Storage Backend
```hcl
terraform {
  backend "gcs" {
    bucket = "your-terraform-state-bucket"
    prefix = "ni2faa-profile"
  }
}
```

#### Azure Storage Backend
```hcl
terraform {
  backend "azurerm" {
    resource_group_name  = "terraform-state"
    storage_account_name = "yourstorageaccount"
    container_name       = "terraform-state"
    key                  = "ni2faa-profile/terraform.tfstate"
  }
}
```

After changing backend, reinitialize:
```bash
terraform init -migrate-state
```

## Environment-Specific Deployments

Create separate variable files for different environments:

- `terraform.tfvars.dev` - Development
- `terraform.tfvars.staging` - Staging
- `terraform.tfvars.prod` - Production

Apply with:
```bash
terraform apply -var-file="terraform.tfvars.prod"
```

## Common Commands

```bash
# Initialize
terraform init

# Plan changes
terraform plan

# Apply changes
terraform apply

# Apply with auto-approve (use with caution)
terraform apply -auto-approve

# Destroy infrastructure
terraform destroy

# Show current state
terraform show

# List outputs
terraform output

# Format code
terraform fmt

# Validate configuration
terraform validate
```

## Troubleshooting

### Error: "Kubernetes cluster unreachable"
- Verify `kubeconfig_path` is correct
- Check cluster connectivity: `kubectl cluster-info`
- Ensure you have proper permissions

### Error: "Provider version constraints"
- Update `versions.tf` with compatible versions
- Run `terraform init -upgrade`

### Error: "Namespace already exists"
- Either delete existing namespace: `kubectl delete namespace ni2faa-profile`
- Or import it: `terraform import kubernetes_namespace.ns ni2faa-profile`

### State Lock Issues
- If using remote backend, check for stale locks
- For S3 backend, check DynamoDB table for locks

## Security Best Practices

1. **Never commit secrets** to version control
   - Use `terraform.tfvars` (in `.gitignore`)
   - Use secret management (AWS Secrets Manager, HashiCorp Vault, etc.)

2. **Use remote backend** with encryption and versioning

3. **Limit RBAC permissions** for Terraform service account

4. **Rotate secrets regularly**

5. **Use separate namespaces** for different environments

## Next Steps

1. **Create Dockerfile** for Next.js app
2. **Set up CI/CD pipeline** to build and push images
3. **Configure monitoring** (Prometheus, Grafana)
4. **Set up logging** (ELK stack, CloudWatch, etc.)
5. **Configure SSL/TLS** certificates (cert-manager)
6. **Set up autoscaling** (HorizontalPodAutoscaler)

## Additional Resources

- [Terraform Kubernetes Provider Documentation](https://registry.terraform.io/providers/hashicorp/kubernetes/latest/docs)
- [Kubernetes Ingress Documentation](https://kubernetes.io/docs/concepts/services-networking/ingress/)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)

