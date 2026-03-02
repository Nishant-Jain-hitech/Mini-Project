from fastapi import APIRouter, HTTPException, Depends, status, Body
from models.user import UserCreate, UserLogin, UserResponse
from utils import get_password_hash, verify_password, create_access_token
from database import get_db
from datetime import timedelta

router = APIRouter()

@router.post("/register", response_model=UserResponse)
async def register(user: UserCreate = Body(...)):
    db = get_db()
    
    existing_user = await db.users.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD__REQUEST,
            detail="Email already registered"
        )
    
    user_dict = user.dict()
    user_dict["password"] = get_password_hash(user_dict["password"])
    
    new_user = await db.users.insert_one(user_dict)
    
    created_user = await db.users.find_one({"_id": new_user.inserted_id})
    return created_user

@router.post("/login")
async def login(credentials: UserLogin = Body(...)):
    db = get_db()
    
    user = await db.users.find_one({"email": credentials.email})
    
    if not user or not verify_password(credentials.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    access_token = create_access_token(
        data={"sub": user["email"], "username": user["username"]}
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "username": user["username"],
            "email": user["email"]
        }
    }

@router.get("/me", response_model=UserResponse)
async def get_current_user(current_user: str = "Dependency logic here later"):
    return {"message": "Protected route logic will be added with Middleware"}