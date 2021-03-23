const express = require('express');
const { Cat } = require("../models");
const auth = require("../middleware/auth");

const router = express.Router();

router.patch("/:catId", auth, (req, res) => {
  Cat.update(
    { lastFed: new Date() },
    { where: { id: req.params.catId } }
  ).then(() => res.status(201).send());
});


module.exports = router;