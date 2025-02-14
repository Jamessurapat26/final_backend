const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middleware/auth");

// Admin routes
router.post("/", authMiddleware, productController.createProduct);
router.put("/:id", authMiddleware, productController.updateProduct);
router.delete("/:id", authMiddleware, productController.deleteProduct);

// Public routes (Admin & User)
router.get("/", productController.getProducts);

module.exports = router;