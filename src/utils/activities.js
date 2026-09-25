// Rule-based activity suggestions
export function getSuggestions(weather) {
  if (!weather) return [];

  const { temperature, uvIndex, weatherCode, windSpeed } = weather;
  const suggestions = [];

  const isRaining = [51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99].includes(weatherCode);
  const isSnowing = [71, 73, 75, 77, 85, 86].includes(weatherCode);
  const isSunny = [0, 1, 2].includes(weatherCode);
  const isWindy = windSpeed > 30;

  // Temperature-based
  if (temperature >= 20 && temperature <= 30 && isSunny && !isWindy) {
    suggestions.push({ activity: 'Go for a hike or nature walk', emoji: '🥾' });
    suggestions.push({ activity: 'Have a picnic in the park', emoji: '🧺' });
    suggestions.push({ activity: 'Go cycling around the city', emoji: '🚴' });
  }

  if (temperature > 30) {
    suggestions.push({ activity: 'Hit the pool or beach', emoji: '🏊' });
    suggestions.push({ activity: 'Stay hydrated and find shade', emoji: '🧊' });
  }

  if (temperature < 10 && !isRaining && !isSnowing) {
    suggestions.push({ activity: 'Visit a cozy café', emoji: '☕' });
    suggestions.push({ activity: 'Go to a museum or gallery', emoji: '🏛️' });
  }

  if (temperature < 0 && isSnowing) {
    suggestions.push({ activity: 'Build a snowman!', emoji: '⛄' });
    suggestions.push({ activity: 'Go skiing or snowboarding', emoji: '⛷️' });
  }

  // Rain-based
  if (isRaining) {
    suggestions.push({ activity: 'Catch up on reading at home', emoji: '📚' });
    suggestions.push({ activity: 'Try a new recipe indoors', emoji: '🍳' });
    suggestions.push({ activity: 'Binge-watch a new series', emoji: '🎬' });
  }

  // UV-based
  if (uvIndex >= 8 && isSunny) {
    suggestions.push({ activity: 'Wear SPF 50+ if going outside!', emoji: '🧴' });
    suggestions.push({ activity: 'Best to stay indoors during midday', emoji: '🏠' });
  } else if (uvIndex >= 3 && uvIndex < 8 && isSunny) {
    suggestions.push({ activity: 'Great for outdoor sports — wear sunscreen', emoji: '🎾' });
  }

  // Wind-based
  if (isWindy) {
    suggestions.push({ activity: 'Try kite flying!', emoji: '🪁' });
    suggestions.push({ activity: 'Avoid water sports today', emoji: '⚠️' });
  }

  // Fallback
  if (suggestions.length === 0) {
    suggestions.push({ activity: 'A good day for a casual stroll', emoji: '🚶' });
    suggestions.push({ activity: 'Explore a new part of town', emoji: '🗺️' });
  }

  return suggestions.slice(0, 4); // Keep it to 4 max
}