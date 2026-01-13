const Addon = require('./addon.model')

const getAddonsForItem = async (itemId, selectedAddonIds = []) => {
  const addons = await Addon.find({
    itemId,
    is_active: true
  })

  const selectedAddons = addons.filter(a =>
    selectedAddonIds.includes(a._id.toString())
  )

  // 🔒 Mandatory addons check
  const mandatory = addons.filter(a => a.isMandatory)
  for (const m of mandatory) {
    const exists = selectedAddons.find(a => a._id.equals(m._id))
    if (!exists) {
      throw new Error(`Mandatory addon missing: ${m.name}`)
    }
  }

  // 🔒 Group validation (choose only one per group)
  const groups = {}
  for (const addon of selectedAddons) {
    if (addon.groupId) {
      groups[addon.groupId] = groups[addon.groupId] || []
      groups[addon.groupId].push(addon)
    }
  }

  for (const groupId in groups) {
    if (groups[groupId].length > 1) {
      throw new Error(`Only one addon allowed from group ${groupId}`)
    }
  }

  return selectedAddons
}

module.exports = { getAddonsForItem }
