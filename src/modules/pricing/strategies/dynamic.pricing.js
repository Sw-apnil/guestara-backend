const parseTimeToMinutes = (timeStr) => {
  const [h, m] = timeStr.split(':').map(Number)
  return h * 60 + m
}

const calculateDynamicPrice = ({ pricing, context }) => {
  const { time } = context || {}

  if (!time) {
    throw new Error('Time is required for dynamic pricing')
  }

  if (!Array.isArray(pricing.windows) || pricing.windows.length === 0) {
    throw new Error('Dynamic pricing requires time windows')
  }

  const currentMinutes = parseTimeToMinutes(time)

  // Convert windows to comparable minutes
  const windows = pricing.windows.map(w => ({
    start: parseTimeToMinutes(w.start),
    end: parseTimeToMinutes(w.end),
    price: w.price
  }))

  // 🔒 Validate overlapping windows
  const sorted = [...windows].sort((a, b) => a.start - b.start)
  for (let i = 0; i < sorted.length - 1; i++) {
    if (sorted[i].end > sorted[i + 1].start) {
      throw new Error('Dynamic pricing windows must not overlap')
    }
  }

  // 🎯 Find active window
  const active = windows.find(
    w => currentMinutes >= w.start && currentMinutes < w.end
  )

  if (!active) {
    throw new Error('Item not available at this time')
  }

  return {
    pricingType: 'DYNAMIC',
    basePrice: active.price,
    appliedWindow: active
  }
}

module.exports = calculateDynamicPrice
