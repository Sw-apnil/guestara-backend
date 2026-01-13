const PRICING_TYPES = require('./pricing.types')
const staticPricing = require('./strategies/static.pricing')

const calculatePrice = ({ item }) => {
  const pricing = item.pricing

  switch (pricing.type) {
    case PRICING_TYPES.STATIC:
      return staticPricing({ pricing })

    default:
      throw new Error('Unsupported pricing type')
  }
}

module.exports = { calculatePrice }
