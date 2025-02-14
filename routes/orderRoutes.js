const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/auth");
const validator = require("../middleware/validate");

// User routes
router.post("/", authMiddleware, validator.stockQuantity, orderController.createOrder);
router.get("/my-orders", authMiddleware, orderController.getMyOrders);

module.exports = router;