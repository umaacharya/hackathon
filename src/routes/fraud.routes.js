const express = require('express');


const router = express.Router()

const { detectFraud } = require("../controllers/fraud.controller")
router.post("/detect", detectFraud)
module.exports = router