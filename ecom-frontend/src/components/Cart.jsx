import React, { useContext, useState, useEffect } from "react";
import AppContext from "../Context/Context";
import axios from "axios";
import CheckoutPopup from "./CheckoutPopup";
import { Button, Image } from "react-bootstrap";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(AppContext);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartImage, setCartImage] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
  const fetchImagesAndUpdateCart = async () => {
    try {
      const response = await axios.get("https://ecom-fullstack-rx3f.onrender.com/api/products");
      const backendProductIds = response.data.map((product) => product.id);

      const updatedCartItems = cart.filter((item) =>
        backendProductIds.includes(item.id)
      );

      const cartItemsWithImages = await Promise.all(
        updatedCartItems.map(async (item) => {
          try {
            const res = await axios.get(
              `https://ecom-fullstack-rx3f.onrender.com/api/product/${item.id}/image`,
              { responseType: "blob" }
            );
            const imageFile = new File([res.data], `${item.name}.png`, {
              type: res.data.type,
            });

            const imageUrl = URL.createObjectURL(res.data);

            return { ...item, imageUrl, imageFile }; // store both
          } catch (error) {
            console.error("Error fetching image:", error);
            return { ...item, imageUrl: "placeholder-image-url" };
          }
        })
      );

      setCartItems(cartItemsWithImages);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  if (cart.length) fetchImagesAndUpdateCart();
}, [cart]);


  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [cartItems]);

  const handleIncrease = (id) =>
    setCartItems(cartItems.map(item => 
      item.id === id && item.quantity < item.stockQuantity 
      ? {...item, quantity: item.quantity + 1} : item
    ));

  const handleDecrease = (id) =>
    setCartItems(cartItems.map(item => 
      item.id === id && item.quantity > 1
      ? {...item, quantity: item.quantity - 1} : item
    ));

  const handleRemove = (id) => {
    removeFromCart(id);
    setCartItems(cartItems.filter(item => item.id !== id));
  };

const handleCheckout = async () => {
  try {
    for (const item of cartItems) {
      const { imageUrl, imageFile, quantity, ...rest } = item;
      const updatedStockQuantity = item.stockQuantity - item.quantity;

      const updatedProductData = { ...rest, stockQuantity: updatedStockQuantity };

      const cartProduct = new FormData();
      if (imageFile) cartProduct.append("imageFile", imageFile);
      cartProduct.append(
        "product",
        new Blob([JSON.stringify(updatedProductData)], { type: "application/json" })
      );

      await axios.put(`https://ecom-fullstack-rx3f.onrender.com/api/product/${item.id}`, cartProduct, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    clearCart();
    setCartItems([]);
    setShowModal(false);
    alert("✅ Checkout successful!");
  } catch (error) {
    console.error("Error during checkout:", error);
    alert("❌ Checkout failed. Try again!");
  }
};

return (
  <div className="cart-main-container mt-5">
  
    <h3 className="cart-header">🛒 Shopping Cart</h3>

    <div className="cart-content">
      {cartItems.length === 0 ? (
        
        <div className="cart-empty-container text-center" style={{ padding: "2rem" }}>
          <h4>Your cart is empty 😔</h4>
          <p>Add items to see them here!</p>
        </div>
      ) : (
        
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <Image src={item.imageUrl} alt={item.name} className="cart-item-img" />
                <div className="cart-item-details">
                  <h5>{item.name}</h5>
                  <p className="text-muted">{item.brand}</p>
                  <p className="cart-price">${item.price}</p>
                </div>
                <div className="cart-item-actions">
                  <Button size="sm" onClick={() => handleDecrease(item.id)}>-</Button>
                  <span className="quantity">{item.quantity}</span>
                  <Button size="sm" onClick={() => handleIncrease(item.id)}>+</Button>
                  <Button variant="danger" size="sm" onClick={() => handleRemove(item.id)}>🗑</Button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h4>Order Summary</h4>
            <p>Total: <strong>${totalPrice}</strong></p>
            <Button onClick={() => setShowModal(true)} className="checkout-btn">
              Proceed to Checkout
            </Button>
          </div>
        </>
      )}
    </div>

    <CheckoutPopup
      show={showModal}
      handleClose={() => setShowModal(false)}
      cartItems={cartItems}
      totalPrice={totalPrice}
      handleCheckout={handleCheckout}
    />
  </div>
);

};


export default Cart;

