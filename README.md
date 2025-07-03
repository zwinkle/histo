 # Galeri Pahlawan & Sejarah Indonesia

Proyek ini adalah aplikasi web untuk mengelola dan menampilkan galeri pahlawan nasional Indonesia. Terdiri dari backend (API) berbasis FastAPI dan frontend berbasis ReactJS + Vite dengan TailwindCSS dan desain modern minimalis.

---

## Struktur Proyek

```
histo/
  backend/      # Backend FastAPI (API, database, migrasi)
    app/
      main.py   # Entry point FastAPI
      models.py # Model ORM SQLAlchemy
      schemas.py# Skema Pydantic
      crud.py   # Logika CRUD
      routers/  # Endpoint API (heroes)
  frontend/     # Frontend ReactJS (Vite, TailwindCSS)
    src/
      pages/    # Halaman utama (GalleryPage)
      components/ # Komponen UI (HeroCard, Modal, dsb)
      services/ # API client (axios)
```

---

## Fitur Utama

### Backend (FastAPI)
- CRUD data pahlawan (nama, tahun lahir/wafat, deskripsi, gambar, posisi gambar)
- Validasi input & error handling (400, 404, 201, dsb)
- CORS untuk integrasi frontend
- Otomatisasi pembuatan tabel database

### Frontend (React + Vite + TailwindCSS)
- Galeri pahlawan dengan tampilan kartu 3D interaktif
- Modal tambah/edit/hapus pahlawan
- Navigasi alfabet (A-Z)
- Edit posisi gambar (drag & drop)
- Desain responsif, minimalis, dan modern

---

## Cara Menjalankan

### 1. Backend (API)
1. Masuk ke folder `backend/`
2. Buat file `.env` dengan variabel `DATABASE_URL` (contoh: `sqlite:///./test.db`)
3. Install dependensi:
   ```bash
   pip install -r requirements.txt
   ```
4. Jalankan server:
   ```bash
   uvicorn app.main:app --reload
   ```

### 2. Frontend (React)
1. Masuk ke folder `frontend/`
2. Install dependensi:
   ```bash
   npm install
   ```
3. Jalankan aplikasi:
   ```bash
   npm run dev
   ```
4. Akses di [http://localhost:5173](http://localhost:5173)

---

## Konfigurasi Penting
- **API URL**: Pastikan `frontend/src/services/api.js` mengarah ke URL backend (default: `http://localhost:8000/api`)
- **CORS**: Sudah diatur agar frontend bisa mengakses backend
- **Database**: Otomatis dibuat saat backend pertama dijalankan

---

## Dependensi Utama

### Backend
- fastapi, sqlalchemy, alembic, uvicorn, pydantic, python-dotenv

### Frontend
- react, vite, tailwindcss v3, axios, framer-motion

---

## Lisensi
Proyek ini bebas digunakan untuk edukasi dan pengembangan lebih lanjut.
