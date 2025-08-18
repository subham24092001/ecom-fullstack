import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateProduct = ({ theme }) => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [image, setImage] = useState();
  const [updateProduct, setUpdateProduct] = useState({
    id: null,
    name: "",
    description: "",
    brand: "",
    price: "",
    category: "",
    releaseDate: "",
    productAvailable: false,
    stockQuantity: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://ecom-fullstack-rx3f.onrender.com/api/product/${id}`
        );
        setProduct(response.data);

        const responseImage = await axios.get(
          `https://ecom-fullstack-rx3f.onrender.com/api/product/${id}/image`,
          { responseType: "blob" }
        );
        const imageFile = await converUrlToFile(responseImage.data, response.data.imageName);
        setImage(imageFile);
        setUpdateProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const converUrlToFile = async (blobData, fileName) => {
    return new File([blobData], fileName, { type: blobData.type });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateProduct({ ...updateProduct, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProduct = new FormData();
    updatedProduct.append("imageFile", image);
    updatedProduct.append(
      "product",
      new Blob([JSON.stringify(updateProduct)], { type: "application/json" })
    );

    try {
      await axios.put(`https://ecom-fullstack-rx3f.onrender.com/api/product/${id}`, updatedProduct, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Product updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update product.");
    }
  };

  return (
    <div className={`update-product-container ${theme === 'dark' ? 'theme-dark' : 'theme-light'}`}>
      <div className="center-container" style={{ marginTop: "3rem" }}>
        <h1 
          className="page-title"
          style={{ color: theme === "dark" ? "#f8f9fa" : "#212529" }}
        >
          Update Product
        </h1>

        <form className="row g-3 pt-1" onSubmit={handleSubmit}>

          {/* Name */}
          <div className="col-md-6">
            <label 
              className="form-label themed-label"
              style={{ color: theme === "dark" ? "#f8f9fa" : "#212529" }}
            >
              <h6 style={{ color: theme === "dark" ? "#f8f9fa" : "#212529" }}>Name</h6>
            </label>
            <input
              type="text"
              className="form-control themed-input"
              placeholder="Enter product name"
              value={updateProduct.name}
              onChange={handleChange}
              name="name"
            />
          </div>

          {/* Brand */}
          <div className="col-md-6">
            <label 
              className="form-label themed-label"
              style={{ color: theme === "dark" ? "#f8f9fa" : "#212529" }}
            >
              <h6 style={{ color: theme === "dark" ? "#f8f9fa" : "#212529" }}>Brand</h6>
            </label>
            <input
              type="text"
              name="brand"
              className="form-control themed-input"
              placeholder="Enter brand"
              value={updateProduct.brand}
              onChange={handleChange}
            />
          </div>

          {/* Description */}
          <div className="col-12">
            <label 
              className="form-label themed-label"
              style={{ color: theme === "dark" ? "#f8f9fa" : "#212529" }}
            >
              <h6 style={{ color: theme === "dark" ? "#f8f9fa" : "#212529" }}>Description</h6>
            </label>
            <input
              type="text"
              name="description"
              className="form-control themed-input"
              placeholder="Enter description"
              value={updateProduct.description}
              onChange={handleChange}
            />
          </div>

          {/* Price */}
          <div className="col-5">
            <label 
              className="form-label themed-label"
              style={{ color: theme === "dark" ? "#f8f9fa" : "#212529" }}
            >
              <h6 style={{ color: theme === "dark" ? "#f8f9fa" : "#212529" }}>Price</h6>
            </label>
            <input
              type="number"
              name="price"
              className="form-control themed-input"
              placeholder="Enter price"
              value={updateProduct.price}
              onChange={handleChange}
            />
          </div>

          {/* Category */}
          <div className="col-md-6">
            <label 
              className="form-label themed-label"
              style={{ color: theme === "dark" ? "#f8f9fa" : "#212529" }}
            >
              <h6 style={{ color: theme === "dark" ? "#f8f9fa" : "#212529" }}>Category</h6>
            </label>
            <select
              name="category"
              className="form-select themed-input"
              value={updateProduct.category}
              onChange={handleChange}
            >
              <option value="">Select category</option>
              <option value="laptop">Laptop</option>
              <option value="headphone">Headphone</option>
              <option value="mobile">Mobile</option>
              <option value="electronics">Electronics</option>
              <option value="toys">Toys</option>
              <option value="fashion">Fashion</option>
            </select>
          </div>

          {/* Stock Quantity */}
          <div className="col-md-4">
            <label 
              className="form-label themed-label"
              style={{ color: theme === "dark" ? "#f8f9fa" : "#212529" }}
            >
              <h6 style={{ color: theme === "dark" ? "#f8f9fa" : "#212529" }}>Stock Quantity</h6>
            </label>
            <input
              type="number"
              name="stockQuantity"
              className="form-control themed-input"
              placeholder="Enter stock quantity"
              value={updateProduct.stockQuantity}
              onChange={handleChange}
            />
          </div>

          {/* Image */}
          <div className="col-md-8">
            <label 
              className="form-label themed-label"
              style={{ color: theme === "dark" ? "#f8f9fa" : "#212529" }}
            >
              <h6 style={{ color: theme === "dark" ? "#f8f9fa" : "#212529" }}>Image</h6>
            </label>
            <img
              src={image ? URL.createObjectURL(image) : ""}
              alt="Preview"
              className="preview-image mb-2"
              style={{ width: "100%", height: "180px", objectFit: "cover" }}
            />
            <input
              type="file"
              className="form-control themed-input"
              onChange={handleImageChange}
            />
          </div>

          {/* Checkbox */}
          <div className="col-12 form-check">
            <input
              type="checkbox"
              name="productAvailable"
              checked={updateProduct.productAvailable}
              onChange={(e) =>
                setUpdateProduct({ ...updateProduct, productAvailable: e.target.checked })
              }
              className="form-check-input themed-checkbox"
            />
            <label 
              className="form-check-label themed-label"
              style={{ color: theme === "dark" ? "#f8f9fa" : "#212529" }}
            >
              Product Available
            </label>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary themed-submit-btn">
              Submit
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;