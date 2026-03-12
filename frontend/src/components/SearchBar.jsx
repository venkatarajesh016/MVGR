import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Building2, DoorOpen, MapPin, X, Loader2 } from 'lucide-react';

function SearchBar({ onSearch, onResultSelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (query.trim().length > 1) {
        handleSearch();
      } else {
        setResults(null);
      }
    }, 300);

    return () => clearTimeout(delaySearch);
  }, [query]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const data = await onSearch(query);
      setResults(data);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (item, type) => {
    onResultSelect(item, type);
    setResults(null);
    setQuery('');
    setIsFocused(false);
  };

  const clearSearch = () => {
    setQuery('');
    setResults(null);
  };

  const getIcon = (type) => {
    switch (type) {
      case 'building':
        return <Building2 className="w-5 h-5 text-blue-600" />;
      case 'room':
        return <DoorOpen className="w-5 h-5 text-green-600" />;
      case 'landmark':
        return <MapPin className="w-5 h-5 text-amber-600" />;
      default:
        return <Building2 className="w-5 h-5 text-gray-600" />;
    }
  };

  const hasResults = results && (results.buildings?.length > 0 || results.rooms?.length > 0 || results.landmarks?.length > 0);

  return (
    <div className="absolute top-20 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-2xl z-30">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-effect rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
            {loading ? (
              <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
            ) : (
              <Search className="w-5 h-5 text-gray-400" />
            )}
          </div>
          
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder="Search buildings, rooms, departments..."
            className="w-full pl-12 pr-12 py-4 bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none text-base font-medium"
          />
          
          {query && (
            <button
              onClick={clearSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          )}
        </div>

        <AnimatePresence>
          {hasResults && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-200 max-h-96 overflow-y-auto"
            >
              <div className="p-2">
                {results.buildings?.length > 0 && (
                  <div className="mb-2">
                    <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Buildings</p>
                    {results.buildings.map((building, index) => (
                      <motion.div
                        key={building._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleSelect(building, 'building')}
                        className="flex items-center gap-3 p-3 hover:bg-blue-50 cursor-pointer rounded-xl transition-colors group"
                      >
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                          {getIcon('building')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 truncate">{building.name}</p>
                          <p className="text-sm text-gray-500 truncate">{building.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {results.rooms?.length > 0 && (
                  <div className="mb-2">
                    <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Rooms</p>
                    {results.rooms.map((room, index) => (
                      <motion.div
                        key={room._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleSelect(room, 'room')}
                        className="flex items-center gap-3 p-3 hover:bg-green-50 cursor-pointer rounded-xl transition-colors group"
                      >
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                          {getIcon('room')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900">Room {room.roomNumber}</p>
                          <p className="text-sm text-gray-500 truncate">
                            {room.buildingId?.name} • Floor {room.floor} • {room.department}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {results.landmarks?.length > 0 && (
                  <div>
                    <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Landmarks</p>
                    {results.landmarks.map((landmark, index) => (
                      <motion.div
                        key={landmark._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleSelect(landmark, 'landmark')}
                        className="flex items-center gap-3 p-3 hover:bg-amber-50 cursor-pointer rounded-xl transition-colors group"
                      >
                        <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                          {getIcon('landmark')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 truncate">{landmark.name}</p>
                          <p className="text-sm text-gray-500 truncate">{landmark.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {!hasResults && query.trim().length > 1 && !loading && (
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 font-medium">No results found</p>
                    <p className="text-sm text-gray-400 mt-1">Try searching for a different location</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default SearchBar;
