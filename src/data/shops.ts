import { ShopItem } from '../types'

export const shopCategories = ['全部','早餐榜','面馆榜','夜宵榜','老店榜','游客必吃榜']

export const defaultShops: ShopItem[] = [
  {
    id: 1, name: '金坛老字号小笼包', category: '早餐榜', address: '金坛区东门大街56号',
    avgPrice: '15元', hours: '06:00-11:00', signatureDish: '鲜肉小笼包、豆腐花',
    reason: '金坛本地人从小吃到大的老味道，皮薄馅多汤汁足',
    tags: ['早餐','老字号','小吃'], phone: '13800000001', updateTime: '本周更新',
    status: '上架', verified: true, rank: 1
  },
  {
    id: 2, name: '长荡湖鱼头馆', category: '游客必吃榜', address: '华罗庚科技产业园内',
    avgPrice: '80元', hours: '10:00-21:00', signatureDish: '剁椒鱼头、鱼头汤',
    reason: '长荡湖鲜鱼直供，金坛最出名的特色菜馆之一',
    tags: ['游客必吃','鱼鲜','聚餐'], phone: '13800000002', updateTime: '本周更新',
    status: '上架', verified: true, rank: 2
  },
  {
    id: 3, name: '金坛牛肉面馆', category: '面馆榜', address: '金坛开发区华城路88号',
    avgPrice: '20元', hours: '06:30-14:00', signatureDish: '红烧牛肉面、牛杂面',
    reason: '汤浓肉香面劲道，金坛面馆排名第一',
    tags: ['面馆','午餐','实惠'], phone: '13800000003', updateTime: '本周更新',
    status: '上架', verified: true, rank: 3
  },
  {
    id: 4, name: '夜市烧烤大排档', category: '夜宵榜', address: '金坛夜市美食街',
    avgPrice: '50元', hours: '17:00-02:00', signatureDish: '烤羊肉串、烤鱼、花甲',
    reason: '金坛最火爆的深夜食堂，烟火气十足',
    tags: ['夜宵','烧烤','聚餐'], phone: '13800000004', updateTime: '本周更新',
    status: '上架', verified: false, rank: 4
  },
  {
    id: 5, name: '老陈记锅贴', category: '老店榜', address: '金城镇文化路12号',
    avgPrice: '12元', hours: '06:00-10:30', signatureDish: '招牌锅贴、牛肉粉丝汤',
    reason: '二十多年老店，金坛锅贴界天花板',
    tags: ['老店','早餐','锅贴'], phone: '13800000005', updateTime: '本周更新',
    status: '上架', verified: true, rank: 5
  },
  {
    id: 6, name: '王记小馄饨', category: '早餐榜', address: '金坛老街南门桥头',
    avgPrice: '10元', hours: '05:30-12:00', signatureDish: '鲜肉小馄饨、葱油饼',
    reason: '清晨五点就排队的街边早餐摊，简单但好吃',
    tags: ['早餐','实惠','老街'], phone: '13800000006', updateTime: '本周更新',
    status: '上架', verified: false, rank: 6
  },
  {
    id: 7, name: '老刘家羊汤馆', category: '老店榜', address: '直溪镇老街15号',
    avgPrice: '25元', hours: '08:00-20:00', signatureDish: '羊肉汤、羊杂汤、烧饼',
    reason: '冬季必去的暖身好店，汤白肉嫩不膻',
    tags: ['老店','羊汤','冬季'], phone: '13800000007', updateTime: '本周更新',
    status: '上架', verified: true, rank: 7
  },
  {
    id: 8, name: '老地方大排档', category: '夜宵榜', address: '朱林镇人民路28号',
    avgPrice: '40元', hours: '16:00-24:00', signatureDish: '酸菜鱼、辣子鸡、毛血旺',
    reason: '夜宵届的性价比之王，量大味美',
    tags: ['夜宵','川菜','实惠'], phone: '13800000008', updateTime: '本周更新',
    status: '上架', verified: false, rank: 8
  },
  {
    id: 9, name: '儒林手工面', category: '面馆榜', address: '儒林镇中心街22号',
    avgPrice: '18元', hours: '07:00-13:30', signatureDish: '手工拉面、炸酱面、凉皮',
    reason: '纯手工制作的面条，劲道爽滑分量足',
    tags: ['面馆','手工','午餐'], phone: '13800000009', updateTime: '本周更新',
    status: '上架', verified: false, rank: 9
  },
  {
    id: 10, name: '金坛特色小吃坊', category: '游客必吃榜', address: '金坛开发区旅游集散中心',
    avgPrice: '30元', hours: '09:00-19:00', signatureDish: '茅山咸肉、糖芋苗、米糕',
    reason: '一站式吃遍金坛特色小吃，游客首选',
    tags: ['游客必吃','特产','伴手礼'], phone: '13800000010', updateTime: '本周更新',
    status: '上架', verified: true, rank: 10
  },
  {
    id: 11, name: '老字号豆腐花', category: '早餐榜', address: '金坛区西门菜场旁',
    avgPrice: '8元', hours: '05:30-10:30', signatureDish: '咸豆腐花、甜豆腐花、油条',
    reason: '金坛最地道的豆腐花，三代传承的手艺',
    tags: ['早餐','老字号','实惠'], phone: '13800000011', updateTime: '本周更新',
    status: '上架', verified: true
  },
  {
    id: 12, name: '小周夜宵店', category: '夜宵榜', address: '金坛开发区夜市西区',
    avgPrice: '35元', hours: '18:00-01:30', signatureDish: '小龙虾、螺蛳、炒粉干',
    reason: '夏季夜宵首选，小龙虾个大味美',
    tags: ['夜宵','小龙虾','夏季'], phone: '13800000012', updateTime: '本周更新',
    status: '上架', verified: false
  },
  {
    id: 13, name: '老金坛面馆', category: '面馆榜', address: '金城镇县府路5号',
    avgPrice: '22元', hours: '06:30-14:00', signatureDish: '阳春面、大排面、雪菜肉丝面',
    reason: '三十年老面馆，金坛人的味觉记忆',
    tags: ['面馆','老店','经典'], phone: '13800000013', updateTime: '本周更新',
    status: '上架', verified: true
  },
  {
    id: 14, name: '华罗庚公园小吃摊', category: '游客必吃榜', address: '华罗庚公园南门',
    avgPrice: '15元', hours: '08:00-18:00', signatureDish: '梅花糕、烤红薯、糖葫芦',
    reason: '逛公园必吃的街边小吃，满满的童年回忆',
    tags: ['游客必吃','街边小吃','休闲'], phone: '13800000014', updateTime: '本周更新',
    status: '上架', verified: false
  },
  {
    id: 15, name: '金坛老酒馆', category: '老店榜', address: '金坛区东门老街33号',
    avgPrice: '60元', hours: '11:00-22:00', signatureDish: '卤味拼盘、黄酒、酱鸭',
    reason: '金坛资格最老的酒馆，适合三五好友小聚',
    tags: ['老店','酒馆','聚餐'], phone: '13800000015', updateTime: '本周更新',
    status: '上架', verified: true
  }
]
