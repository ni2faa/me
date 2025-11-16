provider "kubernetes" {
  # Terraform will auto-detect kubeconfig from KUBECONFIG environment variable
  # Only set config_path if explicitly provided (for local deployments)
  config_path = var.kubeconfig_path != null ? var.kubeconfig_path : null
}

provider "helm" {
  kubernetes {
    # Terraform will auto-detect kubeconfig from KUBECONFIG environment variable
    # Only set config_path if explicitly provided (for local deployments)
    config_path = var.kubeconfig_path != null ? var.kubeconfig_path : null
  }
}