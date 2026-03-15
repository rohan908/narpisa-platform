from io import BytesIO

import pytest
from pypdf import PdfWriter


@pytest.fixture
def sample_pdf_bytes() -> bytes:
    buffer = BytesIO()
    writer = PdfWriter()
    writer.add_blank_page(width=300, height=300)
    writer.write(buffer)
    return buffer.getvalue()
