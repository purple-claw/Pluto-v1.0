const express = require('express')

const router = express.Router();
const userCon = require('../controllers/authCon');

router
.route('/')
.get(userCon.getUser)
.post(userCon.registerUser)

module.exports = router;