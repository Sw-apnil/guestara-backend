const express = require('express')
const router = express.Router()
const controller = require('./subcategory.controller')

router.post('/', controller.createSubcategory)
router.get('/category/:categoryId', controller.getSubcategoriesByCategory)

module.exports = router
