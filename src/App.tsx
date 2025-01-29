import { useState } from 'react';
import { NameInput } from './components/NameInput';
import { NameCard } from './components/NameCard';
import { translateName } from './lib/api';

interface NameInfo {
  meaning: string;
  heritage: string;
  pronunciation: string;
  significance: string;
  variations: string[];
}

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [nameInfo, setNameInfo] = useState<NameInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleNameSubmit = async (name: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await translateName(name);
      setNameInfo(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to translate name. Please try again.');
      setNameInfo(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center justify-center w-24 h-24 bg-[#e5ded2] text-[#4a3b35] text-2xl font-bold rounded-full">
              Orukọ
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Connect with your heritage
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the meaning and cultural significance behind Nigerian names
          </p>
        </div>

        <div className="flex flex-col items-center space-y-8">
          <NameInput onSubmit={handleNameSubmit} isLoading={isLoading} />
          
          {error && (
            <div className="w-full max-w-md bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {nameInfo && <NameCard nameInfo={nameInfo} />}
        </div>
      </div>
    </div>
  );
}

export default App;