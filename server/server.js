const express = require('express')
const cors = require('cors')
const productsRoute = require('./routes/products')

const app = express()
app.use(cors())
app.use(express.json())

// BASIC AUTH MIDDLEWARE
function basicAuth(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"')
    return res.status(401).send('Authentication required')
  }

  const base64Credentials = authHeader.split(' ')[1]
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii')
  const [username, password] = credentials.split(':')

  if (username === 'Admin' && password === 'password') {
    return next()
  }

  return res.status(401).send('Invalid credentials')
}

// Protect all routes
app.use(basicAuth)
app.use('/api/products', productsRoute)

app.listen(4000, () => console.log('Server running on http://localhost:4000'))