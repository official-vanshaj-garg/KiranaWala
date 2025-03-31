const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const customerRoutes = require('./routes/customerRoutes');
const storeRoutes = require('./routes/storeRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../views')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB successfully');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

// API Routes
app.use('/api/customer', customerRoutes);
app.use('/api/store', storeRoutes); // Make sure this line is present

// Page Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

app.get('/customer/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/customer/login.html'));
});

app.get('/customer/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/customer/register.html'));
});

app.get('/customer/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/customer/dashboard.html'));
});

app.get('/store-owner/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/store-owner/login.html'));
});

app.get('/store-owner/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/store-owner/register.html'));
});

app.get('/store-owner/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/store-owner/dashboard.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});