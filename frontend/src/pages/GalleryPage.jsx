// src/pages/GalleryPage.jsx
import { useState, useEffect, useRef, useCallback } from 'react';
import { fetchHeroes, deleteHero } from '../services/api';
import HeroCard from '../components/HeroCard';
import AlphabetMenu from '../components/AlphabetMenu';
import AddHeroModal from '../components/AddHeroModal';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import mapSvg from '../assets/map.svg';

const GalleryPage = () => {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [heroToEdit, setHeroToEdit] = useState(null);
  const [heroToDelete, setHeroToDelete] = useState(null);
  const galleryRef = useRef(null);
  const heroRefs = useRef(new Map());

  const fetchAndSetHeroes = useCallback(async () => {
    setLoading(true);
    const heroesData = await fetchHeroes();
    heroesData.sort((a, b) => a.name.localeCompare(b.name));
    setHeroes(heroesData);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAndSetHeroes();
  }, [fetchAndSetHeroes]);

  const handleLetterClick = (letter) => {
    const targetHero = heroes.find(hero => hero.name.trim().toUpperCase().startsWith(letter));
    if (targetHero) {
      const node = heroRefs.current.get(targetHero.id);
      if (node) {
        node.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  };

  const handleOpenAddModal = () => {
    setHeroToEdit(null);
    setIsAddEditModalOpen(true);
  };

  const handleOpenEditModal = (hero) => {
    setHeroToEdit(hero);
    setIsAddEditModalOpen(true);
  };

  const handleDeleteFromEditModal = () => {
    setHeroToDelete(heroToEdit);
    setIsAddEditModalOpen(false);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (heroToDelete) {
      await deleteHero(heroToDelete.id);
      setIsDeleteModalOpen(false);
      setHeroToDelete(null);
      fetchAndSetHeroes();
    }
  };

  const handleCRUDSuccess = () => {
    fetchAndSetHeroes();
  };

  const getMap = () => {
    if (!heroRefs.current) {
      heroRefs.current = new Map();
    }
    return heroRefs.current;
  };

  return (
    <div className="font-mono bg-retro-bg h-screen text-retro-text relative overflow-hidden">
      
      <div className="map-background-container">
        <div className="map-scroller">
          <img src={mapSvg} alt="Peta Indonesia" className="map-img" />
          <img src={mapSvg} alt="Peta Indonesia" className="map-img" />
        </div>
      </div>

      <div className="absolute inset-0 z-10 flex flex-col">
        <header className="text-center p-6 md:p-8 flex-shrink-0">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center items-center relative">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Galeri Pahlawan Nasional</h1>
              <button
                onClick={handleOpenAddModal}
                className="absolute right-0 bg-retro-accent/80 hover:bg-retro-accent text-retro-bg font-bold py-2 px-4 rounded-lg shadow-md transition-all hover:scale-105"
              >
                + Tambah
              </button>
            </div>
          </div>
        </header>

        <AlphabetMenu onLetterClick={handleLetterClick} />
        
        <div 
          ref={galleryRef}
          className="perspective-container flex-grow flex items-center overflow-x-auto space-x-8 px-[5vw] md:px-[10vw] py-8 snap-x snap-mandatory scrollbar-none"
        >
          {loading && <div className="w-full text-center flex-shrink-0"><p className="text-xl text-slate-300 animate-pulse">Memuat data pahlawan...</p></div>}
          {!loading && heroes.length === 0 && <div className="w-full text-center flex-shrink-0"><p className="text-xl text-slate-300">Gagal memuat data atau tidak ada pahlawan di database.</p></div>}
          {!loading && heroes.length > 0 && (
            heroes.map(hero => (
              <HeroCard
                key={hero.id}
                hero={hero}
                onEdit={handleOpenEditModal}
                ref={(node) => {
                  const map = getMap();
                  if (node) map.set(hero.id, node);
                  else map.delete(hero.id);
                }}
              />
            ))
          )}
        </div>
      </div>
      
      <AddHeroModal
        isOpen={isAddEditModalOpen}
        onClose={() => setIsAddEditModalOpen(false)}
        onSuccess={handleCRUDSuccess}
        heroToEdit={heroToEdit}
        onDelete={handleDeleteFromEditModal}
      />
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        heroName={heroToDelete?.name}
      />
    </div>
  );
};

export default GalleryPage;
