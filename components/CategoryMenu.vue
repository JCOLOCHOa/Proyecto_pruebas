<template>
  <nav class="category-nav">
    <div class="nav-header">
      <button
        class="menu-toggle"
        @click="isOpen = !isOpen"
        :class="{ 'active': isOpen }"
      >
        <svg class="icon-menu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
        <span class="menu-text">Categorías</span>
      </button>

      <div class="quick-filters">
        <button
          v-for="tab in quickTabs"
          :key="tab.id"
          @click="$emit('select-tab', tab.id)"
          :class="['tab-btn', { active: activeTab === tab.id }]"
        >
          <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path v-if="tab.id === 'all'" d="M3 3h18v18H3zM9 3v18M15 3v18M3 9h18M3 15h18"/>
            <path v-if="tab.id === 'offers'" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            <path v-if="tab.id === 'new'" d="M12 3v18M3 12h18M7 8l10 8M7 16l10-8"/>
            <path v-if="tab.id === 'bestsellers'" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
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
            <svg class="category-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <g v-if="cat.icon === 'laptop'">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="2" y1="20" x2="22" y2="20"></line>
              </g>
              <g v-if="cat.icon === 'desktop'">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </g>
              <g v-if="cat.icon === 'mouse'">
                <rect x="6" y="3" width="12" height="18" rx="6" ry="6"></rect>
                <line x1="12" y1="7" x2="12" y2="11"></line>
              </g>
              <g v-if="cat.icon === 'headphones'">
                <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
              </g>
              <g v-if="cat.icon === 'monitor'">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </g>
              <g v-if="cat.icon === 'storage'">
                <rect x="4" y="3" width="16" height="18" rx="2" ry="2"></rect>
                <circle cx="12" cy="10" r="2"></circle>
              </g>
              <g v-if="cat.icon === 'cable'">
                <path d="M4 22l4-10 4 10M12 22l4-10 4 10"></path>
              </g>
              <g v-if="cat.icon === 'mobile'">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                <line x1="12" y1="18" x2="12.01" y2="18"></line>
              </g>
              <g v-if="cat.icon === 'printer'">
                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                <rect x="6" y="14" width="12" height="8"></rect>
              </g>
              <g v-if="cat.icon === 'wifi'">
                <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
                <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
                <line x1="12" y1="20" x2="12.01" y2="20"></line>
              </g>
              <g v-if="cat.icon === 'chair'">
                <path d="M6 19v2M18 19v2M6 11V7a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v4"></path>
                <path d="M6 11h12v8H6z"></path>
              </g>
              <g v-if="cat.icon === 'camera'">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                <circle cx="12" cy="13" r="4"></circle>
              </g>
            </svg>
            <span class="category-name">{{ cat.name }}</span>
            <span class="category-count">{{ getCount(key as Category) }}</span>
          </button>

          <button
            @click="selectCategory(null)"
            :class="['category-btn', 'all-btn', { active: selectedCategory === null }]"
          >
            <svg class="category-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
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
/* Reset específico para este componente */
.category-nav * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.category-nav {
  background: #ffffff;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 4px 20px rgba(13, 24, 33, 0.08);
  font-family: inherit;
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
  font-size: 0.95rem;
}

.menu-toggle:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(52, 73, 102, 0.3);
}

.icon-menu {
  width: 20px;
  height: 20px;
}

.menu-text {
  font-size: 0.95rem;
  color: #F0F4EF;
}

.quick-filters {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: 2px solid #B4CDED;
  background: #ffffff;
  color: #344966;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  font-size: 0.95rem;
}

.tab-icon {
  width: 16px;
  height: 16px;
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
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
}

/* BOTÓN DE CATEGORÍA - ESTADO NORMAL */
.category-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #F0F4EF !important;
  border: 2px solid #B4CDED !important;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  /* Forzar color de texto oscuro */
  color: #0D1821 !important;
  font-size: 0.95rem;
  font-family: inherit;
  line-height: 1.5;
}

/* ICONO SVG - ESTADO NORMAL */
.category-btn svg.category-icon-svg {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  stroke: #344966 !important;
  color: #344966 !important;
}

/* NOMBRE - ESTADO NORMAL */
.category-btn span.category-name {
  flex: 1;
  font-weight: 600;
  font-size: 0.95rem;
  color: #0D1821 !important;
}

/* CONTADOR - ESTADO NORMAL */
.category-btn span.category-count {
  background: #344966 !important;
  color: #F0F4EF !important;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
}

/* HOVER - ESTADO HOVER */
.category-btn:hover {
  background: #B4CDED !important;
  border-color: #344966 !important;
  transform: translateX(5px);
}

.category-btn:hover svg.category-icon-svg {
  stroke: #0D1821 !important;
  color: #0D1821 !important;
}

.category-btn:hover span.category-name {
  color: #0D1821 !important;
}

.category-btn:hover span.category-count {
  background: #0D1821 !important;
  color: #F0F4EF !important;
}

/* ACTIVE - ESTADO ACTIVO/SELECCIONADO */
.category-btn.active {
  background: linear-gradient(135deg, #344966 0%, #0D1821 100%) !important;
  border-color: transparent !important;
}

.category-btn.active svg.category-icon-svg {
  stroke: #BFCC94 !important;
  color: #BFCC94 !important;
}

.category-btn.active span.category-name {
  color: #F0F4EF !important;
}

.category-btn.active span.category-count {
  background: #BFCC94 !important;
  color: #0D1821 !important;
}

/* ALL BTN - ESTADO NORMAL */
.all-btn {
  background: linear-gradient(135deg, #BFCC94 0%, #B4CDED 100%) !important;
  border-color: transparent !important;
}

.all-btn svg.category-icon-svg {
  stroke: #0D1821 !important;
  color: #0D1821 !important;
}

.all-btn span.category-name {
  color: #0D1821 !important;
  font-weight: 700;
}

.all-btn span.category-count {
  background: #0D1821 !important;
  color: #F0F4EF !important;
}

/* ALL BTN - HOVER */
.all-btn:hover {
  background: linear-gradient(135deg, #B4CDED 0%, #BFCC94 100%) !important;
  border-color: #0D1821 !important;
}

/* ALL BTN - ACTIVE */
.all-btn.active {
  background: linear-gradient(135deg, #344966 0%, #0D1821 100%) !important;
  border-color: transparent !important;
}

.all-btn.active svg.category-icon-svg {
  stroke: #BFCC94 !important;
  color: #BFCC94 !important;
}

.all-btn.active span.category-name {
  color: #F0F4EF !important;
}

.all-btn.active span.category-count {
  background: #BFCC94 !important;
  color: #0D1821 !important;
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
