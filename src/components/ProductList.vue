<template>
  <div class="products-container">
    <div class="products-header">
      <h2>{{ title }}</h2>
      <div class="sort-controls">
        <select v-model="sortBy" class="sort-select">
          <option value="featured">Destacados</option>
          <option value="price-low">Precio: Menor a Mayor</option>
          <option value="price-high">Precio: Mayor a Menor</option>
          <option value="name">Nombre A-Z</option>
          <option value="stock">Disponibilidad</option>
        </select>
      </div>
    </div>

    <div v-if="sortedProducts.length === 0" class="empty-state">
      <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <p>No se encontraron productos en esta categoría</p>
    </div>

    <div v-else class="products">
      <div 
        v-for="product in sortedProducts" 
        :key="product.id"
        class="product-card"
        :ref="(el) => setCardRef(el, product.id)"
      >
        <div class="product-image-wrapper" @click="openDetail(product)">
          <img :src="product.image" />
          <span v-if="product.stock < 5" class="stock-badge low">
            Solo {{ product.stock }} disponibles
          </span>
          <span v-else-if="isNew(product)" class="stock-badge new">
            Nuevo
          </span>
          <span v-else-if="isOffer(product)" class="stock-badge offer">
            Oferta
          </span>
        </div>

        <div class="product-info">
          <span class="category-tag">{{ getCategoryName(product.category) }}</span>
          <h3>{{ product.name }}</h3>
          <p class="price">Q{{ product.price }}</p>
        </div>
        
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
          <button class="close-btn" @click="closeDetail">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <span class="modal-category">{{ getCategoryName(selectedProduct.category) }}</span>
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
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick, computed } from 'vue';
import { categories, type Category } from '../data/products';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  stock: number;
  description?: string;
  category: Category;
}

const props = defineProps<{
  products: Product[];
  title: string;
  activeTab: string;
}>();

const emit = defineEmits(['add-to-cart']);

const selectedProduct = ref<Product | null>(null);
const cardRefs = reactive<Record<number, HTMLElement>>({});
const sortBy = ref('featured');

const flyingItem = ref<Product | null>(null);
const flyingStyle = reactive({
  left: '0px',
  top: '0px',
  width: '0px',
  height: '0px',
  opacity: 0
});

const sortedProducts = computed(() => {
  let result = [...props.products];
  
  if (props.activeTab === 'offers') {
    result = result.filter(p => p.price < 500);
  } else if (props.activeTab === 'new') {
    result = result.slice(-5);
  } else if (props.activeTab === 'bestsellers') {
    result = result.sort((a, b) => a.stock - b.stock);
  }
  
  switch (sortBy.value) {
    case 'price-low':
      return result.sort((a, b) => a.price - b.price);
    case 'price-high':
      return result.sort((a, b) => b.price - a.price);
    case 'name':
      return result.sort((a, b) => a.name.localeCompare(b.name));
    case 'stock':
      return result.sort((a, b) => b.stock - a.stock);
    default:
      return result;
  }
});

const isNew = (product: Product) => product.id > 25;
const isOffer = (product: Product) => product.price < 200;

const getCategoryName = (category: Category) => {
  return categories[category]?.name || category;
};

const setCardRef = (el: unknown, id: number) => {
  if (el && typeof el === 'object' && el !== null) {
    cardRefs[id] = el as HTMLElement;
  }
};

const openDetail = (product: Product) => {
  selectedProduct.value = product;
};

const closeDetail = () => {
  selectedProduct.value = null;
};

const addToCartWithAnimation = async (event: MouseEvent, product: Product) => {
  if (product.stock === 0) return;

  const card = cardRefs[product.id];
  const img = card?.querySelector('img') as HTMLElement | null;
  const cartIcon = document.querySelector('.cart h2') as HTMLElement | null;

  if (!img || !cartIcon) {
    emit('add-to-cart', product);
    return;
  }

  const imgRect = img.getBoundingClientRect();
  const cartRect = cartIcon.getBoundingClientRect();

  flyingItem.value = { ...product };
  flyingStyle.left = imgRect.left + 'px';
  flyingStyle.top = imgRect.top + 'px';
  flyingStyle.width = imgRect.width + 'px';
  flyingStyle.height = imgRect.height + 'px';
  flyingStyle.opacity = 1;

  await nextTick();

  setTimeout(() => {
    flyingStyle.left = cartRect.left + 'px';
    flyingStyle.top = cartRect.top + 'px';
    flyingStyle.width = '40px';
    flyingStyle.height = '40px';
    flyingStyle.opacity = 0.8;
  }, 50);

  setTimeout(() => {
    flyingStyle.opacity = 0;
    emit('add-to-cart', product);
    
    setTimeout(() => {
      flyingItem.value = null;
    }, 300);
  }, 600);
};
</script>

<style scoped>
.products-container {
  width: 100%;
}

.products-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  flex-wrap: wrap;
  gap: 15px;
}

.products-header h2 {
  color: #0D1821;
  font-size: 1.5rem;
}

.sort-select {
  padding: 10px 20px;
  border: 2px solid #B4CDED;
  border-radius: 25px;
  background: #ffffff;
  color: #0D1821;
  font-size: 0.9rem;
  cursor: pointer;
  outline: none;
}

.sort-select:focus {
  border-color: #344966;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #344966;
}

.empty-icon {
  width: 64px;
  height: 64px;
  margin-bottom: 20px;
  opacity: 0.5;
}

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

.stock-badge.new {
  background: #BFCC94;
  color: #0D1821;
}

.stock-badge.offer {
  background: #344966;
  color: #F0F4EF;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.product-info {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.category-tag {
  font-size: 0.75rem;
  color: #344966;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.product-card h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #0D1821;
  line-height: 1.4;
  margin-bottom: 10px;
  flex: 1;
}

.price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #344966;
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

.modal-category {
  display: inline-block;
  background: #BFCC94;
  color: #0D1821;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 15px;
  text-transform: uppercase;
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
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: #B4CDED;
}

.close-btn svg {
  width: 20px;
  height: 20px;
  color: #0D1821;
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

@media (max-width: 768px) {
  .products-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .products {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
</style>