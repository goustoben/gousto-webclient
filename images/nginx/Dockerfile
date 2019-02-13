ARG AWS_ACCOUNT_NUMBER
ARG ENVIRONMENT
FROM ${AWS_ACCOUNT_NUMBER}.dkr.ecr.eu-west-1.amazonaws.com/${ENVIRONMENT}/platformbase-images/nginx

COPY images/nginx/nginx-entrypoint.sh /tmp/nginx-entrypoint.sh

CMD ["sudo", "/tmp/nginx-entrypoint.sh"]
