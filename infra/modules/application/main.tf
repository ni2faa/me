variable "namespace" { type = string }
variable "project_name" { type = string }
variable "secret_data" { type = map(string) }

resource "kubernetes_namespace" "ns" {
  metadata {
    name = var.namespace
  }
}

resource "kubernetes_secret" "app" {
  metadata {
    name      = "${var.project_name}-secret"
    namespace = var.namespace
  }
  data = var.secret_data
}

resource "kubernetes_config_map" "app" {
  metadata {
    name      = "${var.project_name}-config"
    namespace = var.namespace
  }
  data = {
    "APP_NAME" = var.project_name
  }
}