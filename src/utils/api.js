// src/utils/api.js

// Search for cities using Open-Meteo Geocoding API
export async function searchCities(query) {
  if (!query || query.length < 2) return [];

  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.results || [];
  } catch (err) {
    console.error('Geocoding error:', err);
    return [];
  }
}

export async function getWeather(lat, lon) {
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m',
    // UPDATED: Added weather_code, temp max, and temp min to the daily request
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,uv_index_max',
    timezone: 'auto',
    forecast_days: 6, // UPDATED: Fetch today + 5 days
  });

  try {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
    const data = await res.json();

    return {
      temperature: data.current.temperature_2m,
      feelsLike: data.current.apparent_temperature,
      humidity: data.current.relative_humidity_2m,
      windSpeed: data.current.wind_speed_10m,
      weatherCode: data.current.weather_code,
      uvIndex: data.daily.uv_index_max[0],
      unit: data.current_units.temperature_2m,
      // NEW: Return the daily arrays for the forecast
      daily: data.daily, 
    };
  } catch (err) {
    console.error('Weather fetch error:', err);
    return null;
  }
}