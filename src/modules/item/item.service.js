const Item = require('./item.model')
const Category = require('../category/category.model')
const Subcategory = require('../subcategory/subcategory.model')

const createItem = async (data) => {
  if (data.parentType === 'CATEGORY') {
    const category = await Category.findOne({
      _id: data.categoryId,
      is_active: true
    })
    if (!category) throw new Error('Category not found or inactive')
  }

  if (data.parentType === 'SUBCATEGORY') {
    const subcategory = await Subcategory.findOne({
      _id: data.subcategoryId,
      is_active: true
    })
    if (!subcategory) throw new Error('Subcategory not found or inactive')
  }

  return Item.create(data)
}

module.exports = { createItem }
