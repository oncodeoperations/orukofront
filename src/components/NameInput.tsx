import React, { useState, useEffect } from 'react';
import { validateName, commonNigerianNames } from '../lib/utils';
import { getHeritageSuggestions } from '../lib/api';

interface NameInputProps {
  onSubmit: (info: { inputName: string; heritage?: string }) => void;
  isLoading: boolean;
}

export function NameInput({ onSubmit, isLoading }: NameInputProps) {
  const [name, setName] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [heritageSuggestions, setHeritageSuggestions] = useState<string[]>([]);
  const [isHeritageLoading, setIsHeritageLoading] = useState(false);

  // Show autocomplete suggestions from a local common list.
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

  // Handle form submission. Fetch heritage suggestions if not already available.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateName(name)) {
      setError('Please enter a valid name (minimum 2 letters, alphabets only)');
      return;
    }
    setError('');
    if (heritageSuggestions.length === 0) {
      try {
        setIsHeritageLoading(true);
        const data = await getHeritageSuggestions(name);
        // Here we expect data to be a string array.
        setHeritageSuggestions(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to get heritage suggestions. Please try again.'
        );
      } finally {
        setIsHeritageLoading(false);
      }
    }
    // Do not call onSubmit here; wait for the user to select a heritage suggestion.
  };

  // When a heritage bubble is clicked, immediately trigger onSubmit.
  const handleHeritageClick = (heritage: string) => {
    onSubmit({ inputName: name, heritage });
    setHeritageSuggestions([]);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex justify-center">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Search for a name..."
            className="w-full px-4 py-3 pr-10 text-lg rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            disabled={isLoading}
          />
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

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

        {/* Loader for heritage fetching */}
        {isHeritageLoading && (
          <div className="mt-4 flex items-center justify-center text-lg text-gray-600">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-500 mr-2"></div>
            <span>..detecting name heritage</span>
          </div>
        )}

        {/* Display heritage suggestions as clickable bubble icons */}
        {heritageSuggestions.length > 0 && !isHeritageLoading && (
          <div className="mt-4">
            <p className="text-gray-600 text-sm mb-2">Select the heritage:</p>
            <div className="flex flex-wrap gap-2">
              {heritageSuggestions.map((heritage) => (
                <button
                  key={heritage}
                  onClick={() => handleHeritageClick(heritage)}
                  className="px-4 py-2 rounded-full border bg-gray-200 text-gray-700 hover:bg-green-500 hover:text-white transition-colors"
                >
                  {heritage}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Always render the "Translate Name" button */}
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