from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os


def get_db_uri():
    db_username = os.environ.get("DB_USERNAME")
    db_password = os.environ.get("DB_PASSWORD")
    db_host = os.environ.get("DB_HOST", "postgresql")
    db_port = os.environ.get("DB_PORT", "5432")
    db_name = os.environ.get("DB_NAME")
    db_uri = f"postgresql+psycopg2://{db_username}:{db_password}"
    db_uri += f"@{db_host}:{db_port}/{db_name}"
    return 'sqlite:///db.db'


# SQLALCHEMY_DATABASE_URL = "sqlite:///./rosatom.db"
SQLALCHEMY_DATABASE_URL = get_db_uri()

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
