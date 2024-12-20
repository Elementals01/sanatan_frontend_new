# FROM node:alpine3.18 as build

FROM node:18-alpine as build

# build react app
WORKDIR /app
COPY package.json .
# RUN npm install --legacy-peer-deps
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# serve with nginx
FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=build /app/build .
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]