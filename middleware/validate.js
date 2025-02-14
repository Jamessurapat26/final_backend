const { body, validationResult } = require("express-validator");

// Middleware สำหรับตรวจสอบการสร้างผู้ใช้
exports.createUser = [
    // ตรวจสอบ username
    body("username")
        .notEmpty()
        .withMessage("Username is required")
        .isLength({ min: 3 })
        .withMessage("Username must be at least 3 characters long"),

    // Middleware สำหรับส่งข้อผิดพลาดกลับไปยัง client
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next(); // ไปยัง middleware หรือ controller ถัดไป
    },
];

exports.stockQuantity = [
    body("quantity")
        .notEmpty()
        .withMessage("Stock quantity is required")
        .isNumeric()
        .withMessage("Stock quantity must be a number")
        .isInt({ min: 1 })
        .withMessage("Stock quantity must be greater than 0"),

    // Middleware for sending validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];