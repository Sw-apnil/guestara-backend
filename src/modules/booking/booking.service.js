const Booking = require('./booking.model')

const timeToMinutes = (t) => {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

const hasOverlap = (aStart, aEnd, bStart, bEnd) => {
  return aStart < bEnd && bStart < aEnd
}

const bookSlot = async ({ itemId, date, startTime, endTime }) => {
  const start = timeToMinutes(startTime)
  const end = timeToMinutes(endTime)

  if (start >= end) {
    throw new Error('Invalid time range')
  }

  const existing = await Booking.find({
    itemId,
    date,
    is_active: true
  })

  for (const b of existing) {
    const bStart = timeToMinutes(b.startTime)
    const bEnd = timeToMinutes(b.endTime)

    if (hasOverlap(start, end, bStart, bEnd)) {
      throw new Error('Time slot already booked')
    }
  }

  return Booking.create({ itemId, date, startTime, endTime })
}

const getBookedSlots = async (itemId, date) => {
  return Booking.find({ itemId, date, is_active: true })
}

module.exports = {
  bookSlot,
  getBookedSlots
}
