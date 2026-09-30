import os

ADMIN = {"X-Admin-Key": os.environ.get("ADMIN_KEY", "anez2026")}

PAYLOAD = {
    "name": "Pytest Klien",
    "whatsapp": "0812-3456-7890",
    "event_type": "Wedding",
    "event_date": "2027-01-15",
    "package": "Gold Wedding",
    "location": "Padang",
    "notes": "tes otomatis",
}


def test_create_booking_normalizes_phone(client):
    r = client.post("/bookings", json=PAYLOAD)
    assert r.status_code == 201
    body = r.json()
    assert body["whatsapp"] == "6281234567890"
    assert body["status"] == "baru"
    assert body["id"]


def test_create_booking_rejects_bad_date(client):
    r = client.post("/bookings", json={**PAYLOAD, "event_date": "15-01-2027"})
    assert r.status_code == 422


def test_list_requires_admin_key(client):
    assert client.get("/bookings").status_code == 401
    assert client.get("/bookings", headers={"X-Admin-Key": "salah"}).status_code == 401


def test_list_and_update_status(client):
    created = client.post("/bookings", json=PAYLOAD).json()
    rows = client.get("/bookings", headers=ADMIN).json()
    assert any(b["id"] == created["id"] for b in rows)

    r = client.patch(f"/bookings/{created['id']}", json={"status": "deal"}, headers=ADMIN)
    assert r.status_code == 200
    assert r.json()["status"] == "deal"

    assert client.patch("/bookings/tidak-ada", json={"status": "deal"}, headers=ADMIN).status_code == 404


def test_verify_admin(client):
    assert client.post("/bookings/verify-admin", headers=ADMIN).status_code == 204
    assert client.post("/bookings/verify-admin").status_code == 401
