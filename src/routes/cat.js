const express = require('express');
const {
  create,
  readAll,
  readById,
  update,
  destroy,
} = require('../controllers/cat');

const router = express.Router();

router.route('/').post(create).get(readAll);

router.route('/:catId').get(readById).patch(update).delete(destroy);

module.exports = router;
