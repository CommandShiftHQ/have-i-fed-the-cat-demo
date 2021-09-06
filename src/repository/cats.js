const { Cat } = require('../models')

exports.createCat = (data) => new Promise((resolve, reject) => {
  Cat.create(data).then(cat => resolve(cat)).catch(err => reject(err))
})

exports.listCats = (query) => new Promise((resolve, reject) => {
  Cat.findAll({ where: query }).then(cats => resolve(cats)).catch(err => reject(err))
})

exports.findCat = (id) => new Promise((resolve, reject) => {
  Cat.findByPk(id).then(cat => resolve(cat)).catch(err => reject(err))
})

exports.updateCat = (id, data) => new Promise((resolve, reject) => {
  Cat.update(data, { where: { id } }).then(([rowsUpdated]) => {
    if (rowsUpdated) {
      resolve(true)
    } else {
      resolve(false)
    }
  }).catch(err => reject(err))
})

exports.feedCat = (id) => new Promise((resolve, reject) => {
  Cat.update(
    { lastFed: new Date() },
    { where: { id } }
  ).then(([rowsUpdated]) => {
    if (rowsUpdated) {
      resolve(true)
    } else {
      resolve(false)
    }
  }).catch(err => reject(err))
})

exports.deleteCat = (id) => new Promise((resolve, reject) => {
  Cat.destroy({ where: { id } }).then(catsDeleted => {
    if (catsDeleted) {
      resolve(true)
    } else {
      resolve(false)
    }
  }).catch(err => reject(err))
})