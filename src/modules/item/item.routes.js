const express = require('express')
const router = express.Router()
const controller = require('./item.controller')

router.post('/', controller.createItem)

module.exports = router
