import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(true);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [searchQuary, setSearchQuary] = useState("");

    const fetchSeller = async () => {
        try {
            const { data } = await axios.get("/api/seller/is-auth");
            setIsSeller(data.success);
        } catch {
            setIsSeller(false);
        }
    };

    const fetchUser = async () => {
        try {
            const { data } = await axios.get("/api/user/is-auth");
            if (data.success) {
                setUser(data.user);
                setCartItems(data.user.cartItems || {});
            } else {
                setUser(null);
            }
        } catch {
            setUser(null);
        }
    };

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get("/api/product/list");
            if (data.success) {
                setProducts(data.products);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const syncCartWithBackend = async (updatedCart) => {
        try {
            const { data } = await axios.post("/api/cart/update", { cartItems: updatedCart });
            if (!data.success) {
                toast.error("Cart update failed");
            }
        } catch (error) {
            toast.error("Failed to sync cart");
        }
    };

    const addToCart = async (indexid) => {
        let cartData = { ...cartItems };
        cartData[indexid] = (cartData[indexid] || 0) + 1;
        setCartItems(cartData);
        toast.success("Item added to cart");
        if (user) await syncCartWithBackend(cartData);
    };

    const updateCartItems = async (indexid, quantity) => {
        let cartData = { ...cartItems };
        cartData[indexid] = Number(quantity);
        setCartItems(cartData);
        toast.success("Item quantity updated");
        if (user) await syncCartWithBackend(cartData);
    };

    const removeFromCart = async (indexid) => {
        let cartData = { ...cartItems };
        if (cartData[indexid]) {
            cartData[indexid] -= 1;
            if (cartData[indexid] <= 0) {
                delete cartData[indexid];
            }
            setCartItems(cartData);
            toast.success("Item removed from cart");
            if (user) await syncCartWithBackend(cartData);
        }
    };

    const getCartCount = () => {
        return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
    };

    const getCartTotalAmount = () => {
        let total = 0;
        for (const item in cartItems) {
            const product = products.find(p => p._id === item);
            if (product) {
                total += product.offerPrice * cartItems[item];
            }
        }
        return Math.floor(total * 100) / 100;
    };

    useEffect(() => {
        fetchSeller();
        fetchProducts();
        fetchUser();
    }, []);

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
        axios,
        fetchProducts,
        setCartItems
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
    return useContext(AppContext);
};
