from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from database import connect_to_mongo, close_mongo_connection
from routes import auth, cricket

@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_to_mongo()
    yield
    await close_mongo_connection()

app = FastAPI(
    title="CricSocial API",
    lifespan=lifespan
)

origins = [
    "http://localhost:5173",  # Your React/Vite dev server
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth, prefix="/api/auth", tags=["Authentication"])
app.include_router(cricket, prefix="/api/cricket", tags=["Cricket Data"])

@app.get('/')
async def root():
    return {"message":"live"}

@app.get("/health")
async def health_check():
    return {"status": "online", "database": "connected"}