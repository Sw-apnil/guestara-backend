const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    image: String,
    description: String,

    tax_applicable: {
      type: Boolean,
      default: false
    },
    tax_percentage: {
      type: Number,
      validate: {
        validator: function (value) {
          if (this.tax_applicable) {
            return value !== undefined
          }
          return true
        },
        message: 'Tax percentage is required when tax is applicable'
      }
    },

    is_active: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Category', categorySchema)
