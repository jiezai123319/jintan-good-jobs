export const siteConfig = {
  name: '金坛小吃榜单',
  phone: '13800000000',
  wechatId: 'jtjob888',
  wechatQrPath: '/wechat-qr.png',
  beian: '苏ICP备XXXXXXXX号',
  api: {
    enabled: false,
    leadEndpoint: '',
    merchantEndpoint: ''
  }
} as const

export type SiteConfig = typeof siteConfig
