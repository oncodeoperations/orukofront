import { useState, useRef } from "react";
import { Volume2 } from "lucide-react";
import { FaDownload } from "react-icons/fa";
import { toPng } from "html-to-image";

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
  // cardRef points to the element we want to capture
  const cardRef = useRef<HTMLDivElement>(null);
  const textColor =
    selectedColor === "#5F554B" || selectedColor === "#000000"
      ? "#E4DED0"
      : "#5F554B";

  const formatText = (text: string) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  const formattedHeritage =
    typeof nameInfo.heritage === "string"
      ? formatText(nameInfo.heritage)
      : `${formatText(nameInfo.heritage.tribe)}, ${formatText(nameInfo.heritage.region)}`;

  const formattedMeaning = formatText(nameInfo.meaning);

  const handleDownload = () => {
    if (!cardRef.current) return;
    toPng(cardRef.current, { quality: 1, pixelRatio: 2 })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${nameInfo.inputName}-card.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error("oops, something went wrong!", error);
      });
  };

  return (
    <>
      {/* Card container to be captured (download will include only this part) */}
      <div
        ref={cardRef}
        className="w-full max-w-md mx-auto rounded-xl shadow-lg border border-[#e8dfd8] py-12 sm:py-14 md:py-20 px-4 sm:px-6 md:px-8 font-heritage"
        style={{
          backgroundColor: selectedColor,
          color: textColor,
          // Explicit dimensions ensure the capture uses the proper size.
          minWidth: "448px",
          minHeight: "400px"
        }}
      >
        <span className="block text-xs sm:text-sm tracking-widest mb-2 text-center">
          {formattedHeritage}
        </span>
        <div className="tracking-widest text-center">
          • • • • • • • • • • •
        </div>
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 text-center px-2 sm:px-6"
          style={{ fontFamily: "Yeseva One" }}
        >
          {nameInfo.inputName}
        </h1>
        <div className="flex items-center justify-center gap-2 text-lg sm:text-xl mt-4">
          <p className="italic m-0">/ {nameInfo.pronunciation} /</p>
          <button className="hover:opacity-80">
            <Volume2 className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>
        <span
          className="block italic text-xs sm:text-sm tracking-widest mt-4 text-center"
          style={{ fontFamily: "Bodoni FLF" }}
        >
          "{formattedMeaning}"
        </span>
        <div className="tracking-widest text-center mt-4">
          • • • • • • • • • • •
        </div>
        <div className="mt-4 text-xs sm:text-sm text-center">@oruko.mi</div>
      </div>

      {/* Additional card info (not captured in download) */}
      <div className="mt-4 text-center px-2 sm:px-6">
        <p className="italic text-base sm:text-lg">{nameInfo.significance}</p>
        {Array.isArray(nameInfo.variations) && nameInfo.variations.length > 0 && (
          <div className="mt-4 text-sm sm:text-base">
            <span className="font-semibold">Variations:</span> {nameInfo.variations.join(", ")}
          </div>
        )}
      </div>

      {/* Controls (not captured in download) */}
      <div className="mt-6 flex flex-col items-center gap-6">
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
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleDownload}
          className="flex items-center space-x-2 px-6 py-3 bg-[#EAE2F8] text-[#6B46C1] font-medium rounded-2xl shadow-md hover:bg-[#DED2F4]"
        >
          <FaDownload />
          <span>Download</span>
        </button>
      </div>
    </>
  );
}