# ----------------------------------
# FINAL DOCKERFILE
# Frontend already built in Jenkins
# ----------------------------------

FROM mirror.gcr.io/nginx:stable-alpine

# Remove default nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy Vite build output from Jenkins workspace
COPY dist/ /usr/share/nginx/html/

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose HTTP port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
