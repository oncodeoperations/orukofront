import { useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { NameInput } from "./components/NameInput";
import { NameCard } from "./components/NameCard";
// Commented out since OrderModal is not needed
// import { OrderModal } from "./components/OrderModal";
import { translateNameWithHeritage } from "./lib/api";
import { FaGlobeAmericas } from "react-icons/fa";

interface NameInfo {
  inputName: string; // Searched name from NameInput
  meaning: string;
  heritage: string;
  pronunciation: string;
  significance: string;
  variations: string[];
}

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [nameInfo, setNameInfo] = useState<NameInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  // Commented out since modal functionality is not needed
  // const [modalOpen, setModalOpen] = useState(false);

  const handleNameSubmit = async ({
    inputName,
    heritage,
  }: {
    inputName: string;
    heritage?: string;
  }) => {
    if (!heritage) {
      setError("Please select a heritage.");
      return;
    }
    setError(null);
    setIsLoading(true);
    setIsGenerating(true);
    try {
      const result = await translateNameWithHeritage(inputName, heritage);
      // Merge the input name into the result for NameCard.
      setNameInfo({ inputName, ...result });
      // Commented out because modal is no longer used
      // setModalOpen(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to generate translation. Please try again."
      );
      setNameInfo(null);
    } finally {
      setIsLoading(false);
      setIsGenerating(false);
    }
  };

  if (isGenerating) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        {/* Logo */}
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center justify-center w-24 h-24 bg-[#e5ded2] text-[#4a3b35] text-2xl font-bold rounded-full">
            Orukọ
          </div>
        </div>
        {/* Loader */}
        <div className="flex items-center justify-center text-3xl">
          <span>....generating</span>
          <FaGlobeAmericas className="ml-2" />
        </div>
      </div>
    );
  }

  // Commented out unused placeholderImages
  // const placeholderImages = [
  //   "https://via.placeholder.com/300x200.png?text=Artwork+1",
  //   "https://via.placeholder.com/300x200.png?text=Artwork+2",
  //   "https://via.placeholder.com/300x200.png?text=Artwork+3",
  // ];

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
     {/*
     Commented out the modal rendering code to prevent OrderModal from popping up:
      {nameInfo && modalOpen && (
        <OrderModal onClose={() => setModalOpen(false)} images={placeholderImages} />
      )}
     */}
      {/* Add Vercel Analytics at the bottom */}
      <Analytics />
    </div>
  );
}

export default App;