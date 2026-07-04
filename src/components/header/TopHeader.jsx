
import { Link, useNavigate } from "react-router-dom"
import Logo from "../../img/makeup-brushes.png"

import { FaRegHeart, FaUserPlus, FaSignOutAlt } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { PiSignInBold } from "react-icons/pi";
import "../header.css"
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { AuthContext } from "../Context/AuthContext";
import SearchBox from "./SearchBox";
import toast from "react-hot-toast";

function TopHeader() {

const { cartItems ,favorites} = useContext(CartContext);
const { user, logout } = useContext(AuthContext);
const navigate = useNavigate();

const handleLogout = () => {
  logout();
  toast.success("Signed out successfully");
  navigate("/");
};

  return (
    <div className="top_header">
      <div className="container">
       <Link className="logo" to ="/"><img src={Logo} alt="Cosmatics logo"/></Link> 

      <SearchBox/>


       <div className="header_icons">
        {user ? (
          <div className="icon account_icon">
            <button type="button" onClick={handleLogout} aria-label="Sign Out">
              <FaSignOutAlt />
            </button>
            <span className="welcome_user">Hi, {user.firstName}</span>
          </div>
        ) : (
          <div className="icon account_icon">
            <Link to="/signin" aria-label="Sign In">
              <PiSignInBold />
            </Link>
            <Link to="/signup" aria-label="Sign Up">
              <FaUserPlus />
            </Link>
          </div>
        )}

        <div className="icon">
           <Link to="/favorites" aria-label={`Favorites, ${favorites.length} items`}>
           <FaRegHeart />
           <span className="count" >{favorites.length}</span>
           </Link>
        </div>

        <div className="icon">
         <Link to='/cart' aria-label={`Cart, ${cartItems.length} items`}>
           <BsCart3 />
           <span className="count" >{cartItems.length}</span>
         </Link>
        </div>

       </div>
      </div>
    </div>
  )
}

export default TopHeader
