import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

export default function Movies() {
  const { data: movies = [], isLoading } = useQuery({
    queryKey: ['movies'],
    queryFn: () => base44.entities.Movie.list('-date_watched'),
  });

  return (
    <div className="max-w-3xl px-4 md:px-12 py-8 md:py-16">
      <div className="mb-12">
        <h2 className="text-2xl font-medium text-gray-900 mb-4">Movies</h2>
        <p className="text-gray-600 leading-relaxed">
          Movies I've watched and what I thought about them.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-50 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : movies.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500">No movies yet</p>
        </div>
      ) : (
        <div className="space-y-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="flex gap-4 md:gap-6 p-4 md:p-6 rounded-lg border border-transparent hover:border-gray-200 hover:bg-gray-50/50 transition-all"
            >
              {movie.image_url && (
                <img 
                  src={movie.image_url} 
                  alt={movie.title}
                  className="w-16 h-24 md:w-24 md:h-32 object-cover rounded flex-shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <h3 className="text-base md:text-lg font-medium text-gray-900 mb-1">
                  {movie.title}
                </h3>
                {movie.director && (
                  <p className="text-sm text-gray-500 mb-2">{movie.director}</p>
                )}
                {movie.notes && (
                  <p className="text-sm text-gray-600">
                    {movie.notes}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}