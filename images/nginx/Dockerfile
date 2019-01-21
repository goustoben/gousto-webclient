FROM nginx

WORKDIR /etc/nginx

COPY images/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]  