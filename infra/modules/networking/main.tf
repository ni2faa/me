variable "namespace" { type = string }
variable "project_name" { type = string }
variable "domain" { type = string }
variable "base_path" { type = string }
variable "web_service" { type = string }

resource "kubernetes_ingress_v1" "project" {
  metadata {
    name      = var.project_name
    namespace = var.namespace
    annotations = {
      "kubernetes.io/ingress.class" = "traefik"
    }
  }
  spec {
    rule {
      host = var.domain
      http {
        path {
          path      = var.base_path
          path_type = "Prefix"
          backend {
            service {
              name = var.web_service
              port {
                number = 80
              }
            }
          }
        }
      }
    }
  }
}