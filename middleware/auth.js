const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    // ดึง Token จาก header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    // ตรวจสอบว่ามี Token หรือไม่
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        // ตรวจสอบ Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // เก็บข้อมูลผู้ใช้ใน req.user
        next(); // ไปยัง middleware หรือ route ถัดไป
    } catch (error) {
        res.status(400).json({ message: "Invalid token." });
    }
};

module.exports = authMiddleware;