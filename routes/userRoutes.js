const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require("../middleware/auth");
const validator = require("../middleware/validate");

const router = express.Router();

router.post('/', validator.createUser, userController.register);
router.get('/', authMiddleware, userController.getAllUsers);
router.delete('/:id', authMiddleware, userController.deleteUser);
router.put('/:id', userController.updateUser);
router.post('/login', userController.login);

module.exports = router;