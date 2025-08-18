import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AppContext from "../Context/Context";
import unplugged from "../assets/unplugged.png";

const Home = ({ selectedCategory }) => {
  const { data, isError, addToCart, refreshData } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 

  useEffect(() => {
    if (!isDataFetched) {
      refreshData();
      setIsDataFetched(true);
    }
  }, [refreshData, isDataFetched]);

  useEffect(() => {
    if (data && data.length > 0) {
      const fetchImagesAndUpdateProducts = async () => {
        const updatedProducts = await Promise.all(
          data.map(async (product) => {
            try {
              const response = await axios.get(
                `http://localhost:8080/api/product/${product.id}/image`,
                { responseType: "blob" }
              );
              const imageUrl = URL.createObjectURL(response.data);
              return { ...product, imageUrl };
            } catch (error) {
              console.error("Error fetching image for product ID:", product.id, error);
              return { ...product, imageUrl: "placeholder-image-url" };
            }
          })
        );
        setProducts(updatedProducts);
      };

      fetchImagesAndUpdateProducts();
    }
  }, [data]);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  if (isError) {
    return (
      <h2 className="text-center" style={{ padding: "18rem" }}>
        <img src={unplugged} alt="Error" style={{ width: "100px", height: "100px" }} />
      </h2>
    );
  }

  return (
    <>
      {/* Pagination Controls (TOP) */}
      {filteredProducts.length > itemsPerPage && (
        <div style={{ display: "flex", justifyContent: "center", margin: "20px", marginTop:"90px"}}>
          <button onClick={handlePrev} disabled={currentPage === 1} style={{ marginRight: "10px" }}>
            Prev
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageClick(index + 1)}
              style={{
                margin: "0 5px",
                fontWeight: currentPage === index + 1 ? "bold" : "normal",
                textDecoration: currentPage === index + 1 ? "underline" : "none",
              }}
            >
              {index + 1}
            </button>
          ))}
          <button onClick={handleNext} disabled={currentPage === totalPages} style={{ marginLeft: "10px" }}>
            Next
          </button>
        </div>
      )}

      {/* Product Grid */}
      <div
        className="grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          padding: "20px",
          marginTop: "50px"
        }}
      >
        {currentItems.length === 0 ? (
          <h2 style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            No Products Available
          </h2>
        ) : (
          currentItems.map((product) => {
            const { id, brand, name, price, productAvailable, imageUrl } = product;
            return (
              <div
                className="card mb-3"
                style={{
                  width: "250px",
                  height: "360px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  borderRadius: "10px",
                  overflow: "hidden",
                  backgroundColor: productAvailable ? "#fff" : "#ccc",
                  display: "flex",
                  flexDirection: "column",
                }}
                key={id}
              >
                <Link to={`/product/${id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <img
                    src={imageUrl}
                    alt={name}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "10px 10px 0 0",
                    }}
                  />
                  <div className="card-body" style={{ padding: "10px", flexGrow: 1 }}>
                    <div>
                      <h5 style={{ margin: "0 0 10px 0" }}>{name.toUpperCase()}</h5>
                      <i style={{ fontStyle: "italic", fontSize: "0.8rem" }}>{"~ " + brand}</i>
                    </div>
                    <hr style={{ margin: "10px 0" }} />
                    <h5 style={{ fontWeight: "600", fontSize: "1.1rem" }}>
                      <i className="bi bi-currency-rupee"></i>
                      {price}
                    </h5>
                    <button
                      className="btn-hover color-9"
                      style={{ marginTop: "10px" }}
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(product);
                      }}
                      disabled={!productAvailable}
                    >
                      {productAvailable ? "Add to Cart" : "Out of Stock"}
                    </button>
                  </div>
                </Link>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination Controls (BOTTOM) */}
      {filteredProducts.length > itemsPerPage && (
        <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
          <button onClick={handlePrev} disabled={currentPage === 1} style={{ marginRight: "10px" }}>
            Prev
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageClick(index + 1)}
              style={{
                margin: "0 5px",
                fontWeight: currentPage === index + 1 ? "bold" : "normal",
                textDecoration: currentPage === index + 1 ? "underline" : "none",
              }}
            >
              {index + 1}
            </button>
          ))}
          <button onClick={handleNext} disabled={currentPage === totalPages} style={{ marginLeft: "10px" }}>
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default Home;
