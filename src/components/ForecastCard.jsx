// src/components/ForecastCard.jsx
import { getWeatherInfo } from '../utils/weatherCodes';

export default function ForecastCard({ daily }) {
  if (!daily || !daily.time) return null;

  // Helper to format the date string (e.g., "2023-10-25") into "Today", "Tue", etc.
  const formatDate = (dateStr) => {
    // Adding T12:00:00 prevents timezone shifting issues
    const date = new Date(dateStr + 'T12:00:00');
    const today = new Date();
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    }
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-md mx-auto">
      <h3 className="text-lg font-bold text-gray-800 mb-4">
        📅 5-Day Forecast
      </h3>
      
      <div className="space-y-2">
        {/* Slice to 6 to show Today + 5 days */}
        {daily.time.slice(0, 6).map((date, i) => {
          const info = getWeatherInfo(daily.weather_code[i]);
          const maxTemp = Math.round(daily.temperature_2m_max[i]);
          const minTemp = Math.round(daily.temperature_2m_min[i]);

          return (
            <div
              key={date}
              className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
            >
              {/* Day Name */}
              <span className="w-16 font-medium text-gray-700">
                {formatDate(date)}
              </span>

              {/* Weather Icon */}
              <span className="text-2xl">{info.icon}</span>

              {/* Temperatures */}
              <div className="flex gap-3 text-sm min-w-[60px] justify-end">
                <span className="font-semibold text-gray-800">{maxTemp}°</span>
                <span className="text-gray-400">{minTemp}°</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}