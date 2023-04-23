export default function () {
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

  return {
    calTimeDiff,
    transContactTime
  }
}
