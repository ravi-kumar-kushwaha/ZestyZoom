import axios from "axios";
import { useEffect } from "react";
import { createContext, useReducer } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => {

    },
    removeItem: (id) => {

    },
    removeCartItems: () => {

    },
    getCartItems: () => {

    }
});
const token = localStorage.getItem("token");
function cartReducer(state, action) {
    if (action.type === "ADD_ITEM") {
       
        const existingItemIndex = state.items.findIndex((item) => item._id === action.item._id);
        const updatedItems = [...state.items]
        if (existingItemIndex > -1) {
            const updatedItem = {
                ...state.items[existingItemIndex],
                quantity: state.items[existingItemIndex].quantity + 1
            }
            updatedItems[existingItemIndex] = updatedItem;
        } else {
            updatedItems.push({ ...action.item, quantity: 1 })
        }
        return ({ ...state, items: updatedItems })
    }
    if (action.type === "REMOVE_ITEM") {
        //remove an item from state
        const existingItemIndex = state.items.findIndex((item) => item._id === action.id);
        console.log("existingItemIndex", existingItemIndex);
        if (existingItemIndex === -1) {
            return state;
        }
        const exsitingItem = state.items[existingItemIndex];
        const updatedItems = [...state.items];
        if (exsitingItem.quantity === 1) {
            updatedItems.splice(existingItemIndex, 1);
        } else {
            const updatedItem = {
                ...state.items[existingItemIndex],
                quantity: state.items[existingItemIndex].quantity - 1
            }
            updatedItems[existingItemIndex] = updatedItem;
        }
        return {
            ...state,
            items: updatedItems
        }
    }

    if (action.type === "REMOVE_CART_ITEMS") {
        return {
            ...state,
            items: []
        }
    }

    if (action.type === "GET_CART_ITEMS") {
        return {
            ...state,
            items: action.items
        }
    }
    return state;
}
export const CartContextProvider = ({ children }) => {
    const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });
    async function addItem(item) {
        console.log("item", item._id);
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/add-item-to-cart`, {
            itemIds: item._id,quantity:1
        },{ headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }})
        console.log("response", response.data.data);
        try {
            if (response.data.success) {
                dispatchCartAction({
                    type: 'ADD_ITEM',
                    item
                })
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            alert("Internal Server Error:" + error.message);
        }
    }
    async function removeItem(id) {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/remove-item-from-cart`, {
            itemIds: id
        }, { headers: { Authorization: `Bearer ${token}` } });
        try {
            if (response.data.success) {
                dispatchCartAction({
                    type: 'REMOVE_ITEM',
                    id
                })
            } else {
                alert(response.data.message);
            }
         } catch (error) {
            alert("Internal Server Error:" + error.message);
            }
    }
    function removeCartItems() {
        dispatchCartAction({
            type: 'REMOVE_CART_ITEMS'
        })
    }

    async function getCartItems() {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/get-all-cart-items`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        
        const cartItems = response.data.cartItems;
        console.log("cartItems", cartItems);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        try { 
            if(response.data.success){
            dispatchCartAction({
                type: 'GET_CART_ITEMS',
                items: cartItems
            })
        }else{
            alert(response.data.message);
        }
        } catch (error) {
            alert("Internal Server Error:" + error.message);
        }
    }
    const ContextValue = {
        items: cart.items,
        addItem,
        removeItem,
        removeCartItems,
        getCartItems
    }

    // console.log("ContextValue",ContextValue);
    // console.log("addItem",addItem);
    return <CartContext.Provider value={ContextValue}>
        {children}
    </CartContext.Provider>
}
export default CartContext;








