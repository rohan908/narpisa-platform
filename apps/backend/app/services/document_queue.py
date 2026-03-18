from collections.abc import Sequence
from urllib.parse import urlparse

from app.models.document import QueuedSourceDocument, SourceParseRequest


class DocumentQueue:
    def __init__(self) -> None:
        self._items: list[QueuedSourceDocument] = []

    def enqueue(self, request: SourceParseRequest) -> QueuedSourceDocument:
        self._validate_pdf_source_url(str(request.source_url))
        queued_document = QueuedSourceDocument.from_request(request)
        self._items.insert(0, queued_document)
        return queued_document

    def list_items(self) -> Sequence[QueuedSourceDocument]:
        return tuple(self._items)

    def clear(self) -> None:
        self._items.clear()

    def _validate_pdf_source_url(self, source_url: str) -> None:
        parsed_url = urlparse(source_url)
        if not parsed_url.path.lower().endswith(".pdf"):
            raise ValueError("Source URL must point to a PDF document.")


document_queue = DocumentQueue()
