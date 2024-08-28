const express = require('express');
const { insertHebits, updateHebits, getHebits, deleteHebits } = require('../controllers/habitController'); // Clean import

const router = express.Router();

// Route to create a new user
router.post('/insertHebits', insertHebits);
router.put("/updateHebits/:id", updateHebits);
router.get("/getHebits", getHebits);
router.put("/deleteHebits/:id", deleteHebits);


module.exports = router;