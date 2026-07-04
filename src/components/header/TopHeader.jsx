
import { Link } from "react-router-dom"
import Logo from "../../img/makeup-brushes.png"

import { FaRegHeart } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import "../header.css"
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import SearchBox from "./SearchBox";

function TopHeader() {

const { cartItems ,favorites} = useContext(CartContext);


  return (
    <div className="top_header">
      <div className="container">
       <Link className="logo" to ="/"><img src={Logo} alt="Cosmatics logo"/></Link> 

      <SearchBox/>


       <div className="header_icons">
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
