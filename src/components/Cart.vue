<template>
  <div class="cart">
    <h2>Carrito</h2>

    <div v-if="cart.length === 0" class="empty-cart">
      <p>🛒 Carrito vacío</p>
    </div>

    <div v-else>
      <div class="cart-item" v-for="item in cart" :key="item.id">
        <img :src="item.image" />
        <div class="info">
          <p class="name">{{ item.name }}</p>
          <p class="price">Q{{ item.price }}</p>
          <div class="controls">
            <button @click="$emit('decrease', item.id)">−</button>
            <span>{{ item.qty }}</span>
            <button @click="$emit('increase', item.id)">+</button>
          </div>
          <button class="remove" @click="$emit('remove', item.id)">
            Eliminar
          </button>
        </div>
      </div>

      <div class="cart-summary">
        <h3>Total: Q{{ total }}</h3>
        <button class="btn-buy" @click="$emit('checkout')">
          Finalizar Compra
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  cart: any[]
}>()

defineEmits(['remove', 'increase', 'decrease', 'checkout'])

const total = computed(() =>
  props.cart.reduce((sum, item) => sum + item.price * item.qty, 0)
)
</script>


