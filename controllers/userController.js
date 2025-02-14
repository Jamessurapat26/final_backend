const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const passport = require("passport");

const jwt = require("jsonwebtoken");

//register new user
exports.register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // ตรวจสอบว่ามีผู้ใช้อยู่แล้วหรือไม่
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // กำหนด role เริ่มต้นเป็น 'user' หากไม่ระบุ role
        const userRole = role || 'user';

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // สร้างผู้ใช้ใหม่
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: userRole // กำหนด role
        });

        const savedUser = await newUser.save();

        // ส่งข้อมูลผู้ใช้กลับ (ไม่รวม password)
        const userResponse = {
            id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email,
            role: savedUser.role
        };

        res.status(201).json({
            message: 'User registered successfully',
            user: userResponse
        });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

// Login user
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // ค้นหาผู้ใช้
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // ตรวจสอบรหัสผ่าน
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // สร้าง JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role }, // payload
            process.env.JWT_SECRET, // secret key
            { expiresIn: "1h" } // token expiration
        );

        // ส่งข้อมูลผู้ใช้และ token กลับ
        const userResponse = {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        };

        res.status(200).json({
            message: "Login successful",
            user: userResponse,
            token, // ส่ง token กลับไปให้ผู้ใช้
        });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};

// Get all users (Admin only)
exports.getAllUsers = async (req, res) => {
    try {
        // Check if user is admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                message: 'Access denied. Admin privileges required.'
            });
        }

        const users = await User.find().select('-password');
        res.status(200).json({
            message: 'Users retrieved successfully',
            count: users.length,
            users
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching users',
            error: error.message
        });
    }
};
// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
};

// Update user
exports.updateUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const updates = {};

        if (username) updates.username = username;
        if (email) updates.email = email;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updates.password = await bcrypt.hash(password, salt);
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User updated successfully',
            user
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        // ตรวจสอบบทบาทของผู้ใช้
        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "Access denied. Admin privileges required.",
            });
        }

        // ค้นหาและลบผู้ใช้
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // ส่งข้อความสำเร็จกลับ
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
};