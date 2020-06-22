#! /bin/bash

echo "Installing serverless"
echo "_______________________________"

npm install -g --unsafe-perm serverless
npm -i -g --unsafe-perm storage-engine
npm install 

#npm audit fix

echo "Installing serverless-s3-sync"
echo "_______________________________"
npm install serverless-offline serverless-offline-scheduler serverless-offline-sns serverless-s3-local serverless-pseudo-parameters serverless-domain-manager serverless-plugin-tracing serverless-apigw-binary serverless-content-encoding serverless-plugin-warmup serverless-offline-scheduler

#npm audit fix

#cd artifacts

#ls $env

#cd ..


echo "Deploying to $env"
echo "_______________________________"
serverless deploy -v -r $region --stage $env --package artifacts/$env
