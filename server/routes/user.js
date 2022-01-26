const express = require('express');
const router = express.Router();

const user = require('../controllers/user');

router.post('/create-user', user.createUser);

router.get('/get-users', user.getAllUsers)

module.exports = router;
