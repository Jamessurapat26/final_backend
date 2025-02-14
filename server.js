const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db/mongodb'); // นำเข้าไฟล์เชื่อมต่อ MongoDB
// เชื่อมต่อ MongoDB
connectDB();

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);


// Routes
app.get('/', (req, res) => {

    resp = {
        "status": "success",
        "message": "Welcome to the API Server is running",
        "version": "1.0.0"
    }
    res.send(resp);
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});