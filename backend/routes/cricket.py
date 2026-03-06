from fastapi import APIRouter, HTTPException, Query
from services.cricket_api import get_match_scorecard, get_live_matches
from typing import List, Dict, Any, Optional

router = APIRouter()

@router.get("/matches")
async def read_live_matches(
    status: Optional[str] = Query(None, description="Filter matches by status (e.g., 'live', 'upcoming', 'completed')"),
    matchType: Optional[str] = Query(None, description="Filter by match type (e.g., 't20', 'odi', 'test')")
):
    data = await get_live_matches()
    
    if not data:
        raise HTTPException(status_code=500, detail="Failed to fetch matches")

    # Assuming 'data' is a list of match dictionaries
    filtered_matches = data

    # Dynamic Filtering Logic
    if status:
        filtered_matches = [m for m in filtered_matches if m.get("status", "").lower() == status.lower()]
    
    if matchType:
        filtered_matches = [m for m in filtered_matches if m.get("matchType", "").lower() == matchType.lower()]

    return filtered_matches

@router.get("/scorecard/{match_id}")
async def read_scorecard(match_id: str):
    data = await get_match_scorecard(match_id)
    if not data:
        raise HTTPException(status_code=404, detail="Match data not found")
    return data

@router.get("/fallback-scorecard")
async def get_fallback_scorecard():
    return {
        "status": "success",
        "data": {
            "id": "ea479cff-ddbe-48e0-9e4a-528f61a8a175",
            "name": "India vs Australia - Fallback Data",
            "matchType": "t20",
            "status": "Live Data Unavailable (Limit Reached)",
            "venue": "Fallback Stadium",
            "teams": ["India", "Australia"],
            "score": [
                {"r": 180, "w": 4, "o": 20, "inning": "India Innings 1"}
            ],
            "scorecard": [
                {
                    "inning": "India Innings 1",
                    "batting": [
                        {"batsman": {"name": "Static Player 1"}, "dismissalText": "not out", "r": 50, "b": 30, "4s": 5, "6s": 2, "sr": 166.67}
                    ],
                    "bowling": [
                        {"bowler": {"name": "Static Bowler 1"}, "o": 4, "m": 0, "r": 25, "w": 2, "eco": 6.25}
                    ]
                }
            ]
        }
    }

@router.get("/news")
async def read_news():
    return [
        {
            "id": "news-1",
            "title": "React Query Implementation Successful",
            "description": "CricSocial now uses advanced caching for better performance.",
            "category": "Tech Update"
        },
        {
            "id": "news-2",
            "title": "Upcoming Series Preview",
            "description": "Check out the full schedule for the upcoming international matches.",
            "category": "Cricket"
        }
    ]

@router.get("/series")
async def read_series(offset: int = Query(0)):
    return {"message": "Series list logic goes here", "offset": offset}