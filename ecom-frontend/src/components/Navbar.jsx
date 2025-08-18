import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Navbar = ({ onSelectCategory }) => {
  const getInitialTheme = () => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? storedTheme : "light-theme";
  };

  const [selectedCategory, setSelectedCategory] = useState("");
  const [theme, setTheme] = useState(getInitialTheme());
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://ecom-fullstack-rx3f.onrender.com/api/products");
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = async (value) => {
    setInput(value);
    if (value.length >= 1) {
      setShowSearchResults(true);
      try {
        const response = await axios.get(
          `https://ecom-fullstack-rx3f.onrender.com/api/products/search?keyword=${value}`
        );
        setSearchResults(response.data);
        setNoResults(response.data.length === 0);
      } catch (error) {
        console.error("Error searching:", error);
      }
    } else {
      setShowSearchResults(false);
      setSearchResults([]);
      setNoResults(false);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark-theme" ? "light-theme" : "dark-theme";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const categories = [
    "Laptop",
    "Headphone",
    "Mobile",
    "Electronics",
    "Toys",
    "Fashion",
  ];

  return (
    <header>
      <nav className={`navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm ${theme === "dark-theme" ? "navbar-dark bg-dark" : "navbar-light bg-light"}`}>
        <div className="container-fluid">
          {/* Brand */}
          <a className="navbar-brand fw-bold" href="/">
            E-Store
          </a>

          {/* Toggler for small screens */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible content */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* Left Links */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/add_product">
                  Add Product
                </a>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </a>
                <ul className="dropdown-menu">
                  {categories.map((category) => (
                    <li key={category}>
                      <button
                        className="dropdown-item"
                        onClick={() => handleCategorySelect(category)}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>

            {/* Right Side Controls */}
            <div className="d-flex align-items-center gap-3">
              {/* Theme toggle */}
              <button className="btn btn-outline-secondary btn-sm" onClick={toggleTheme}>
                {theme === "dark-theme" ? (
                  <i className="bi bi-moon-fill"></i>
                ) : (
                  <i className="bi bi-sun-fill"></i>
                )}
              </button>

              {/* Cart */}
              <a href="/cart" className="btn btn-outline-dark btn-sm d-flex align-items-center">
                <i className="bi bi-cart me-1"></i> Cart
              </a>

                {/* Login/Signup */}
              <Link to="/login" className="btn btn-outline-primary btn-sm">Login</Link>
              <Link to="/signup" className="btn btn-outline-success btn-sm">Sign Up</Link>

              {/* Search */}
              <div className="position-relative">
                <input
                  className="form-control form-control-sm"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={input}
                  onChange={(e) => handleChange(e.target.value)}
                />
                {showSearchResults && (
                  <ul
                    className="list-group position-absolute w-100 mt-1"
                    style={{ zIndex: 1000, maxHeight: "200px", overflowY: "auto" }}
                  >
                    {searchResults.length > 0 ? (
                      searchResults.map((result) => (
                        <li key={result.id} className="list-group-item p-2">
                          <a
                            href={`/product/${result.id}`}
                            className="text-decoration-none text-dark"
                          >
                            {result.name}
                          </a>
                        </li>
                      ))
                    ) : (
                      noResults && (
                        <li className="list-group-item text-muted">
                          No Product Found
                        </li>
                      )
                    )}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

