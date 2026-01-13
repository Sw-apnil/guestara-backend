const service = require('./item.service')
const Item = require('./item.model')
const { calculatePrice } = require('../pricing/pricing.engine')
const { resolveTax } = require('./item.service')
const { validateCreateItem } = require('./item.validation')

const createItem = async (req, res) => {
  try {
    const error = validateCreateItem(req.body)
    if (error) return res.status(400).json({ message: error })

    const item = await service.createItem(req.body)
    res.status(201).json(item)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

const getItemPrice = async (req, res) => {
  try {
    const { usage } = req.query

    const item = await Item.findById(req.params.id)
    if (!item || !item.is_active) {
      return res.status(404).json({ message: 'Item not found' })
    }

    const priceResult = calculatePrice({
      item,
      context: {
        usage: usage ? Number(usage) : undefined
      }
    })

    const effectiveBasePrice =
      priceResult.discountedPrice ?? priceResult.basePrice

    const taxPercentage = await resolveTax(item)
    const taxAmount = (effectiveBasePrice * taxPercentage) / 100
    const finalPrice = effectiveBasePrice + taxAmount

    res.json({
      pricingType: priceResult.pricingType,
      basePrice: priceResult.basePrice,
      discount: priceResult.discount,
      discountedPrice: priceResult.discountedPrice,
      appliedTier: priceResult.appliedTier,
      taxPercentage,
      taxAmount,
      finalPrice
    })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

module.exports = {
  createItem,
  getItemPrice
}
