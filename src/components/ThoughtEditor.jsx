import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { ArrowLeft, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const EMOJIS = ['📝', '💡', '🎯', '🚀', '💭', '✨', '🔥', '💫', '🌟', '📌', '🎨', '💻', '📚', '🎵', '❤️', '🌈'];

export default function ThoughtEditor({ thought, onSave, onBack, isSaving }) {
  const [title, setTitle] = useState(thought?.title || '');
  const [content, setContent] = useState(thought?.content || '');
  const [emoji, setEmoji] = useState(thought?.emoji || '📝');
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (thought) {
      setTitle(thought.title || '');
      setContent(thought.content || '');
      setEmoji(thought.emoji || '📝');
      setHasChanges(false);
    }
  }, [thought?.id]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setHasChanges(true);
  };

  const handleContentChange = (value) => {
    setContent(value);
    setHasChanges(true);
  };

  const handleSave = () => {
    onSave({ title: title || 'Untitled', content, emoji });
    setHasChanges(false);
  };

  return (
    <div className="min-h-screen bg-white md:ml-48">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-100 z-10">
        <div className="max-w-3xl mx-auto px-4 md:px-12 py-3 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </button>
          
          <Button 
            onClick={handleSave}
            disabled={!hasChanges || isSaving}
            size="sm"
            className="bg-gray-900 hover:bg-gray-800"
          >
            {isSaving ? (
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                Save
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="max-w-3xl mx-auto px-4 md:px-12 py-8 md:py-12">
        <div className="flex items-center gap-3 mb-6">
          <Popover>
            <PopoverTrigger asChild>
              <button className="text-4xl hover:bg-gray-100 p-2 rounded-lg transition-colors">
                {emoji}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-3">
              <div className="grid grid-cols-8 gap-1">
                {EMOJIS.map((e) => (
                  <button
                    key={e}
                    onClick={() => {
                      setEmoji(e);
                      setHasChanges(true);
                    }}
                    className="text-2xl p-2 hover:bg-gray-100 rounded transition-colors"
                  >
                    {e}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Untitled"
          className="w-full text-4xl font-bold text-gray-900 placeholder-gray-300 outline-none mb-8 bg-transparent"
        />

        <div className="prose prose-gray max-w-none">
          <ReactQuill
            value={content}
            onChange={handleContentChange}
            placeholder="Start writing your thoughts..."
            theme="bubble"
            modules={{
              toolbar: [
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['link'],
                ['clean']
              ]
            }}
            className="min-h-[400px] text-lg"
          />
        </div>
      </div>
    </div>
  );
}