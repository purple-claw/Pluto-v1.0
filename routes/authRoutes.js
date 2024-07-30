const express = require('express')

const router = express.Router();
const userCon = require('../controllers/authCon');

router
.route('/')
.get(userCon.getUser)

router
.route('/register')
.post(userCon.registerUser)

router
.route('/login')
.post(userCon.userLogin);

router
.route('/:id')
.get(userCon.getUserById)
.patch(userCon.updateUser)
.delete(userCon.deleteUser)


module.exports = router;