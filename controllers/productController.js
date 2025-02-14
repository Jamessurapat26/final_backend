const Product = require("../model/productModel");

// สร้างสินค้า (Admin only)
exports.createProduct = async (req, res) => {
    try {
        // ตรวจสอบบทบาท
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admin only." });
        }

        const { name, description, price, stockQuantity } = req.body;
        const product = new Product({ name, description, price, stockQuantity });
        await product.save();

        res.status(201).json({ message: "Product created", product });
    } catch (error) {
        res.status(500).json({ message: "Error creating product", error: error.message });
    }
};

// อัปเดตสินค้า (Admin only)
exports.updateProduct = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admin only." });
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product updated", product });
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error: error.message });
    }
};

// ลบสินค้า (Admin only)
exports.deleteProduct = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admin only." });
        }

        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error: error.message });
    }
};

// แสดงสินค้าทั้งหมด (Admin & User)
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }
};