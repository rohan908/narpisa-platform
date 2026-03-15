from hashlib import sha256
from io import BytesIO

from pypdf import PdfReader

from app.models.document import ParsedDocument, SourceParseRequest
from app.services.source_fetcher import FetchResult


class PdfParser:
    def parse(
        self,
        request: SourceParseRequest,
        fetch_result: FetchResult,
    ) -> ParsedDocument:
        reader = PdfReader(BytesIO(fetch_result.content))
        extracted_pages = [page.extract_text() or "" for page in reader.pages]
        extracted_text = "\n\n".join(
            page.strip() for page in extracted_pages if page.strip()
        )
        excerpt = extracted_text[:500].strip()

        return ParsedDocument(
            title=request.title,
            source_url=request.source_url,
            source_domain=fetch_result.source_domain,
            attribution=request.attribution,
            content_hash=sha256(fetch_result.content).hexdigest(),
            page_count=len(reader.pages),
            extracted_text=extracted_text,
            extracted_excerpt=excerpt,
        )
