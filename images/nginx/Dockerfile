FROM nginx

WORKDIR /etc/nginx

COPY images/nginx/config/ /etc/nginx/
# 1001 is the user ID of a mac user. Needed for local development. # Need root permission to run nginx. Devbox only

RUN apt-get update && apt-get --yes --force-yes  install sudo \
    && sudo usermod -u 1001 www-data \  
    && sudo groupmod -g 1001 www-data \
    && echo "www-data ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers 

RUN touch /run/nginx.pid \
    && nginx -t \
    && chown -R www-data:www-data /etc/nginx \
    && chown -R www-data:www-data /run/nginx.pid \
    && chown -R www-data:www-data /var/log/nginx \
    && chown -R www-data:www-data /var/cache/nginx

COPY images/nginx/nginx-entrypoint.sh /tmp/nginx-entrypoint.sh

EXPOSE 80

CMD ["sudo", "/tmp/nginx-entrypoint.sh"]  