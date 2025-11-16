provider "kubernetes" {
  # Terraform will auto-detect kubeconfig from KUBECONFIG environment variable
  # If kubeconfig_path is provided (for local deployments), use it
  # Otherwise, Terraform auto-detects from KUBECONFIG env var or default locations
  config_path = var.kubeconfig_path
}

provider "helm" {
  kubernetes {
    # Terraform will auto-detect kubeconfig from KUBECONFIG environment variable
    # If kubeconfig_path is provided (for local deployments), use it
    # Otherwise, Terraform auto-detects from KUBECONFIG env var or default locations
    config_path = var.kubeconfig_path
  }
}