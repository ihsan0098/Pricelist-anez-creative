from datetime import datetime, timezone
from typing import Literal, Optional
import uuid

from pydantic import BaseModel, Field, field_validator

EventType = Literal["Wedding", "Prewedding", "Wedding + Prewedding", "Lainnya"]


class BookingCreate(BaseModel):
    name: str = Field(min_length=2, max_length=80)
    whatsapp: str = Field(min_length=9, max_length=20)
    event_type: EventType
    event_date: str  # YYYY-MM-DD
    package: Optional[str] = Field(default=None, max_length=80)
    location: Optional[str] = Field(default=None, max_length=120)
    notes: Optional[str] = Field(default=None, max_length=600)

    @field_validator("whatsapp")
    @classmethod
    def normalize_phone(cls, v: str) -> str:
        digits = "".join(ch for ch in v if ch.isdigit())
        if len(digits) < 9:
            raise ValueError("Nomor WhatsApp tidak valid")
        if digits.startswith("0"):
            digits = "62" + digits[1:]
        return digits

    @field_validator("event_date")
    @classmethod
    def valid_date(cls, v: str) -> str:
        datetime.strptime(v, "%Y-%m-%d")
        return v


class Booking(BookingCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    status: Literal["baru", "dihubungi", "deal", "batal"] = "baru"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class BookingStatusUpdate(BaseModel):
    status: Literal["baru", "dihubungi", "deal", "batal"]
