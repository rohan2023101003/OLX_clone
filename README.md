# Buy, Sell @ IIITH

## Problem Statement

This project implements a dedicated Buy-Sell website exclusively for the IIIT Community. The platform was created as an alternative to existing Buy-Sell groups on messaging platforms like Whatscap, which now charge a 10% tax on transaction profits.

The website is built using the MERN stack:
- MongoDB for Database
- Express.js for Backend implementing REST API
- React for Frontend
- Node.js as the runtime environment

## Features

### User Authentication
- User registration with validation (only IIIT email addresses allowed)
- Secure login with password hashing
- Persistent sessions
- Protected routes using JWT authentication
- Logout functionality

### User Profile
- View and edit user details
- Display personal information
- Track items added to cart

### Item Listings
- Browse all items being sold by IIIT community members
- Search functionality for finding specific items (case-insensitive)
- Category-based filtering system
- Detailed item pages with descriptions

### Shopping Cart
- Add items to personal cart
- View all items in cart
- Remove items from cart
- Calculate total cost
- Place orders for all items in cart

### Order Management
- Separate interfaces for buyers and sellers
- Track pending orders as a buyer
- OTP-based verification system for order completion
- View order history (both bought and sold items)

### Transaction System
- Secure transaction closure using OTPs
- Complete order history tracking
- Prevent users from buying their own items

## Setup Instructions

### Prerequisites
- Node.js
- MongoDB
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
```
cd backend
```

2. Install dependencies:
```
npm install
```

3. Create a `.env` file with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

4. Start the server:
```
npm start
```

### Frontend Setup
1. Navigate to the frontend directory:
```
cd frontend
```

2. Install dependencies:
```
npm install
```

3. Create a `.env` file with the following variables:
```
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the development server:
```
npm start
```

## Technologies Used
- MongoDB: Database
- Express.js: Backend framework
- React.js: Frontend library
- Node.js: JavaScript runtime
- JWT: Authentication
- bcrypt.js: Password hashing

