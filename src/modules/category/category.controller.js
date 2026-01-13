const categoryService = require('./category.service')
const { validateCreateCategory } = require('./category.validation')

const createCategory = async (req, res) => {
  try {
    const error = validateCreateCategory(req.body)
    if (error) {
      return res.status(400).json({ message: error })
    }

    const category = await categoryService.createCategory(req.body)
    res.status(201).json(category)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

const getCategories = async (_req, res) => {
  const categories = await categoryService.getCategories()
  res.json(categories)
}

module.exports = {
  createCategory,
  getCategories
}
