import { MessageCircle } from 'lucide-react';

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
      className="card cursor-pointer hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
    >
      {/* Avatar */}
      <div className={`w-full h-48 bg-gradient-to-br ${getColorClass()} rounded-lg mb-4 flex items-center justify-center text-white text-6xl font-bold`}>
        {character.name.charAt(0)}
      </div>

      {/* Info */}
      <h3 className="font-bold text-xl mb-2">{character.name}</h3>
      <p className="text-sm text-gray-600 mb-1">{character.title}</p>
      <p className="text-xs text-gray-500 mb-3">{character.era}</p>
      <p className="text-sm text-gray-700 mb-4 line-clamp-2">
        {character.description}
      </p>

      {/* Button */}
      <button className="btn btn-primary w-full flex items-center justify-center space-x-2">
        <MessageCircle className="w-4 h-4" />
        <span>Bắt đầu trò chuyện</span>
      </button>
    </div>
  );
}

export default CharacterCard;
