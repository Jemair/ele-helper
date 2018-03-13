const fetch = require('node-fetch')
const log4js = require('log4js')

log4js.configure({
  appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
  categories: { default: { appenders: ['cheese'], level: 'all' } }
});

const logger = log4js.getLogger('cheese')
const bagSn = '29e6802e149f48a7'
const luckyNum = 5

const Liam = {
  url: 'https://h5.ele.me/restapi/marketing/promotion/weixin/oEGLvjgafvfLBvx-Nu5IYsyVA8x0',
  body: {"method":"phone","group_sn":bagSn,"sign":"68a7fd6e90b120ad1bf20a31c2d2fb60","phone":"","device_id":"","hardware_id":"","platform":0,"track_id":"","weixin_avatar":"","weixin_username":"....","unionid":""},
}

const Jinjun = {
  url: 'https://h5.ele.me/restapi/marketing/promotion/weixin/oEGLvju5gGuCovbF3eIIsCzG-4P8',
  body: {"method":"phone","group_sn":bagSn,"sign":"b006d0049d21c4d10465dd879045ce26","phone":"","device_id":"","hardware_id":"","platform":4,"track_id":"undefined","weixin_avatar":"http://thirdwx.qlogo.cn/mmopen/vi_32/uuu9iaL7AFtonH5bA60iaICVltmPics4ydkTtjp0uxHSibJrkc6DPeax5GcloloHza70QV0HZXjibSItrSyP0IhGSHQ/132","weixin_username":"金俊","unionid":""},
}

const Weiwei = {
  url: 'https://h5.ele.me/restapi/marketing/promotion/weixin/oEGLvjpstncfFbNE-2w8vGx15o3g',
  body: {"method":"phone","group_sn":bagSn,"sign":"bb75302e1b5382e883bd69ab14100cb2","phone":"","device_id":"","hardware_id":"","platform":0,"track_id":"undefined","weixin_avatar":"http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKibZXTO06Q6VBiaic1JcggicaiaYsOOoib1G08dYfzjRucHibtb46HP4F9zc1t8nc7KlzxWnwCgoDEw3aOg/0","weixin_username":"apupp","unionid":""}
}

function fetchRedBag(data, fn) {
  return () => (
    fetch(data.url, {
      method: 'POST',
      json: true,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data.body),
    })
      .then(res => res.json())
      .then(res => {
        logger.info(res)
        fn(res)
      })
      .catch(err => logger.error(err))
  )
}

function testRedBag(tester, owner) {
  let timer = null
  timer = setTimeout(fetchRedBag(tester, (res) => {
    const totalGot = res.promotion_records.length
    console.log(`Current red bag counts ${totalGot}.`)
    if (totalGot < luckyNum - 1) {
      testRedBag(tester, owner)
      return
    } else if(totalGot === luckyNum - 1) {
      fetchRedBag(owner, (res) => {
        const totalGot = res.promotion_records.length
        if(totalGot === luckyNum - 1) {
          console.log('Got the biggest red bag')
          logger.info('Got the biggest red bag')
        } else {
          logger.fatal('Opps, something went wrong')
          logger.fatal(res)
        }
        console.log(`Red bag has been taken by ${res.promotion_records[luckyNum - 1].sns_username}`)
      })()
    }
    logger.trace('Trace end.')
    clearTimeout(timer)
  }), 10000 + Math.random() * -3000)
}

logger.trace('Trace start.')
testRedBag(Liam, Weiwei)