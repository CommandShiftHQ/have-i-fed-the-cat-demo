const express = require('express')
const catController = require('../controllers/cats')

const router = express.Router()

router.route('/')
  .post(catController.create)
  .get(catController.getAll)

router.route('/:catId')
  .get(catController.getById)
  .patch(catController.update)
  .delete(catController.delete)

module.exports = router
