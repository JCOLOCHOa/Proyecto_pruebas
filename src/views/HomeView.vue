<template>
  <div class="container">
    <header class="header">
      <div class="header-content">
        <img src="https://png.pngtree.com/png-vector/20220922/ourmid/pngtree-cart-shop-logo-supermarket-cart-market-vector-png-image_39324060.png" class="logo" />
        <div class="header-text">
          <h1>ELECTRONICOS</h1>
          <p>Tecnología de punta al mejor precio</p>
        </div>
      </div>
      <nav class="header-nav">
        <router-link to="/" class="nav-link active">Tienda</router-link>
        <router-link to="/ofertas" class="nav-link">Ofertas</router-link>
        <router-link to="/nuevos" class="nav-link">Nuevos</router-link>
        <router-link to="/about" class="nav-link">Nosotros</router-link>
      </nav>
    </header>

    <SearchBar @search="updateSearch" />

    <CategoryMenu 
      :products="products"
      :selected-category="selectedCategory"
      :active-tab="activeTab"
      @select-category="selectCategory"
      @select-tab="selectTab"
    />

    <div class="layout">
      <div class="products-section">
        <ProductList 
          :products="filteredProducts" 
          :title="currentTitle"
          :active-tab="activeTab"
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
import { productsData, type Category } from '../data/products';
import SearchBar from '../components/SearchBar.vue';
import ProductList from '../components/ProductList.vue';
import Cart from '../components/Cart.vue';
import CheckoutModal from '../components/CheckoutModal.vue';
import CategoryMenu from '../components/CategoryMenu.vue';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  stock: number;
  description?: string;
  category: Category;
}

interface CartItem extends Product {
  qty: number;
}

const products = ref<Product[]>(productsData);
const cart = ref<CartItem[]>([]);
const searchText = ref('');
const showCheckout = ref(false);
const selectedCategory = ref<Category | null>(null);
const activeTab = ref('all');

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

const updateSearch = (text: string) => {
  searchText.value = text;
};

const selectCategory = (category: Category | null) => {
  selectedCategory.value = category;
};

const selectTab = (tab: string) => {
  activeTab.value = tab;
};

const currentTitle = computed(() => {
  if (searchText.value) return `Resultados para "${searchText.value}"`;
  if (selectedCategory.value) {
    const names: Record<string, string> = {
      laptops: 'Laptops',
      computadoras: 'Computadoras',
      perifericos: 'Periféricos',
      audio: 'Audio',
      monitores: 'Monitores',
      almacenamiento: 'Almacenamiento',
      accesorios: 'Accesorios',
      'celulares-tablets': 'Celulares y Tablets',
      impresion: 'Impresión',
      redes: 'Redes',
      mobiliario: 'Mobiliario',
      camaras: 'Cámaras'
    };
    return names[selectedCategory.value] || selectedCategory.value;
  }
  if (activeTab.value === 'offers') return 'Ofertas Especiales';
  if (activeTab.value === 'new') return 'Nuevos Productos';
  if (activeTab.value === 'bestsellers') return 'Más Vendidos';
  return 'Todos los Productos';
});

const filteredProducts = computed(() => {
  let result = products.value;
  
  if (selectedCategory.value) {
    result = result.filter(p => p.category === selectedCategory.value);
  }
  
  if (searchText.value) {
    const search = searchText.value.toLowerCase();
    result = result.filter(p => 
      p.name.toLowerCase().includes(search) ||
      p.description?.toLowerCase().includes(search)
    );
  }
  
  return result;
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
  } else {
    alert('Stock máximo alcanzado');
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
}
</style>