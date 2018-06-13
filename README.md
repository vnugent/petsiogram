# Pet Photo sharing app
Petsiogram, a fictional photo sharing app, demonstrates the use [Istio](https://istio.io/) and [Kiali](https://kiali.org) to manage and visualize your microservices app.

![microservices diagam](Pets-demo.png)
# How to deploy
## 1. On Openshift 
Prerequisites: OpenShift 3.9, Istio 3.8 and Kiali
```
# oc new-project pets
# oc create -f pets-demo-openshift.yaml
# oc new-app --template pets-demo --param NAMESPACE=$(oc project -q) --param CLUSTER_DOMAIN=<your cluster's public domain>
```
## 2. On Kubernetes (TBD)
