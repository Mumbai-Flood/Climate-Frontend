FROM nginx:alpine
WORKDIR /usr/share/nginx/html/
COPY ../build/ .
RUN rm -f /usr/share/nginx/html/nginx.conf
RUN rm -f /usr/share/nginx/html/Dockerfile
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
