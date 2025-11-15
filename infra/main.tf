module "application" {
  source       = "./modules/application"
  namespace    = var.namespace
  project_name = var.project_name
  secret_data  = var.secret_data
}

module "compute" {
  source        = "./modules/compute"
  namespace     = var.namespace
  project_name  = var.project_name
  web_image     = var.web_image
  replicas_web  = var.replicas_web
  resources_web = var.resources_web
  depends_on    = [module.application]
}

module "networking" {
  source       = "./modules/networking"
  namespace    = var.namespace
  project_name = var.project_name
  domain       = var.domain
  base_path    = var.base_path
  web_service  = module.compute.web_service_name
  depends_on   = [module.compute]
}