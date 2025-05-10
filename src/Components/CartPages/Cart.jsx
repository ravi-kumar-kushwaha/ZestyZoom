import React, { useContext } from 'react'
import CartContext from '../Store/CartContext'
import CartItems from './CartItems';
import "./Cart.css"
import ProgressContext from '../Store/ProgressContext';
const Cart = () => {
    const cartCtx = useContext(CartContext);
    const cartItems = cartCtx.items;
    console.log("cartItems",cartItems);

    const progressCtx = useContext(ProgressContext);
    const handleCloseCart = () => {
      progressCtx.hideCart();
    }
    const handleCheckOut = () =>{
      progressCtx.showCheckout();
    }
  return (
<section className="cart-checkout-section"> 
{ progressCtx.progress === "cart" &&(
            <>
<div className="cart-container" >
       
        <div className="cart-heading">
            <h1>Your Cart Items</h1> 
        </div>
        <div className="cart-list">
        <CartItems items={cartItems}/>
        </div>
      <div className="show-check-out-action">
        <button onClick={handleCloseCart}>Close</button>
        {
          cartCtx.items.length > 0 ? 
        <button onClick={handleCheckOut}>Procced Check Out</button>
        :" "
        }
      </div>
     
    {/* //     ):(
    //     <>
    //     <div className="cart-heading">
    //         <h1>Your Cart Items</h1> 
    //     </div>
    //     <div className="show-check-out-action">
    //     <button>Close</button>
    //     <button>Procced Check Out</button>
    //   </div>
    //     </>) */}
      
    </div>
    </>
      )
    }
 </section>
    
  )
}

export default Cart
