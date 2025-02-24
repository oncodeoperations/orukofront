import { useState } from "react";
import { Volume2, Share2, Mountain } from "lucide-react";

interface NameInfo {
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
  { label: "White", value: "#FFFFFF" },
  { label: "Brown", value: "#5F554B" },
  { label: "Gray", value: "#E4DED0" }, // Updated Gray color
  { label: "Black", value: "#000000" },
];

export function NameCard({ nameInfo }: NameCardProps) {
  const [selectedColor, setSelectedColor] = useState<string>("#FFFFFF");

  // When background is brown (#5F554B) or black (#000000),
  // text becomes gray (#E4DED0); otherwise text becomes "#5F554B".
  const textColor =
    selectedColor === "#5F554B" || selectedColor === "#000000"
      ? "#E4DED0"
      : "#5F554B";

  return (
    <>
      {/* Responsive Name Card */}
      <div
        className="w-full max-w-md mx-auto rounded-xl shadow-lg border border-[#e8dfd8] p-4 sm:p-6 md:p-8 bg-opacity-95"
        style={{ backgroundColor: selectedColor, color: textColor }}
      >
        {/* Heritage / Language Label */}
        <span className="block uppercase text-xs sm:text-sm tracking-widest mb-2 text-center">
          {typeof nameInfo.heritage === "string"
            ? nameInfo.heritage
            : `${nameInfo.heritage.tribe}, ${nameInfo.heritage.region}`}
        </span>

        {/* Dotted Line */}
        <div className="tracking-widest text-center">
          • • • • • • • • • • •
        </div>

        {/* Meaning (Main Bold Text) */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif mt-2 text-center px-2 sm:px-6">
          {nameInfo.meaning}
        </h1>

        {/* Pronunciation with Icon */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-lg sm:text-xl mt-2">
          <p className="italic text-center">{`/ ${nameInfo.pronunciation} /`}</p>
          <button className="hover:opacity-80">
            <Volume2 className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        {/* Significance (Cultural Explanation) */}
        <p className="italic text-base sm:text-lg mt-4 text-center px-2 sm:px-6">
          {nameInfo.significance}
        </p>

        {/* Dotted Line */}
        <div className="tracking-widest mt-6 text-center">
          • • • • • • • • • • •
        </div>

        {/* Variations Section (if available) */}
        {Array.isArray(nameInfo.variations) && nameInfo.variations.length > 0 && (
          <div className="mt-4 text-sm sm:text-base text-center px-2 sm:px-6">
            <span className="font-semibold">Variations:</span>{" "}
            {nameInfo.variations.join(", ")}
          </div>
        )}

        {/* Footer / Instagram Handle */}
        <div className="mt-4 text-xs sm:text-sm text-center">
          @oruko.mi
        </div>
      </div>

      {/* Below the card: Color Picker & Action Buttons */}
      <div className="mt-6 flex flex-col items-center gap-6">
        {/* Color Picker */}
        <div className="flex items-center justify-center gap-4">
          {colorOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedColor(option.value)}
              style={{
                backgroundColor: option.value,
                border:
                  selectedColor === option.value
                    ? "3px solid #3e322e"
                    : "1px solid #aaa",
              }}
              className="w-8 h-8 rounded-full focus:outline-none"
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <button
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-md shadow-lg hover:shadow-xl transition-all whitespace-nowrap"
            style={{
              backgroundColor: "#EDE3F5",
              color: "#4A3B35",
              minWidth: "130px",
            }}
          >
            <Share2 className="h-5 w-5" />
            <span className="text-sm">Share</span>
          </button>
          <button
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-md shadow-lg hover:shadow-xl transition-all whitespace-nowrap"
            style={{
              backgroundColor: "#EDE3F5",
              color: "#4A3B35",
              minWidth: "130px",
            }}
          >
            <Mountain className="h-5 w-5" />
            <span className="text-sm">Buy artwork</span>
          </button>
        </div>
      </div>
    </>
  );
}