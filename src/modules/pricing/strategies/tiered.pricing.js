const calculateTieredPrice = ({ pricing, usage }) => {
  if (!Array.isArray(pricing.tiers) || pricing.tiers.length === 0) {
    throw new Error('Tiered pricing requires tiers')
  }

  if (usage == null) {
    throw new Error('Usage (hours) is required for tiered pricing')
  }

  // Sort tiers by maxUsage (ascending)
  const sortedTiers = [...pricing.tiers].sort(
    (a, b) => a.maxUsage - b.maxUsage
  )

  // 🔒 Validate overlapping tiers
  for (let i = 0; i < sortedTiers.length - 1; i++) {
    if (sortedTiers[i].maxUsage >= sortedTiers[i + 1].maxUsage) {
      throw new Error('Tier usage ranges must not overlap')
    }
  }

  // 🎯 Find correct tier
  const tier = sortedTiers.find(t => usage <= t.maxUsage)

  if (!tier) {
    throw new Error('No pricing tier found for given usage')
  }

  return {
    pricingType: 'TIERED',
    basePrice: tier.price,
    appliedTier: tier
  }
}

module.exports = calculateTieredPrice
