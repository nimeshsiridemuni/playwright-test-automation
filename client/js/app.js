const API = 'http://localhost:4000/api/products'
const username = 'Admin'
const password = 'password'

let cart = []

const productList = document.getElementById('productList')
const cartCount = document.getElementById('cartCount')

function getAuthHeader() {
  return 'Basic ' + btoa(`${username}:${password}`)
}

async function fetchProducts() {
  const response = await fetch(API, {
    headers: {
      'Authorization': getAuthHeader()
    }
  })

  return response.json()
}

function renderProducts(products) {
  productList.innerHTML = ''

  products.forEach(product => {
    const card = document.createElement('div')
    card.className = 'product-card'

    card.innerHTML = `
      <h3>${product.name}</h3>
      <p>Category: ${product.category}</p>
      <p>Price: $${product.price}</p>
      <button data-testid="add-${product.id}">Add to Cart</button>
    `

    card.querySelector('button').addEventListener('click', () => {
      cart.push(product)
      cartCount.textContent = cart.length
    })

    productList.appendChild(card)
  })
}

fetchProducts().then(renderProducts)