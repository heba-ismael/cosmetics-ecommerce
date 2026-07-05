
import { Link, useNavigate } from "react-router-dom"
import Logo from "../../img/makeup-brushes.png"

import { FaRegHeart, FaUserPlus, FaSignOutAlt } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { PiSignInBold } from "react-icons/pi";
import { FiSun, FiMoon } from "react-icons/fi";
import "../header.css"
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { AuthContext } from "../Context/AuthContext";
import { ThemeContext } from "../Context/ThemeContext";
import SearchBox from "./SearchBox";
import toast from "react-hot-toast";

function TopHeader() {

const { cartItems ,favorites} = useContext(CartContext);
const { user, logout } = useContext(AuthContext);
const { theme, toggleTheme } = useContext(ThemeContext);
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
        <button
          type="button"
          onClick={toggleTheme}
          className="theme_toggle"
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark" ? <FiSun /> : <FiMoon />}
        </button>

        {user ? (
          <div className="account_icon">
            <span className="welcome_user">Hi, {user.firstName}</span>
            <button type="button" onClick={handleLogout} className="text_link">
              <FaSignOutAlt /> <span>Sign Out</span>
            </button>
          </div>
        ) : (
          <div className="account_icon">
            <Link to="/signin" className="text_link">
              <PiSignInBold /> <span>Sign In</span>
            </Link>
            <Link to="/signup" className="text_link">
              <FaUserPlus /> <span>Sign Up</span>
            </Link>
          </div>
        )}

        <span className="icons_divider"></span>

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
