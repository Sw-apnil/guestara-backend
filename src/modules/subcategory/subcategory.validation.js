const validateCreateSubcategory = (body) => {
  if (!body.name) return 'Subcategory name is required'
  if (!body.categoryId) return 'categoryId is required'

  if (body.tax_applicable === true && body.tax_percentage == null) {
    return 'tax_percentage is required when tax_applicable is true'
  }

  return null
}

module.exports = {
  validateCreateSubcategory
}
