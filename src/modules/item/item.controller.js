const service = require('./item.service')
const { validateCreateItem } = require('./item.validation')
const Item = require('./item.model')
const { calculatePrice } = require('../pricing/pricing.engine')
const { resolveTax } = require('./item.service')

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
    const item = await Item.findById(req.params.id)
    if (!item || !item.is_active) {
      return res.status(404).json({ message: 'Item not found' })
    }

    const priceResult = calculatePrice({ item })
    const taxPercentage = await resolveTax(item)

    const taxAmount = (priceResult.basePrice * taxPercentage) / 100
    const finalPrice = priceResult.basePrice + taxAmount

    res.json({
      pricingType: priceResult.pricingType,
      basePrice: priceResult.basePrice,
      taxPercentage,
      taxAmount,
      finalPrice
    })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}




module.exports = { createItem,getItemPrice }
