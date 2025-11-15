# Project Template

## Structure
- Terraform: `projects/template/infra` with modules `application`, `compute`, `networking`
- Kubernetes: deploys web and api components into a namespace with path-based ingress

## Setup
- Set `kubeconfig_path`, `project_name`, `namespace`, `domain`, `base_path`, images, replicas, resources, and `secret_data` in a `terraform.tfvars`
- Initialize and apply:
  - `terraform init`
  - `terraform apply`

## Maintenance
- Scale via `replicas_web` and `replicas_api`
- Update images via `web_image` and `api_image`
- Rotate secrets by updating `secret_data`
- Monitor via Prometheus/Grafana; logs via Loki/Promtail when enabled

## CI/CD
- Use a pipeline to run `terraform plan`/`apply` for infra and `helm upgrade` or `kubectl apply` for app updates
- Gate with linting and policy checks; use separate workspaces per environment