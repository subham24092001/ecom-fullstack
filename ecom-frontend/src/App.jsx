import "./App.css";
import React, { useState } from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Cart from "./components/Cart";
import AddProduct from "./components/AddProduct";
import Product from "./components/Product";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./Context/Context";
import UpdateProduct from "./components/UpdateProduct";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <AppProvider>
      <div className="d-flex flex-column min-vh-100">
        <BrowserRouter>
          <Navbar onSelectCategory={handleCategorySelect} />
          <main className="flex-grow-1">
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    addToCart={addToCart}
                    selectedCategory={selectedCategory}
                  />
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/add_product" element={<AddProduct />} />
              <Route path="/product" element={<Product />} />
              <Route path="product/:id" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route
                path="/product/update/:id"
                element={<UpdateProduct />}
              />
            </Routes>
          </main>
          <footer className="bg-dark text-light text-center small py-2">
            &copy; {new Date().getFullYear()} My E-Commerce App
          </footer>
        </BrowserRouter>
      </div>
    </AppProvider>
  );
}

export default App;
