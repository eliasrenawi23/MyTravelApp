export { }
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.
    route('/login').
    post(UserController.login);

// router.
//     route('/Signup').
//     post(UserController);

module.exports = router;