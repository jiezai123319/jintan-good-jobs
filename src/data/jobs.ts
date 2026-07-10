import { AdminJob } from '../types'

export const defaultJobs: AdminJob[] = [
  {
    id: 1, title: '新能源厂操作工', company: '金坛新能源科技有限公司',
    salary: '6500-8500元/月', area: '金坛开发区',
    tags: ['包吃住', '五险一金', '倒班'],
    description: '负责产线设备操作、物料流转和基础记录，有制造业经验优先。',
    shift: '两班倒', benefits: '五险一金、包吃住、节日福利', headcount: '20',
    contact: '张主管', phone: '13800000001', updateTime: '本周更新',
    status: '上架', sourceType: '工厂直招', verified: true
  },
  {
    id: 2, title: '光伏组件质检员', company: '华罗庚光伏产业园',
    salary: '5800-7500元/月', area: '华罗庚科技产业园',
    tags: ['女工', '长白班', '坐班'],
    description: '负责外观检测、数据登记，要求细心稳定，能适应车间环境。',
    shift: '长白班', benefits: '五险、餐补、住宿', headcount: '15',
    contact: '李主管', phone: '13800000002', updateTime: '本周更新',
    status: '上架', sourceType: '工厂直招', verified: true
  },
  {
    id: 3, title: '汽车零部件包装工', company: '金城汽车配件有限公司',
    salary: '5500-7000元/月', area: '金城镇',
    tags: ['长白班', '包吃住'],
    description: '负责产品包装、贴标、装箱，岗位简单，上手快。',
    shift: '长白班', benefits: '包吃住、社保', headcount: '10',
    contact: '王主管', phone: '13800000003', updateTime: '本周更新',
    status: '上架', sourceType: '人力资源公司', verified: false
  },
  {
    id: 4, title: '电子厂小时工', company: '金坛电子产业园',
    salary: '22-26元/小时', area: '开发区周边',
    tags: ['小时工', '包吃住'],
    description: '短期和长期均可，适合近期想快速上岗的求职者。',
    shift: '两班倒', benefits: '包吃住、周结', headcount: '30',
    contact: '刘主管', phone: '13800000004', updateTime: '本周更新',
    status: '上架', sourceType: '劳务派遣', verified: false
  },
  {
    id: 5, title: '仓管叉车工', company: '直溪物流仓储中心',
    salary: '6500-7800元/月', area: '直溪镇',
    tags: ['五险一金', '包吃住'],
    description: '负责仓库收发货、库存整理，需叉车证。',
    shift: '长白班', benefits: '五险一金、包吃住', headcount: '5',
    contact: '陈主管', phone: '13800000005', updateTime: '本周更新',
    status: '上架', sourceType: '工厂直招', verified: true
  },
  {
    id: 6, title: '设备维护学徒', company: '儒林智能制造有限公司',
    salary: '6000-9000元/月', area: '儒林镇',
    tags: ['五险一金', '技术岗'],
    description: '协助设备点检、保养和故障处理，适合想学技术的求职者。',
    shift: '两班倒', benefits: '五险一金、技术培训、晋升空间', headcount: '8',
    contact: '赵主管', phone: '13800000006', updateTime: '本周更新',
    status: '上架', sourceType: '工厂直招', verified: true
  },
  {
    id: 7, title: '锂电材料分选工', company: '金坛锂电新材料公司',
    salary: '6200-8200元/月', area: '金坛开发区',
    tags: ['包吃住', '女工', '倒班'],
    description: '负责物料分选、称重和记录，工作流程稳定。',
    shift: '两班倒', benefits: '包吃住、五险', headcount: '12',
    contact: '孙主管', phone: '13800000007', updateTime: '本周更新',
    status: '上架', sourceType: '人力资源公司', verified: false
  },
  {
    id: 8, title: '夫妻工宿舍岗', company: '朱林镇工业园区',
    salary: '6000-8000元/月', area: '朱林镇',
    tags: ['包吃住', '夫妻工', '长白班'],
    description: '适合夫妻同厂就业，提供住宿，岗位以包装、辅助生产为主。',
    shift: '长白班', benefits: '包吃住、夫妻宿舍', headcount: '5',
    contact: '周主管', phone: '13800000008', updateTime: '本周更新',
    status: '上架', sourceType: '工厂直招', verified: true
  }
]

export const jobTags = ['全部','长白班','包吃住','五险一金','女工','小时工','坐班','技术岗']
