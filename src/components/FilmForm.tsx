import React, { useState } from 'react';
import type { Film } from '../interfaces/Film';

interface FilmFormProps {
  onSubmit: (film: Film) => void;
  initialFilm?: Film;
  onCancel?: () => void;
}

const categories = [
  'Aksiyon',
  'Dram',
  'Komedi',
  'Korku',
  'Romantik',
  'Bilim Kurgu',
  'Fantezi',
  'Animasyon',
  'Suç',
  'Diğer',
];

export const FilmForm: React.FC<FilmFormProps> = ({ onSubmit, initialFilm, onCancel }) => {
  const [formData, setFormData] = useState<Omit<Film, 'id' | 'createdAt'>>({
    title: initialFilm?.title || '',
    category: initialFilm?.category || 'Aksiyon',
    duration: initialFilm?.duration,
    releaseYear: initialFilm?.releaseYear,
    posterUrl: initialFilm?.posterUrl || '',
    imdbScore: initialFilm?.imdbScore,
    status: initialFilm?.status || 'watch-list',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'duration' || name === 'releaseYear' || name === 'imdbScore'
        ? parseFloat(value)
        : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newFilm: Film = {
      id: initialFilm?.id || Date.now().toString(),
      ...formData,
      createdAt: initialFilm?.createdAt || new Date().toISOString(),
    };

    onSubmit(newFilm);
    
    if (!initialFilm) {
      setFormData({
        title: '',
        category: 'Aksiyon',
        duration: 120,
        releaseYear: new Date().getFullYear(),
        posterUrl: '',
        imdbScore: 7.0,
        status: 'watch-list',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-md border border-slate-700/50 p-8 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold mb-8 text-slate-100">
          {initialFilm ? '✎ Filmi Düzenle' : '+ Yeni Film Ekle'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Film Adı */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-300 mb-3">Film Adı *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-slate-100 placeholder-slate-500 transition-all duration-200"
              placeholder="Film adını girin"
            />
          </div>

          {/* Kategori */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-3">Kategori *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-slate-100 transition-all duration-200"
            >
              {categories.map(cat => (
                <option key={cat} value={cat} className="bg-slate-800">{cat}</option>
              ))}
            </select>
          </div>

          {/* Süre (dakika) */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-3">Süre (dakika) *</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
              min="1"
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-slate-100 placeholder-slate-500 transition-all duration-200"
              placeholder="Filmin süresini giriniz"
            />
          </div>

          {/* Çıkış Yılı */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-3">Çıkış Yılı *</label>
            <input
              type="number"
              name="releaseYear"
              value={formData.releaseYear}
              onChange={handleChange}
              required
              min="1900"
              max={new Date().getFullYear() + 1}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-slate-100 placeholder-slate-500 transition-all duration-200"
              placeholder={new Date().getFullYear().toString()}
            />
          </div>

          {/* IMDB Puanı */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-3">IMDB Puanı (0-10) *</label>
            <input
              type="number"
              name="imdbScore"
              value={formData.imdbScore}
              onChange={handleChange}
              required
              min="0"
              max="10"
              step="0.1"
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-slate-100 placeholder-slate-500 transition-all duration-200"
              placeholder="7.5"
            />
          </div>

          {/* Durum */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-3">Durum *</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-slate-100 transition-all duration-200"
            >
              <option value="watch-list" className="bg-slate-800">İzlenecekler</option>
              <option value="watched" className="bg-slate-800">İzlendi</option>
            </select>
          </div>

          {/* Poster URL */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-300 mb-3">Poster Görsel URL *</label>
            <input
              type="text"
              name="posterUrl"
              value={formData.posterUrl}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-slate-100 placeholder-slate-500 transition-all duration-200"
              placeholder="https://example.com/poster.jpg"
            />
          </div>
        </div>

        {/* Butonlar */}
        <div className="flex gap-4 mt-8">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-violet-500/30 active:scale-95 transform text-lg"
          >
            {initialFilm ? '✓ Güncelle' : '+ Ekle'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 hover:border-slate-500/50 text-slate-300 hover:text-slate-100 font-bold py-3 px-6 rounded-lg transition-all duration-200"
            >
              ✕ İptal
            </button>
          )}
        </div>
      </div>
    </form>
  );
};
