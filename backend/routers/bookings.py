import os
from typing import List

from fastapi import APIRouter, Header, HTTPException

from lib.db import db
from models.booking import Booking, BookingCreate, BookingStatusUpdate

router = APIRouter(prefix="/bookings", tags=["bookings"])


def require_admin(x_admin_key: str | None) -> None:
    expected = os.environ["ADMIN_KEY"]
    if not x_admin_key or x_admin_key != expected:
        raise HTTPException(status_code=401, detail="Kunci admin tidak valid")


@router.post("", response_model=Booking, status_code=201)
async def create_booking(payload: BookingCreate):
    booking = Booking(**payload.model_dump())
    await db.bookings.insert_one(booking.model_dump())
    return booking


@router.get("", response_model=List[Booking])
async def list_bookings(x_admin_key: str | None = Header(default=None)):
    require_admin(x_admin_key)
    docs = await db.bookings.find({}, {"_id": 0}).sort("event_date", 1).to_list(1000)
    return [Booking(**d) for d in docs]


@router.patch("/{booking_id}", response_model=Booking)
async def update_status(
    booking_id: str, payload: BookingStatusUpdate, x_admin_key: str | None = Header(default=None)
):
    require_admin(x_admin_key)
    doc = await db.bookings.find_one_and_update(
        {"id": booking_id},
        {"$set": {"status": payload.status}},
        projection={"_id": 0},
        return_document=True,
    )
    if not doc:
        raise HTTPException(status_code=404, detail="Booking tidak ditemukan")
    return Booking(**doc)


@router.post("/verify-admin", status_code=204)
async def verify_admin(x_admin_key: str | None = Header(default=None)):
    require_admin(x_admin_key)
    return None
