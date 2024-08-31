const express = require('express');
const { insertHebits, updateHebits, getHebits, deleteHebits } = require('../controllers/habitController'); // Clean import
const { getCategory } = require("../controllers/category");

const router = express.Router();

// Route to create a new user
router.post('/insertHebits', insertHebits);
router.put("/updateHebits/:id", updateHebits);
router.get("/getHebits", getHebits);
router.put("/deleteHebits/:id", deleteHebits);
router.get("/getcategory", getCategory);



module.exports = router;