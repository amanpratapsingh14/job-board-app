# Multi-stage build for frontend and backend

# Stage 1: Build the frontend
FROM node:20-alpine AS builder

# Set working directory for frontend
WORKDIR /app/frontend

# Copy frontend package files and install dependencies
COPY frontend/package*.json ./
RUN npm config set fetch-retry-maxtimeout 600000 && \
    npm config set fetch-retry-mintimeout 10000 && \
    npm install

# Copy the rest of the frontend source code
COPY frontend/ ./

# Build the frontend
RUN npm run build

# Stage 2: Setup the backend
WORKDIR /app

# Copy backend requirements and install dependencies
COPY req.txt .
# We'll install python and dependencies in the final stage

# Copy the rest of the backend source code
COPY backend/ ./backend/

# Stage 3: Final image with Nginx
FROM nginx:alpine

# Install Python, pip, and bash. Then create a virtual environment.
RUN apk --no-cache add python3 py3-pip bash && \
    python3 -m venv /opt/venv

# Add venv to the PATH
ENV PATH="/opt/venv/bin:$PATH"

# Copy the backend code from the builder stage
COPY --from=builder /app/backend /app/backend

# Copy requirements file and install dependencies into the virtual environment
COPY req.txt .
RUN pip install --no-cache-dir -r req.txt

# Copy the start script and Nginx configuration
COPY start.sh /start.sh
RUN chmod +x /start.sh
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the built frontend from the builder stage
COPY --from=builder /app/frontend/build /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80

# The command to start Nginx and Uvicorn
CMD ["/start.sh"]

