# KiranaWala - Online Grocery Management System

A web-based platform connecting local store owners with customers for convenient online grocery shopping.

## Features

### For Customers
- User registration and authentication
- Browse local stores
- View store products
- Place orders online

### For Store Owners
- Store registration and management
- Product inventory management
- Order management
- Store profile customization

## Tech Stack
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/kiranawala.git
   ```
2. Install dependencies:
   ```bash
   cd kiranawala
   npm install
   ```
3. Create a `.env` file in the root directory and add your configuration:
   ```env
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   PORT=3000
   ```
4. Start the server:
   ```bash
   npm start
   ```
5. The application will be available at `http://localhost:3000`

## Project Structure
```
KiranaWala/
│── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── config/
│   └── server.js
│── frontend/
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│── .env
│── package.json
│── README.md
```

## API Endpoints

### Customer Routes
- `POST /api/customer/register` - Register new customer
- `POST /api/customer/login` - Customer login

### Store Routes
- `POST /api/store/register` - Register new store
- `POST /api/store/login` - Store owner login

## Contributing

1. Fork the repository
2. Create your feature branch:
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request


## Contact
E-Mail : jaineeshpatel73@gmail.com  
Project Link: [https://github.com/yourusername/kiranawala](https://github.com/yourusername/kiranawala)

