import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CollectionsPage from "./pages/CollectionsPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import ProductPage from "./pages/ProductPage";
import Roufh from "./pages/Roufh";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import StatusUpdatePage from "./pages/StatusUpdatePage";
import OrderCanceledPage from "./pages/OrderCanceledPage";



function App() {
  return (
    <>
      <div>
        <Toaster />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/x" element={<Roufh />} />
          <Route path="/placeOrder" element={<PlaceOrder />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/status/update/:id" element={<StatusUpdatePage />} />
          <Route path="/status/delete/:id" element={<OrderCanceledPage />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
