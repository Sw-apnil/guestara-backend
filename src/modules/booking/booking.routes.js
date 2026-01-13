const express = require('express')
const router = express.Router()
const controller = require('./booking.controller')

router.post('/book', controller.bookItem)
router.get('/slots', controller.getSlots)

module.exports = router
