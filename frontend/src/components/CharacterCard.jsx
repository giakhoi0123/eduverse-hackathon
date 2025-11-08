import { MessageCircle, Sparkles, Volume2 } from 'lucide-react';
import { useState } from 'react';

function CharacterCard({ character, onSelect }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const getColorClass = (color) => {
    const colorMap = {
      '#DC2626': 'from-red-500 to-red-600',
      '#059669': 'from-green-500 to-green-600',
      '#7C3AED': 'from-purple-500 to-purple-600',
      '#2563EB': 'from-blue-500 to-blue-600',
      '#F59E0B': 'from-amber-500 to-amber-600',
      '#10B981': 'from-emerald-500 to-emerald-600',
      '#EC4899': 'from-pink-500 to-pink-600',
      '#EF4444': 'from-red-500 to-red-600',
      '#8B5CF6': 'from-violet-500 to-violet-600',
    };
    return colorMap[character.color] || 'from-blue-500 to-purple-600';
  };

  const getGlowColor = (color) => {
    const glowMap = {
      '#DC2626': 'rgba(239, 68, 68, 0.4)',
      '#059669': 'rgba(16, 185, 129, 0.4)',
      '#7C3AED': 'rgba(139, 92, 246, 0.4)',
      '#2563EB': 'rgba(59, 130, 246, 0.4)',
      '#F59E0B': 'rgba(245, 158, 11, 0.4)',
      '#10B981': 'rgba(16, 185, 129, 0.4)',
      '#EC4899': 'rgba(236, 72, 153, 0.4)',
      '#EF4444': 'rgba(239, 68, 68, 0.4)',
      '#8B5CF6': 'rgba(139, 92, 246, 0.4)',
    };
    return glowMap[character.color] || 'rgba(59, 130, 246, 0.4)';
  };

  return (
    <div
      onClick={() => onSelect(character.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="card cursor-pointer hover:shadow-2xl transform hover:-translate-y-3 hover:scale-105 transition-all duration-300 group relative overflow-hidden"
      style={{
        boxShadow: isHovered 
          ? `0 20px 50px -12px ${getGlowColor(character.color)}, 0 0 0 3px ${character.color}20`
          : undefined
      }}
    >
      {/* Hover effect background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300"
        style={{ background: `linear-gradient(to bottom right, ${character.color}, transparent)` }}
      ></div>

      {/* Sparkle particles on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute top-4 left-4 animate-ping">
          <Sparkles className="w-3 h-3" style={{ color: character.color }} />
        </div>
        <div className="absolute top-8 right-6 animate-ping animation-delay-200">
          <Sparkles className="w-2 h-2" style={{ color: character.color }} />
        </div>
        <div className="absolute bottom-20 right-4 animate-ping animation-delay-400">
          <Sparkles className="w-3 h-3" style={{ color: character.color }} />
        </div>
      </div>

      {/* Avatar Section */}
      <div className={`relative w-full h-52 bg-gradient-to-br ${getColorClass()} rounded-xl mb-4 flex flex-col items-center justify-center text-white overflow-hidden group-hover:shadow-2xl transition-all duration-300`}>
        {/* Large Emoji Avatar */}
        <div className="text-7xl mb-2 transform group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 filter drop-shadow-2xl">
          {character.avatar}
        </div>
        
        {/* Voice Preview Badge */}
        {character.voicePreview && (
          <div className="flex items-center space-x-1.5 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full transform group-hover:scale-110 transition-all duration-300">
            <Volume2 className="w-3.5 h-3.5 text-white animate-pulse" />
            <span className="text-xs font-medium text-white">Giọng nói AI</span>
          </div>
        )}
        
        {/* Era badge */}
        <div className="absolute bottom-3 left-3 right-3">
          <span className="text-xs bg-white/25 backdrop-blur-sm px-3 py-1.5 rounded-full font-medium block text-center">
            {character.era}
          </span>
        </div>

        {/* Sparkle effect on corner */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="relative">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
            <div className="absolute inset-0 animate-ping">
              <Sparkles className="w-5 h-5 text-white opacity-75" />
            </div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="relative z-10">
        <h3 className="font-bold text-xl mb-1.5 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all duration-300"
            style={{ 
              backgroundImage: isHovered ? `linear-gradient(to right, ${character.color}, ${character.color}dd)` : undefined 
            }}>
          {character.name}
        </h3>
        <p className="text-sm text-gray-600 mb-1 font-semibold">{character.title}</p>
        <p className="text-sm text-gray-700 mb-4 line-clamp-3 leading-relaxed">
          {character.description}
        </p>

        {/* CTA Button with Gradient Animation */}
        <button 
          className="btn w-full flex items-center justify-center space-x-2 group-hover:shadow-2xl relative overflow-hidden transform group-hover:scale-105 transition-all duration-300"
          style={{
            background: isHovered 
              ? `linear-gradient(135deg, ${character.color}, ${character.color}cc)` 
              : '#3B82F6',
            color: 'white'
          }}
        >
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 group-hover:animate-shimmer"></div>
          
          <MessageCircle className="w-4 h-4 transform group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-semibold relative z-10">Bắt đầu trò chuyện</span>
          <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </div>
    </div>
  );
}

export default CharacterCard;
