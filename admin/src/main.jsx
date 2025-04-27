import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import OrderContextProvider from "./context/OrdersContext";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <OrderContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </OrderContextProvider>
  </React.StrictMode>
);
