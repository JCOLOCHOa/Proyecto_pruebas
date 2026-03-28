<template>
  <div class="container">
    <header class="header">
      <div class="header-content">
        <img src="https://png.pngtree.com/png-vector/20220922/ourmid/pngtree-cart-shop-logo-supermarket-cart-market-vector-png-image_39324060.png" class="logo" />
        <div class="header-text">
          <h1>{{ categoryName }}</h1>
          <p>Productos seleccionados</p>
        </div>
      </div>
      <nav class="header-nav">
        <router-link to="/" class="nav-link">Tienda</router-link>
        <router-link to="/ofertas" class="nav-link">Ofertas</router-link>
        <router-link to="/nuevos" class="nav-link">Nuevos</router-link>
        <router-link to="/about" class="nav-link">Nosotros</router-link>
      </nav>
    </header>

    <div class="category-hero" :style="heroStyle">
      <svg class="hero-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <g v-if="currentIcon === 'laptop'">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="2" y1="20" x2="22" y2="20"></line>
        </g>
        <g v-else-if="currentIcon === 'desktop'">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </g>
        <g v-else-if="currentIcon === 'mouse'">
          <rect x="6" y="3" width="12" height="18" rx="6" ry="6"></rect>
          <line x1="12" y1="7" x2="12" y2="11"></line>
        </g>
        <g v-else-if="currentIcon === 'headphones'">
          <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
        </g>
        <g v-else-if="currentIcon === 'monitor'">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </g>
        <g v-else-if="currentIcon === 'storage'">
          <rect x="4" y="3" width="16" height="18" rx="2" ry="2"></rect>
          <circle cx="12" cy="10" r="2"></circle>
        </g>
        <g v-else-if="currentIcon === 'cable'">
          <path d="M4 22l4-10 4 10M12 22l4-10 4 10"></path>
        </g>
        <g v-else-if="currentIcon === 'mobile'">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
          <line x1="12" y1="18" x2="12.01" y2="18"></line>
        </g>
        <g v-else-if="currentIcon === 'printer'">
          <polyline points="6 9 6 2 18 2 18 9"></polyline>
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
          <rect x="6" y="14" width="12" height="8"></rect>
        </g>
        <g v-else-if="currentIcon === 'wifi'">
          <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
          <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
          <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
          <line x1="12" y1="20" x2="12.01" y2="20"></line>
        </g>
        <g v-else-if="currentIcon === 'chair'">
          <path d="M6 19v2M18 19v2M6 11V7a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v4"></path>
          <path d="M6 11h12v8H6z"></path>
        </g>
        <g v-else-if="currentIcon === 'camera'">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
          <circle cx="12" cy="13" r="4"></circle>
        </g>
        <g v-else>
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        </g>
      </svg>
      <h2>{{ categoryName }}</h2>
      <p>{{ filteredProducts.length }} productos disponibles</p>
    </div>

    <div class="layout">
      <div class="products-section">
        <ProductList 
          :products="filteredProducts" 
          :title="categoryName"
          active-tab="all"
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
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { productsData, categories, type Product, type Category } from '../data/products';
import ProductList from '../components/ProductList.vue';
import Cart from '../components/Cart.vue';
import CheckoutModal from '../components/CheckoutModal.vue';

interface CartItem extends Product {
  qty: number;
}

const route = useRoute();
const products = ref<Product[]>(productsData);
const cart = ref<CartItem[]>([]);
const showCheckout = ref(false);

const savedCart = localStorage.getItem('cart');
if (savedCart) {
  try {
    cart.value = JSON.parse(savedCart);
  } catch (e) {
    console.error('Error parsing cart:', e);
  }
}

watch(cart, (newCart) => {
  localStorage.setItem('cart', JSON.stringify(newCart));
}, { deep: true });

const currentCategory = computed(() => route.params.category as Category);

const categoryName = computed(() => {
  return categories[currentCategory.value]?.name || 'Categoría';
});

const currentIcon = computed(() => {
  return categories[currentCategory.value]?.icon || 'box';
});

const heroStyle = computed(() => {
  const colors: Record<string, string> = {
    laptops: '#344966',
    computadoras: '#0D1821',
    perifericos: '#BFCC94',
    audio: '#B4CDED',
    monitores: '#344966',
    almacenamiento: '#0D1821',
    accesorios: '#BFCC94',
    'celulares-tablets': '#B4CDED',
    impresion: '#344966',
    redes: '#0D1821',
    mobiliario: '#BFCC94',
    camaras: '#B4CDED'
  };
  return {
    background: `linear-gradient(135deg, ${colors[currentCategory.value] || '#344966'} 0%, #0D1821 100%)`
  };
});

const filteredProducts = computed(() => {
  return products.value.filter(p => p.category === currentCategory.value);
});

const addToCart = (product: Product) => {
  const existing = cart.value.find(p => p.id === product.id);
  if (existing) {
    if (existing.qty < product.stock) {
      existing.qty++;
    } else {
      alert('No hay más stock disponible');
    }
  } else {
    cart.value.push({ ...product, qty: 1 });
  }
};

const removeFromCart = (id: number) => {
  cart.value = cart.value.filter(p => p.id !== id);
};

const increaseQty = (id: number) => {
  const item = cart.value.find(p => p.id === id);
  const product = products.value.find(p => p.id === id);
  if (item && product && item.qty < product.stock) {
    item.qty++;
  }
};

const decreaseQty = (id: number) => {
  const item = cart.value.find(p => p.id === id);
  if (item && item.qty > 1) {
    item.qty--;
  }
};

const completeCheckout = () => {
  showCheckout.value = false;
  cart.value = [];
  localStorage.removeItem('cart');
};
</script>

<style scoped>
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
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  box-shadow: 0 10px 40px rgba(13, 24, 33, 0.2);
  flex-wrap: wrap;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.logo {
  width: 60px;
  height: 60px;
  object-fit: contain;
  filter: brightness(0) invert(1);
}

.header-text h1 {
  color: #F0F4EF;
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  text-transform: capitalize;
}

.header-text p {
  color: #B4CDED;
  margin: 5px 0 0;
  font-size: 1rem;
}

.header-nav {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.nav-link {
  padding: 10px 20px;
  color: #F0F4EF;
  text-decoration: none;
  border-radius: 25px;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.nav-link:hover {
  background: rgba(240, 244, 239, 0.1);
  border-color: #B4CDED;
}

.nav-link.active {
  background: #BFCC94;
  color: #0D1821;
}

.category-hero {
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 30px;
  text-align: center;
  color: #F0F4EF;
}

.hero-icon {
  width: 64px;
  height: 64px;
  margin-bottom: 20px;
}

.category-hero h2 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.category-hero p {
  font-size: 1.2rem;
  opacity: 0.9;
}

.layout {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 30px;
  align-items: start;
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

@media (max-width: 1024px) {
  .layout {
    grid-template-columns: 1fr;
  }
  
  .cart-section {
    position: relative;
    top: 0;
    order: -1;
  }
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    text-align: center;
    padding: 20px;
  }
  
  .header-content {
    flex-direction: column;
  }
  
  .header-nav {
    justify-content: center;
    width: 100%;
  }
  
  .category-hero h2 {
    font-size: 1.8rem;
  }
}
</style>