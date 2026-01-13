const express = require('express')
const cors = require('cors')
const categoryRoutes = require('./modules/category/category.routes')
const subcategoryRoutes = require('./modules/subcategory/subcategory.routes')
const itemRoutes = require('./modules/item/item.routes')
const bookingRoutes = require('./modules/booking/booking.routes')
const app = express()

app.use(cors())
app.use(express.json())




app.use('/bookings', bookingRoutes)

app.use('/items', itemRoutes)

app.use('/subcategories', subcategoryRoutes)

app.use('/categories', categoryRoutes)


app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'Guestara Backend'
  })
})

module.exports = app
