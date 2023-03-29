export default defineNuxtPlugin(() => {
  return {
    provide: {
      request: async () => {
        const { data, pending, error, refresh } = await useFetch('/api/auth/login', {
          onRequest({ request, options }) {
            // 設定請求時夾帶的標頭
            options.headers = options.headers || {}
            options.headers.authorization = 'Bearer ${access_token}'
          },
          onRequestError({ request, options, error }) {
            // 處理請求時發生的錯誤
          },
          onResponse({ request, response, options }) {
            // 處理請求回應的資料
            return response._data
          },
          onResponseError({ request, response, options }) {
            // 處理請求回應發生的錯誤
          }
        })
      }
    }
  }
})
