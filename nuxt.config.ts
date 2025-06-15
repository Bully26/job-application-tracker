// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss','@formkit/auto-animate','@nuxt/ui-pro','nuxt-icons','@pinia/nuxt',"nuxt-charts"],
  css: ['~/assets/css/main.css']
})