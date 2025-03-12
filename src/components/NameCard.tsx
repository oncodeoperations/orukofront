import { useState, useRef } from "react";
import { Volume2 } from "lucide-react";

interface NameInfo {
  inputName: string;
  meaning: string;
  heritage: string | { tribe: string; region: string };
  pronunciation: string;
  significance: string;
  variations: string[];
}

interface NameCardProps {
  nameInfo: NameInfo;
}

const colorOptions: { label: string; value: string }[] = [
  { label: "Brown", value: "#5F554B" },
  { label: "White", value: "#FFFFFF" },
  { label: "Gray", value: "#E4DED0" },
  { label: "Black", value: "#000000" },
];

export function NameCard({ nameInfo }: NameCardProps) {
  const [selectedColor, setSelectedColor] = useState<string>("#FFFFFF");
  const cardRef = useRef<HTMLDivElement>(null);
  const textColor =
    selectedColor === "#5F554B" || selectedColor === "#000000" ? "#E4DED0" : "#5F554B";

  // Helper functions to format strings (capitalize first letter only)
  const formatText = (text: string) => {
    if(!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  const formattedHeritage =
    typeof nameInfo.heritage === "string"
      ? formatText(nameInfo.heritage)
      : `${formatText(nameInfo.heritage.tribe)}, ${formatText(nameInfo.heritage.region)}`;

  const formattedMeaning = formatText(nameInfo.meaning);

  return (
    <>
      <div
        ref={cardRef}
        className="w-full max-w-md mx-auto rounded-xl shadow-lg border border-[#e8dfd8] py-12 sm:py-14 md:py-20 px-4 sm:px-6 md:px-8 bg-opacity-95 font-heritage"
        style={{ backgroundColor: selectedColor, color: textColor }}
      >
        <span className="block text-xs sm:text-sm tracking-widest mb-2 text-center">
          {formattedHeritage}
        </span>
        <div className="tracking-widest text-center">
          • • • • • • • • • • •
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif mt-4 text-center px-2 sm:px-6">
          {nameInfo.inputName}
        </h1>
        <div className="flex items-center justify-center gap-2 text-lg sm:text-xl mt-4">
          <p className="italic m-0">/ {nameInfo.pronunciation} /</p>
          <button className="hover:opacity-80">
            <Volume2 className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>
        <span className="block italic text-xs sm:text-sm tracking-widest mt-4 text-center">
          "{formattedMeaning}"
        </span>
        <div className="tracking-widest text-center mt-4">
          • • • • • • • • • • •
        </div>
        <div className="mt-4 text-xs sm:text-sm text-center">@oruko.mi</div>
      </div>
      <div className="mt-6 flex flex-col items-center gap-6">
        <div className="flex items-center justify-center gap-4">
          {colorOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedColor(option.value)}
              style={{
                backgroundColor: option.value,
                border:
                  selectedColor === option.value ? "3px solid #3e322e" : "1px solid #aaa",
              }}
              className="w-8 h-8 rounded-full focus:outline-none"
            />
          ))}
        </div>
        {/*
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <button
            // Share button removed
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-md shadow-lg hover:shadow-xl transition-all whitespace-nowrap"
            style={{ backgroundColor: "#EDE3F5", color: "#4A3B35", minWidth: "130px" }}
          >
            <Share2 className="h-5 w-5" />
            <span className="text-sm">Share</span>
          </button>
          <button
            // Buy artwork button removed
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-md shadow-lg hover:shadow-xl transition-all whitespace-nowrap"
            style={{ backgroundColor: "#EDE3F5", color: "#4A3B35", minWidth: "130px" }}
          >
            <Mountain className="h-5 w-5" />
            <span className="text-sm">Buy artwork</span>
          </button>
        </div>
        */}
      </div>
      <div className="mt-4 text-center px-2 sm:px-6">
        <p className="italic text-base sm:text-lg">{nameInfo.significance}</p>
        {Array.isArray(nameInfo.variations) && nameInfo.variations.length > 0 && (
          <div className="mt-4 text-sm sm:text-base">
            <span className="font-semibold">Variations:</span> {nameInfo.variations.join(", ")}
          </div>
        )}
      </div>
    </>
  );
}