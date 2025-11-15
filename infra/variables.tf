variable "kubeconfig_path" {
  type        = string
  description = "Path to kubeconfig for target cluster"
}

variable "project_name" {
  type        = string
  description = "Project identifier"
}

variable "domain" {
  type        = string
  description = "External domain for ingress"
}

variable "base_path" {
  type        = string
  description = "Base path prefix under the domain"
}

variable "namespace" {
  type        = string
  description = "Kubernetes namespace"
}

variable "image" {
  type        = string
  description = "Container image for Next.js application"
}

variable "replicas_web" {
  type        = number
  description = "Replica count for Next.js application"
}

variable "resources_web" {
  type        = map(string)
  description = "Resource limits and requests for Next.js application"
}

variable "secret_data" {
  type        = map(string)
  description = "Key-value secret data for the project"
  default     = {}
}