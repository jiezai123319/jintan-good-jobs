export const siteConfig = {
  name: '金坛好工作',
  phone: '17851030324',
  wechatId: 'Mumujz8',
  wechatQrPath: '/wechat-qr.png',
  beian: '苏ICP备XXXXXXXX号',
  api: {
    enabled: false,
    leadEndpoint: '',
    partnerEndpoint: ''
  }
} as const

export type SiteConfig = typeof siteConfig
