FROM nginx:stable

WORKDIR /etc/nginx

COPY images/nginx/config/ /etc/nginx/

#RUN apt-get update && apt-get --yes --force-yes  install sudo \
#    && sudo usermod -u 1000 www-data \
#    && sudo groupmod -g 1000 www-data \
#    && echo "www-data ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

#RUN touch /run/nginx.pid \
#        && nginx -t \
#        && chown -R www-data:www-data /etc/nginx \
#        && chown -R www-data:www-data /run/nginx.pid \
#        && chown -R www-data:www-data /var/log/nginx \
#        && chown -R www-data:www-data /var/cache/nginx

#EXPOSE 80

#COPY images/nginx/nginx-entrypoint.sh /tmp/nginx-entrypoint.sh

#CMD ["sudo", "/tmp/nginx-entrypoint.sh"]
