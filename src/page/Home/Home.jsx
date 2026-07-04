import { useEffect } from "react";
import HeroSlider from "../../components/HeroSlider";
import SlideProducts from "../../components/slideProducts/SlideProducts";
import "./home.css";
import SlideProductLoading from "../../components/slideProducts/SlideProductLoading";
import PageTransition from "../../components/PageTransition";
import useFetch from "../../hooks/useFetch";
import { getProductsByCategory } from "../../api/api";

const categories = ["womens-shoes", "beauty", "womens-bags"];

async function fetchAllHomeProducts() {
  const results = await Promise.all(
    categories.map(async (category) => {
      const data = await getProductsByCategory(category, 10);
      return { [category]: data.products };
    }),
  );
  return Object.assign({}, ...results);
}

function Home() {
  useEffect(() => {
    document.title = "Home | Cosmatics";
  }, []);

  const { data: products, loading, error } = useFetch(fetchAllHomeProducts, []);

  return (
    <PageTransition>
      <div>
        <HeroSlider />

        <div id="shop-section">
          {error && (
            <p className="fetch_error">Something went wrong while loading products. Please try again.</p>
          )}

          {loading
            ? categories.map((category) => <SlideProductLoading key={category} />)
            : !error &&
              categories.map((category) => (
                <SlideProducts
                  key={category}
                  data={products?.[category] || []}
                  title={category.replace("-", " ")}
                />
              ))}
        </div>
      </div>
    </PageTransition>
  );
}

export default Home;
