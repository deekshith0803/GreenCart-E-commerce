import { createContext, use, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();

    // State declarations
    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(true);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [searchQuary, setSearchQuary] = useState("");

    // fetch all products
    const fetchProducts = async () => {
        setProducts(dummyProducts);
    }

    // add product to cart
    const addToCart = (indexid) => {
        let cartData = structuredClone(cartItems);
        if (cartData[indexid]) {
            cartData[indexid] += 1;
        } else {
            cartData[indexid] = 1;
        }
        setCartItems(cartData);
        toast.success('Item added to cart');
    }

    //update cart items quantity
    const updateCartItems = (indexid, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[indexid] = quantity;
        setCartItems(cartData);
        toast.success('Item quantity updated');
    }

    //remove product from cart
    // AppContext.jsx
    const removeFromCart = (indexid) => {
        let cartData = structuredClone(cartItems);
        if (cartData[indexid]) {
            cartData[indexid] -= 1;
            if (cartData[indexid] <= 0) {
                delete cartData[indexid];
            }
        }
        setCartItems(cartData);
        toast.success('Item removed from cart');
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    //get cart item count
    const getCartCount = () => {
        let totalCount = 0;
        for (const item in cartItems) {
            totalCount += cartItems[item];
        }
        return totalCount;
    }

    //get cart total amount
    const getCartTotalAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            const itemInfo = products.find(product => product._id === item);
            if (itemInfo && cartItems[item] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[item];
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    };

    const value = {
        user,
        setUser,
        isSeller,
        setIsSeller,
        navigate,
        showUserLogin,
        setShowUserLogin,
        products,
        currency,
        addToCart,
        updateCartItems,
        removeFromCart,
        cartItems,
        searchQuary,
        setSearchQuary,
        getCartCount,
        getCartTotalAmount,
    };

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>;
};

export const useAppContext = () => {
    return useContext(AppContext);
}