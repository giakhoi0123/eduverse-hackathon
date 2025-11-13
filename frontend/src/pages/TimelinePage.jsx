import Timeline from '../components/Timeline';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function TimelinePage() {
  const navigate = useNavigate();

  const handleEventClick = (event) => {
    console.log('Event clicked:', event);
    // You can navigate to character or show modal here
    if (event.characters_involved && event.characters_involved.length > 0) {
      const mainCharacter = event.characters_involved[0];
      // navigate(`/chat/${mainCharacter}`);
    }
  };

  return (
    <div className="relative">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-100 rounded-lg shadow-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Trang chủ</span>
        </button>
      </div>

      <Timeline onEventClick={handleEventClick} />
    </div>
  );
}

export default TimelinePage;
