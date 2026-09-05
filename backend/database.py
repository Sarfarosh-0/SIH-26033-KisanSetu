import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# Default to SQLite for easy local hackathon testing; switch to PostgreSQL in production via env var:
# Example: postgresql://postgres:password@localhost:5432/agrimarket_db
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./agrimarket.db")

connect_args = {}
if DATABASE_URL.startswith("sqlite"):
    connect_args = {"check_same_thread": False}

engine = create_engine(DATABASE_URL, connect_args=connect_args)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    """Dependency for obtaining database session per request."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
