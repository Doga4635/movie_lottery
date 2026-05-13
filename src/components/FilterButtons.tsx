import React from 'react';

interface FilterButtonsProps {
  activeFilter: 'all' | 'watch-list' | 'watched';
  onFilterChange: (filter: 'all' | 'watch-list' | 'watched') => void;
  watchListCount: number;
  watchedCount: number;
  totalCount: number;
}

export const FilterButtons: React.FC<FilterButtonsProps> = ({
  activeFilter,
  onFilterChange,
}) => {
  const buttons = [
    { id: 'all' as const, label: 'Tüm Filmler', icon: '🎬' },
    { id: 'watch-list' as const, label: 'İzlenecekler', icon: '📋' },
    { id: 'watched' as const, label: 'İzlendi', icon: '✅' },
  ];

  return (
    <div className="flex flex-wrap gap-5 justify-center">
      {buttons.map(btn => {
        const isActive = activeFilter === btn.id;

        return (
          <button
            key={btn.id}
            onClick={() => onFilterChange(btn.id)}
            // Inline style kullanarak CSS dosyasını tamamen devre dışı bırakıyoruz
            style={{
              backgroundColor: isActive ? '#7410EC' : '#1e293b', // Aktifse Indigo, değilse Koyu Gri
              color: isActive ? 'white' : '#94a3b8',
              borderColor: isActive ? '#818cf8' : '#334155',
              borderRadius: '6px',
              margin:'2px 4px',
              width: '200px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              boxShadow: isActive ? '0 2px 7px rgba(137, 127, 246, 0.5)' : '0 2px 7px rgba(30, 41, 59, 0.3)',
              transition: 'all 0.3s ease',
              fontWeight: '600',
              fontSize: '16px',
              cursor: 'pointer',
            }}
            className="group relative px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span className="text-lg">{btn.icon} </span>
              <span>{btn.label}</span>
            </span>
            
            {isActive && (
              <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
            )}
          </button>
        );
      })}
    </div>
  );
};