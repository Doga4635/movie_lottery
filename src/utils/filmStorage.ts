import type { Film } from '../interfaces/Film';

const STORAGE_KEY = 'films_watchlist';

export const FilmStorage = {
  // Tüm filmleri getir
  getFilms: (): Film[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Filmler yüklenirken hata oluştu:', error);
      return [];
    }
  },

  // Film ekle
  addFilm: (film: Film): void => {
    try {
      const films = FilmStorage.getFilms();
      films.push(film);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(films));
    } catch (error) {
      console.error('Film eklenirken hata oluştu:', error);
    }
  },

  // Film güncelle
  updateFilm: (id: string, updatedFilm: Partial<Film>): void => {
    try {
      const films = FilmStorage.getFilms();
      const index = films.findIndex(f => f.id === id);
      if (index !== -1) {
        films[index] = { ...films[index], ...updatedFilm };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(films));
      }
    } catch (error) {
      console.error('Film güncellenirken hata oluştu:', error);
    }
  },

  // Film sil
  deleteFilm: (id: string): void => {
    try {
      const films = FilmStorage.getFilms();
      const filteredFilms = films.filter(f => f.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredFilms));
    } catch (error) {
      console.error('Film silinirken hata oluştu:', error);
    }
  },

  // Rastgele film seç
  getRandomFilm: (): Film | null => {
    const films = FilmStorage.getFilms();
    if (films.length === 0) return null;
    return films[Math.floor(Math.random() * films.length)];
  },
};
