from fastapi import APIRouter, HTTPException, Query
from services.cricket_api import get_match_scorecard, get_live_matches

router = APIRouter()


@router.get("/matches")
async def read_live_matches():
    data = await get_live_matches()
    if not data:
        raise HTTPException(status_code=500, detail="Failed to fetch matches")
    return data


@router.get("/scorecard/{match_id}")
async def read_scorecard(match_id: str):
    data = await get_match_scorecard(match_id)
    if not data:
        raise HTTPException(status_code=404, detail="Match data not found")
    return data


@router.get("/series")
async def read_series(offset: int = Query(0)):
    # You can implement a similar caching service for series if needed
    return {"message": "Series list logic goes here", "offset": offset}
