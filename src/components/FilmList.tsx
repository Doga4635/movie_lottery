import React from 'react';
import type { Film } from '../interfaces/Film';
import { FilmCard } from './FilmCard';

interface FilmListProps {
  films: Film[];
  onEdit: (film: Film) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: 'watch-list' | 'watched') => void;
}

export const FilmList: React.FC<FilmListProps> = ({ films, onEdit, onDelete, onStatusChange }) => {
  return (
    <div className="w-full">
      {films.length > 0 ? (
        <div className="grid grid-cols-4 gap-4">
          {films.map(film => (
            <FilmCard
              key={film.id}
              film={film}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};