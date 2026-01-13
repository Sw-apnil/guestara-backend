const PRICING_TYPES = require('./pricing.types')
const staticPricing = require('./strategies/static.pricing')
const tieredPricing = require('./strategies/tiered.pricing')

const calculatePrice = ({ item, context = {} }) => {
  const pricing = item.pricing

  switch (pricing.type) {
    case PRICING_TYPES.STATIC:
      return staticPricing({ pricing })

    case PRICING_TYPES.TIERED:
      return tieredPricing({
        pricing,
        usage: context.usage
      })

    default:
      throw new Error('Unsupported pricing type')
  }
}

module.exports = { calculatePrice }
