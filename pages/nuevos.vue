<template>
  <div class="container">
    <header class="header">
      <div class="header-content">
        <img src="https://png.pngtree.com/png-vector/20220922/ourmid/pngtree-cart-shop-logo-supermarket-cart-market-vector-png-image_39324060.png" class="logo" />
        <div class="header-text">
          <h1>NUEVOS PRODUCTOS</h1>
          <p>Lo último en tecnología</p>
        </div>
      </div>
      <nav class="header-nav">
        <router-link to="/" class="nav-link">Tienda</router-link>
        <router-link to="/ofertas" class="nav-link">Ofertas</router-link>
        <router-link to="/nuevos" class="nav-link active">Nuevos</router-link>
        <router-link to="/about" class="nav-link">Nosotros</router-link>
      </nav>
    </header>

    <div class="new-hero">
      <svg class="hero-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
      <h2>Recién Llegados</h2>
      <p>Descubre los productos más recientes de nuestro catálogo</p>
    </div>

    <div class="layout">
      <div class="products-section">
        <ProductList
          :products="newProducts"
          title="Nuevos Ingresos"
          active-tab="new"
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
import { ref, computed, watch, onMounted } from 'vue';
import { productsData, type Product } from '../data/products';

interface CartItem extends Product {
  qty: number;
}

const products = ref<Product[]>(productsData);
const cart = ref<CartItem[]>([]);
const showCheckout = ref(false);

onMounted(() => {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    try {
      cart.value = JSON.parse(savedCart);
    } catch (e) {
      console.error('Error parsing cart:', e);
    }
  }
});

watch(cart, (newCart) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(newCart));
  }
}, { deep: true });

const newProducts = computed(() => {
  return products.value.slice(-6);
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
  if (typeof window !== 'undefined') {
    localStorage.removeItem('cart');
  }
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

.new-hero {
  background: linear-gradient(135deg, #B4CDED 0%, #0D1821 100%);
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

.new-hero h2 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.new-hero p {
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

  .new-hero h2 {
    font-size: 1.8rem;
  }
}
</style>
