from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status

from app.core.config import Settings, get_settings
from app.models.document import ParsedDocument, QueuedSourceDocument, SourceParseRequest
from app.services.document_queue import document_queue
from app.services.pdf_parser import PdfParser
from app.services.source_fetcher import SourceFetcher

router = APIRouter()


@router.get("/health", tags=["health"])
async def healthcheck(
    settings: Annotated[Settings, Depends(get_settings)],
) -> dict[str, str]:
    return {"status": "ok", "service": settings.app_name}


@router.post("/process-source", response_model=ParsedDocument, tags=["processing"])
async def process_source(
    payload: SourceParseRequest,
    settings: Annotated[Settings, Depends(get_settings)],
) -> ParsedDocument:
    fetcher = SourceFetcher(settings=settings)
    fetch_result = await fetcher.fetch_pdf(str(payload.source_url))
    parser = PdfParser()
    return parser.parse(payload, fetch_result)


@router.post(
    "/queue-source",
    response_model=QueuedSourceDocument,
    status_code=status.HTTP_202_ACCEPTED,
    tags=["processing"],
)
async def queue_source(payload: SourceParseRequest) -> QueuedSourceDocument:
    try:
        return document_queue.enqueue(payload)
    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(error),
        ) from error


@router.get(
    "/queue-source",
    response_model=list[QueuedSourceDocument],
    tags=["processing"],
)
async def list_queued_sources() -> list[QueuedSourceDocument]:
    return list(document_queue.list_items())
