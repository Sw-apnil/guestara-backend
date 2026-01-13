const express = require('express')
const router = express.Router()
const controller = require('./item.controller')

router.post('/', controller.createItem)
router.get('/:id/price', controller.getItemPrice)


module.exports = router
