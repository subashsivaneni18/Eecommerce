import { createContext, useEffect, useState } from "react";
import useSWR from "swr";

// Create Context
export const CurrentUserContext = createContext();

// Custom fetcher that accepts token
const fetcher = async (url, token) => {
  const res = await fetch(url, {
    headers: {
      token: token,
    },
  });
  if (!res.ok) {
    throw new Error("An error occurred while fetching the data.");
  }
  return res.json();
};

const CurrentUserContextProvider = ({ children }) => {
  // Get token from localStorage on first load
  const [token, setToken] = useState(
    () => localStorage.getItem("userToken") || ""
  );

  // SWR hook to fetch user data only if token is available
  const { data, isLoading, error, mutate } = useSWR(
    token ? "http://localhost:4000/api/user/currentUser" : null,
    (url) => fetcher(url, token)
  );

  // Optional: Sync token with localStorage if it changes in state
  useEffect(() => {
    if (token) {
      localStorage.setItem("userToken", token);
    } else {
      localStorage.removeItem("userToken");
    }
  }, [token]);

  // You can expose `setToken` and `mutate` if needed for login/logout
  const value = {
    token,
    setToken,
    data,
    isLoading,
    error,
    refreshUser: mutate, // allows components to manually re-fetch user data
  };

  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContextProvider;
