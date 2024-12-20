# Stage 1: Build React App
FROM node:18-alpine AS build

# Declare build-time environment variables
ARG REACT_APP_ENV
ARG REACT_APP_SERVER

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install --legacy-peer-deps

# Copy the rest of the application and build
COPY . .
RUN npm run build

# Stage 2: Serve with NGINX
FROM nginx:1.23-alpine

# Set working directory and clean existing content
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

# Copy built app from the previous stage
COPY --from=build /app/build .

# Expose port 80 for the web server
EXPOSE 80

# Start NGINX server
ENTRYPOINT ["nginx", "-g", "daemon off;"]
