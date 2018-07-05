# Pet Photo sharing app
Petsiogram, a fictional pet photo sharing app, demonstrates the use [Istio](https://istio.io/) and [Kiali](https://kiali.org) to manage and visualize your microservices app.

![microservices diagam](Pets-demo.png)
# How to deploy
## 1. On Openshift 
Prerequisites: OpenShift 3.9, Istio 3.8 and Kiali.  Due to a known bug with Istio/Envoy you need to perform additional clean up steps (included in this readme).  See this [blog post](https://developers.redhat.com/blog/2018/04/05/coolstore-microservices-service-mesh-part-1-exploring-auto-injection/) for more information.

Set up a new project
```
oc new-project pets
# Save project name and cluster domain to env variables for later 
export PROJECT=$(oc project -q)
export DOMAIN=<your cluster's public domain or the following if you're running minishift: $(minishift ip).nip.io>
# Additional privileges
oc adm policy add-scc-to-user privileged -z default,deployer
oc adm policy add-scc-to-user anyuid -z default,deployer 
oc label namespace $(oc project -q) istio-injection=enabled
```
Deploy the app
```
# curl https://raw.githubusercontent.com/vnugent/petsiogram/master/pets-demo-openshift.yaml | oc create -f -
# oc new-app --template pets-demo --param NAMESPACE=$PROJECT --param CLUSTER_DOMAIN=$DOMAIN
```
Verify deployment pods are in Completed state and app pods are in Running state
```
# oc get pods

NAME                    READY     STATUS      RESTARTS   AGE
api-server-1-9gbl7      2/2       Running     0          57s
api-server-1-deploy     1/2       Completed   0          2m
frontend-1-deploy       1/2       Completed   0          2m
frontend-1-lrxx4        2/2       Running     0          57s
media-server-1-deploy   1/2       Completed   0          2m
media-server-1-jw4b2    2/2       Running     0          1m
mongo-1-deploy          1/2       Completed   0          2m
mongo-1-hsssr           2/2       Running     0          1m
```
Verify you can view the app in the browser before moving on to setting up service mesh.  To find out public url for the React app:
```
# oc get route frontend
```

SETUP SERVICE MESH

We are now ready to setup Istio Ingress gateway to handle incoming traffic.

Delete existing OpenShift test routes
```
# oc delete route api-server frontend
```
In case you want to re-enable them for debugging:
```
# oc expose service api-server -l app=pets
# oc expose service frontend  -l app=pets
```
Setup service mesh.  Note: istioctl command isn't aware of your current OpenShift namespace.  You should always specific -n <namespace>
```
# envsubst '${PROJECT} ${DOMAIN}' < istio/mesh.yaml | istioctl -n $PROJECT -f -
```
Expose new app endpoints and connect them to Istio ingress gateway
Note: `-n istio-system` is needed because the route needs to be in istio-system namespace in order to access ingress gateway service
```
# oc expose service istio-ingressgateway --name pets-frontend --hostname=frontend-${PROJECT}.${DOMAIN} --port=80 -n istio-system
# oc expose service istio-ingressgateway --name pets-apiserver --hostname=api-server-${PROJECT}.${DOMAIN} --port=80 -n istio-system
```


## 2. On Kubernetes (TBD)
