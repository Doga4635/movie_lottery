export interface Film {
  id: string;
  title?: string;
  category?: string;
  duration?: number; // dakika cinsinden
  releaseYear?: number;
  posterUrl?: string;
  imdbScore?: number;
  status: 'watch-list' | 'watched'; // İzlenecekler veya İzlendi
  createdAt: string;
}

export interface FilterType {
  type: 'all' | 'watch-list' | 'watched';
}
