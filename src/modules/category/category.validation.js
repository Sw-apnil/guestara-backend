const validateCreateCategory = (body) => {
  if (!body.name) {
    return 'Category name is required'
  }

  if (body.tax_applicable && body.tax_percentage == null) {
    return 'tax_percentage is required when tax_applicable is true'
  }

  return null
}

module.exports = {
  validateCreateCategory
}
