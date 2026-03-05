from pydantic import BaseModel, Field
from typing import Optional, Any
from datetime import datetime, timezone


class MatchCache(BaseModel):
    match_id: str
    data: Any
    last_updated: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    model_config = {"arbitrary_types_allowed": True}


class CommentCreate(BaseModel):
    match_id: str
    text: str = Field(..., min_length=1, max_length=500)


class CommentResponse(BaseModel):
    id: Optional[Any] = Field(None, alias="_id")
    match_id: str
    username: str
    text: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    model_config = {"populate_by_name": True, "arbitrary_types_allowed": True}
