import { IoStar, IoStarHalfOutline, IoStarOutline } from "react-icons/io5";

/**
 * Renders stars based on a real rating value (0 - 5) coming from the API.
 * There's no storage for user-submitted ratings since the project has no
 * backend to persist them, so we show the product's real rating instead
 * of a fake fixed number.
 */
function StarRating({ rating = 0 }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="stars" aria-label={`Rating: ${rating.toFixed(1)} out of 5`}>
      {Array.from({ length: fullStars }).map((_, i) => (
        <IoStar key={`full-${i}`} />
      ))}
      {hasHalfStar && <IoStarHalfOutline />}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <IoStarOutline key={`empty-${i}`} />
      ))}
      <span className="rating_number">{rating.toFixed(1)}</span>
    </div>
  );
}

export default StarRating;
