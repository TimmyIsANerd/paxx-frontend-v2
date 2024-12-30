"use client";
import { createContext, useState, useEffect, useContext } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

export const AuthContext = createContext({
  isLoggedIn: false,
  token: "",
  user: null,
  storeAuthCookie: (token) => {},
  storeProfile: (user) => {},
  logOut: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["paxx_user"]);
  const [token, setToken] = useState(cookies.paxx_user);
  const [user, setUser] = useState(null);
  const { push } = useRouter();

  function storeAuthCookie(token) {
    setCookie("paxx_user", token, {
      path: "/",
      maxAge: 3600 * 24 * 30, // 30 Days
    });

    setIsLoggedIn(true);
  }

  function logOut() {
    removeCookie("paxx_user", {
      path: "/",
      maxAge: 3600 * 24 * 30,
    });
    window.localStorage.removeItem("paxx_user");
    setUser(null);

    setIsLoggedIn(false);
    push("/auth/login");
  }

  function storeProfile(user) {
    window.localStorage.setItem("paxx_user", JSON.stringify(user));
    setUser(user);
  }

  useEffect(() => {
    if (cookies.paxx_user) {
      setToken(cookies.paxx_user);
      setIsLoggedIn(true);
    }

    const paxx_user = window.localStorage.getItem("paxx_user");
    if (paxx_user) {
      const parsedData = JSON.parse(paxx_user);
      setUser(parsedData);
    }


  }, [cookies.paxx_user]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        storeProfile,
        logOut,
        storeAuthCookie,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
