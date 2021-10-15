//Express
const express = require('express');
const app = express();
//MongoDB 
const mongoose = require('mongoose');
//ENV
const dotenv = require('dotenv');

//Routes
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const stripeRoute = require('./routes/stripe');

//CORS
const cors = require('cors');
//ENV Initialize
dotenv.config();

//MongoDB Initialize
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Database connected")
}).catch((err)=>console.log("something went wrong with database " + err))

//EndPoints
app.use(cors())
app.use(express.json())
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

//Server Listen
app.listen(process.env.PORT || 5000, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})