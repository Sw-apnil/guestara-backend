const calculateStaticPrice = ({ pricing }) => {
  if (pricing.price == null) {
    throw new Error('Static pricing requires price')
  }

  return {
    pricingType: 'STATIC',
    basePrice: pricing.price
  }
}

module.exports = calculateStaticPrice
