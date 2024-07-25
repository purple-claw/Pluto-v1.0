const express = require('express');

const router = new express.Router();
const credCon = require('../controllers/credCon');

router
.route('/')
.get(credCon.getAllCreds)
.post(credCon.createCred)

router
.route('/:id')
.get(credCon.findCred)
.patch(credCon.updateCred)
.delete(credCon.deleteCred)

module.exports = router;