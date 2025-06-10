// src/components/AlphabetMenu.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';

const AlphabetMenu = ({ onLetterClick }) => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  
  // State untuk melacak indeks huruf yang sedang di-hover
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    // Kita tambahkan onMouseLeave di sini untuk mereset state saat mouse keluar dari area menu
    <nav 
      className="w-full flex justify-center items-center py-4"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <div className="flex flex-wrap justify-center gap-x-1"> {/* Jarak antar huruf dirapatkan */}
        {letters.map((letter, index) => {
          // Hitung jarak dari huruf ini ke huruf yang sedang di-hover
          const distance = hoveredIndex !== null ? Math.abs(index - hoveredIndex) : Infinity;

          // Tentukan skala berdasarkan jarak
          let scale = 1;
          if (distance === 0) {
            scale = 1.75; // Huruf yang di-hover
          } else if (distance === 1) {
            scale = 1.5;  // Tetangga langsung
          } else if (distance === 2) {
            scale = 1.25; // Tetangga kedua
          }

          return (
            <motion.button
              key={letter}
              className="font-bold text-retro-text/50 text-xs rounded-md w-6 h-6 flex items-center justify-center" // Ukuran default diperkecil
              // Animasikan properti 'scale'
              animate={{ scale }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              // Set state saat mouse masuk ke huruf ini
              onMouseEnter={() => setHoveredIndex(index)}
              onClick={() => onLetterClick(letter)}
            >
              {letter}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
};

export default AlphabetMenu;
