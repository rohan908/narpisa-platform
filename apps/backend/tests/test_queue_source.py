from httpx import ASGITransport, AsyncClient

from app.main import app
from app.services.document_queue import document_queue


async def test_queue_source_adds_document_to_queue() -> None:
    document_queue.clear()

    payload = {
        "title": "Queued Source",
        "source_url": "https://documents.example.org/queued-source.pdf",
        "attribution": "NaRPISA test suite",
    }

    async with AsyncClient(
        transport=ASGITransport(app=app),
        base_url="http://test",
    ) as client:
        response = await client.post("/api/v1/queue-source", json=payload)

    body = response.json()

    assert response.status_code == 202
    assert body["title"] == "Queued Source"
    assert body["status"] == "queued"
    assert body["source_url"] == "https://documents.example.org/queued-source.pdf"


async def test_list_queued_sources_returns_enqueued_documents() -> None:
    document_queue.clear()

    payload = {
        "title": "Listed Source",
        "source_url": "https://documents.example.org/listed-source.pdf",
        "attribution": "NaRPISA test suite",
    }

    async with AsyncClient(
        transport=ASGITransport(app=app),
        base_url="http://test",
    ) as client:
        await client.post("/api/v1/queue-source", json=payload)
        response = await client.get("/api/v1/queue-source")

    body = response.json()

    assert response.status_code == 200
    assert len(body) == 1
    assert body[0]["title"] == "Listed Source"


async def test_queue_source_rejects_non_pdf_urls() -> None:
    document_queue.clear()

    payload = {
        "title": "Not a PDF",
        "source_url": "https://magicui.design/docs/components/word-rotate",
        "attribution": "NaRPISA test suite",
    }

    async with AsyncClient(
        transport=ASGITransport(app=app),
        base_url="http://test",
    ) as client:
        response = await client.post("/api/v1/queue-source", json=payload)

    body = response.json()

    assert response.status_code == 400
    assert body["detail"] == "Source URL must point to a PDF document."
