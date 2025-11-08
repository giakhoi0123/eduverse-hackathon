import { useState, useEffect } from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';
import { getFilterOptions } from '../services/api';

function FilterBar({ filters, onChange }) {
  const [showFilters, setShowFilters] = useState(false);
  const [options, setOptions] = useState({
    categories: [],
    dynasties: [],
    genders: []
  });

  useEffect(() => {
    loadFilterOptions();
  }, []);

  const loadFilterOptions = async () => {
    try {
      const data = await getFilterOptions();
      setOptions(data);
    } catch (error) {
      console.error('Failed to load filter options:', error);
    }
  };

  const handleFilterChange = (key, value) => {
    onChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onChange({ category: 'all', gender: 'all', dynasty: 'all' });
  };

  const activeFilterCount = Object.values(filters).filter(v => v !== 'all').length;

  return (
    <div className="space-y-3">
      {/* Filter Toggle Button */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center space-x-2 px-4 py-2 bg-white border-2 border-gray-200 rounded-xl hover:border-primary transition-all duration-200 group"
      >
        <Filter className="w-4 h-4 text-gray-600 group-hover:text-primary transition-colors" />
        <span className="text-sm font-medium text-gray-700 group-hover:text-primary">
          Lọc nhân vật
        </span>
        {activeFilterCount > 0 && (
          <span className="px-2 py-0.5 bg-primary text-white text-xs rounded-full">
            {activeFilterCount}
          </span>
        )}
        <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
          showFilters ? 'rotate-180' : ''
        }`} />
      </button>

      {/* Filter Options */}
      {showFilters && (
        <div className="bg-white rounded-xl border-2 border-gray-200 p-4 space-y-4 slide-up">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-800">Bộ lọc</h4>
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-xs text-primary hover:underline flex items-center space-x-1"
              >
                <X className="w-3 h-3" />
                <span>Xóa lọc</span>
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">
              Vai trò
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => handleFilterChange('category', 'all')}
                className={`px-3 py-2 text-sm rounded-lg border-2 transition-all ${
                  filters.category === 'all'
                    ? 'border-primary bg-blue-50 text-primary font-semibold'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                Tất cả
              </button>
              {options.categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => handleFilterChange('category', cat.value)}
                  className={`px-3 py-2 text-sm rounded-lg border-2 transition-all ${
                    filters.category === cat.value
                      ? 'border-primary bg-blue-50 text-primary font-semibold'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Gender Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">
              Giới tính
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleFilterChange('gender', 'all')}
                className={`px-3 py-2 text-sm rounded-lg border-2 transition-all ${
                  filters.gender === 'all'
                    ? 'border-primary bg-blue-50 text-primary font-semibold'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                Tất cả
              </button>
              {options.genders.map((g) => (
                <button
                  key={g.value}
                  onClick={() => handleFilterChange('gender', g.value)}
                  className={`px-3 py-2 text-sm rounded-lg border-2 transition-all ${
                    filters.gender === g.value
                      ? 'border-primary bg-blue-50 text-primary font-semibold'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dynasty Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">
              Triều đại / Thời kỳ
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => handleFilterChange('dynasty', 'all')}
                className={`px-3 py-2 text-sm rounded-lg border-2 transition-all ${
                  filters.dynasty === 'all'
                    ? 'border-primary bg-blue-50 text-primary font-semibold'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                Tất cả
              </button>
              {options.dynasties.map((d) => (
                <button
                  key={d.value}
                  onClick={() => handleFilterChange('dynasty', d.value)}
                  className={`px-3 py-2 text-sm rounded-lg border-2 transition-all ${
                    filters.dynasty === d.value
                      ? 'border-primary bg-blue-50 text-primary font-semibold'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterBar;
