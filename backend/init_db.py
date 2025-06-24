from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import Base, User
from auth import get_password_hash

def init_db():
    # Create tables
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    # Check if admin user already exists
    admin_user = db.query(User).filter(User.email == "admin@jobboard.com").first()
    
    if not admin_user:
        # Create admin user
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
    
    db.close()

if __name__ == "__main__":
    init_db() 