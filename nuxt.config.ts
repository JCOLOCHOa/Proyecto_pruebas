// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  app: {
    baseURL: '/Proyecto_pruebas/'
  },
  // Agregamos esto para cargar tus estilos globales
  css: ['~/assets/styles.css']
})
