export default defineNuxtPlugin(() => {
  return {
    provide: {
      request: async (url, method = 'post', param) => {
        const { data, pending, error, refresh } = await useFetch(url, {
          method,
          body: param,
          baseURL: '/api',
          onRequest({ request, options }) {
            const token = useCookie('jwt-token')

            // 設定請求時夾帶的標頭
            options.headers = options.headers || {}
            options.headers.authorization = `Bearer ${token.value}`
          },
          onRequestError({ request, options, error }) {
            // 處理請求時發生的錯誤
            console.log(`Request error: ${error.message}`)
          },
          onResponse({ request, response, options }) {
            // 處理請求回應的資料
            return response._data
          },
          onResponseError({ request, response, options }) {
            // 處理請求回應發生的錯誤
            console.log(`Response error: ${error.message}`)
          }
        })
        return data
      }
    }
  }
})
