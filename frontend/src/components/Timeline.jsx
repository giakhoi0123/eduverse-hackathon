import { useState, useEffect, useRef } from 'react';
import { 
  ZoomIn, ZoomOut, Maximize2, Filter, Calendar, 
  ChevronLeft, ChevronRight, X, Info, Clock
} from 'lucide-react';

function Timeline({ characterId = null, onEventClick }) {
  const [timeline, setTimeline] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    tag: null,
    year_range: null,
    importance_min: 0
  });
  const timelineRef = useRef(null);

  useEffect(() => {
    loadTimeline();
  }, [characterId, filters]);

  const loadTimeline = async () => {
    setLoading(true);
    setError(null);
    
    try {
      let url = '/api/timeline/default';
      
      // If filtering by character
      if (characterId) {
        url = `/api/timeline/character/${characterId}`;
      }
      
      const response = await fetch(`http://localhost:3000${url}`);
      const data = await response.json();
      
      if (data.success) {
        setTimeline(data.data);
      } else {
        setError('Không thể tải timeline');
      }
    } catch (err) {
      console.error('Error loading timeline:', err);
      setError('Lỗi kết nối server');
    } finally {
      setLoading(false);
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  const handlePeriodFilter = (periodId) => {
    setSelectedPeriod(periodId === selectedPeriod ? null : periodId);
  };

  const getEventColor = (event) => {
    if (!timeline) return '#3B82F6';
    
    const period = timeline.periods.find(p => p.id === event.period_id);
    return period?.color || '#3B82F6';
  };

  const getImportanceSize = (score) => {
    // Remove dynamic height - use min-h instead
    return '';
  };

  const getImportanceBadge = (score) => {
    if (score >= 80) return { label: 'Cao', color: 'bg-red-500' };
    if (score >= 60) return { label: 'Trung bình', color: 'bg-yellow-500' };
    return { label: 'Thấp', color: 'bg-blue-500' };
  };

  const formatYear = (year) => {
    return year > 0 ? `${year}` : `${Math.abs(year)} TCN`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Đang tải timeline lịch sử...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <p className="text-red-600 mb-4">❌ {error}</p>
          <button onClick={loadTimeline} className="btn btn-primary">
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  if (!timeline) return null;

  const { periods, lanes, visible_window, annotations } = timeline;
  const events = lanes[0]?.items || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold gradient-text mb-2">
                📅 Timeline Lịch Sử Việt Nam
              </h1>
              <p className="text-gray-600">
                Khám phá {events.length} sự kiện quan trọng từ {formatYear(visible_window.start_year)} đến {formatYear(visible_window.end_year)}
              </p>
            </div>
            
            {/* Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleZoomOut}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                title="Thu nhỏ"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              
              <button
                onClick={handleResetZoom}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium"
                title="Reset zoom"
              >
                {Math.round(zoomLevel * 100)}%
              </button>
              
              <button
                onClick={handleZoomIn}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                title="Phóng to"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors"
                title="Bộ lọc"
              >
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Period Filters */}
          <div className="flex flex-wrap gap-2">
            {periods.map(period => (
              <button
                key={period.id}
                onClick={() => handlePeriodFilter(period.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedPeriod === period.id
                    ? 'shadow-lg scale-105'
                    : 'hover:scale-105'
                }`}
                style={{
                  backgroundColor: selectedPeriod === period.id ? period.color : `${period.color}20`,
                  color: selectedPeriod === period.id ? 'white' : period.color,
                  borderWidth: '2px',
                  borderColor: period.color
                }}
              >
                {period.label} ({period.event_count || 0})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Container */}
      <div className="max-w-7xl mx-auto">
        <div 
          ref={timelineRef}
          className="relative bg-white rounded-xl shadow-lg p-8 overflow-hidden"
        >
          {/* Timeline Line */}
          <div className="relative" style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'top center',
            transition: 'transform 0.3s ease'
          }}>
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
            
            {/* Events */}
            <div className="space-y-6 pl-20">
              {events
                .filter(event => !selectedPeriod || event.period_id === selectedPeriod)
                .map((event, index) => {
                  const importance = getImportanceBadge(event.importance_score);
                  const period = periods.find(p => p.id === event.period_id);
                  
                  return (
                    <div
                      key={event.id}
                      className="relative group cursor-pointer mb-6"
                      onClick={() => onEventClick && onEventClick(event)}
                    >
                      {/* Year Marker */}
                      <div 
                        className="absolute -left-20 top-0 w-14 h-14 rounded-full flex items-center justify-center text-white font-bold shadow-lg z-10"
                        style={{ backgroundColor: getEventColor(event) }}
                      >
                        <span className="text-sm">{event.year}</span>
                      </div>

                      {/* Event Card */}
                      <div 
                        className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-5 border-2 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] min-h-[120px]"
                        style={{ borderColor: getEventColor(event) }}
                      >
                        <div className="flex items-start gap-4">
                          {/* Event Image */}
                          {event.image_url && (
                            <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                              <img
                                src={event.image_url}
                                alt={event.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                }}
                              />
                            </div>
                          )}

                          {/* Event Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2 gap-2">
                              <h3 className="text-base font-bold text-gray-800 group-hover:text-blue-600 transition-colors flex-1">
                                {event.title}
                              </h3>
                              
                              <span className={`px-2 py-1 rounded-full text-xs font-medium text-white whitespace-nowrap flex-shrink-0 ${importance.color}`}>
                                {importance.label}
                              </span>
                            </div>

                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                              {event.short_summary}
                            </p>

                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                <span>{period?.label || 'Khác'}</span>
                              </div>
                              
                              {event.tags && event.tags.length > 0 && (
                                <div className="flex gap-1">
                                  {event.tags.slice(0, 3).map(tag => (
                                    <span
                                      key={tag}
                                      className="px-2 py-0.5 bg-gray-200 rounded-full"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Hover Details */}
                        <div className="mt-3 pt-3 border-t border-gray-200 max-h-0 overflow-hidden group-hover:max-h-96 transition-all duration-300">
                          <p className="text-xs text-gray-700 mb-2 line-clamp-3">
                            {event.read_more}
                          </p>
                          
                          {event.characters_involved && event.characters_involved.length > 0 && (
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-medium text-gray-600">
                                Nhân vật:
                              </span>
                              <div className="flex gap-1 flex-wrap">
                                {event.characters_involved.slice(0, 3).map(charId => (
                                  <span
                                    key={charId}
                                    className="px-2 py-0.5 bg-blue-100 text-blue-600 rounded text-xs"
                                  >
                                    {charId.replace(/-/g, ' ')}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Footer */}
      <div className="max-w-7xl mx-auto mt-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {events.length}
              </div>
              <div className="text-sm text-gray-600">Sự kiện</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {periods.length}
              </div>
              <div className="text-sm text-gray-600">Thời kỳ</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600 mb-1">
                {visible_window.end_year - visible_window.start_year}
              </div>
              <div className="text-sm text-gray-600">Năm lịch sử</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-1">
                {events.filter(e => e.importance_score >= 80).length}
              </div>
              <div className="text-sm text-gray-600">Sự kiện quan trọng</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Timeline;
