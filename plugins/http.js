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
              // 需寫在驗證button前，不然socket逾期 token也逾期，socket 會一直重連
              const token = useCookie('jwt-token')
              token.value = null

              showDialog({
                message: '驗證已逾期，請重新登入',
                theme: 'round-button'
              }).then(() => {
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

      upload: async (file, param = 'work') => {
        let returnData = {}

        // for (let i = 0; i < files.length; i++) {
        //   formData.append('files[]', files[i].file)
        // }
        const formData = new FormData()
        formData.append('file', file)

        await useFetch(`/file/upload/${param}`, {
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

      download: async (url, filename) => {
        const token = useCookie('jwt-token')

        if (!token.value) {
          showDialog({
            message: '請先登入才可下載檔案',
            theme: 'round-button'
          }).then(() => {
            navigateTo('/member/login')
          })

          return
        }

        await useFetch(url, {
          method: 'get',
          baseURL: '/api',
          onRequest({ options }) {
            // 設定請求時夾帶的標頭
            options.headers = options.headers || {}
            options.headers.authorization = `Bearer ${token.value}`
          },
          async onResponse({ response }) {
            // -2:jwt驗證未通過
            if (response._data.code === -2) {
              showDialog({
                message: '驗證已逾期，請重新登入',
                theme: 'round-button'
              }).then(() => {
                navigateTo('/member/login')
              })
            }

            // const blob = await response._data // 非圖片檔案無法下載 (非 Blob 類型)
            // new Blob([data], { type: "text/plain" }) 第 2 參數可以指定 Blob 的類型
            const blob = new Blob([await response._data])

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
          }
        })
      },

      downloadShow: async (url) => {
        let res
        await useFetch(url, {
          method: 'get',
          baseURL: '/api',
          onRequest({ options }) {
            const token = useCookie('jwt-token')

            // 設定請求時夾帶的標頭
            options.headers = options.headers || {}
            options.headers.authorization = `Bearer ${token.value}`
          },
          async onResponse({ response }) {
            // -2:jwt驗證未通過
            if (response._data.code === -2) {
              showDialog({
                message: '驗證已逾期，請重新登入',
                theme: 'round-button'
              }).then(() => {
                navigateTo('/member/login')
              })
            }

            const blob = await response._data
            // 建立暫存的 URL 以供下載使用
            const url = URL.createObjectURL(blob)
            res = url
          }
        })
        return res
      }
    }
  }
})
