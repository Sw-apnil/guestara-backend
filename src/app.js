const express = require('express')
const cors = require('cors')
const categoryRoutes = require('./modules/category/category.routes')

const app = express()

app.use(cors())
app.use(express.json())



app.use('/categories', categoryRoutes)


app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'Guestara Backend'
  })
})

module.exports = app
