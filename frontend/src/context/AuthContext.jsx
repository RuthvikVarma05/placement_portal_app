import { createContext, useState, useEffect, Children } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        const verifyToken = async () => {
            const token = localStorage.getItem("token");

            if(!token) {
                setIsAuthenticated(false);
                setLoading(false);
                return;
            }

            try {
                const res = await fetch("http://localhost:5000/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if(res.ok) {
                    setIsAuthenticated(true);
                } else {
                    localStorage.removeItem("token");
                    setIsAuthenticated(false);
                }
            }  catch (err) {
                localStorage.removeItem("token");
                setIsAuthenticated(false);
            }
            setLoading(false);
        };
        verifyToken();
    }, []);

    return (
        <AuthContext.Provider value={{isAuthenticated,setIsAuthenticated,loading}}>
            {children}
        </AuthContext.Provider>
    );
};
