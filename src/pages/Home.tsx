import React, { useState, useEffect } from 'react';
import type { Film } from '../interfaces/Film';
import { FilmStorage } from '../utils/filmStorage';
import { FilmForm } from '../components/FilmForm';
import { FilmList } from '../components/FilmList';
import { FilterButtons } from '../components/FilterButtons';

type FilterType = 'all' | 'watch-list' | 'watched';

export const Home: React.FC = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [showForm, setShowForm] = useState(false);
  const [editingFilm, setEditingFilm] = useState<Film | null>(null);
  const [selectedRandomFilmId, setSelectedRandomFilmId] = useState<string | null>(null);

  // Filmleri localStorage'dan yükle
  useEffect(() => {
    const loadedFilms = FilmStorage.getFilms();
    setFilms(loadedFilms);
  }, []);

  // Rastgele film seçme fonksiyonu
  const handleRandomSelect = () => {
    // Önemli: Seçim yaparken seçili ID'yi değil, aktif filtredeki TÜM filmleri baz alıyoruz
    let watchListPool: Film[] = films.filter(f => f.status === 'watch-list');
    
    if (watchListPool.length > 0) {
      
      const randomIndex = Math.floor(Math.random() * watchListPool.length);
      const randomFilm = watchListPool[randomIndex];
      setSelectedRandomFilmId(randomFilm.id);
      window.scrollTo({ top: 250, behavior: 'smooth' });
    }
  };

  // Filtrelenmiş filmleri getir
  const getFilteredFilms = (): Film[] => {
    // Eğer rastgele bir film seçilmişse, sadece onu göster
    if (selectedRandomFilmId) {
      return films.filter(f => f.id === selectedRandomFilmId);
    }
    
    switch (filter) {
      case 'watch-list':
        return films.filter(f => f.status === 'watch-list');
      case 'watched':
        return films.filter(f => f.status === 'watched');
      default:
        return films;
    }
  };

  // Film ekle veya güncelle
  const handleSubmitFilm = (film: Film) => {
    if (editingFilm) {
      // Güncelle
      FilmStorage.updateFilm(film.id, film);
    } else {
      // Ekle
      FilmStorage.addFilm(film);
    }

    const updatedFilms = FilmStorage.getFilms();
    setFilms(updatedFilms);
    setShowForm(false);
    setEditingFilm(null);
  };

  // Film düzenle
  const handleEditFilm = (film: Film) => {
    setEditingFilm(film);
    setShowForm(true);
    window.scrollTo({ top: 340, behavior: 'smooth' });
  };

  // Film sil
  const handleDeleteFilm = (id: string) => {
    FilmStorage.deleteFilm(id);
    const updatedFilms = FilmStorage.getFilms();
    setFilms(updatedFilms);
  };

  // Film durumunu değiştir
  const handleStatusChange = (id: string, status: 'watch-list' | 'watched') => {
    FilmStorage.updateFilm(id, { status });
    const updatedFilms = FilmStorage.getFilms();
    setFilms(updatedFilms);
  };

  // Form'u kapat
  const handleCancelForm = () => {
    setShowForm(false);
    setEditingFilm(null);
  };

  const filteredFilms = getFilteredFilms();
  const watchListCount = films.filter(f => f.status === 'watch-list').length;
  const watchedCount = films.filter(f => f.status === 'watched').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 pt-12 pb-8 px-4 border-b border-slate-800/50 backdrop-blur-md">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 flex flex-col items-center"> {/* flex-col ekledik */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-5xl md:text-6xl">🎬</span>
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-violet-600 to-amber-400 bg-clip-text text-transparent">
                Movie Lottery
              </h1>
            </div>
            <p className="text-lg text-slate-400 font-light max-w-2xl">
              İzlemek istediğin filmleri listele, seçimi şansa bırak!
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-violet-600/10 to-violet-700/5 border border-violet-600/20 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold text-violet-400">{films.length}</div>
              <div className="text-sm text-slate-400">Toplam Film</div>
            </div>
            <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold text-amber-400">{watchListCount}</div>
              <div className="text-sm text-slate-400">İzlenecek</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold text-emerald-400">{watchedCount}</div>
              <div className="text-sm text-slate-400">İzlendi</div>
            </div>
          </div>

          {/* Yeni Film Ekle Butonu */}
          {!showForm && (
            <div className="flex flex-wrap justify-center gap-4 text-center"> 
            {/* gap-4 (16px) veya gap-6 (24px) kullanabilirsin */}
            
            <button 
              className="group relative inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-blue-700 text-white font-semibold rounded-lg transition duration-300 shadow-lg hover:shadow-xl hover:shadow-violet-500/20 active:scale-95"
              onClick={() => {
                // 1. Önce sayfayı kaydır
                window.scrollTo({ top: 340, behavior: 'smooth' });
                setTimeout(() => {
                  setShowForm(true);
                }, 50); 
              }}
            >
              <span className="text-xl">+</span> Yeni Film Ekle
            </button>

            <button
              onClick={handleRandomSelect}
              className="group relative inline-flex items-center  gap-2 px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-orange-700 text-white font-semibold rounded-lg transition duration-300 shadow-lg hover:shadow-xl hover:shadow-amber-500/20 active:scale-95"
            >
              <span className="text-xl">🎲</span> 
              {selectedRandomFilmId ? "Başka Rastgele Film Seç" : "Rastgele Film Seç"}
            </button>
          </div>
        )}
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="relative z-20 py-8 px-4 border-b border-slate-800/50 backdrop-blur-sm">
          <div className="max-w-2xl mx-auto">
            <FilmForm
              key={editingFilm ? editingFilm.id : 'new-film'}
              onSubmit={handleSubmitFilm}
              initialFilm={editingFilm || undefined}
              onCancel={handleCancelForm}
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Filter Buttons */}
          <div className="mb-8">
            <FilterButtons
              activeFilter={selectedRandomFilmId ? ('none' as any) : filter}
              onFilterChange={(newFilter) => {
                setFilter(newFilter);
                setSelectedRandomFilmId(null);
              }}
              watchListCount={watchListCount}
              watchedCount={watchedCount}
              totalCount={films.length}
            />
          </div>

          {/* Film List or Empty State */}
          {filteredFilms.length > 0 ? (
            <FilmList
              films={filteredFilms}
              onEdit={handleEditFilm}
              onDelete={handleDeleteFilm}
              onStatusChange={handleStatusChange}
            />
          ) : (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🎞️</div>
              <h3 className="text-2xl font-bold text-slate-300 mb-2">Film bulunamadı</h3>
              <p className="text-slate-500">Filmleri görmek için yeni film ekleyin veya filtreyi değiştirin</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
