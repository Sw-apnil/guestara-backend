const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    description: String,
    image: String,

    parentType: {
      type: String,
      enum: ['CATEGORY', 'SUBCATEGORY'],
      required: true
    },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    },

    subcategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subcategory'
    },

    // Optional tax override
    tax_applicable: {
      type: Boolean
    },
    tax_percentage: {
      type: Number
    },

    // Pricing config placeholder (next step)
    pricing: {
      type: Object,
      required: true
    },

    is_active: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
)

// 🔒 Enforce Category OR Subcategory (never both)
itemSchema.pre('validate', function () {
  if (this.parentType === 'CATEGORY' && !this.categoryId) {
    throw new Error('categoryId is required when parentType is CATEGORY')
  }

  if (this.parentType === 'SUBCATEGORY' && !this.subcategoryId) {
    throw new Error('subcategoryId is required when parentType is SUBCATEGORY')
  }

  if (this.categoryId && this.subcategoryId) {
    throw new Error('Item cannot belong to both category and subcategory')
  }
})

module.exports = mongoose.model('Item', itemSchema)
