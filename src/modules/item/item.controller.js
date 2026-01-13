const service = require('./item.service')
const Item = require('./item.model')

const { calculatePrice } = require('../pricing/pricing.engine')
const { resolveTax } = require('./item.service')
const { validateCreateItem } = require('./item.validation')
const { getAddonsForItem } = require('../addon/addon.service')

/**
 * CREATE ITEM
 */
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

/**
 * GET ITEM PRICE (Pricing + Addons + Tax)
 */
const getItemPrice = async (req, res) => {
  try {
    const { usage, time, addons } = req.query
    const selectedAddonIds = addons ? addons.split(',') : []

    // Fetch item
    const item = await Item.findById(req.params.id)
    if (!item || !item.is_active) {
      return res.status(404).json({ message: 'Item not found' })
    }

    // Base pricing from pricing engine
    const priceResult = calculatePrice({
      item,
      context: {
        usage: usage ? Number(usage) : undefined,
        time
      }
    })

    const baseForAddon =
      priceResult.discountedPrice ?? priceResult.basePrice

    // Resolve addons
    const resolvedAddons = await getAddonsForItem(
      item._id,
      selectedAddonIds
    )

    const addonsTotal = resolvedAddons.reduce(
      (sum, addon) => sum + addon.price,
      0
    )

    // Subtotal (base + addons)
    const subtotal = baseForAddon + addonsTotal

    // Tax calculation
    const taxPercentage = await resolveTax(item)
    const taxAmount = (subtotal * taxPercentage) / 100
    const finalPrice = subtotal + taxAmount

    // Final response
    res.json({
      pricingType: priceResult.pricingType,
      basePrice: priceResult.basePrice,
      discountedPrice: priceResult.discountedPrice,
      appliedTier: priceResult.appliedTier,
      addons: resolvedAddons.map(a => ({
        id: a._id,
        name: a.name,
        price: a.price
      })),
      addonsTotal,
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
