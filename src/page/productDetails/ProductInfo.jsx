import { useContext, useState } from "react"
import { FaRegHeart, FaShare } from "react-icons/fa"
import { TiShoppingCart } from "react-icons/ti"
import { CartContext } from "../../components/Context/CartContext"
import StarRating from "../../components/StarRating"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"


function ProductInfo({product}) {

const {cartItems , addToCart,addToFavorites ,favorites,removeFromFavorites} = useContext (CartContext)
const isInCart =cartItems.some(i => i.id === product.id);
const [justShared, setJustShared] = useState(false);
 const navigate =useNavigate()


const handleAddToCart=() =>{
  addToCart(product)
  toast.success(
    <div className="toast-wrapper">
      <img src={product.images[0]} alt={product.title} className="toast-img"/>
      <div className="toast-content">
        <strong>{product.title}</strong>
        add to cart
        <div>
          <button className="btn" onClick={()=>navigate('/cart')}>View Cart</button>
        </div>
      </div>
    </div>
    ,{duration : 3500}
  )
}
//favorites
const isInFav =favorites.some(i => i.id === product.id);
const handleAddToFav = () => {
  if (isInFav) {
    removeFromFavorites(product.id);
    toast.error(`${product.title} Removed From favorites`);
  } else {
    addToFavorites(product);
    toast.success(`${product.title} Added To favorites`);
  }
};

//share
const handleShare = async () => {
  const link = `${window.location.origin}/products/${product.id}`;

  if (navigator.share) {
    try {
      await navigator.share({
        title: product.title,
        text: product.title,
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
    <div className="details_item">
                <h1 className="name">{product.title}</h1>
                <StarRating rating={product.rating || 0} />
                <p className="price">${product.price}</p>
                <h5>
                  Availability: <span>{product.availabilityStatus}</span>
                </h5>
                <h5>
                  Brand: <span>{product.brand}</span>
                </h5>
                <p className="desc">{product.description}</p>
    
                <h5>
                  {" "}
                  <span>
                    Hurry Up! Only {product.stock} products left in Stock{" "}
                  </span>{" "}
                </h5>
    
                <button onClick={handleAddToCart} className={`btn ${isInCart ?'in-cart':''}`}>
                 {isInCart ? "Item In Cart" :"Add To Cart"} <TiShoppingCart />
                </button>
    
                <div className="icons">
                  <button
                    type="button"
                    className={`${isInFav ?"in-fav":""}`}
                    onClick={handleAddToFav}
                    aria-label={isInFav ? `Remove ${product.title} from favorites` : `Add ${product.title} to favorites`}
                  >
                    <FaRegHeart />
                  </button>
                  <button
                    type="button"
                    className={justShared ? "shared" : ""}
                    onClick={handleShare}
                    aria-label={`Share ${product.title}`}
                  >
                    <FaShare />
                  </button>
                </div>
              </div>
  )
}

export default ProductInfo
