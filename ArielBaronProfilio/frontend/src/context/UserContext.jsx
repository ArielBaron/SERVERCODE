import { createContext, useContext, useState, useEffect, useCallback } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create a function to fetch user data
  const fetchUserData = useCallback(async () => {
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token);
    
    if (!token) {
      console.log("No token found, skipping user fetch");
      setUser(null);
      setLoading(false);
      return;
    }
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const fullUrl = `${apiUrl}/users/me`;
      
      console.log("API URL:", apiUrl);
      console.log("Full URL being requested:", fullUrl);
      console.log("Token being sent:", token);
      
      const res = await fetch(fullUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      console.log("Response status:", res.status);
      console.log("Response ok:", res.ok);
      
      if (!res.ok) {
        const errorText = await res.text();
        console.log("Error response body:", errorText);
        setUser(null);
        localStorage.removeItem("token"); // Remove invalid token
        setLoading(false);
        return;
      }
      
      const data = await res.json();
      console.log("User data received:", data);
      setUser(data);
    } catch (err) {
      console.error("Failed to fetch user info:", err);
      console.error("Error details:", err.message);
      setUser(null);
    }
    setLoading(false);
  }, []);

  // Fetch user data on mount
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  // Function to refresh user data (call after login)
  const refreshUser = () => {
    setLoading(true);
    fetchUserData();
  };

  // Function to logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      setUser, 
      loading, 
      refreshUser, 
      logout 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);