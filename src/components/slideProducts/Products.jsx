import { memo, useContext, useState } from "react";
import { FaCartArrowDown } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { FaCheck } from "react-icons/fa";
import toast from "react-hot-toast";
import StarRating from "../StarRating";

function Products({ item }) {
  const navigate = useNavigate();
  const [justShared, setJustShared] = useState(false);
  const {
    cartItems,
    addToCart,
    addToFavorites,
    favorites,
    removeFromFavorites,
  } = useContext(CartContext);

  const isInCart = cartItems.some((i) => i.id === item.id);

  const handleAddToCart = () => {
    addToCart(item);
    toast.success(
      <div className="toast-wrapper">
        <img src={item.images[0]} alt={item.title} className="toast-img" />
        <div className="toast-content">
          <strong>{item.title}</strong>
          add to cart
          <div>
            <button className="btn" onClick={() => navigate("/cart")}>
              View Cart
            </button>
          </div>
        </div>
      </div>,
      { duration: 3500 },
    );
  };

  //favorites
  const isInFav = favorites.some((i) => i.id === item.id);
  const handleAddToFav = () => {
    if (isInFav) {
      removeFromFavorites(item.id);
      toast.error(`${item.title} Removed From favorites`);
    } else {
      addToFavorites(item);
      toast.success(`${item.title} Added To favorites`);
    }
  };

  //share
  const handleShare = async () => {
    const link = `${window.location.origin}/products/${item.id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: item.title,
          url: link,
        });
        setJustShared(true);
      } catch (err) {
        console.error("Share cancelled or failed:", err);
        return;
      }
    } else {
      await navigator.clipboard.writeText(link);
      toast.success("Link copied!");
      setJustShared(true);
    }
    setTimeout(() => setJustShared(false), 1500);
  };

  return (
    <div className={`product ${isInCart ? "in-cart" : ""}`}>
      <Link to={`/products/${item.id}`}>
        <span className="status_cart">
          <FaCheck /> in cart
        </span>

        <div className="img_product">
          <img src={item.images[0]} alt={item.title} loading="lazy" />
        </div>
        <p className="name_product">{item.title}</p>

        <StarRating rating={item.rating || 0} />
        <p className="price">
          <span>${item.price ?? "—"}</span>
        </p>
      </Link>

      <div className="icons">
        <button
          type="button"
          className="btn_addcart"
          onClick={handleAddToCart}
          aria-label={`Add ${item.title} to cart`}
        >
          <FaCartArrowDown />
        </button>
        <button
          type="button"
          className={`${isInFav ? "in-fav" : ""}`}
          onClick={handleAddToFav}
          aria-label={
            isInFav
              ? `Remove ${item.title} from favorites`
              : `Add ${item.title} to favorites`
          }
        >
          <FaRegHeart />
        </button>
        <button
          type="button"
          className={justShared ? "shared" : ""}
          onClick={handleShare}
          aria-label={`Share ${item.title}`}
        >
          <FaShare />
        </button>
      </div>
    </div>
  );
}

export default memo(Products);
