import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Products from "../../components/slideProducts/Products";
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

            {categoryProducts?.products?.length > 0 ? (
              <div className="products">
                {categoryProducts.products.map((item) => (
                  <Products item={item} key={item.id} />
                ))}
              </div>
            ) : (
              <p>No Products Found In This Category</p>
            )}
          </div>
        )}
      </div>
    </PageTransition>
  );
}

export default CategoryPage;
