# Panduan Deploy ke Vercel — Anez Creative

Proyek ini sudah disiapkan untuk Vercel: frontend (Vite/React) dibangun sebagai situs statis,
backend FastAPI dijalankan sebagai Serverless Function lewat `api/index.py`.

## 1. Siapkan database MongoDB (gratis)
1. Buat akun di https://www.mongodb.com/atlas → **Create Cluster** (pilih tier gratis / M0).
2. Menu **Database Access** → buat user + password.
3. Menu **Network Access** → **Add IP Address** → pilih **Allow access from anywhere** (0.0.0.0/0), karena IP Vercel dinamis.
4. Klik **Connect → Drivers** dan salin connection string, contoh:
   `mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

## 2. Upload kode ke GitHub
Gunakan tombol **Save to GitHub** di chat Emergent (atau `git push` manual) sehingga repo berisi:
`vercel.json`, `api/index.py`, `requirements.txt`, `.python-version`, folder `frontend/` dan `backend/`.

## 3. Import ke Vercel
1. Buka https://vercel.com/new → pilih repo GitHub Anda.
2. **Framework Preset**: Other (sudah diatur otomatis oleh `vercel.json`, biarkan default).
3. Buka bagian **Environment Variables** dan isi:

| Nama | Nilai |
| --- | --- |
| `MONGO_URL` | connection string Atlas dari langkah 1 |
| `DB_NAME` | `anez_creative` |
| `ADMIN_KEY` | kunci rahasia untuk halaman `/admin/bookings` (contoh: `anez2026`, ganti dengan yang lebih kuat) |
| `CORS_ORIGINS` | `*` |

4. Klik **Deploy**. Tunggu ±2 menit.

## 4. Cek hasil
- Situs: `https://NAMA-PROYEK.vercel.app`
- API: `https://NAMA-PROYEK.vercel.app/api/` → harus membalas `{"message":"Hello World"}`
- Form booking di situs → data masuk ke `https://NAMA-PROYEK.vercel.app/admin/bookings`

## 5. Domain sendiri (opsional)
Vercel → Project → **Settings → Domains** → tambahkan domain (mis. `anezcreative.com`) dan ikuti instruksi DNS.

## Catatan
- Setiap `git push` ke branch utama akan otomatis men-deploy ulang.
- Jangan pernah meng-commit file `.env`; semua rahasia disimpan di Environment Variables Vercel.
- Untuk mengganti video/foto, ubah file di `frontend/public/img/` dan konfigurasi di `frontend/src/lib/data.ts`.
