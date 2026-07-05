import { IoStar } from "react-icons/io5";

const RATING_OPTIONS = [4, 3, 2, 1, 0];

function ProductFilters({ minPrice, maxPrice, priceRange, onPriceChange, minRating, onRatingChange, onReset }) {
  return (
    <div className="product_filters">
      <div className="filter_group">
        <h4>Price</h4>
        <div className="price_inputs">
          <label>
            Min
            <input
              type="number"
              min={minPrice}
              max={priceRange[1]}
              value={priceRange[0]}
              onChange={(e) => onPriceChange([Number(e.target.value), priceRange[1]])}
              aria-label="Minimum price"
            />
          </label>
          <span className="price_sep">—</span>
          <label>
            Max
            <input
              type="number"
              min={priceRange[0]}
              max={maxPrice}
              value={priceRange[1]}
              onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value)])}
              aria-label="Maximum price"
            />
          </label>
        </div>
      </div>

      <div className="filter_group">
        <h4>Minimum Rating</h4>
        <div className="rating_options" role="group" aria-label="Filter by minimum rating">
          {RATING_OPTIONS.map((rating) => (
            <button
              type="button"
              key={rating}
              className={minRating === rating ? "active" : ""}
              onClick={() => onRatingChange(rating)}
              aria-pressed={minRating === rating}
            >
              {rating === 0 ? (
                "All"
              ) : (
                <>
                  {rating}
                  <IoStar /> & up
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      <button type="button" className="reset_filters" onClick={onReset}>
        Reset Filters
      </button>
    </div>
  );
}

export default ProductFilters;
