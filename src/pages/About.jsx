import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function About() {
  const { data: reflections = [], isLoading } = useQuery({
    queryKey: ['reflections'],
    queryFn: () => base44.entities.Reflection.list('-date'),
  });

  return (
    <div className="max-w-3xl px-4 md:px-12 py-8 md:py-16">
      <div className="flex flex-col gap-8">
        {/* Picture */}
        <div className="w-80">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
            alt="Profile"
            className="w-full aspect-square object-cover rounded-lg"
          />
        </div>

        {/* Reflections */}
        <div>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-8 bg-gray-50 rounded animate-pulse" />
              ))}
            </div>
          ) : reflections.length === 0 ? (
            <p className="text-gray-500">No reflections yet</p>
          ) : (
            <div className="space-y-6">
              {reflections.map((reflection) => (
                <div key={reflection.id} className="text-gray-700">
                  <span className="text-gray-700 italic">
                    {format(new Date(reflection.date), 'PPP', { locale: fr })}
                  </span>
                  <span className="text-gray-700">: </span>
                  <span dangerouslySetInnerHTML={{ __html: reflection.content }} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}