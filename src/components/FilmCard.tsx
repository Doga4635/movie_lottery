import React, { useState } from 'react';
import type { Film } from '../interfaces/Film';

interface FilmCardProps {
  film: Film;
  onEdit: (film: Film) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: 'watch-list' | 'watched') => void;
}

export const FilmCard: React.FC<FilmCardProps> = ({ film, onStatusChange, onEdit, onDelete }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="perspective-1000 w-full cursor-pointer group"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`aspect-[2/3] w-full flip-container shadow-2xl transition-all duration-700 ${isFlipped ? 'flipped' : ''}`}>
        
        {/* ÖN YÜZ: Poster */}
        <div className="flip-face front rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
          <img
            src={film.posterUrl}
            alt={film.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Durum İkonu: Daha Şık Bir Cam Efekti */}
          <div className={`absolute bottom-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-sm backdrop-blur-md border shadow-lg transition-colors ${
            film.status === 'watched' ? 'bg-emerald-500/30 border-emerald-500/50 text-emerald-300' : 'bg-sky-500/30 border-sky-500/50 text-sky-300'
          }`}>
            {film.status === 'watched' ? '✓' : '👁'}
          </div>
        </div>

        {/* ARKA YÜZ: Bilgiler (Modern Beyaz Tasarım) */}
        <div className="flip-face back bg-slate-600 rounded-xl flex flex-col shadow-[inset_0_0_50px_rgba(0,0,0,0.02)] border border-slate-200 overflow-hidden">
          
          {/* Üst Kısım: Başlık */}
          <div className="bg-slate-50/80 px-2 py-2 md:py-3 border-b border-slate-100">
            <h3 className="text-[11px] md:text-sm font-black text-slate-900 uppercase leading-tight line-clamp-2 tracking-tight text-center">
              {film.title}
            </h3>
          </div>
          
          {/* ORTA KISIM: Bilgiler (Yazılar Büyütüldü ve Ortalandı) */}
          <div className="flex-1 flex flex-col justify-around py-1 md:py-2 px-3">
            <div className="flex flex-col items-center">
              <span className="text-[8px] md:text-[10px] text-slate-300 font-bold uppercase tracking-widest">TÜR</span>
              <span className="text-[11px] md:text-sm font-extrabold text-slate-900 text-center">{film.category}</span>
            </div>

            <div className="grid grid-cols-2 gap-1 border-y border-slate-50 py-1 md:py-4">
              <div className="flex flex-col items-center">
                <span className="text-[8px] md:text-[10px] text-slate-300 font-bold uppercase tracking-widest">YIL</span>
                <span className="text-[11px] md:text-sm font-bold text-slate-900">{film.releaseYear}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[8px] md:text-[10px] text-slate-300 font-bold uppercase tracking-widest">SÜRE</span>
                <span className="text-[11px] md:text-sm font-bold text-slate-900">{film.duration} dk</span>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-[8px] md:text-[10px] text-slate-300 font-bold uppercase tracking-widest mb-1">IMDB PUANI</span>
              <div className="flex items-center gap-1">
                <span className="text-sm md:text-lg font-black text-slate-900">{film.imdbScore?.toFixed(1)}</span>
                <span className="text-amber-400 text-lg">★</span>
              </div>
            </div>
          </div>
          
          {/* ALT KISIM: Aksiyon Butonları (Daha Minimal ve Modern) */}
          <div className="px-2 pb-2 md:px-4 md:pb-4 space-y-1 md:space-y-2" onClick={(e) => e.stopPropagation()}>
            
            <button
              onClick={() => onStatusChange(film.id, film.status === 'watch-list' ? 'watched' : 'watch-list')}
              className={`w-full py-1.5 md:py-2 rounded-lg text-[9px] md:text-[10px] font-black uppercase tracking-wider transition-all active:scale-95 ${
                film.status === 'watched' 
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200' 
                  : 'bg-violet-500 text-white shadow-md shadow-violet-200'
              }`}
            >
              {film.status === 'watched' ? 'İZLENDİ' : 'İZLENECEK'}
            </button>
            
            <div className="flex gap-1 md:gap-2">
              <button onClick={() => onEdit(film)} className="flex-1 bg-amber-50 hover:bg-amber-150 text-amber-500 py-1.5 md:py-2 rounded-lg text-[9px] md:text-[10px] font-bold uppercase transition-all">
                Düzenle
              </button>
              <button onClick={() => onDelete(film.id)} className="flex-1 bg-rose-50 hover:bg-rose-150 text-rose-500 py-1.5 md:py-2 rounded-lg text-[9px] md:text-[10px] font-bold uppercase transition-all">
                Sil
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};