const express = require('express');
const multer = require('multer');
const catController = require("../contollers/cat");
const auth = require("../middleware/auth");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post("/", auth, upload.single('image'), catController.create);

router.get("/", auth, catController.find);

router.get("/:catId", auth, catController.get);

router.patch("/:catId", auth, catController.update);

router.delete("/:catId", auth, catController.delete);

module.exports = router;