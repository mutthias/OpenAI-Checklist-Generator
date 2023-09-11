const express = require('express');
const router = express.Router();

// Controllers
const { SignupUser, LoginUser } = require('../controllers/userController');

// Login Request
router.post('/login', LoginUser)

// Signup Request
router.post('/signup', SignupUser)


module.exports = router;
