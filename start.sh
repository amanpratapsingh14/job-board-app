#!/bin/sh

# Start nginx in background
nginx

# Activate virtual environment and start FastAPI backend
cd /app/backend
source /opt/venv/bin/activate
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 