const mongoose = require('mongoose')

const addonSchema = new mongoose.Schema(
  {
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
      required: true
    },

    name: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    isMandatory: {
      type: Boolean,
      default: false
    },

    groupId: {
      type: String // for grouped addons (e.g. sauces)
    },

    is_active: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Addon', addonSchema)
