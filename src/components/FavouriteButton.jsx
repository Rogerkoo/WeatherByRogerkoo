export default function FavouriteButton({ isFavourite, onClick }) {
  return (
    <button
      onClick={onClick}
      className="focus:outline-none group active:scale-95 transition-transform duration-100"
      aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill={isFavourite ? "currentColor" : "none"}
        className={`w-6 h-6 transition-all duration-200 ease-out ${isFavourite ? "text-red-500" : "text-slate-400 group-hover:text-slate-600"
          }`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        />
      </svg>
    </button>
  );
}