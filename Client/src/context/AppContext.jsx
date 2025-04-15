import { createContext, use, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);


    const value = { user, setUser, isSeller, setIsSeller, navigate, showUserLogin, setShowUserLogin };
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>;
};

export const useAppContext = () => {
    return useContext(AppContext);
}