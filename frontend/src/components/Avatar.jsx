function Avatar({ character, size = "md" }) {
  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-12 h-12 text-lg",
    lg: "w-20 h-20 text-3xl",
  };

  const getColorClass = (color) => {
    const colorMap = {
      "#DC2626": "from-red-500 to-red-600",
      "#7C3AED": "from-purple-500 to-purple-600",
      "#059669": "from-green-500 to-green-600",
      "#2563EB": "from-blue-500 to-blue-600",
    };
    return colorMap[color] || "from-blue-500 to-purple-600";
  };

  return (
    <div
      className={`${
        sizeClasses[size]
      } rounded-full bg-gradient-to-br ${getColorClass(
        character.color
      )} flex items-center justify-center text-white font-bold flex-shrink-0 overflow-hidden`}
    >
      {character.avatar ? (
        <img
          src={character.avatar}
          alt={character.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to first letter if image fails to load
            e.target.style.display = "none";
            e.target.parentElement.innerHTML = character.name.charAt(0);
          }}
        />
      ) : (
        character.name.charAt(0)
      )}
    </div>
  );
}

export default Avatar;
