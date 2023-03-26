// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@vant/nuxt', 'nuxt-swiper'],

  // 全域 CSS
  css: ['@/assets/style/main.less'],

  // 全域 CSS 變數
  vite: {
    css: {
      preprocessorOptions: {
        less: {
          additionalData: '@import "@/assets/style/vars.less";'
        }
      }
    }
  },

  typescript: {
    typeCheck: true
  }
})
