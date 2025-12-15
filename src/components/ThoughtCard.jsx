import React from 'react';
import { format } from 'date-fns';
import { MoreHorizontal, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ThoughtCard({ thought, onClick, onDelete }) {
  const plainText = thought.content 
    ? thought.content.replace(/<[^>]*>/g, '').slice(0, 120) 
    : '';

  return (
    <div 
      onClick={onClick}
      className="group p-4 rounded-lg border border-transparent hover:border-gray-200 hover:bg-gray-50/50 cursor-pointer transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <span className="text-xl mt-0.5">{thought.emoji || '📝'}</span>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 truncate">
              {thought.title || 'Untitled'}
            </h3>
            {plainText && (
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {plainText}...
              </p>
            )}
            <p className="text-xs text-gray-400 mt-2">
              {format(new Date(thought.created_date), 'MMM d, yyyy')}
            </p>
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger 
            onClick={(e) => e.stopPropagation()}
            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-all"
          >
            <MoreHorizontal className="w-4 h-4 text-gray-400" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem 
              onClick={(e) => {
                e.stopPropagation();
                onDelete(thought.id);
              }}
              className="text-red-600"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}