import { useState, useRef } from "react"; 
import { Volume2 } from "lucide-react";
import { FaDownload } from "react-icons/fa";
import { toBlob } from "html-to-image";

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

const colorOptions = [
  { label: "Brown", value: "#5F554B" },
  { label: "White", value: "#FFFFFF" },
  { label: "Gray", value: "#E4DED0" },
  { label: "Black", value: "#000000" },
];

export function NameCard({ nameInfo }: NameCardProps) {
  const [selectedColor, setSelectedColor] = useState<string>("#FFFFFF");
  const cardRef = useRef<HTMLDivElement>(null);

  const textColor = ["#5F554B", "#000000"].includes(selectedColor)
    ? "#E4DED0"
    : "#5F554B";

  const formatText = (text: string) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

  const formattedHeritage =
    typeof nameInfo.heritage === "string"
      ? formatText(nameInfo.heritage)
      : `${formatText(nameInfo.heritage.tribe)}, ${formatText(nameInfo.heritage.region)}`;

  const formattedMeaning = formatText(nameInfo.meaning);

  const handleDownload = () => {
    if (!cardRef.current) return;

    setTimeout(() => {
      toBlob(cardRef.current as HTMLElement, {
        pixelRatio: 3, // High pixel ratio for better quality
      })
        .then((blob) => {
          if (blob) {
            const link = document.createElement("a");
            link.download = `${nameInfo.inputName}-card.png`;
            link.href = URL.createObjectURL(blob);
            link.click();
          }
        })
        .catch((error) => console.error("Download error:", error));
    }, 500);
  };

  return (
    <>
      {/* Centered wrapper for correct dimensions */}
      <div className="flex justify-center items-center">
        <div ref={cardRef} className="p-5">
          <div
            className="w-[400px] h-[400px] mx-auto rounded-xl shadow-lg border border-[#e8dfd8] flex flex-col items-center justify-center py-8 px-6"
            style={{
              backgroundColor: selectedColor,
              color: textColor,
            }}
          >
            <span className="block text-sm tracking-widest mb-2 text-center">
              {formattedHeritage}
            </span>
            <div className="tracking-widest text-center">• • • • • • • • • • •</div>
            <h1
              className="text-4xl font-bold mt-2 text-center"
              style={{ fontFamily: "Yeseva One" }}
            >
              {nameInfo.inputName}
            </h1>
            <div className="flex items-center justify-center gap-2 text-lg mt-3">
              <p className="italic m-0">/ {nameInfo.pronunciation} /</p>
              <button className="hover:opacity-80">
                <Volume2 className="h-5 w-5" />
              </button>
            </div>
            <span
              className="block italic text-sm tracking-widest mt-3 text-center"
              style={{ fontFamily: "Bodoni FLF" }}
            >
              "{formattedMeaning}"
            </span>
            <div className="tracking-widest text-center mt-3">• • • • • • • • • • •</div>
            <div className="mt-3 text-sm text-center">@oruko.mi</div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-4 text-center px-2 sm:px-6">
        <p className="italic text-lg">{nameInfo.significance}</p>
        {nameInfo.variations.length > 0 && (
          <div className="mt-4 text-base">
            <span className="font-semibold">Variations:</span> {nameInfo.variations.join(", ")}
          </div>
        )}
      </div>

      {/* Color Picker */}
      <div className="mt-6 flex flex-col items-center gap-6">
        <div className="flex items-center justify-center gap-4">
          {colorOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedColor(option.value)}
              style={{
                backgroundColor: option.value,
                border: selectedColor === option.value ? "3px solid #3e322e" : "1px solid #aaa",
              }}
              className="w-8 h-8 rounded-full focus:outline-none"
            />
          ))}
        </div>
      </div>

      {/* Download Button */}
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