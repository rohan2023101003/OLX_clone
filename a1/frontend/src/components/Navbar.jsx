import React, { useState } from "react";
import "./Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Link,useNavigate,useLocation } from "react-router-dom";

import axios from "axios";

function Navbar({ onSearch }) {
  const navigate = useNavigate(); // Hook for navigation
  const location = useLocation();

  const handleSearch = (event) => {
    onSearch(event.target.value);
  };

  const handleLogout = async () => {
    try {
      await axios.get("/user/logout", {}, { withCredentials: true }); // Call backend logout endpoint
      console.log("Logout successful");
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <a className="navbar-brand" href="/">
        Buy & Sell @IIITH
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
       <div  className="nav-item ms-3">    
            <Link to='/'
              className="btn btn-outline-success w-100"
              style={{ padding: "0.375rem 0.75rem" }}
            >
              Home
            </Link>
      </div>
      <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
        {/* Search Bar */}
        {location.pathname === '/' ? (
          <form className="d-flex mx-auto w-50">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={handleSearch}
            />
          </form>
        ) : (
          <div className="mx-auto w-50 text-center">
            <h5>Welcome</h5>
          </div>
        )}

        {/* Right Side Buttons */}
        <ul className="navbar-nav align-items-center">
          {/* Login/Dropdown */}
        
          <li className="nav-item ms-3">
             <button
              className="btn btn-outline-success w-100"
              style={{ padding: "0.375rem 0.75rem" }}
              onClick={handleLogout}
            >
              Logout
            </button>
        </li>
          <li className="nav-item ms-3">
            <Link to='/cart'
              className="btn btn-outline-success w-100"
              style={{ padding: "0.375rem 0.75rem" }}
            >
              My Cart
            </Link>
          </li>
          <li className="nav-item ms-3">
            <Link to='/profile'
              className="btn btn-outline-success w-100"
              style={{ padding: "0.375rem 0.75rem" }}
            >
              View Profile
            </Link>
          </li>
          <li className="nav-item ms-3">
            <Link to='/sell'
              className="btn btn-outline-success w-100"
              style={{ padding: "0.375rem 0.75rem" }}
            >
              Sell Products
            </Link>
          </li>
          <li className="nav-item ms-3">
            <Link to='/myProducts'
              className="btn btn-outline-success w-100"
              style={{ padding: "0.375rem 0.75rem" }}
            >
              My Products
            </Link>
          </li>
          <li className="nav-item ms-3">
            <Link to='/orders'
              className="btn btn-outline-success w-100"
              style={{ padding: "0.375rem 0.75rem" }}
            >
              Orders
            </Link>
          </li>
          <li className="nav-item ms-3">
            <Link to='/delivery'
              className="btn btn-outline-success w-100"
              style={{ padding: "0.375rem 0.75rem" }}
            >
              Delivery Items
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
