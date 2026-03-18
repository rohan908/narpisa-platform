from datetime import UTC, datetime
from typing import Literal
from uuid import uuid4

from pydantic import BaseModel, HttpUrl

ProcessingStatus = Literal["queued", "fetching", "parsing", "completed", "failed"]


class SourceParseRequest(BaseModel):
    title: str
    source_url: HttpUrl
    attribution: str
    notes: str | None = None


class ParsedDocument(BaseModel):
    title: str
    source_url: HttpUrl
    source_domain: str
    attribution: str
    content_hash: str
    page_count: int
    extracted_text: str
    extracted_excerpt: str
    status: ProcessingStatus = "completed"
    extracted_at: datetime = datetime.now(UTC)


class QueuedSourceDocument(BaseModel):
    id: str
    title: str
    source_url: HttpUrl
    attribution: str
    notes: str | None = None
    status: ProcessingStatus = "queued"
    queued_at: datetime

    @classmethod
    def from_request(cls, request: SourceParseRequest) -> "QueuedSourceDocument":
        return cls(
            id=str(uuid4()),
            title=request.title,
            source_url=request.source_url,
            attribution=request.attribution,
            notes=request.notes,
            queued_at=datetime.now(UTC),
        )
