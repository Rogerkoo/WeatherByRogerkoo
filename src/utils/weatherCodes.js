// WMO Weather interpretation codes
// Full reference: https://open-meteo.com/en/docs

const weatherCodes = {
  0:  { description: 'Clear sky',       icon: '☀️' },
  1:  { description: 'Mainly clear',     icon: '🌤️' },
  2:  { description: 'Partly cloudy',    icon: '⛅' },
  3:  { description: 'Overcast',         icon: '☁️' },
  45: { description: 'Foggy',            icon: '🌫️' },
  48: { description: 'Rime fog',         icon: '🌫️' },
  51: { description: 'Light drizzle',    icon: '🌦️' },
  53: { description: 'Moderate drizzle', icon: '🌦️' },
  55: { description: 'Dense drizzle',    icon: '🌧️' },
  61: { description: 'Slight rain',      icon: '🌧️' },
  63: { description: 'Moderate rain',    icon: '🌧️' },
  65: { description: 'Heavy rain',       icon: '🌧️' },
  71: { description: 'Slight snow',      icon: '🌨️' },
  73: { description: 'Moderate snow',    icon: '🌨️' },
  75: { description: 'Heavy snow',       icon: '❄️' },
  77: { description: 'Snow grains',      icon: '❄️' },
  80: { description: 'Light showers',    icon: '🌦️' },
  81: { description: 'Moderate showers', icon: '🌧️' },
  82: { description: 'Violent showers',  icon: '⛈️' },
  85: { description: 'Light snow showers', icon: '🌨️' },
  86: { description: 'Heavy snow showers', icon: '❄️' },
  95: { description: 'Thunderstorm',     icon: '⛈️' },
  96: { description: 'Thunderstorm + hail', icon: '⛈️' },
  99: { description: 'Severe thunderstorm', icon: '⛈️' },
};

export function getWeatherInfo(code) {
  return weatherCodes[code] || { description: 'Unknown', icon: '🌡️' };
}