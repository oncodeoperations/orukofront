import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { validateName, commonNigerianNames } from '../lib/utils';

interface NameInputProps {
  onSubmit: (name: string) => void;
  isLoading: boolean;
}

export function NameInput({ onSubmit, isLoading }: NameInputProps) {
  const [name, setName] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (name.length >= 2) {
      const filtered = commonNigerianNames.filter(n => 
        n.toLowerCase().startsWith(name.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [name]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateName(name)) {
      setError('Please enter a valid name (minimum 2 letters, alphabets only)');
      return;
    }
    setError('');
    onSubmit(name);
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Search for a name..."
            className="w-full px-4 py-3 pr-10 text-lg rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            disabled={isLoading}
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>
        
        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}

        {suggestions.length > 0 && !isLoading && (
          <div className="absolute w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => {
                  setName(suggestion);
                  setSuggestions([]);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || !name}
          className="mt-4 w-full bg-[#5f554b] text-white py-3 rounded-full font-semibold hover:bg-[#d4cbbf] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            </div>
          ) : (
            'Translate Name'
          )}
        </button>
      </form>
    </div>
  );
}