from typing import Any, Literal

from pydantic import BaseModel, Field


AdminColumnDataType = Literal["text", "numeric", "integer", "date", "boolean", "enum"]


class AddColumnRequest(BaseModel):
    category: str = Field(min_length=1)
    label: str = Field(min_length=1, max_length=64)
    dataType: AdminColumnDataType
    enumOptions: list[str] | None = None


class ColumnVisibilityRequest(BaseModel):
    category: str = Field(min_length=1)
    field: str = Field(min_length=1)
    visible: bool


class DirtyCellChange(BaseModel):
    category: str = Field(min_length=1)
    rowId: int
    field: str = Field(min_length=1)
    value: str | int | float | bool | None = None
    originalValue: str | int | float | bool | None = None
    metricRowId: int | None = None


class SaveRowsRequest(BaseModel):
    changes: list[DirtyCellChange] = Field(min_length=1)


class SaveFailure(BaseModel):
    rowId: int
    field: str
    message: str


class SaveRowsResponse(BaseModel):
    saved: int
    failed: list[SaveFailure]


class AdminUser(BaseModel):
    id: str
    email: str | None = None


JsonValue = dict[str, Any] | list[Any] | str | int | float | bool | None
