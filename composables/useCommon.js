export default function () {
  const appConfig = useAppConfig()
  const { addressConfig, experience, caseType } = appConfig

  const formattedDate = (dateString) => {
    // 將日期時間字串轉換成 JavaScript 的 Date 物件
    const dateTime = new Date(dateString)

    // 取得年、月、日、時、分、秒的數值
    const year = dateTime.getFullYear()
    const month = dateTime.getMonth() + 1 // 注意月份從 0 開始，因此需要加 1
    const day = dateTime.getDate()
    const hours = dateTime.getHours()
    const minutes = dateTime.getMinutes()
    const seconds = dateTime.getSeconds()

    // 格式化年、月、日、時、分、秒
    const formattedDate =
      year.toString() +
      '-' +
      (month < 10 ? '0' : '') +
      month.toString() +
      '-' +
      (day < 10 ? '0' : '') +
      day.toString()
    const formattedTime =
      (hours < 10 ? '0' : '') +
      hours.toString() +
      ':' +
      (minutes < 10 ? '0' : '') +
      minutes.toString() +
      ':' +
      (seconds < 10 ? '0' : '') +
      seconds.toString()

    // 最終結果
    const result = formattedDate + ' ' + formattedTime

    return result
  }

  const calTimeDiff = (dateString) => {
    const now = new Date()
    const date = new Date(dateString)
    const diff = (now.getTime() - date.getTime()) / 1000 / 60

    const lstUpdMin = Math.round(diff)
    if (lstUpdMin < 60) {
      return `${lstUpdMin}分鐘前 更新`
    } else if (lstUpdMin >= 60 && lstUpdMin < 60 * 24) {
      return `${Math.floor(lstUpdMin / 60)}小時前 更新`
    } else if (lstUpdMin >= 60 * 24 && lstUpdMin <= 60 * 24 * 30) {
      return `${Math.floor(lstUpdMin / (60 * 24))}天前 更新`
    } else {
      let day = date.getDate()
      let month = date.getMonth()
      const year = date.getFullYear()

      if (day < 10) {
        day = `0${day}`
      }

      if (month < 10) {
        month = `0${month}`
      }

      return `${year}/${month}/${day} 更新`
    }
  }

  let lastTime
  const calTimeDiffGrp = (dateString) => {
    const now = new Date()
    const date = new Date(dateString)
    const diff = (now.getTime() - date.getTime()) / 1000 / 60

    const lstUpdMin = Math.round(diff)

    if (lastTime === lstUpdMin || lstUpdMin < 1) {
      return
    }
    lastTime = lstUpdMin

    if (lstUpdMin < 60) {
      return `${lstUpdMin}分鐘前`
    } else if (lstUpdMin >= 60 && lstUpdMin < 60 * 24) {
      return `${Math.floor(lstUpdMin / 60)}小時前`
    } else if (lstUpdMin >= 60 * 24 && lstUpdMin <= 60 * 24 * 30) {
      return `${Math.floor(lstUpdMin / (60 * 24))}天前`
    } else {
      let day = date.getDate()
      let month = date.getMonth()
      const year = date.getFullYear()

      if (day < 10) {
        day = `0${day}`
      }

      if (month < 10) {
        month = `0${month}`
      }

      return `${year}/${month}/${day}`
    }
  }

  const transContactTime = (strTime) => {
    const timeArr = strTime.split(',')
    if (timeArr.length === 0) {
      return
    }

    let res = ''
    timeArr.forEach((e) => {
      switch (e) {
        case 'm':
          res += '<div>9:00 ~ 12:00</div>'
          break
        case 'a':
          res += '<div>13:00 ~ 18:00</div>'
          break
        case 'n':
          res += '<div>19:00 ~ 21:00</div>'
          break
        case 'x':
          res += '<div>不接聽手機</div>'
          break
      }
    })
    return res
  }

  const dateFormat = (date) => {
    // 获取年、月、日
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    // 将日期组合成字符串
    const dateString = `${year}-${month}-${day}`
    return dateString
  }

  const transAddressCode = (zipcode) => {
    const townArr = []
    addressConfig.forEach((city) => {
      city.children.forEach((t) => {
        t.displayText = `${city.text} ${t.text}`
        townArr.push(t)
      })
    })

    const town = townArr.filter((t) => {
      return t.value === zipcode
    })

    return town[0].displayText
  }

  const transExpCode = (code) => {
    const exp = experience.filter((e) => {
      return e.value === code
    })

    return exp
  }

  const trnasRoleCode = (code) => {
    let role
    switch (code) {
      case '1':
        role = '個人兼職'
        break
      case '2':
        role = '專職SOHO'
        break
      case '3':
        role = '工作室'
        break
      case '4':
        role = '兼職上班族'
        break
      case '5':
        role = '公司'
        break
      case '6':
        role = '學生'
        break
    }
    return role
  }

  const trnasCaseTypeCode = (codeArr) => {
    let res = caseType.filter((e) => {
      return codeArr.includes(e.value)
    })
    res = res.map((obj) => obj.text).join(',')
    return res
  }

  const formattedAmount = (amount) => {
    if (amount < 10000) {
      return `$${amount}`
    } else {
      const quotient = Math.floor(amount / 10000)
      const remainder = amount % 10000

      if (remainder === 0) {
        return `$${quotient}萬`
      } else {
        return `$${quotient}.${remainder / 1000}萬`
      }
    }
  }

  const formattedQuoteTotal = (total) => {
    let res
    if (total <= 5) {
      res = '0-5人'
    } else if (total > 5 && total <= 10) {
      res = '6-10人'
    } else if (total > 10 && total <= 30) {
      res = '11-30人'
    } else if (total > 30) {
      res = '30人以上'
    }

    return res
  }

  return {
    formattedDate,
    calTimeDiff,
    calTimeDiffGrp,
    transContactTime,
    dateFormat,
    transAddressCode,
    transExpCode,
    trnasRoleCode,
    trnasCaseTypeCode,
    formattedAmount,
    formattedQuoteTotal
  }
}
