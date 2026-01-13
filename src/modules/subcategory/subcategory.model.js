const mongoose = require('mongoose')

const subcategorySchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    image: String,
    description: String,

    // Optional tax override
    tax_applicable: {
      type: Boolean
    },
    tax_percentage: {
      type: Number
    },

    is_active: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
)

// Unique subcategory name per category
subcategorySchema.index({ categoryId: 1, name: 1 }, { unique: true })

module.exports = mongoose.model('Subcategory', subcategorySchema)
