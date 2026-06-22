To Check the deployment status of file => kubectl describe deployment <deployment-name>

To Get all deployments => kubectl get deployments

To check env secrets => kubectl get secrets

To delete the env secret => kubectl delete secret <secret-name>

To set the env => kubectl create secret generic mistral-secret \
                    --from-literal=MISTRAL_API_KEY=YPDEQQInlReRXBw09iHPg7boVaj7FOBq

kubectl create secret database \
    --from-literal=AUTH="mongodb+srv://ayushahirwar04_db_user:d70tFQLNskpFXRmc@cap-cluster.xqcqesg.mongodb.net/auth" \
    --from-literal=SANDBOX="mongodb+srv://ayushahirwar04_db_user:d70tFQLNskpFXRmc@cap-cluster.xqcqesg.mongodb.net/sandbox" \
    --from-literal=AI="mongodb+srv://ayushahirwar04_db_user:d70tFQLNskpFXRmc@cap-cluster.xqcqesg.mongodb.net/ai" 