import React from 'react'
import CurrencyFormatter from '../Utils/CurencyFormrter/CurrencyFormatter';
import "./CartItems.css"
import CartContext from '../Store/CartContext';
import { useContext } from 'react';
const CartItems = ({ items }) => {
    const cartCtx = useContext(CartContext);
    const handleAddToCart = (item) => {
        cartCtx.addItem(item);
    }
    const handleRemoveFromCart = (id) => {
        cartCtx.removeItem(id);
    }
    const TotalCartPrice = cartCtx.items.reduce((totalItems,item)=>{
        const itemPrice = item.discountedPrice || item.price;
        return totalItems + (itemPrice * item.quantity);
    },0);
    return (
        
        <div className="cart-items">
            {
                items.map((item) => {
                    return (
                        <div className="cart-item" key={item._id}>
                            <img src={item.image} alt="" />
                            <h2>{item.name}</h2>
                            <p>{item.description}</p>
                            <p className="discount">Flat {item.discountPercentage}% Off</p>
                            <div className="prices">
                                <span>{CurrencyFormatter.format(item.price)}</span>
                                <span className="discounted-price">{CurrencyFormatter.format(item.discountedPrice)}</span>
                                <span>Price:{item.discountedPrice * item.quantity}</span>
                                {/* <span className="discount1">{item.discountPercentage}% Off</span> */}
                            </div>
                            <div className="add-remove-btn">
                                <button onClick={() => handleRemoveFromCart(item._id)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => handleAddToCart(item)}>+</button>
                            </div>
                        </div>
                    )
                })
            }
            <div className="total-price">
                <span className='total-cart-price'>Total Cart Price : {CurrencyFormatter.format(TotalCartPrice)}</span>
            </div>
        </div>
    )
}

export default CartItems

