export const siteConfig = {
  name: '金坛小吃榜单',
  phone: '17851030324',
  wechatId: 'Mumujz8',
  wechatQrPath: '/wechat-qr.png',
  beian: '苏ICP备XXXXXXXX号',
  api: {
    enabled: false,
    leadEndpoint: '',
    merchantEndpoint: ''
  }
} as const

export type SiteConfig = typeof siteConfig
