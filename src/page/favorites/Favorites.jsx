import { useContext, useEffect } from "react";
import { CartContext } from "../../components/Context/CartContext";
import Products from "../../components/slideProducts/Products";
import PageTransition from "../../components/PageTransition";
import "../CategoryPage/CategoryPage.css";

function Favorites() {
  const { favorites } = useContext(CartContext);

  useEffect(() => {
    document.title = "Favorites | Cosmatics";
  }, []);

  return (
    <PageTransition>
      <div className="category_products">
        <div className="container">
          <div className="top_slide">
            <h2>My Favorites</h2>
          </div>

          {favorites.length === 0 ? (
            <p>You Have No Favorite Items Yet</p>
          ) : (
            <div className="products">
              {favorites.map((item) => (
                <Products item={item} key={item.id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}

export default Favorites;
