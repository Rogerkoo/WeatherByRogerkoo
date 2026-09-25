import { getSuggestions } from '../utils/activities';

export default function ActivityCard({ weather }) {
  if (!weather) return null;

  const suggestions = getSuggestions(weather);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-md mx-auto">
      <h3 className="text-lg font-bold text-gray-800 mb-3">
        💡 Suggested Activities
      </h3>
      <ul className="space-y-2">
        {suggestions.map((s, i) => (
          <li
            key={i}
            className="flex items-center gap-3 bg-blue-50 rounded-lg px-4 py-2.5 text-gray-700"
          >
            <span className="text-xl">{s.emoji}</span>
            <span className="text-sm">{s.activity}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}