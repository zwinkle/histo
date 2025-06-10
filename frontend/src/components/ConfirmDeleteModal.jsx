// src/components/ConfirmDeleteModal.jsx
import React from 'react';

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, heroName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 font-mono">
      <div className="bg-retro-card text-retro-text p-8 rounded-lg shadow-xl w-full max-w-sm text-center border border-retro-text/10">
        <h2 className="text-xl font-bold mb-4">Konfirmasi Hapus</h2>
        <p className="mb-6">
          Apakah Anda yakin ingin menghapus data <span className="font-bold text-retro-accent">{heroName}</span>?
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onClose}
            className="bg-slate-500/50 hover:bg-slate-500 text-retro-text font-bold py-2 px-6 rounded-lg transition-colors"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-800/60 hover:bg-red-800 text-retro-text font-bold py-2 px-6 rounded-lg transition-colors"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
