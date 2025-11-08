import { MessageCircle, Sparkles } from 'lucide-react';

function CharacterCard({ character, onSelect }) {
  const getColorClass = (color) => {
    const colorMap = {
      '#DC2626': 'from-red-500 to-red-600',
      '#7C3AED': 'from-purple-500 to-purple-600',
      '#059669': 'from-green-500 to-green-600',
      '#2563EB': 'from-blue-500 to-blue-600',
    };
    return colorMap[character.color] || 'from-blue-500 to-purple-600';
  };

  return (
    <div
      onClick={() => onSelect(character.id)}
      className="card cursor-pointer hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden"
    >
      {/* Hover effect background */}
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300"
           style={{ background: `linear-gradient(to bottom right, ${character.color}, transparent)` }}
      ></div>

      {/* Avatar */}
      <div className={`relative w-full h-48 bg-gradient-to-br ${getColorClass()} rounded-lg mb-4 flex items-center justify-center text-white overflow-hidden`}>
        <div className="text-6xl font-bold transform group-hover:scale-110 transition-transform duration-300">
          {character.name.charAt(0)}
        </div>
        
        {/* Sparkle effect on hover */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Sparkles className="w-5 h-5 text-white animate-pulse" />
        </div>
        
        {/* Era badge */}
        <div className="absolute bottom-2 left-2 right-2">
          <span className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
            {character.era}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="relative z-10">
        <h3 className="font-bold text-xl mb-1 group-hover:text-primary transition-colors">
          {character.name}
        </h3>
        <p className="text-sm text-gray-600 mb-1 font-medium">{character.title}</p>
        <p className="text-sm text-gray-700 mb-4 line-clamp-3 leading-relaxed">
          {character.description}
        </p>

        {/* Button */}
        <button className="btn btn-primary w-full flex items-center justify-center space-x-2 group-hover:shadow-lg">
          <MessageCircle className="w-4 h-4" />
          <span>Bắt đầu trò chuyện</span>
        </button>
      </div>
    </div>
  );
}

export default CharacterCard;
