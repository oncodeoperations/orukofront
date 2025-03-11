import { useState, useRef } from "react";
import { Volume2, Share2, Mountain, Download } from "lucide-react";
import html2canvas from "html2canvas";

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
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const textColor =
    selectedColor === "#5F554B" || selectedColor === "#000000" ? "#E4DED0" : "#5F554B";

  const captureWithWatermark = async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current, {
      scale: window.devicePixelRatio || 2,
      useCORS: true,
    });
    const watermarkCanvas = document.createElement("canvas");
    watermarkCanvas.width = canvas.width;
    watermarkCanvas.height = canvas.height;
    const ctx = watermarkCanvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(canvas, 0, 0);
      const watermarkText = "oruko.mi";
      const fontSize = canvas.width / 15;
      ctx.font = `${fontSize}px Arial`;
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(-Math.PI / 24);
      ctx.fillText(watermarkText, 0, 0);
      ctx.restore();
    }
    return watermarkCanvas.toDataURL("image/png");
  };

  const handleShareClick = async () => {
    try {
      const imageWithWatermark = await captureWithWatermark();
      if (imageWithWatermark) {
        setPreviewImage(imageWithWatermark);
      }
    } catch (error) {
      console.error("Error preparing shareable image:", error);
    }
  };

  const confirmShare = async () => {
    if (!previewImage) return;
    try {
      if (navigator.share) {
        const response = await fetch(previewImage);
        const blob = await response.blob();
        const file = new File([blob], "namecard.png", { type: blob.type });
        await navigator.share({
          title: "My Name Card",
          text: "Check out my name card!",
          files: [file],
        });
      } else {
        const link = document.createElement("a");
        link.href = previewImage;
        link.download = "namecard.png";
        link.click();
      }
      setPreviewImage(null);
    } catch (error) {
      console.error("Error sharing name card:", error);
    }
  };

  const downloadImage = () => {
    if (!previewImage) return;
    const link = document.createElement("a");
    link.href = previewImage;
    link.download = "namecard.png";
    link.click();
    setPreviewImage(null);
  };

  return (
    <>
      <div
        ref={cardRef}
        className="w-full max-w-md mx-auto rounded-xl shadow-lg border border-[#e8dfd8] py-12 sm:py-14 md:py-20 px-4 sm:px-6 md:px-8 bg-opacity-95 font-heritage"
        style={{ backgroundColor: selectedColor, color: textColor }}
      >
        <span className="block uppercase text-xs sm:text-sm tracking-widest mb-2 text-center">
          {typeof nameInfo.heritage === "string"
            ? nameInfo.heritage
            : `${nameInfo.heritage.tribe}, ${nameInfo.heritage.region}`}
        </span>
        <div className="tracking-widest text-center">
          • • • • • • • • • • •
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif mt-4 text-center px-2 sm:px-6">
          {nameInfo.inputName}
        </h1>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-lg sm:text-xl mt-4">
          <p className="italic text-center">{nameInfo.pronunciation}</p>
          <button className="hover:opacity-80">
            <Volume2 className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>
        <span className="block italic uppercase text-xs sm:text-sm tracking-widest mt-4 text-center">
          "{nameInfo.meaning}"
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
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <button
            onClick={handleShareClick}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-md shadow-lg hover:shadow-xl transition-all whitespace-nowrap"
            style={{ backgroundColor: "#EDE3F5", color: "#4A3B35", minWidth: "130px" }}
          >
            <Share2 className="h-5 w-5" />
            <span className="text-sm">Share</span>
          </button>
          <button
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-md shadow-lg hover:shadow-xl transition-all whitespace-nowrap"
            style={{ backgroundColor: "#EDE3F5", color: "#4A3B35", minWidth: "130px" }}
          >
            <Mountain className="h-5 w-5" />
            <span className="text-sm">Buy artwork</span>
          </button>
        </div>
      </div>
      <div className="mt-4 text-center px-2 sm:px-6">
        <p className="italic text-base sm:text-lg">{nameInfo.significance}</p>
        {Array.isArray(nameInfo.variations) && nameInfo.variations.length > 0 && (
          <div className="mt-4 text-sm sm:text-base">
            <span className="font-semibold">Variations:</span> {nameInfo.variations.join(", ")}
          </div>
        )}
      </div>
      {previewImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="relative bg-white rounded-lg p-4 w-full max-w-sm">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-2 right-2 text-gray-700 text-2xl font-bold focus:outline-none"
            >
              x
            </button>
            <h2 className="text-lg font-bold mb-4 text-center">Preview Name Card</h2>
            <img src={previewImage} alt="Preview" className="w-full mb-4" />
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={confirmShare}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-md shadow-lg hover:shadow-xl transition-all whitespace-nowrap"
                style={{ backgroundColor: "#EDE3F5", color: "#4A3B35", minWidth: "130px" }}
              >
                <Share2 className="h-5 w-5" />
                <span className="text-sm">Share</span>
              </button>
              <button
                onClick={downloadImage}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-md shadow-lg hover:shadow-xl transition-all whitespace-nowrap"
                style={{ backgroundColor: "#EDE3F5", color: "#4A3B35", minWidth: "130px" }}
              >
                <Download className="h-5 w-5" />
                <span className="text-sm">Download</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}