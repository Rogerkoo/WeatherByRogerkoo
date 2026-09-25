// src/App.jsx
import { useState, useEffect, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import ActivityCard from './components/ActivityCard';
import FavouritesPanel from './components/FavouritesPanel';
import ForecastCard from './components/ForecastCard';
import { getWeather } from './utils/api';

const STORAGE_KEY = 'weather-app-favourites';

function loadFavourites() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

export default function App() {
  // 👇 THESE ARE THE MISSING STATE VARIABLES 👇
  const [favourites, setFavourites] = useState(loadFavourites);
  const [selectedCity, setSelectedCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  // Save favourites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
  }, [favourites]);

  // Fetch weather when a city is selected
  const fetchWeather = useCallback(async (city) => {
    setSelectedCity(city);
    setLoading(true);
    setWeather(null);

    const data = await getWeather(city.latitude, city.longitude);
    setWeather(data);
    setLoading(false);
  }, []);

  // Toggle favourite function
  function toggleFavourite() {
    if (!selectedCity) return;

    const exists = favourites.some(
      (f) => f.latitude === selectedCity.latitude && f.longitude === selectedCity.longitude
    );

    if (exists) {
      setFavourites((prev) =>
        prev.filter(
          (f) => !(f.latitude === selectedCity.latitude && f.longitude === selectedCity.longitude)
        )
      );
    } else {
      setFavourites((prev) => [...prev, selectedCity]);
    }
  }

  // Check if current city is a favourite
  const isFavourite =
    selectedCity &&
    favourites.some(
      (f) => f.latitude === selectedCity.latitude && f.longitude === selectedCity.longitude
    );

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-lg mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          🌤️ Weather by Rogerkoo
        </h1>

        <SearchBar onSelectCity={fetchWeather} />

        <FavouritesPanel
          favourites={favourites}
          onSelect={fetchWeather}
          selectedCity={selectedCity}
        />

        {loading && (
          <div className="text-center text-gray-400 py-8 animate-pulse">
            Fetching weather data...
          </div>
        )}

        {!loading && selectedCity && weather && (
          <div className="space-y-4">
            <WeatherDisplay
              city={selectedCity}
              weather={weather}
              isFavourite={isFavourite}
              onToggleFavourite={toggleFavourite}
            />
            <ForecastCard daily={weather.daily} />
            <ActivityCard weather={weather} />
          </div>
        )}

        {!selectedCity && !loading && (
          <p className="text-center text-gray-400 py-12">
            Search for a city to get started!
          </p>
        )}
      </div>
    </div>
  );
}