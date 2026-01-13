const validateCreateItem = (body) => {
  if (!body.name) return 'Item name is required'
  if (!body.parentType) return 'parentType is required'
  if (!body.pricing) return 'pricing configuration is required'

  if (body.parentType === 'CATEGORY' && !body.categoryId) {
    return 'categoryId required for CATEGORY parent'
  }

  if (body.parentType === 'SUBCATEGORY' && !body.subcategoryId) {
    return 'subcategoryId required for SUBCATEGORY parent'
  }

  if (body.tax_applicable === true && body.tax_percentage == null) {
    return 'tax_percentage required when tax_applicable is true'
  }

  return null
}

module.exports = { validateCreateItem }
