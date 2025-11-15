output "namespace" {
  value = var.namespace
}

output "web_service" {
  value = module.compute.web_service_name
}

output "ingress_host" {
  value = var.domain
}