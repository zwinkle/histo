// src/components/AddHeroModal.jsx
import { useState, useEffect } from 'react';
import { createHero, updateHero } from '../services/api';
import ImagePositionEditor from './ImagePositionEditor';

const AddHeroModal = ({ isOpen, onClose, onSuccess, heroToEdit, onDelete }) => {
  const [name, setName] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [deathYear, setDeathYear] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [imagePosX, setImagePosX] = useState(50);
  const [imagePosY, setImagePosY] = useState(50);

  const isEditMode = Boolean(heroToEdit);

  useEffect(() => {
    if (isEditMode && heroToEdit) {
      setName(heroToEdit.name);
      setBirthYear(heroToEdit.birth_year || '');
      setDeathYear(heroToEdit.death_year || '');
      setDescription(heroToEdit.description || '');
      setImageUrl(heroToEdit.image_url || '');
      setImagePosX(heroToEdit.image_pos_x || 50);
      setImagePosY(heroToEdit.image_pos_y || 50);
    } else {
      setName(''); setBirthYear(''); setDeathYear(''); setDescription(''); setImageUrl(''); setImagePosX(50);
      setImagePosY(50);
    }
  }, [heroToEdit, isEditMode, isOpen]);


  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const heroData = {
      name,
      birth_year: birthYear ? parseInt(birthYear, 10) : null,
      death_year: deathYear ? parseInt(deathYear, 10) : null,
      description,
      image_url: imageUrl,
      image_pos_x: imagePosX,
      image_pos_y: imagePosY,
    };

    try {
      if (isEditMode) {
        await updateHero(heroToEdit.id, heroData);
      } else {
        await createHero(heroData);
      }
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.detail || 'Terjadi kesalahan.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 font-mono">
      <div className="bg-retro-card text-retro-text p-8 rounded-lg shadow-xl w-full max-w-md border border-retro-text/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{isEditMode ? 'Edit Pahlawan' : 'Tambah Pahlawan Baru'}</h2>
          <button onClick={onClose} className="text-retro-text/50 hover:text-retro-text text-2xl">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="max-h-[70vh] overflow-y-auto pr-4 custom-scrollbar">
          <div className="space-y-4">
            <input type="text" placeholder="Nama Pahlawan" value={name} onChange={e => setName(e.target.value)} required className="w-full p-2 bg-retro-bg rounded border border-retro-text/20 focus:outline-none focus:ring-2 focus:ring-retro-accent" />
            <div className="flex space-x-4">
              <input type="number" placeholder="Tahun Lahir" value={birthYear} onChange={e => setBirthYear(e.target.value)} className="w-1/2 p-2 bg-retro-bg rounded border border-retro-text/20 focus:outline-none focus:ring-2 focus:ring-retro-accent" />
              <input type="number" placeholder="Tahun Wafat" value={deathYear} onChange={e => setDeathYear(e.target.value)} className="w-1/2 p-2 bg-retro-bg rounded border border-retro-text/20 focus:outline-none focus:ring-2 focus:ring-retro-accent" />
            </div>
            <textarea placeholder="Deskripsi Singkat" value={description} onChange={e => setDescription(e.target.value)} required rows="4" className="w-full p-2 bg-retro-bg rounded border border-retro-text/20 focus:outline-none focus:ring-2 focus:ring-retro-accent"></textarea>
            <input type="text" placeholder="URL Gambar" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full p-2 bg-retro-bg rounded border border-retro-text/20 focus:outline-none focus:ring-2 focus:ring-retro-accent" />
            {imageUrl && (
              <ImagePositionEditor 
                imageUrl={imageUrl}
                initialX={imagePosX}
                initialY={imagePosY}
                onPositionChange={(newX, newY) => {
                  setImagePosX(newX);
                  setImagePosY(newY);
                }}
              />
            )}
          </div>
          
          {error && <p className="text-red-400 text-sm mt-4 text-center">{error}</p>}

          <div className="mt-6">
            <button type="submit" disabled={submitting} className="w-full bg-retro-accent/80 hover:bg-retro-accent text-retro-bg font-bold py-2 px-4 rounded disabled:bg-slate-600">
              {submitting ? 'Menyimpan...' : (isEditMode ? 'Simpan Perubahan' : 'Simpan Pahlawan')}
            </button>
          </div>
        </form>

        {/* Tombol Hapus hanya muncul saat mode edit */}
        {isEditMode && (
          <div className="mt-4 pt-4 border-t border-retro-text/10">
            <button
              onClick={onDelete}
              className="w-full text-red-500/80 hover:text-red-500 text-sm text-left transition-colors"
            >
              Hapus Pahlawan Ini...
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddHeroModal;
