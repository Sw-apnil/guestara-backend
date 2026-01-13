const calculateDiscountedPrice = ({ pricing }) => {
  const { basePrice, discount } = pricing

  if (basePrice == null) {
    throw new Error('Discounted pricing requires basePrice')
  }

  if (!discount || !discount.type || discount.value == null) {
    throw new Error('Discount configuration is required')
  }

  let discountAmount = 0

  if (discount.type === 'FLAT') {
    discountAmount = discount.value
  }

  if (discount.type === 'PERCENTAGE') {
    if (discount.value < 0 || discount.value > 100) {
      throw new Error('Percentage discount must be between 0 and 100')
    }
    discountAmount = (basePrice * discount.value) / 100
  }

  const finalBasePrice = Math.max(0, basePrice - discountAmount)

  return {
    pricingType: 'DISCOUNT',
    basePrice,
    discount: {
      type: discount.type,
      value: discount.value,
      discountAmount
    },
    discountedPrice: finalBasePrice
  }
}

module.exports = calculateDiscountedPrice
