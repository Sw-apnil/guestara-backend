const PRICING_TYPES = require('./pricing.types')
const staticPricing = require('./strategies/static.pricing')
const tieredPricing = require('./strategies/tiered.pricing')
const discountPricing = require('./strategies/discount.pricing')

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

    case PRICING_TYPES.DISCOUNT:
     return discountPricing({ pricing })


    default:
      throw new Error('Unsupported pricing type')
  }
}

module.exports = { calculatePrice }
