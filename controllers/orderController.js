const Order = require("../model/orderModel");
const Product = require("../model/productModel");

// สั่งซื้อสินค้า (User only)
exports.createOrder = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        // ตรวจสอบสินค้าและสต็อก
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (product.stockQuantity < quantity) {
            return res.status(400).json({ message: "Insufficient stock" });
        }

        // ลดสต็อก
        product.stockQuantity -= quantity;
        await product.save();

        // สร้างคำสั่งซื้อ
        const order = new Order({
            userId: req.user.id,
            productId,
            quantity,
        });
        await order.save();

        res.status(201).json({ message: "Order created", order });
    } catch (error) {
        res.status(500).json({ message: "Error creating order", error: error.message });
    }
};

// แสดงคำสั่งซื้อของ User (User only)
exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id }).populate("productId");
        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
};