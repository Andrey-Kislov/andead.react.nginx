FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY public/ /usr/share/nginx/html/
COPY images/ /usr/share/nginx/html/images/
COPY manifest.json /usr/share/nginx/html/