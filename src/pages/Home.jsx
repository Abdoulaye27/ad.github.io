import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft } from 'lucide-react';

export default function Home() {
  const [selectedThought, setSelectedThought] = useState(null);

  const { data: thoughts = [], isLoading } = useQuery({
    queryKey: ['thoughts'],
    queryFn: () => base44.entities.Thought.list('-created_date'),
  });

  if (selectedThought) {
    return (
      <div className="max-w-3xl px-4 md:px-12 py-8 md:py-16">
        <button 
          onClick={() => setSelectedThought(null)}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back</span>
        </button>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          {selectedThought.title}
        </h1>
        
        <div className="prose prose-gray max-w-none text-lg">
          <div dangerouslySetInnerHTML={{ __html: selectedThought.content }} />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl px-4 md:px-12 py-8 md:py-16">
      <div className="mb-12">
        <h2 className="text-2xl font-medium text-gray-900 mb-4">Writing</h2>
        <p className="text-gray-600 leading-relaxed">
          This is where I share my thoughts and essays on various topics that interest me.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-50 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : thoughts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500">No thoughts yet</p>
        </div>
      ) : (
        <div className="space-y-1">
          {thoughts.map((thought) => (
            <div
              key={thought.id}
              onClick={() => setSelectedThought(thought)}
              className="group p-4 rounded-lg border border-transparent hover:border-gray-200 hover:bg-gray-50/50 cursor-pointer transition-all duration-200"
            >
              <h3 className="font-medium text-gray-900">
                {thought.title || 'Untitled'}
              </h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}