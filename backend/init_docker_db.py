import os
import time
from sqlalchemy import create_engine, text
from sqlalchemy.exc import OperationalError
from models import Base
from auth import get_password_hash

def wait_for_database(database_url, max_retries=30):
    """Wait for database to be ready"""
    print("Waiting for database to be ready...")
    for i in range(max_retries):
        try:
            engine = create_engine(database_url)
            with engine.connect() as conn:
                conn.execute(text("SELECT 1"))
            print("Database is ready!")
            return engine
        except OperationalError:
            print(f"Database not ready, retrying... ({i+1}/{max_retries})")
            time.sleep(2)
    
    raise Exception("Database failed to start within expected time")

def init_docker_db():
    """Initialize database for Docker deployment"""
    database_url = os.getenv("DATABASE_URL", "postgresql://job_user:job_password@postgres:5432/job_board")
    
    # Wait for database to be ready
    engine = wait_for_database(database_url)
    
    # Create tables
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    
    # Create admin user if it doesn't exist
    from sqlalchemy.orm import sessionmaker
    from models import User
    
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    db = SessionLocal()
    
    try:
        admin_user = db.query(User).filter(User.email == "admin@jobboard.com").first()
        
        if not admin_user:
            admin_user = User(
                email="admin@jobboard.com",
                username="admin",
                hashed_password=get_password_hash("admin123"),
                is_admin=True
            )
            db.add(admin_user)
            db.commit()
            print("Admin user created successfully!")
            print("Email: admin@jobboard.com")
            print("Password: admin123")
        else:
            print("Admin user already exists!")
            
    except Exception as e:
        print(f"Error creating admin user: {e}")
        db.rollback()
    finally:
        db.close()
    
    print("Database initialization completed!")

if __name__ == "__main__":
    init_docker_db() 