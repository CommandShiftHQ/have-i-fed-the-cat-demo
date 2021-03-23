const express = require("express");
const authController = require("../contollers/auth");

const router = express.Router();

router.post('/', authController.login);

module.exports = router;