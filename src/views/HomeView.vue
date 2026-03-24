<template>
  <div class="container">
    <header class="header">
      <img src="https://png.pngtree.com/png-vector/20220922/ourmid/pngtree-cart-shop-logo-supermarket-cart-market-vector-png-image_39324060.png " class="logo" />
      <h1>ELECTRONICOS</h1>
    </header>

    <SearchBar @search="updateSearch" />

    <div class="layout">
      <div class="products-section">
        <ProductList 
          :products="filteredProducts" 
          @add-to-cart="addToCart" 
        />
      </div>

      <div class="cart-section">
        <Cart 
          :cart="cart"
          @remove="removeFromCart"
          @increase="increaseQty"
          @decrease="decreaseQty"
          @checkout="showCheckout = true"
        />
      </div>
    </div>

    <CheckoutModal 
      v-if="showCheckout" 
      :cart="cart"
      @close="showCheckout = false"
      @complete="completeCheckout"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { productsData } from '../data/products'
import SearchBar from '../components/SearchBar.vue'
import ProductList from '../components/ProductList.vue'
import Cart from '../components/Cart.vue'
import CheckoutModal from '../components/CheckoutModal.vue'

interface Product {
  id: number
  name: string
  price: number
  image: string
  stock: number
  description?: string
}

interface CartItem extends Product {
  qty: number
}

const products = ref<Product[]>(productsData)
const cart = ref<CartItem[]>([])
const searchText = ref('')
const showCheckout = ref(false)

const savedCart = localStorage.getItem('cart')
if (savedCart) cart.value = JSON.parse(savedCart)

watch(cart, (newCart) => {
  localStorage.setItem('cart', JSON.stringify(newCart))
}, { deep: true })

const updateSearch = (text: string) => {
  searchText.value = text
}

const filteredProducts = computed(() => {
  if (!searchText.value) return products.value
  return products.value.filter(p =>
    p.name.toLowerCase().includes(searchText.value.toLowerCase())
  )
})

const addToCart = (product: Product) => {
  const existing = cart.value.find(p => p.id === product.id)
  if (existing) {
    existing.qty++
  } else {
    cart.value.push({ ...product, qty: 1 })
  }
}

const removeFromCart = (id: number) => {
  cart.value = cart.value.filter(p => p.id !== id)
}

const increaseQty = (id: number) => {
  const item = cart.value.find(p => p.id === id)
  if (item) item.qty++
}

const decreaseQty = (id: number) => {
  const item = cart.value.find(p => p.id === id)
  if (item && item.qty > 1) {
    item.qty--
  }
}

const completeCheckout = () => {
  showCheckout.value = false
  cart.value = []
  localStorage.removeItem('cart')
}
</script>

<style>
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  background: linear-gradient(135deg, #0D1821 0%, #344966 100%);
  border-radius: 20px;
  padding: 30px 40px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 10px 40px rgba(13, 24, 33, 0.2);
}

.logo {
  width: 60px;
  height: 60px;
  object-fit: contain;
  filter: brightness(0) invert(1);
}

.header h1 {
  color: #F0F4EF;
  font-size: 2rem;
  font-weight: 700;
}

.layout {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 30px;
  align-items: start;
}

@media (max-width: 1024px) {
  .layout {
    grid-template-columns: 1fr;
  }
}

.products-section {
  background: #ffffff;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(13, 24, 33, 0.08);
}

.cart-section {
  position: sticky;
  top: 20px;
}
</style>