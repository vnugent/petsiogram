#!/bin/bash
PROJECT=$(oc project -q)
echo "Cleaning up Istio objects in project $PROJECT"
istioctl delete virtualservices frontend  api-server -n $PROJECT
istioctl delete gateway frontend-gateway -n $PROJECT
istioctl delete destinationrule frontend-ab -n $PROJECT
