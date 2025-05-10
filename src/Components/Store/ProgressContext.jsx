import { createContext } from "react";
import { useState } from "react";

const ProgressContext = createContext({
    progress : "",
    showCart : ()=>{},
    hideCart : ()=>{},
    showCheckout : ()=>{},
    hideCheckout : ()=>{}
});

export const ProgressContextProvider = ({children}) => {
    const [progress,setProgress] = useState("");
    const showCart = () => {
        setProgress("cart");
    }
    const hideCart = () => {
        setProgress("");
    }
    const showCheckout = () => {
        setProgress("checkout");
    }
    const hideCheckout = () => {
        setProgress("");
    }
    const ProgressContextValue = {
        progress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout 
    }
    return (
        <ProgressContext.Provider value={ProgressContextValue}>
            {children}
        </ProgressContext.Provider>
    )
}

export default ProgressContext