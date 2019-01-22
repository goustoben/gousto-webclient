FROM nginx

WORKDIR /etc/nginx

COPY images/nginx/config/ /etc/nginx/
RUN ls -la /etc/nginx \
    && nginx -t
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]  