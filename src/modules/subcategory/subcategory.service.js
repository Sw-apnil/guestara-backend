const Subcategory = require('./subcategory.model')
const Category = require('../category/category.model')

const createSubcategory = async (data) => {
  const category = await Category.findOne({
    _id: data.categoryId,
    is_active: true
  })

  if (!category) {
    throw new Error('Parent category not found or inactive')
  }

  return Subcategory.create(data)
}

const getSubcategoriesByCategory = async (categoryId) => {
  return Subcategory.find({
    categoryId,
    is_active: true
  }).sort({ name: 1 })
}

module.exports = {
  createSubcategory,
  getSubcategoriesByCategory
}
