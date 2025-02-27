const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL); // ลบ useNewUrlParser และ useUnifiedTopology
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); // ออกจากกระบวนการหากเชื่อมต่อไม่สำเร็จ
    }
};

module.exports = connectDB;