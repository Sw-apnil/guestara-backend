const Category = require('./category.model')

const createCategory = async (data) => {
  const existing = await Category.findOne({ name: data.name })
  if (existing) {
    throw new Error('Category already exists')
  }

  return Category.create(data)
}

const getCategories = async () => {
  return Category.find({ is_active: true }).sort({ name: 1 })
}

module.exports = {
  createCategory,
  getCategories
}
