const service = require('./subcategory.service')
const { validateCreateSubcategory } = require('./subcategory.validation')

const createSubcategory = async (req, res) => {
  try {
    const error = validateCreateSubcategory(req.body)
    if (error) return res.status(400).json({ message: error })

    const subcategory = await service.createSubcategory(req.body)
    res.status(201).json(subcategory)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

const getSubcategoriesByCategory = async (req, res) => {
  const { categoryId } = req.params
  const data = await service.getSubcategoriesByCategory(categoryId)
  res.json(data)
}

module.exports = {
  createSubcategory,
  getSubcategoriesByCategory
}
