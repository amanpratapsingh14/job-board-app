-- PostgreSQL initialization script for Job Board Application
-- This script will be executed when the PostgreSQL container starts

-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create indexes for better performance
-- (Tables will be created by SQLAlchemy, but we can add indexes here)

-- Note: The actual table creation is handled by SQLAlchemy models
-- This file can be used for additional database setup if needed 