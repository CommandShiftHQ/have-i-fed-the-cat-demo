const express = require("express");
const userController = require("../contollers/user");
const hashPassword = require("../middleware/hash-password");

const router = express.Router();

router.post("/", hashPassword, userController.create);

module.exports = router;
