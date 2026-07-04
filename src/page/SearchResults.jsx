import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import SlideProductLoading from "../components/slideProducts/SlideProductLoading";
import Products from "../components/slideProducts/Products";
import useFetch from "../hooks/useFetch";
import { searchProducts } from "../api/api";
import { SITE_CATEGORIES } from "../constants";

function SearchResults() {
  const query = new URLSearchParams(useLocation().search).get("query");

  useEffect(() => {
    document.title = query ? `Search results for "${query}" | Cosmatics` : "Search | Cosmatics";
  }, [query]);

  const { data, loading, error } = useFetch(
    () => searchProducts(query),
    [query],
    !query,
  );

  // only show products from categories this site actually sells
  const results = (data?.products || []).filter((item) =>
    SITE_CATEGORIES.includes(item.category),
  );

  return (
    <PageTransition key={query}>
      <div className="category_products">
        {loading ? (
          <SlideProductLoading key={query} />
        ) : error ? (
          <div className="container">
            <p>Something went wrong while searching. Please try again.</p>
          </div>
        ) : results.length > 0 ? (
          <div className="container">
            <div className="top_slide">
              <h2>Results for : {query}</h2>
            </div>

            <div className="products">
              {results.map((item) => (
                <Products item={item} key={item.id} />
              ))}
            </div>
          </div>
        ) : (
          <div className="container">
            <p>No Results Found</p>
          </div>
        )}
      </div>
    </PageTransition>
  );
}

export default SearchResults;
