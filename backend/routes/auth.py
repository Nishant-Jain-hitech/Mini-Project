import base64
import io
from PIL import Image
from bson.binary import Binary
from fastapi import APIRouter, HTTPException, Depends, status, Body
from fastapi.security import OAuth2PasswordBearer
from models.user import UserCreate, UserLogin, UserResponse, UserUpdate
from utils import get_password_hash, verify_password, create_access_token
from database import get_db
from jose import JWTError, jwt
import os
from typing import Optional

SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key")
ALGORITHM = os.getenv("ALGORITHM", "HS256")

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=403, detail="Could not validate credentials")
        return email
    except JWTError:
        raise HTTPException(status_code=403, detail="Could not validate credentials")

@router.post("/register", response_model=UserResponse)
async def register(user: UserCreate = Body(...)):
    db = get_db()
    existing_user = await db.users.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user_dict = user.model_dump()
    user_dict["password"] = get_password_hash(user_dict["password"])
    user_dict["watchlist"] = [] 
    
    new_user = await db.users.insert_one(user_dict)
    created_user = await db.users.find_one({"_id": new_user.inserted_id})
    return created_user

@router.post("/login")
async def login(credentials: UserLogin = Body(...)):
    db = get_db()
    user = await db.users.find_one({"email": credentials.email})
    
    if not user or not verify_password(credentials.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    profile_image_str = None
    if "profile_image" in user and user["profile_image"]:
        if isinstance(user["profile_image"], bytes):
            base64_encoded = base64.b64encode(user["profile_image"]).decode('utf-8')
            profile_image_str = f"data:image/jpeg;base64,{base64_encoded}"
        else:
            profile_image_str = user["profile_image"]

    access_token = create_access_token(
        data={"sub": user["email"], "username": user["username"]}
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "username": user["username"],
            "email": user["email"],
            "profile_image": profile_image_str,
            "watchlist": user.get("watchlist", [])
        }
    }

@router.put("/update-profile")
async def update_profile(
    update_data: UserUpdate = Body(...),
    current_user_email: str = Depends(get_current_user)
):
    db = get_db()
    update_dict = {"username": update_data.username}
    
    final_image_for_frontend = update_data.profile_image

    if update_data.profile_image and "base64," in update_data.profile_image:
        try:
            format, imgstr = update_data.profile_image.split(';base64,') 
            image_bytes = base64.b64decode(imgstr)
            
            img = Image.open(io.BytesIO(image_bytes))
            
            if img.mode in ("RGBA", "P"):
                img = img.convert("RGB")
            
            img.thumbnail((300, 300))
            
            output = io.BytesIO()
            img.save(output, format="JPEG", quality=70, optimize=True)
            compressed_data = output.getvalue()
            
            update_dict["profile_image"] = Binary(compressed_data)
            
            new_base64 = base64.b64encode(compressed_data).decode('utf-8')
            final_image_for_frontend = f"data:image/jpeg;base64,{new_base64}"
            
        except Exception as e:
            raise HTTPException(status_code=400, detail="Invalid image data")

    result = await db.users.update_one(
        {"email": current_user_email},
        {"$set": update_dict}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "message": "Profile updated successfully",
        "username": update_data.username,
        "profile_image": final_image_for_frontend
    }

@router.post("/watchlist/toggle")
async def toggle_watchlist(
    content_id: str = Body(..., embed=True),
    current_user_email: str = Depends(get_current_user)
):
    db = get_db()
    user = await db.users.find_one({"email": current_user_email})
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    current_watchlist = user.get("watchlist", [])
    
    if content_id in current_watchlist:
        await db.users.update_one(
            {"email": current_user_email},
            {"$pull": {"watchlist": content_id}}
        )
        action = "removed"
    else:
        await db.users.update_one(
            {"email": current_user_email},
            {"$addToSet": {"watchlist": content_id}}
        )
        action = "added"
        
    updated_user = await db.users.find_one({"email": current_user_email})
    return {
        "status": "success",
        "action": action, 
        "watchlist": updated_user.get("watchlist", [])
    }
    
    
@router.get("/watchlist")
async def get_watchlist(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # 1. Get the list of IDs from the user's document/record
    # Example: ["movie_83_04", "series_test_03"]
    item_ids = current_user.watchlist 
    
    if not item_ids:
        return []

    # 2. Fetch the actual content details from your media/movies table
    # This filters your 'Media' table for any ID that exists in the user's watchlist
    watchlist_content = db.query(Media).filter(Media.id.in_(item_ids)).all()
    
    return watchlist_content