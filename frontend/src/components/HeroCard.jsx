// src/components/HeroCard.jsx
import React, { useRef } from 'react';

// Ikon Edit (tidak ada perubahan)
const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    <path d="m15 5 4 4" />
  </svg>
);

const HeroCard = React.forwardRef(({ hero, onEdit }, ref) => {
  const cardRef = useRef(null);
  const MAX_ROTATION = 12;

  // Semua logika handle mouse (mousemove, mouseenter, mouseleave) tetap sama
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const normalizedX = ((e.clientX - left) / width) - 0.5;
    const normalizedY = ((e.clientY - top) / height) - 0.5;
    const rotateY = normalizedX * MAX_ROTATION * -1;
    const rotateX = normalizedY * MAX_ROTATION;
    cardRef.current.style.setProperty('--rotate-x', `${rotateX}deg`);
    cardRef.current.style.setProperty('--rotate-y', `${rotateY}deg`);
    cardRef.current.style.setProperty('--glare-x', `${e.clientX - left}px`);
    cardRef.current.style.setProperty('--glare-y', `${e.clientY - top}px`);
  };

  const handleMouseEnter = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty('--translate-z', '60px');
    cardRef.current.style.setProperty('--glare-opacity', '1');
    cardRef.current.style.setProperty('--shadow-opacity', '1');
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty('--rotate-x', '0deg');
    cardRef.current.style.setProperty('--rotate-y', '0deg');
    cardRef.current.style.setProperty('--translate-z', '0px');
    cardRef.current.style.setProperty('--glare-opacity', '0');
    cardRef.current.style.setProperty('--shadow-opacity', '0');
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    onEdit(hero);
  };

  return (
    <div ref={ref} className="w-80 md:w-96 flex-shrink-0 snap-start">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="card relative w-full h-[30rem] bg-retro-card/40 backdrop-blur-lg border border-retro-text/10 rounded-3xl shadow-lg group"
      >
        <div className="card-glare"></div>
        <div className="card-shadow"></div>
        
        <div className="relative w-full h-full p-6 flex flex-col" style={{ transformStyle: 'preserve-3d' }}>
          <div className="w-full h-48 rounded-xl overflow-hidden shadow-inner mb-4" style={{ transform: 'translateZ(40px)' }}>
            <img
              src={hero.image_url || 'https://via.placeholder.com/400x300'}
              alt={`Potret ${hero.name}`}
              className="w-full h-full object-cover bw-image"
              style={{
                objectPosition: `${hero.image_pos_x || 50}% ${hero.image_pos_y || 50}%`,
              }}
            />
          </div>
          <div className="flex flex-col flex-grow min-h-0" style={{ transform: 'translateZ(20px)' }}>
            <div className="flex items-center gap-x-3" style={{ transform: 'translateZ(20px)' }}>
              <h1 className="text-2xl font-bold text-retro-accent leading-tight">
                {hero.name}
              </h1>
              <button 
                onClick={handleEditClick}
                className="text-retro-text/50 hover:text-retro-accent transition-all duration-300 opacity-0 group-hover:opacity-100"
                aria-label={`Edit ${hero.name}`}
              >
                <EditIcon />
              </button>
            </div>
            <p className="text-retro-text/70 text-sm mb-3">
              ({hero.birth_year || '?'} - {hero.death_year || '?'})
            </p>
            <div 
              className="text-retro-text text-sm leading-relaxed overflow-y-auto flex-grow pr-2 
                         scrollbar-thin scrollbar-track-transparent 
                         scrollbar-thumb-transparent group-hover:scrollbar-thumb-retro-text/50 
                         transition-colors duration-300"
            >
              {hero.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default HeroCard;
