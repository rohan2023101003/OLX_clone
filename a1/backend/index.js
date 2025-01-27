const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const cors = require('cors'); // Require the cors package

// CORS options
const corsOptions = {
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true,              // Allow credentials (cookies, etc.)
};

// Apply CORS middleware with options
app.use(cors(corsOptions));


const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user');
const staticRoutes = require('./routes/static');

const {checkforAuth ,restrictTo, restrictToLoggedinUserOnly} = require('./middlewares/auth');
const { logReqRes } = require('./middlewares');
const { connectMongoDB } = require('./connection');
const itemRoutes = require('./routes/item');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');

const url = 'mongodb+srv://rohankumar992p:kcHD9XbCIDScsSik@cluster0.ijxmq.mongodb.net/a1_dass';
connectMongoDB(url);


app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkforAuth);


const file = 'log.txt';
app.use(logReqRes(file));


// Routes

app.use('/api' , staticRoutes);
// app.use('/user', restrictTo(["normal"]), userRoutes);
app.use('/user', restrictToLoggedinUserOnly,userRoutes);
app.use('/item', restrictToLoggedinUserOnly, itemRoutes);
app.use('/cart', restrictToLoggedinUserOnly, cartRoutes );
app.use('/order', restrictToLoggedinUserOnly, orderRoutes);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});