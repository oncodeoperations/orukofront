import { Volume2 } from "lucide-react";

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

export function NameCard({ nameInfo }: NameCardProps) {
  return (
    <div className="w-full max-w-md h-auto bg-[#fdf8f2] text-[#3e322e] flex flex-col items-center justify-center rounded-xl shadow-md border border-[#e8dfd8] mx-auto p-4 sm:p-6 md:p-8">
      
      {/* Heritage / Language Label */}
      <span className="uppercase text-sm tracking-widest text-gray-500 mb-2">
        {typeof nameInfo.heritage === 'string'
          ? nameInfo.heritage
          : `${nameInfo.heritage.tribe}, ${nameInfo.heritage.region}`}
      </span>

      {/* Dotted Line */}
      <div className="text-gray-400 text-lg tracking-widest">• • • • • • • • • • •</div>

      {/* Meaning (Used as Main Bold Text) */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif mt-2 text-center px-4 sm:px-6">{nameInfo.meaning}</h1>

      {/* Pronunciation with Slashes & Icon */}
      <div className="flex items-center gap-2 text-lg sm:text-xl text-gray-600 mt-2">
        <p className="italic">{`/ ${nameInfo.pronunciation} /`}</p>
        <button className="text-gray-600 hover:text-gray-800">
          <Volume2 className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      </div>

      {/* Significance (Cultural Explanation) */}
      <p className="italic text-base sm:text-lg mt-4 text-center px-4 sm:px-6">{nameInfo.significance}</p>

      {/* Dotted Line */}
      <div className="text-gray-400 text-lg tracking-widest mt-6">• • • • • • • • • • •</div>

      {/* Variations Section (Only if They Exist) */}
      {Array.isArray(nameInfo.variations) && nameInfo.variations.length > 0 && (
        <div className="mt-4 text-sm text-gray-600 text-center px-4 sm:px-6">
          <span className="font-semibold">Variations:</span> {nameInfo.variations.join(", ")}
        </div>
      )}

      {/* Footer / Instagram Handle */}
      <div className="mt-4 text-sm text-gray-500">@oruko.mi</div>
    </div>
  );
}