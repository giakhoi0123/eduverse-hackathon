import { useState } from 'react';
import { Search, X } from 'lucide-react';

function SearchBar({ value, onChange, placeholder = "Tìm kiếm nhân vật..." }) {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    onChange('');
  };

  return (
    <div className={`relative transition-all duration-300 ${isFocused ? 'scale-105' : ''}`}>
      <div className="relative">
        <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
          isFocused ? 'text-primary' : 'text-gray-400'
        }`} />
        
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`w-full pl-10 pr-10 py-3 rounded-xl border-2 transition-all duration-200 ${
            isFocused 
              ? 'border-primary shadow-lg ring-4 ring-blue-100' 
              : 'border-gray-200 hover:border-gray-300'
          } focus:outline-none text-sm sm:text-base`}
        />
        
        {value && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>
      
      {/* Search hint */}
      {isFocused && !value && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-10 animate-fadeIn">
          <p className="text-xs text-gray-600 mb-2">💡 Gợi ý tìm kiếm:</p>
          <div className="flex flex-wrap gap-1">
            {['Trần Hưng Đạo', 'Quang Trung', 'Thế kỷ 15'].map((hint, idx) => (
              <button
                key={idx}
                onClick={() => onChange(hint)}
                className="text-xs px-2 py-1 bg-gray-100 rounded-full hover:bg-primary hover:text-white transition-colors"
              >
                {hint}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
