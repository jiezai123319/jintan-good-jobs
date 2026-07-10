import { Job } from '../types'

export const jobTags = [
  '全部',
  '长白班',
  '包吃住',
  '五险一金',
  '女工',
  '小时工',
  '坐班',
  '技术岗'
]

export const jobs: Job[] = [
  {
    id: 1,
    title: '新能源厂操作工',
    salary: '6500-8500元/月',
    area: '金坛开发区',
    tags: ['包吃住', '五险一金', '倒班'],
    description: '负责产线设备操作、物料流转和基础记录，有制造业经验优先。',
    updateTime: '本周更新'
  },
  {
    id: 2,
    title: '光伏组件质检员',
    salary: '5800-7500元/月',
    area: '华罗庚科技产业园',
    tags: ['女工', '长白班', '坐班'],
    description: '负责外观检测、数据登记，要求细心稳定，能适应车间环境。',
    updateTime: '本周更新'
  },
  {
    id: 3,
    title: '汽车零部件包装工',
    salary: '5500-7000元/月',
    area: '金城镇',
    tags: ['长白班', '包吃住'],
    description: '负责产品包装、贴标、装箱，岗位简单，上手快。',
    updateTime: '本周更新'
  },
  {
    id: 4,
    title: '电子厂小时工',
    salary: '22-26元/小时',
    area: '开发区周边',
    tags: ['小时工', '包吃住'],
    description: '短期和长期均可，适合近期想快速上岗的求职者。',
    updateTime: '本周更新'
  },
  {
    id: 5,
    title: '仓管叉车工',
    salary: '6500-7800元/月',
    area: '直溪镇',
    tags: ['五险一金', '包吃住'],
    description: '负责仓库收发货、库存整理，需叉车证。',
    updateTime: '本周更新'
  },
  {
    id: 6,
    title: '设备维护学徒',
    salary: '6000-9000元/月',
    area: '儒林镇',
    tags: ['五险一金', '技术岗'],
    description: '协助设备点检、保养和故障处理，适合想学技术的求职者。',
    updateTime: '本周更新'
  },
  {
    id: 7,
    title: '锂电材料分选工',
    salary: '6200-8200元/月',
    area: '金坛开发区',
    tags: ['包吃住', '女工', '倒班'],
    description: '负责物料分选、称重和记录，工作流程稳定。',
    updateTime: '本周更新'
  },
  {
    id: 8,
    title: '夫妻工宿舍岗',
    salary: '6000-8000元/月',
    area: '朱林镇',
    tags: ['包吃住', '夫妻工', '长白班'],
    description: '适合夫妻同厂就业，提供住宿，岗位以包装、辅助生产为主。',
    updateTime: '本周更新'
  }
]
