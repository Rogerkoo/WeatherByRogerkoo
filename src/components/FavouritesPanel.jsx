export default function FavouritesPanel({ favourites, onSelect, selectedCity }) {
  if (favourites.length === 0) return null;

  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
        ⭐ Favourites
      </h3>
      <div className="flex flex-wrap gap-2">
        {favourites.map((city) => {
          const isActive =
            selectedCity &&
            selectedCity.latitude === city.latitude &&
            selectedCity.longitude === city.longitude;

          return (
            <button
              key={`${city.latitude}-${city.longitude}`}
              onClick={() => onSelect(city)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-blue-50 border border-gray-200'
                }`}
            >
              {city.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}