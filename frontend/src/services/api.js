// src/services/api.js
import axios from 'axios';

// Membuat instance axios dengan konfigurasi dasar
const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api', // URL dasar backend kita
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fungsi untuk mengambil semua data pahlawan
export const fetchHeroes = async () => {
  try {
    const response = await apiClient.get('/heroes');
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil data pahlawan:", error);
    return []; // Kembalikan array kosong jika gagal
  }
};

export const createHero = async (heroData) => {
  try {
    const response = await apiClient.post('/heroes', heroData);
    return response.data;
  } catch (error) {
    // Kita 'throw' error agar bisa ditangkap di komponen dan menampilkan pesan
    console.error("Gagal menambah pahlawan:", error.response.data);
    throw error.response.data;
  }
};
export const updateHero = async (id, heroData) => {
  try {
    const response = await apiClient.put(`/heroes/${id}`, heroData);
    return response.data;
  } catch (error) {
    console.error("Gagal mengedit pahlawan:", error.response.data);
    throw error.response.data;
  }
};

export const deleteHero = async (id) => {
  try {
    const response = await apiClient.delete(`/heroes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Gagal menghapus pahlawan:", error.response.data);
    throw error.response.data;
  }
}