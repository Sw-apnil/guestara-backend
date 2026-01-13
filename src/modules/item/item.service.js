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



const resolveTax = async (item) => {
  if (item.tax_applicable != null) {
    return item.tax_applicable
      ? item.tax_percentage
      : 0
  }

  if (item.subcategoryId) {
    const sub = await Subcategory.findById(item.subcategoryId).populate('categoryId')
    if (sub.tax_applicable != null) {
      return sub.tax_applicable ? sub.tax_percentage : 0
    }
    return sub.categoryId.tax_percentage || 0
  }

  const cat = await Category.findById(item.categoryId)
  return cat.tax_applicable ? cat.tax_percentage : 0
}




module.exports = { createItem,resolveTax }
