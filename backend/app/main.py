# backend/app/main.py

# 1. Import library dan modul yang diperlukan
from fastapi import FastAPI
from .database import engine # Base
from .routers import heroes
from fastapi.middleware.cors import CORSMiddleware

# 2. Perintah untuk membuat tabel di database berdasarkan model di models.py
#    Ini akan dijalankan saat aplikasi pertama kali dimulai.
#    Catatan: Untuk aplikasi produksi, disarankan menggunakan alat migrasi seperti Alembic.
# Base.metadata.create_all(bind=engine)

# 3. Inisialisasi aplikasi FastAPI
app = FastAPI(
    title="API Galeri Pahlawan & Sejarah",
    description="API untuk manajemen data pahlawan dan sejarah Indonesia.",
    version="1.0.0"
)

# 4. Konfigurasi CORS (Cross-Origin Resource Sharing)
#    Ini SANGAT PENTING agar frontend React (yang berjalan di port berbeda)
#    diizinkan untuk meminta data dari API ini.
origins = [
    "http://localhost:5173",  # Alamat default untuk frontend Vite (React)
    "http://localhost:3000",  # Alamat default untuk Create React App
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Mengizinkan semua metode (GET, POST, PUT, DELETE)
    allow_headers=["*"],  # Mengizinkan semua header
)

# 5. Menyertakan (include) router dari file lain
#    Semua endpoint yang ada di dalam `heroes.router` akan ditambahkan ke aplikasi utama
#    dengan prefix /api/heroes.
app.include_router(heroes.router)

# 6. Endpoint root sebagai penanda bahwa API berjalan
@app.get("/", tags=["Root"])
def read_root():
    """
    Endpoint root untuk mengecek status API.
    """
    return {"message": "Selamat datang di API Galeri Sejarah!"}