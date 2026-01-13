const service = require('./item.service')
const { validateCreateItem } = require('./item.validation')

const createItem = async (req, res) => {
  try {
    const error = validateCreateItem(req.body)
    if (error) return res.status(400).json({ message: error })

    const item = await service.createItem(req.body)
    res.status(201).json(item)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

module.exports = { createItem }
