import { useContext, useEffect } from "react"
import { CartContext } from "../../components/Context/CartContext"
import { FaTrashAlt } from "react-icons/fa"
import toast from "react-hot-toast"
import './cart.css'

import PageTransition from "../../components/PageTransition";

function Cart() {

useEffect(() => {
  document.title = "Cart | Cosmatics";
}, []);

const {cartItems ,increaseQuantity,decreaseQuantity,removeFormCart} = useContext(CartContext)

const total = cartItems.reduce((acc , item)=>acc + item.price * item.quantity ,0)

const handlePlaceOrder = (e) => {
  e.preventDefault();
  if (cartItems.length === 0) return;
  toast.success("Your order has been placed successfully!");
};

  return (
 <PageTransition>
<div className="checkout">
      <div className="ordersummary">
        <h1>Order Summary</h1>
          <div className="items">
             {cartItems.length === 0 ?(
              <p>Your Cart Is Empty</p>
             ):(
              cartItems.map((item) => (
                <div className="item_cart" key={item.id}>
                  <div className="image_name">
                   
                     <div className="img_item">
                       <img src={item.images[0]} alt={item.title} loading="lazy"/>
                     </div>

                    <div className="content">
                       <h4>{item.title}</h4>
                       <p className="price_item">${item.price}</p>
                       <div className="quantity_control">
                        <button onClick={()=>decreaseQuantity(item.id)} >-</button>
                        <span className="quantity">{item.quantity}</span>
                        <button onClick={()=>increaseQuantity(item.id)}>+</button>
                       </div>
                    </div>
                  </div>
                   <button  onClick={()=>removeFormCart(item.id)} className="delete_item"><FaTrashAlt /></button>
                </div>
              ) )
             )
             }
          </div>

         <div className="bottom_summary">
          
              <div className="shop_table">
                <p>Total:</p>
                <span className="total_checkout">${total.toFixed(2)}</span>
              </div>

              <div className="button_div">
                <button type="button" onClick={handlePlaceOrder} disabled={cartItems.length === 0}> Place Order</button>
              </div>

         </div>

      </div>
    </div>
 </PageTransition>
  )
}

export default Cart
