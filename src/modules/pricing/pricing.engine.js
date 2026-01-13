const PRICING_TYPES = require('./pricing.types')
const staticPricing = require('./strategies/static.pricing')
const tieredPricing = require('./strategies/tiered.pricing')
const discountPricing = require('./strategies/discount.pricing')
const dynamicPricing = require('./strategies/dynamic.pricing')

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
     case PRICING_TYPES.DYNAMIC:
        return dynamicPricing({
        pricing,
        context
     })



    default:
      throw new Error('Unsupported pricing type')
  }
}

module.exports = { calculatePrice }
