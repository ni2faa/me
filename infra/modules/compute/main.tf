variable "namespace" { type = string }
variable "project_name" { type = string }
variable "web_image" { type = string }
variable "replicas_web" { type = number }
variable "resources_web" { type = map(string) }

resource "kubernetes_deployment" "web" {
  metadata { name = "${var.project_name}-web" namespace = var.namespace labels = { app = "${var.project_name}-web" } }
  spec {
    replicas = var.replicas_web
    selector { match_labels = { app = "${var.project_name}-web" } }
    template {
      metadata { labels = { app = "${var.project_name}-web" } }
      spec {
        container {
          name  = "web"
          image = var.web_image
          port { container_port = 3000 }
          liveness_probe { http_get { path = "/" port = 3000 } initial_delay_seconds = 30 period_seconds = 10 }
          readiness_probe { http_get { path = "/" port = 3000 } initial_delay_seconds = 10 period_seconds = 5 }
          resources { limits = { cpu = var.resources_web["limits_cpu"], memory = var.resources_web["limits_memory"] }
                     requests = { cpu = var.resources_web["requests_cpu"], memory = var.resources_web["requests_memory"] } }
          env_from { secret_ref { name = "${var.project_name}-secret" } }
          env_from { config_map_ref { name = "${var.project_name}-config" } }
        }
      }
    }
  }
}

resource "kubernetes_service" "web" {
  metadata { name = "${var.project_name}-web" namespace = var.namespace }
  spec { selector = { app = kubernetes_deployment.web.metadata[0].labels.app } port { port = 80 target_port = 3000 } }
}

output "web_service_name" { value = kubernetes_service.web.metadata[0].name }