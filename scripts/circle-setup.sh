
circlerc() { echo "export $1=$2" >> ~/.circlerc; }

circlerc "CI_MESSAGE" "\`(cd `pwd` && git log -1 --pretty=%B)\`"
circlerc "CI_BRANCH" $CIRCLE_BRANCH
circlerc "CI_BUILD_NUMBER" $CIRCLE_BUILD_NUM
circlerc "CI" TRUE

if [[ $CIRCLE_BRANCH == "develop" ]]
then
    echo "Setting up for staging environment"
    circlerc "AWS_ACCESS_KEY_ID" $BETA_AWS_ACCESS_KEY_ID
    circlerc "AWS_SECRET_ACCESS_KEY" $BETA_AWS_SECRET_ACCESS_KEY
    circlerc "S3_BUCKET" s3-gousto-platform-beta
    circlerc "ENVIRONMENT" staging
elif [[ $CIRCLE_BRANCH == "master" ]]
then
    echo "Setting up for production environment"
    circlerc "AWS_ACCESS_KEY_ID" $PROD_AWS_ACCESS_KEY_ID
    circlerc "AWS_SECRET_ACCESS_KEY" $PROD_AWS_SECRET_ACCESS_KEY
    circlerc "S3_BUCKET" s3-gousto-platform-prod
    circlerc "ENVIRONMENT" production
elif [[ $CIRCLE_BRANCH == "env-"* ]]
then
    echo "Setting up for env-* environment"
    circlerc "AWS_ACCESS_KEY_ID" $BETA_AWS_ACCESS_KEY_ID
    circlerc "AWS_SECRET_ACCESS_KEY" $BETA_AWS_SECRET_ACCESS_KEY
    circlerc "S3_BUCKET" s3-gousto-platform-beta
    circlerc "ENVIRONMENT" ${CIRCLE_BRANCH:4}
else
    echo "Not a supported branch, will test but will not deploy"
    echo "Setting up for TECH environment"
    circlerc "AWS_ACCESS_KEY_ID" $BETA_AWS_ACCESS_KEY_ID
    circlerc "AWS_SECRET_ACCESS_KEY" $BETA_AWS_SECRET_ACCESS_KEY
    circlerc "S3_BUCKET" s3-gousto-platform-beta
    circlerc "ENVIRONMENT" staging
fi

circlerc "TEST_DB_HOST" 127.0.0.1
circlerc "TEST_DB_DATABASE" circle_test
circlerc "TEST_DB_USERNAME" ubuntu
circlerc "TEST_DB_PASSWORD"
circlerc "ARTIFACTS" $CIRCLE_ARTIFACTS

source ~/.circlerc

aws configure set aws_access_key_id "${AWS_ACCESS_KEY_ID}"
aws configure set aws_secret_access_key "${AWS_SECRET_ACCESS_KEY}"
aws configure set region eu-west-1

aws s3 cp s3://${S3_BUCKET}/${ENVIRONMENT}/deployments/platform/latest/ci_scripts/ "./ci_scripts/" --recursive

# Install dependancies
chmod +x ./ci_scripts/setup.sh
./ci_scripts/setup.sh
