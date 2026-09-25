import { useState, useEffect, useRef } from 'react';
import { searchCities } from '../utils/api';

export default function SearchBar({ onSelectCity }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Debounced search
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      const cities = await searchCities(query);
      setResults(cities);
      setIsOpen(cities.length > 0);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleSelect(city) {
    onSelectCity({
      name: city.name,
      country: city.country,
      latitude: city.latitude,
      longitude: city.longitude,
    });
    setQuery('');
    setResults([]);
    setIsOpen(false);
  }

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a city..."
        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
      />
      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          {results.map((city, i) => (
            <li
              key={`${city.id}-${i}`}
              onClick={() => handleSelect(city)}
              className="px-4 py-3 hover:bg-blue-50 cursor-pointer text-gray-700
                         border-b border-gray-50 last:border-0 transition-colors"
            >
              <span className="font-medium">{city.name}</span>
              <span className="text-gray-400 text-sm ml-2">
                {city.admin1 ? `${city.admin1}, ` : ''}{city.country}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}