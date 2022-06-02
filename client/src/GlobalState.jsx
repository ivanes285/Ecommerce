import { createContext, useState, useEffect } from "react";
import ProductsAPI from "./api/ProductsAPI";
import UsersAPI from "./api/UsersAPI";
import CategoriesAPI from "./api/CategoriesAPI";
import axios from "axios";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");

    if (firstLogin) {
      const refreshToken = async () => {
        const res = await axios.get("/user/refresh_token");
         //console.log("res",res); // ? Consultar la respuesta 
        setToken(res.data.accessToken);
        setTimeout(() => {
          refreshToken();
        }, 10 * 60 * 1000);
      };
      refreshToken();
    }
  }, []);

  const state = {
    token: [token, setToken],
    productsAPI: ProductsAPI(),
    userAPI: UsersAPI(token),
    CategoriesAPI: CategoriesAPI(),
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
