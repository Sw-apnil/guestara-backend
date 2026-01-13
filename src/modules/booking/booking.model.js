const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema(
  {
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
      required: true
    },

    date: {
      type: String, // YYYY-MM-DD
      required: true
    },

    startTime: {
      type: String, // HH:mm
      required: true
    },

    endTime: {
      type: String, // HH:mm
      required: true
    },

    is_active: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
)

// 🔒 Prevent exact duplicate bookings
bookingSchema.index(
  { itemId: 1, date: 1, startTime: 1, endTime: 1 },
  { unique: true }
)

module.exports = mongoose.model('Booking', bookingSchema)
