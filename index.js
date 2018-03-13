const request = require('request')

const body = {"method":"phone","group_sn":"29eafe3de6b258f4","sign":"68a7fd6e90b120ad1bf20a31c2d2fb60","phone":"","device_id":"","hardware_id":"","platform":0,"track_id":"","weixin_avatar":"","weixin_username":"....","unionid":""}
const jinjun = {"method":"phone","group_sn":"29eafe3de6b258f4","sign":"b006d0049d21c4d10465dd879045ce26","phone":"","device_id":"","hardware_id":"","platform":4,"track_id":"undefined","weixin_avatar":"http://thirdwx.qlogo.cn/mmopen/vi_32/uuu9iaL7AFtonH5bA60iaICVltmPics4ydkTtjp0uxHSibJrkc6DPeax5GcloloHza70QV0HZXjibSItrSyP0IhGSHQ/132","weixin_username":"🔥 金俊 🔥","unionid":""}

function getRedBegNum(timer) {
  return timer => {
    request({
      url: 'https://h5.ele.me/restapi/marketing/promotion/weixin/oEGLvjgafvfLBvx-Nu5IYsyVA8x0',
      method: 'POST',
      json: true,
      headers: {
        "content-type": "application/json",
      },
      body,
    }, function(error, response, body) {
      const current = body.promotion_records.length
      const total = 7
      console.log(`Got red beg amount: ${body.promotion_records.length}`)
      if (current === total - 1) {
        request({
          url: 'https://h5.ele.me/restapi/marketing/promotion/weixin/oEGLvju5gGuCovbF3eIIsCzG-4P8',
          method: 'POST',
          json: true,
          headers: {
            "content-type": "application/json",
          },
          body: jinjun,
        }, (error, response, body) => { console.log(`jinjun got a red beg: ${body.promotion_records.length}`) })
      }
      if (current >= total){ clearInterval(timer) }
    })
  }
}

let timer = null
timer = setInterval(getRedBegNum(timer), 15000)