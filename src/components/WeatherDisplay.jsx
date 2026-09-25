import { getWeatherInfo } from '../utils/weatherCodes';
import FavouriteButton from './FavouriteButton';

export default function WeatherDisplay({ city, weather, isFavourite, onToggleFavourite }) {
  if (!weather) return null;

  const { description, icon } = getWeatherInfo(weather.weatherCode);

  function getUvLabel(uv) {
    if (uv <= 2) return { text: 'Low', color: 'text-green-600' };
    if (uv <= 5) return { text: 'Moderate', color: 'text-yellow-600' };
    if (uv <= 7) return { text: 'High', color: 'text-orange-600' };
    if (uv <= 10) return { text: 'Very High', color: 'text-red-600' };
    return { text: 'Extreme', color: 'text-purple-600' };
  }

  const uv = getUvLabel(weather.uvIndex);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{city.name}</h2>
          <p className="text-sm text-gray-400">{city.country}</p>
        </div>
        {/*<button
          onClick={onToggleFavourite}
          className="text-2xl hover:scale-110 transition-transform"
          title={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
        >
          {isFavourite ? '❤️' : '🤍'}
        </button>*/}
        <FavouriteButton isFavourite={isFavourite} onClick={onToggleFavourite} />
      </div>

      {/* Main Weather */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-6xl">{icon}</span>
        <div>
          <p className="text-5xl font-light text-gray-800">
            {Math.round(weather.temperature)}°
          </p>
          <p className="text-gray-500 capitalize">{description}</p>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-gray-400">Feels like</p>
          <p className="font-semibold text-gray-700">{Math.round(weather.feelsLike)}°C</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-gray-400">Humidity</p>
          <p className="font-semibold text-gray-700">{weather.humidity}%</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-gray-400">Wind</p>
          <p className="font-semibold text-gray-700">{weather.windSpeed} km/h</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-gray-400">UV Index</p>
          <p className={`font-semibold ${uv.color}`}>
            {weather.uvIndex} ({uv.text})
          </p>
        </div>
      </div>
    </div>
  );
}