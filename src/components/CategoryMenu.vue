<template>
  <nav class="category-nav">
    <div class="nav-header">
      <button 
        class="menu-toggle" 
        @click="isOpen = !isOpen"
        :class="{ 'active': isOpen }"
      >
        <span></span>
        <span></span>
        <span></span>
        <span class="menu-text">Categorías</span>
      </button>
      
      <div class="quick-filters">
        <button 
          v-for="tab in quickTabs" 
          :key="tab.id"
          @click="$emit('select-tab', tab.id)"
          :class="['tab-btn', { active: activeTab === tab.id }]"
        >
          {{ tab.name }}
        </button>
      </div>
    </div>

    <Transition name="slide">
      <div v-if="isOpen" class="categories-dropdown">
        <div class="categories-grid">
          <button
            v-for="(cat, key) in categories"
            :key="key"
            @click="selectCategory(key as Category)"
            :class="['category-btn', { active: selectedCategory === key }]"
          >
            <span class="category-icon">{{ cat.icon }}</span>
            <span class="category-name">{{ cat.name }}</span>
            <span class="category-count">{{ getCount(key as Category) }}</span>
          </button>
          
          <button 
            @click="selectCategory(null)"
            :class="['category-btn', 'all-btn', { active: selectedCategory === null }]"
          >
            <span class="category-icon">🛍️</span>
            <span class="category-name">Todos los Productos</span>
            <span class="category-count">{{ totalProducts }}</span>
          </button>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { categories, type Category } from '../data/products';

const props = defineProps<{
  products: any[];
  selectedCategory: Category | null;
  activeTab: string;
}>();

const emit = defineEmits<{
  (e: 'select-category', category: Category | null): void;
  (e: 'select-tab', tab: string): void;
}>();

const isOpen = ref(false);

const quickTabs = [
  { id: 'all', name: 'Todos' },
  { id: 'offers', name: 'Ofertas' },
  { id: 'new', name: 'Nuevos' },
  { id: 'bestsellers', name: 'Más Vendidos' }
];

const getCount = (category: Category) => {
  return props.products.filter(p => p.category === category).length;
};

const totalProducts = props.products.length;

const selectCategory = (category: Category | null) => {
  emit('select-category', category);
  isOpen.value = false;
};
</script>

<style scoped>
.category-nav {
  background: #ffffff;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 4px 20px rgba(13, 24, 33, 0.08);
}

.nav-header {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.menu-toggle {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  background: linear-gradient(135deg, #344966 0%, #0D1821 100%);
  color: #F0F4EF;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.menu-toggle:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(52, 73, 102, 0.3);
}

.menu-toggle span:first-child,
.menu-toggle span:nth-child(2),
.menu-toggle span:nth-child(3) {
  display: block;
  width: 18px;
  height: 2px;
  background: currentColor;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.menu-toggle.active span:first-child {
  transform: rotate(45deg) translate(5px, 5px);
}

.menu-toggle.active span:nth-child(2) {
  opacity: 0;
}

.menu-toggle.active span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

.quick-filters {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 10px 20px;
  border: 2px solid #B4CDED;
  background: #ffffff;
  color: #344966;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.tab-btn:hover {
  border-color: #344966;
  color: #0D1821;
}

.tab-btn.active {
  background: linear-gradient(135deg, #BFCC94 0%, #344966 100%);
  border-color: transparent;
  color: #0D1821;
}

.categories-dropdown {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid #F0F4EF;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
}

.category-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #F0F4EF;
  border: 2px solid transparent;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
}

.category-btn:hover {
  background: #B4CDED;
  transform: translateX(5px);
}

.category-btn.active {
  background: linear-gradient(135deg, #344966 0%, #0D1821 100%);
  color: #F0F4EF;
}

.category-icon {
  font-size: 1.5rem;
}

.category-name {
  flex: 1;
  font-weight: 600;
  font-size: 0.95rem;
}

.category-count {
  background: rgba(13, 24, 33, 0.1);
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
}

.category-btn.active .category-count {
  background: rgba(240, 244, 239, 0.2);
}

.all-btn {
  background: linear-gradient(135deg, #BFCC94 0%, #B4CDED 100%);
  grid-column: 1 / -1;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 768px) {
  .nav-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .quick-filters {
    justify-content: center;
  }
  
  .categories-grid {
    grid-template-columns: 1fr;
  }
}
</style>