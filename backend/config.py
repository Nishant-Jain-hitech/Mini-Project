import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    MONGO_URL = os.getenv("MONGO_URL")
    DB_NAME = os.getenv("DB_NAME")
    SECRET_KEY = os.getenv("SECRET_KEY")
    ALGORITHM = os.getenv("ALGORITHM")
    CRIC_API_KEY = os.getenv("VITE_API_KEY")
    CRIC_BASE_URL = os.getenv("VITE_BASE_URL")
    FRONTEND_URL = os.getenv("FRONTEND_URL")

settings = Settings()