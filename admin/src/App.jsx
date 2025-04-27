import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import AddPage from "./pages/AddPage";
import LoginPage from "./pages/LoginPage";
import DeletePage from "./pages/DeletePage";
import ListProducts from "./pages/ListProducts";
import { Toaster } from "react-hot-toast";
import OrdersPage from "./pages/OrdersPage";
import UpdatePage from "./pages/UpdatePage";

function App() {
  return (
    <>
      <Toaster/>
      
        <Navbar />
        <div className="pt-6 bg-white-primary min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add" element={<AddPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/delete" element={<DeletePage />} />
            <Route path="/products" element={<ListProducts />} />
            <Route path="/orders" element={<OrdersPage/>} />
            <Route path="/product/update/:id" element={<UpdatePage/>}/>
          </Routes>
        </div>
      
    </>
  );
}

export default App;
