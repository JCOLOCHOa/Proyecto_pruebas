// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  // Configuración de la base para GitHub Pages
  app: {
    baseURL: '/Proyecto_pruebas/'
  },

  // Estilos globales
  css: ['~/assets/styles.css'],

  // Módulos
  modules: [
    '@nuxtjs/supabase'
  ],

  // Configuración opcional de Supabase (redirige si no hay sesión)
  supabase: {
    redirect: false // Cámbialo a true si quieres proteger todas las rutas por defecto
  }
})
