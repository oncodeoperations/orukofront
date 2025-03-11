import { useEffect, useState } from "react";

interface OrderModalProps {
  onClose: () => void;
  images: string[]; // Array of image URLs
}

export function OrderModal({ onClose, images }: OrderModalProps) {
  const [currentImage, setCurrentImage] = useState(0);

  // Auto-slide carousel every 3 seconds with fade transition
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="relative bg-[#7D4B45] rounded-2xl shadow-lg w-11/12 max-w-md p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center border border-black rounded-full bg-transparent"
        >
          ❌
        </button>
        {/* Headline */}
        <h2 className="text-white text-center text-xl font-bold mb-4">
          Order your framed design!
        </h2>
        {/* Image Carousel */}
        <div className="relative h-64 overflow-hidden mb-4">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Slide ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentImage ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
        {/* Buy Artwork Button */}
        <div className="flex justify-center mb-4">
          <button className="bg-white text-black rounded-full px-6 py-3 transform transition-transform hover:scale-105">
            Buy artwork
          </button>
        </div>
        {/* Secondary Text */}
        <p className="text-white italic text-center mb-2 text-sm">
          Perfect for gifting yourself, friends &amp; family
        </p>
        {/* Shipping Info with glow effect */}
        <p className="text-yellow-400 text-center text-xs glow">
          Zero shipping fees 🚛
        </p>
      </div>
    </div>
  );
}