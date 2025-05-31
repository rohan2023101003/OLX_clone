import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import CategoryFilter from './components/CategoryFilter';
import Cart from './components/Cart';
import Profile from './components/Profile';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { fetchUserData } from './components/Api';
import Signup from './components/Signup';
import Sell from './components/Sell';
import MyProducts from './components/MyProducts';
import Orders from './components/Orders';
import Delivery from './components/Delivery';

// const categories = ['Electronics', 'Books', 'Clothing', 'Home', 'Toys']; // Example categories


const categories = [
  "Clothing",                // 0
  "Grocery",                 // 1
  "Electronics",             // 2
  "Stationery",              // 3
  "Books",                   // 4
  "Home Appliances",         // 5
  "Furniture",               // 6
  "Sports Equipment",        // 7
  "Accessories",             // 8
  "Footwear",                // 9
  "Bags",                    // 10
  "Food & Beverages",        // 11
  "Toys & Games",            // 12
  "Beauty & Personal Care",  // 13
  "Health & Wellness",       // 14
  "Musical Instruments",     // 15
  "Art & Craft Supplies",    // 16
  "Event Tickets",           // 17
  "Project Components",      // 18
  "Tech Accessories",        // 19
  "Pre-owned Items",         // 20
  "IIIT Merchandise",        // 21
  "Mobile Accessories",      // 22
  "Garden Supplies",         // 23
  "Pet Supplies",            // 24
  "Automobile Accessories",  // 25
  "Gaming Accessories",      // 26
  "Kitchenware",             // 27
  "Baby Products",           // 28
  "Office Supplies",         // 29
  "Travel Essentials",       // 30
  "Collectibles",            // 31
  "Handmade Items",          // 32
  "Rental Services",         // 33
  "Fitness Equipment",       // 34
  "Photography Gear",        // 35
  "Decorative Items"         // 36
];





function App() {
  const [LoggedInUser, setLoggedInUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  const fetchProfile = async () => {
    try {
      const data = await fetchUserData();
      setLoggedInUser(data.LoggedInUser);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category, isChecked) => {
    setSelectedCategories((prevSelectedCategories) =>
      isChecked
        ? [...prevSelectedCategories, category]
        : prevSelectedCategories.filter((c) => c !== category)
    );
  };

  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                 <Navbar onSearch={handleSearch} />
                <div>
                  <div className="message">
                    <p>Available Products to Buy</p>
                  </div>
                  <CategoryFilter
                    categories={categories}
                    selectedCategories={selectedCategories}
                    onCategoryChange={handleCategoryChange}
                  />
                  <Products searchQuery={searchQuery} selectedCategories={selectedCategories} />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                 <Navbar onSearch={handleSearch} />
                <div>
                  <Products searchQuery={searchQuery} selectedCategories={selectedCategories} />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/:id"
            element={
              <ProtectedRoute>
                 <Navbar onSearch={handleSearch} />
                <div>
                  <ProductDetails />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                 <Navbar onSearch={handleSearch} />
                <div>
                  <Cart />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                 <Navbar onSearch={handleSearch} />
                <div>
                  <Profile LoggedInUser={LoggedInUser} setLoggedInUser={setLoggedInUser} />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/sell"
            element={
              <ProtectedRoute>
                 <Navbar onSearch={handleSearch} />
                <div>
                  <Sell />
                </div>
              </ProtectedRoute>
            }    
            />   
          <Route
            path="/myProducts"
            element={
              <ProtectedRoute>
                 <Navbar onSearch={handleSearch} />
                <div>
                  <MyProducts />
                </div>
              </ProtectedRoute>
            }
          /> 
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                 <Navbar onSearch={handleSearch} />
                <div>
                  <Orders />
                </div>
              </ProtectedRoute>
            }
          />  
          <Route
            path="/delivery"
            element={
              <ProtectedRoute>
                 <Navbar onSearch={handleSearch} />
                <div>
                  <Delivery />
                </div>
              </ProtectedRoute>
            }
          />  
        </Routes>
      </Router>
      {LoggedInUser ? (
        <div>
          <h1>Hello, {LoggedInUser.first_name}</h1>
          <h2>Email: {LoggedInUser.email}</h2>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

export default App;