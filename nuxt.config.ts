// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    // devProxy: {
    //   '/api': {
    //     target: 'http://localhost:8080',
    //     // target: 'http://35.229.193.76:8080',
    //     changeOrigin: true,
    //     prependPath: true
    //   }
    // },
    routeRules: {
      '/api/**': { proxy: 'http://localhost:8080/**' }
    }
  },

  runtimeConfig: {
    public: {
      socket: 'ws://localhost:8080/ws'
    }
  },

  modules: ['@vant/nuxt', 'nuxt-swiper', '@pinia/nuxt'],

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
