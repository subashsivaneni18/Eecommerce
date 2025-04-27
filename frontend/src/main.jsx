import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ShopContextProvider from "../context/ShopContext";
import CurrentUserContextProvider from "../context/CurrenUserContext";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CurrentUserContextProvider>
        <ShopContextProvider>
          <App />
        </ShopContextProvider>
      </CurrentUserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
