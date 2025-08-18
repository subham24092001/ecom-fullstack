import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    category: "",
    stockQuantity: "",
    releaseDate: "",
    productAvailable: false,
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    if (!product.name || !product.brand || !product.price || !product.category) {
      setMessage({ type: "danger", text: "Please fill all required fields." });
      return false;
    }
    if (!image) {
      setMessage({ type: "danger", text: "Please upload a product image." });
      return false;
    }
    return true;
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const formData = new FormData();
      formData.append("imageFile", image);
      formData.append(
        "product",
        new Blob([JSON.stringify(product)], { type: "application/json" })
      );

      const response = await axios.post("https://ecom-fullstack-rx3f.onrender.com/api/product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage({ type: "success", text: "✅ Product added successfully!" });
      console.log("Product added:", response.data);

      // Reset form
      setProduct({
        name: "",
        brand: "",
        description: "",
        price: "",
        category: "",
        stockQuantity: "",
        releaseDate: "",
        productAvailable: false,
      });
      setImage(null);
      setPreview(null);

    } catch (error) {
      console.error("Error adding product:", error);
      setMessage({ type: "danger", text: "❌ Error adding product!" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-start py-5 mt-5">
      <div className="card shadow-lg w-100" style={{ maxWidth: "700px" }}>
        <div className="card-body">
          <h3 className="text-center mb-4 fw-bold">Add New Product</h3>

          {message.text && (
            <div className={`alert alert-${message.type}`} role="alert">
              {message.text}
            </div>
          )}

          <form className="row g-3" onSubmit={submitHandler}>
            <div className="col-md-6">
              <label className="form-label">Name *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Product Name"
                name="name"
                value={product.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Brand *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Brand Name"
                name="brand"
                value={product.brand}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-12">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows="2"
                placeholder="Add product description"
                name="description"
                value={product.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Price *</label>
              <input
                type="number"
                className="form-control"
                placeholder="Eg: 1000"
                name="price"
                value={product.price}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Category *</label>
              <select
                className="form-select"
                name="category"
                value={product.category}
                onChange={handleInputChange}
              >
                <option value="">Select category</option>
                <option value="Laptop">Laptop</option>
                <option value="Headphone">Headphone</option>
                <option value="Mobile">Mobile</option>
                <option value="Electronics">Electronics</option>
                <option value="Toys">Toys</option>
                <option value="Fashion">Fashion</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">Stock Quantity</label>
              <input
                type="number"
                className="form-control"
                placeholder="Stock Remaining"
                name="stockQuantity"
                value={product.stockQuantity}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Release Date</label>
              <input
                type="date"
                className="form-control"
                name="releaseDate"
                value={product.releaseDate}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Image *</label>
              <input
                className="form-control"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {preview && (
                <div className="mt-2 text-center">
                  <img
                    src={preview}
                    alt="preview"
                    className="img-thumbnail"
                    style={{ maxHeight: "120px" }}
                  />
                </div>
              )}
            </div>

            <div className="col-12">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={product.productAvailable}
                  onChange={(e) =>
                    setProduct({ ...product, productAvailable: e.target.checked })
                  }
                />
                <label className="form-check-label">Product Available</label>
              </div>
            </div>

            <div className="col-12 d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-primary px-4"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
