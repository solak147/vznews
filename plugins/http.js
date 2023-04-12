export default defineNuxtPlugin(() => {
  return {
    provide: {
      request: async (url, method = 'post', param) => {
        let returnData = {}
        let isF5 = true
        const { data, pending, error, refresh } = await useFetch(url, {
          method,
          body: param,
          baseURL: '/api',
          onRequest({ request, options }) {
            isF5 = false
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
            returnData = response._data
          },
          onResponseError({ request, response, error }) {
            // 處理請求回應發生的錯誤
          }
        })

        if (isF5) await refresh()
        return returnData
      },

      updload: (files) => {
        const { $axios } = useFetch()
        const formData = new FormData()

        for (let i = 0; i < files.length; i++) {
          formData.append('files[]', files[i])
        }

        $axios.post('/upload', formData).then((res) => {
          console.log('upload response:', res.data)
        })
      }
    }
  }
})
