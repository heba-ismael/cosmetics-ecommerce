import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Products from "../../components/slideProducts/Products";
import ProductFilters from "../../components/ProductFilters";
import "../../components/ProductFilters.css";
import "./CategoryPage.css";
import SlideProductLoading from "../../components/slideProducts/SlideProductLoading";
import PageTransition from "../../components/PageTransition";
import useFetch from "../../hooks/useFetch";
import { getProductsByCategory } from "../../api/api";

function CategoryPage() {
  const { category } = useParams();

  useEffect(() => {
    document.title = `${category} | Cosmatics`;
  }, [category]);

  const {
    data: categoryProducts,
    loading,
    error,
  } = useFetch(() => getProductsByCategory(category), [category]);

  const allProducts = categoryProducts?.products || [];

  // Price bounds derived from the actual products in this category
  const priceBounds = useMemo(() => {
    if (allProducts.length === 0) return [0, 1000];
    const prices = allProducts.map((p) => p.price);
    return [Math.floor(Math.min(...prices)), Math.ceil(Math.max(...prices))];
  }, [allProducts]);

  const [priceRange, setPriceRange] = useState(priceBounds);
  const [minRating, setMinRating] = useState(0);

  // Reset the filters whenever the category (and therefore its price bounds) changes
  useEffect(() => {
    setPriceRange(priceBounds);
    setMinRating(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, allProducts.length]);

  const filteredProducts = allProducts.filter(
    (item) =>
      item.price >= priceRange[0] &&
      item.price <= priceRange[1] &&
      item.rating >= minRating,
  );

  const handleReset = () => {
    setPriceRange(priceBounds);
    setMinRating(0);
  };

  return (
    <PageTransition key={category}>
      <div className="category_products">
        {loading ? (
          <SlideProductLoading key={category} />
        ) : error ? (
          <div className="container">
            <p>Something went wrong while loading products. Please try again.</p>
          </div>
        ) : (
          <div className="container">
            <div className="top_slide">
              <h2>{category.replace("-", " ")}</h2>
            </div>

            {allProducts.length > 0 && (
              <ProductFilters
                minPrice={priceBounds[0]}
                maxPrice={priceBounds[1]}
                priceRange={priceRange}
                onPriceChange={setPriceRange}
                minRating={minRating}
                onRatingChange={setMinRating}
                onReset={handleReset}
              />
            )}

            {allProducts.length > 0 && (
              <p
                className="filter_results_count"
                aria-live="polite"
                key={filteredProducts.length}
              >
                Showing <strong>{filteredProducts.length}</strong> of{" "}
                {allProducts.length} products
                {(priceRange[0] !== priceBounds[0] ||
                  priceRange[1] !== priceBounds[1] ||
                  minRating > 0) && " · Filtered"}
              </p>
            )}

            {filteredProducts.length > 0 ? (
              <div className="products">
                {filteredProducts.map((item) => (
                  <Products item={item} key={item.id} />
                ))}
              </div>
            ) : (
              <p>No products match the selected filters.</p>
            )}
          </div>
        )}
      </div>
    </PageTransition>
  );
}

export default CategoryPage;
