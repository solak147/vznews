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
            // -2:jwt驗證未通過
            if (response._data.code === -2) {
              showDialog({
                message: '驗證已逾期，請重新登入',
                theme: 'round-button'
              }).then(() => {
                const token = useCookie('jwt-token')
                token.value = null
                navigateTo('/member/login')
              })
            }

            returnData = response._data
          },
          onResponseError({ request, response, error }) {
            // 處理請求回應發生的錯誤
          }
        })

        if (isF5) await refresh()
        return returnData
      },

      upload: async (files) => {
        let returnData = {}

        const formData = new FormData()
        for (let i = 0; i < files.length; i++) {
          formData.append('files[]', files[i].file)
        }

        await useFetch('/file/upload', {
          method: 'post',
          body: formData,
          baseURL: '/api',
          onRequest({ options }) {
            const token = useCookie('jwt-token')

            // 設定請求時夾帶的標頭
            options.headers = options.headers || {}
            options.headers.authorization = `Bearer ${token.value}`
          },
          onResponse({ response }) {
            // -2:jwt驗證未通過
            if (response._data.code === -2) {
              showDialog({
                message: '驗證已逾期，請重新登入',
                theme: 'round-button'
              }).then(() => {
                navigateTo('/member/login')
              })
            }

            returnData = response._data
          }
        })

        return returnData
      },

      download: async (filename) => {
        try {
          const token = useCookie('jwt-token')

          // 將要傳遞的參數轉換為 URLSearchParams 物件
          const params = new URLSearchParams()
          params.append('filename', filename)

          // 發送 GET 請求至 Golang 伺服器下載檔案
          const response = await fetch(
            `http://<golang-server-address>/download?${params.toString()}`,
            {
              headers: {
                Authorization: `Bearer ${token.value}`
              }
            }
          )

          // 將回傳的二進位檔案轉換為 Blob 物件
          const blob = await response.blob()

          // 建立暫存的 URL 以供下載使用
          const url = URL.createObjectURL(blob)

          // 創建一個新的 <a> 元素並設置下載屬性，然後觸發點擊事件下載檔案
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', filename)
          document.body.appendChild(link)
          link.click()
          link.remove()

          // 釋放暫存的 URL
          URL.revokeObjectURL(url)
        } catch (error) {
          console.error(error)
        }
      }
    }
  }
})
