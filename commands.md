To Check the deployment status of file => kubectl describe deployment <deployment-name>

To Get all deployments => kubectl get deployments

To check env secrets => kubectl get secrets

To delete the env secret => kubectl delete secret <secret-name>

To set the env => kubectl create secret generic mistral-secret \
                    --from-literal=MISTRAL_API_KEY=YPDEQQInlReRXBw09iHPg7boVaj7FOBq

