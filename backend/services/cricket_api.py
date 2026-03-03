import httpx
from datetime import datetime, timedelta
from config import settings
from database import get_db


async def get_match_scorecard(match_id: str):
    db = get_db()

    cache = await db.matches.find_one({"match_id": match_id})

    if cache:
        last_updated = cache.get("last_updated")
        if datetime.utcnow() - last_updated < timedelta(seconds=60):
            return cache["data"]

    async with httpx.AsyncClient() as client:
        url = f"{settings.CRIC_BASE_URL}/match_scorecard"
        params = {"apikey": settings.CRIC_API_KEY, "id": match_id}

        try:
            response = await client.get(url, params=params, timeout=10.0)
            response.raise_for_status()
            data = response.json()

            if data.get("status") == "success":
                await db.matches.update_one(
                    {"match_id": match_id},
                    {"$set": {"data": data, "last_updated": datetime.utcnow()}},
                    upsert=True,
                )
            return data

        except httpx.HTTPError as e:
            if cache:
                return cache["data"]
            return {"status": "failure", "reason": str(e)}


async def get_live_matches():
    db = get_db()

    cache = await db.matches.find_one({"match_id": "current_matches_list"})

    if cache:
        if datetime.utcnow() - cache.get("last_updated") < timedelta(minutes=10):
            return cache["data"]

    async with httpx.AsyncClient() as client:
        url = f"{settings.CRIC_BASE_URL}/currentMatches"
        params = {"apikey": settings.CRIC_API_KEY}

        response = await client.get(url, params=params)
        data = response.json()

        await db.matches.update_one(
            {"match_id": "current_matches_list"},
            {"$set": {"data": data, "last_updated": datetime.utcnow()}},
            upsert=True,
        )
        return data
