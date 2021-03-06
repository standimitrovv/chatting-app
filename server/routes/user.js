const express = require('express');
const router = express.Router();

const user = require('../controllers/user');

router.post('/create-user', user.createUser);

router.get('/get-users', user.getAllUsers);

router.get('/get-user/:userId', user.getSingleUser);

router.patch('/update-user-status/:userId', user.updateUserStatus);

module.exports = router;
