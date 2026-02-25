const express = require('express')
const router = express.Router()

const products = [
  { id: 1, name: 'Book A', category: 'Books', price: 20 },
  { id: 2, name: 'Laptop', category: 'Electronics', price: 1000 },
  { id: 3, name: 'Headphones', category: 'Electronics', price: 200 }
]

router.get('/', (req, res) => {
  res.json(products)
})

module.exports = router