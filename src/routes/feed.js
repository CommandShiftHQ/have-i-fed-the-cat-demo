const express = require('express')
const catController = require('../controllers/cats')

const router = express.Router()

router.route(':catId').patch(catController.feed)

module.exports = router
