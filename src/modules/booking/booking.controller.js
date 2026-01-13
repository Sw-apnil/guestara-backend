const service = require('./booking.service')

const bookItem = async (req, res) => {
  try {
    const booking = await service.bookSlot(req.body)
    res.status(201).json(booking)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

const getSlots = async (req, res) => {
  const { itemId, date } = req.query
  const slots = await service.getBookedSlots(itemId, date)
  res.json(slots)
}

module.exports = {
  bookItem,
  getSlots
}
