ARG NODE_VERSION=20.12.1

# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine AS build

# Set working directory for all build stages.
WORKDIR /casestructure

# Copy package.json and package-lock.json to install dependencies
# COPY package.json package-lock.json ./
COPY package.json ./

# Install dependencies using npm
RUN npm install

# Copy the rest of the application
COPY . .

# Set Node.js memory limit to 4GB or more
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Build the application using npm
RUN npm run build

# Install additional dependencies like git and openssh
# RUN apk update && apk add --no-cache git openssh

# Use nginx for serving the built application
FROM nginx:alpine

# Copy custom NGINX configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the build folder from React to the root of nginx (www)
COPY --from=build /casestructure/dist /usr/share/nginx/html

# Expose the development port (e.g., 4012).
# EXPOSE 9000

# Expose ports 80 for prod
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
