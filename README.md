# 🛒 Basic E-Commerce Backend API

A RESTful API backend for an e-commerce application built with **Node.js**, **Express.js**, and **MongoDB**. Features JWT authentication, role-based access control, and comprehensive CRUD operations.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

---

## ✨ Features

- 🔐 **JWT Authentication** - Secure token-based authentication
- 👥 **Role-Based Access Control** - Admin and User roles with different permissions
- 🛡️ **Input Validation** - Request validation using express-validator
- 🔒 **Password Hashing** - Secure password storage with bcrypt
- 📦 **Product Management** - Full CRUD operations for products (Admin only)
- 🛍️ **Order System** - Users can place orders with automatic stock management
- 👤 **User Management** - Registration, login, and user CRUD operations

---

## 🏗️ Project Structure

```
final_backend/
├── controllers/
│   ├── userController.js      # User authentication & CRUD logic
│   ├── productController.js   # Product management logic
│   └── orderController.js     # Order processing logic
├── db/
│   └── mongodb.js             # MongoDB connection configuration
├── middleware/
│   ├── auth.js                # JWT authentication middleware
│   └── validate.js            # Request validation middleware
├── model/
│   ├── userModel.js           # User schema
│   ├── productModel.js        # Product schema
│   └── orderModel.js          # Order schema
├── routes/
│   ├── userRoutes.js          # User API endpoints
│   ├── productRoutes.js       # Product API endpoints
│   └── orderRoutes.js         # Order API endpoints
├── server.js                  # Application entry point
├── package.json
└── .env                       # Environment variables (not in repo)
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Jamessurapat26/final_backend.git
   cd final_backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGO_URL=mongodb://localhost:27017/your_database
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   node server.js
   ```

---

## 📡 API Endpoints

### 🔑 Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/users` | Register new user | ❌ |
| `POST` | `/users/login` | Login user | ❌ |

### 👤 Users

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/users` | Get all users | ✅ Admin |
| `PUT` | `/users/:id` | Update user | ❌ |
| `DELETE` | `/users/:id` | Delete user | ✅ Admin |

### 📦 Products

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/products` | Get all products | ❌ |
| `POST` | `/products` | Create product | ✅ Admin |
| `PUT` | `/products/:id` | Update product | ✅ Admin |
| `DELETE` | `/products/:id` | Delete product | ✅ Admin |

### 🛍️ Orders

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/orders` | Create order | ✅ User |
| `GET` | `/orders/my-orders` | Get user's orders | ✅ User |

---

## 📝 API Usage Examples

### Register User
```bash
curl -X POST http://localhost:5000/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "password": "securepassword123"
  }'
```

### Create Product (Admin)
```bash
curl -X POST http://localhost:5000/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Product Name",
    "description": "Product description",
    "price": 99.99,
    "stockQuantity": 100
  }'
```

### Create Order (User)
```bash
curl -X POST http://localhost:5000/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "productId": "PRODUCT_ID",
    "quantity": 2
  }'
```

---

## 🗄️ Data Models

### User
```javascript
{
  username: String,     // Required, unique
  email: String,        // Required, unique
  password: String,     // Required, hashed
  role: String,         // 'user' or 'admin' (default: 'user')
  createdAt: Date
}
```

### Product
```javascript
{
  name: String,         // Required
  description: String,  // Required
  price: Number,        // Required
  stockQuantity: Number,// Required (default: 0)
  createdAt: Date
}
```

### Order
```javascript
{
  userId: ObjectId,     // Reference to User
  productId: ObjectId,  // Reference to Product
  quantity: Number,     // Required
  orderedAt: Date
}
```

---

## 🔧 Technologies Used

| Technology | Purpose |
|------------|---------|
| **Express.js** | Web framework |
| **MongoDB** | Database |
| **Mongoose** | ODM for MongoDB |
| **JWT** | Authentication |
| **bcrypt** | Password hashing |
| **express-validator** | Input validation |
| **cors** | Cross-origin resource sharing |
| **dotenv** | Environment variables |

---

## 🛡️ Security Features

- ✅ Password hashing with bcrypt (salt rounds: 10)
- ✅ JWT token authentication with 1-hour expiration
- ✅ Role-based access control (Admin/User)
- ✅ Input validation and sanitization
- ✅ Protected routes with authentication middleware

---

## 📫 Contact

**James Surapat** - [@Jamessurapat26](https://github.com/Jamessurapat26)

Project Link: [https://github.com/Jamessurapat26/final_backend](https://github.com/Jamessurapat26/basic-ecommerce-api)

