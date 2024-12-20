# FROM node:alpine3.18 as build

# declare build time environment variables
ARG REACT_APP_ENV
ARG REACT_APP_SERVER

# set default values for build time environment variables
ARG REACT_APP_ENV=$ARG_REACT_APP_ENV
ARG REACT_APP_SERVER=$ARG_REACT_APP_SERVER

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