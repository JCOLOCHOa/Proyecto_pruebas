<template>
  <div class="search-wrapper">
    <input
      type="text"
      placeholder="Buscar productos..."
      v-model="search"
      @input="onSearch"
      class="search-input"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const search = ref('')

const emit = defineEmits<{
  (e: 'search', value: string): void
}>()

const onSearch = () => {
  emit('search', search.value)
}
</script>

<style scoped>
.search-wrapper {
  margin: 20px 0;
  width: 100%;
}

.search-input {
  width: 100%;
  max-width: 600px;
  display: block;
  margin: 0 auto;
  padding: 14px 24px;
  font-size: 1rem;
  border: 2px solid #B4CDED;
  border-radius: 50px;
  background: #ffffff;
  color: #0D1821;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(13, 24, 33, 0.1);
}

.search-input:focus {
  outline: none;
  border-color: #344966;
  box-shadow: 0 4px 20px rgba(52, 73, 102, 0.2);
}

.search-input::placeholder {
  color: #344966;
  opacity: 0.6;
}
</style>
