import React from 'react'
import './FoodList.css'
import CurrencyFormatter from '../Utils/CurencyFormrter/CurrencyFormatter';
import CartContext from '../Store/CartContext';
import { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FoodList = ({ foodItems }) => {

     const navigate = useNavigate();
    const auth = localStorage.getItem("user");
    const user = JSON.parse(auth);
    
    const cartCtx = useContext(CartContext);

    const handleAddToCart = (foodItem) => {
        cartCtx.addItem(foodItem);
    }
    return (
        <div className="food-list">
            <h1>Top Dishes at ZestyZoom Near You.</h1>
            <div className="all-food-items">
                {
                    foodItems.map((foodItem) => {
                        return (
                            <div className="food-item" key={foodItem._id}>
                                <img src={foodItem.image} alt="" />
                                <h2>{foodItem.name}</h2>
                                <p>{foodItem.description}</p>
                                <p className="discount">Flat {foodItem.discountPercentage}% Off</p>
                                <div className="prices">
                                <span className='price'>Price : {CurrencyFormatter.format(foodItem.price)}</span>
                                <span className="discounted-price">{CurrencyFormatter.format(foodItem.discountedPrice)}</span>
                                </div>
                                <div className="addto-cart">{
                                    user ?
                                    <button onClick={() => handleAddToCart(foodItem)}>Add to Cart</button>
                                    :
                                    <button onClick={() => navigate("/signin")}>Add to Cart</button>
                                }</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}


export default FoodList;








// const FoodList = ({ foodItems }) => {
//     const [sizes, setSizes] = useState({});

//     const handleFoodSizes = (e) => {
//         const { name, value } = e.target;
//         setSizes((prevSizes) => ({ ...prevSizes, [name]: value }));
//     };

//     const cartCtx = useContext(CartContext);

//     const handleAddToCart = (foodItem) => {
//         const selectedSize = sizes[foodItem._id] || (foodItem.sizes?.[0]?.sizeName || "large"); // Default to first available size
//         const selectedSizePrice = foodItem.sizes?.find(size => size.sizeName === selectedSize)?.price || foodItem.price;

//         cartCtx.addItem({ 
//             ...foodItem, 
//             selectedSize, 
//             selectedSizePrice 
//         });
//     };

//     return (
//         <div className="food-list">
//             <h1>Top Dishes at ZestyZoom Near You.</h1>
//             <div className="all-food-items">
//                 {foodItems.map((foodItem) => (
//                     <div className="food-item" key={foodItem._id}>
//                         <img src={foodItem.image} alt={foodItem.name || "Food Item"} />
//                         <h2>{foodItem.name || "Unknown Dish"}</h2>
//                         <p>{foodItem.description || "No description available"}</p>
//                         <p className="discount">Flat {foodItem.discountPercentage || 0}% Off</p>
                        
//                         <div className="prices">
//                             <span className="price">
//                                 Price: {CurrencyFormatter.format(foodItem.price)}
//                             </span>
//                             <span className="discounted-price">
//                                 {CurrencyFormatter.format(foodItem.discountedPrice)}
//                             </span>
//                         </div>

//                         {foodItem.sizes?.length > 0 ? (
//                             <select
//                                 name={foodItem._id}
//                                 id={`sizes-${foodItem._id}`}
//                                 onChange={handleFoodSizes}
//                                 value={sizes[foodItem._id] || ""}
//                                 required
//                             >
//                                 <option value="">Select Size</option>
//                                 {foodItem.sizes.map((size, index) => (
//                                     <option 
//                                         key={`${foodItem._id}-${size._id || index}`} 
//                                         value={size.sizeName}
//                                     >
//                                         {size.sizeName} - {CurrencyFormatter.format(size.price)}
//                                     </option>
//                                 ))}
//                             </select>
//                         ) : (
//                             <p>No sizes available</p>
//                         )}

//                         <div className="addto-cart">
//                             <button onClick={() => handleAddToCart(foodItem)}>Add to Cart</button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default FoodList;


