<template>
  <div class="products">
    <div 
      v-for="product in products" 
      :key="product.id"
      class="product-card"
      :ref="(el) => setCardRef(el, product.id)"
    >
      <div class="product-image-wrapper" @click="openDetail(product)">
        <img :src="product.image" />
        <span v-if="product.stock < 5" class="stock-badge low">
          ¡Solo {{ product.stock }}!
        </span>
      </div>

      <h3>{{ product.name }}</h3>
      <p class="price">Q{{ product.price }}</p>
      
      <button 
        @click="(e) => addToCartWithAnimation(e, product)"
        :disabled="product.stock === 0"
        :class="{ 'disabled': product.stock === 0 }"
      >
        <span v-if="product.stock === 0">Agotado</span>
        <span v-else>Agregar al carrito</span>
      </button>
    </div>
  </div>

  <Transition name="fade">
    <div v-if="selectedProduct" class="modal" @click.self="closeDetail">
      <div class="modal-content">
        <button class="close-btn" @click="closeDetail">×</button>
        <img :src="selectedProduct.image" />
        <h2>{{ selectedProduct.name }}</h2>
        <p class="description">{{ selectedProduct.description }}</p>
        <p class="modal-price">Q{{ selectedProduct.price }}</p>
        <p class="stock">Stock disponible: {{ selectedProduct.stock }}</p>
      </div>
    </div>
  </Transition>

  <div v-if="flyingItem" class="flying-item" :style="flyingStyle">
    <img :src="flyingItem.image" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue'

interface Product {
  id: number
  name: string
  price: number
  image: string
  stock: number
  description?: string
}

defineProps<{
  products: Product[]
}>()

const emit = defineEmits(['add-to-cart'])

const selectedProduct = ref<Product | null>(null)
const cardRefs = reactive<Record<number, HTMLElement>>({})

interface FlyingItem {
  id: number
  name: string
  price: number
  image: string
  stock: number
  description?: string
}

const flyingItem = ref<FlyingItem | null>(null)
const flyingStyle = reactive({
  left: '0px',
  top: '0px',
  width: '0px',
  height: '0px',
  opacity: 0
})

const setCardRef = (el: unknown, id: number) => {
  if (el && typeof el === 'object' && el !== null) {
    cardRefs[id] = el as HTMLElement
  }
}

const openDetail = (product: Product) => {
  selectedProduct.value = product
}

const closeDetail = () => {
  selectedProduct.value = null
}

const addToCartWithAnimation = async (event: MouseEvent, product: Product) => {
  if (product.stock === 0) return

  const card = cardRefs[product.id]
  const img = card?.querySelector('img') as HTMLElement | null
  const cartIcon = document.querySelector('.cart h2') as HTMLElement | null

  if (!img || !cartIcon) {
    emit('add-to-cart', product)
    return
  }

  const imgRect = img.getBoundingClientRect()
  const cartRect = cartIcon.getBoundingClientRect()

  flyingItem.value = { ...product }
  flyingStyle.left = imgRect.left + 'px'
  flyingStyle.top = imgRect.top + 'px'
  flyingStyle.width = imgRect.width + 'px'
  flyingStyle.height = imgRect.height + 'px'
  flyingStyle.opacity = 1

  await nextTick()

  setTimeout(() => {
    flyingStyle.left = cartRect.left + 'px'
    flyingStyle.top = cartRect.top + 'px'
    flyingStyle.width = '40px'
    flyingStyle.height = '40px'
    flyingStyle.opacity = 0.8
  }, 50)

  setTimeout(() => {
    flyingStyle.opacity = 0
    emit('add-to-cart', product)
    
    setTimeout(() => {
      flyingItem.value = null
    }, 300)
  }, 600)
}
</script>

<style scoped>
.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 25px;
}

.product-card {
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  border: 2px solid #F0F4EF;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  position: relative;
}

.product-card:hover {
  transform: translateY(-8px);
  border-color: #B4CDED;
  box-shadow: 0 20px 40px rgba(13, 24, 33, 0.15);
}

.product-image-wrapper {
  position: relative;
  height: 200px;
  background: linear-gradient(135deg, #F0F4EF 0%, #B4CDED 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
}

.product-image-wrapper img {
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image-wrapper img {
  transform: scale(1.05);
}

.stock-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #BFCC94;
  color: #0D1821;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
}

.stock-badge.low {
  background: #dc3545;
  color: white;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.product-card h3 {
  padding: 20px 20px 10px;
  font-size: 1.1rem;
  font-weight: 600;
  color: #0D1821;
  line-height: 1.4;
}

.price {
  padding: 0 20px;
  font-size: 1.5rem;
  font-weight: 700;
  color: #344966;
  margin-bottom: 15px;
}

button {
  margin: 0 20px 20px;
  padding: 14px 24px;
  background: linear-gradient(135deg, #344966 0%, #0D1821 100%);
  color: #F0F4EF;
  border: none;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover:not(.disabled) {
  background: linear-gradient(135deg, #BFCC94 0%, #344966 100%);
  color: #0D1821;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(191, 204, 148, 0.4);
}

button.disabled {
  background: #dee2e6;
  color: #6c757d;
  cursor: not-allowed;
}

/* Modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(13, 24, 33, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: #ffffff;
  border-radius: 20px;
  padding: 40px;
  max-width: 500px;
  width: 100%;
  position: relative;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #F0F4EF;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content img {
  width: 100%;
  height: 250px;
  object-fit: contain;
  background: #F0F4EF;
  border-radius: 12px;
  margin-bottom: 20px;
}

.modal-content h2 {
  font-size: 1.5rem;
  color: #0D1821;
  margin-bottom: 10px;
}

.description {
  color: #344966;
  margin-bottom: 15px;
  line-height: 1.6;
}

.modal-price {
  font-size: 2rem;
  font-weight: 700;
  color: #344966;
  margin-bottom: 10px;
}

.stock {
  color: #BFCC94;
  font-weight: 600;
}

/* Elemento volador */
.flying-item {
  position: fixed;
  z-index: 9999;
  pointer-events: none;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  transition: all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.flying-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>