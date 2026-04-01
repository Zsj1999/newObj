const cityGroups = [
  { city: "北京", districts: ["海淀区", "朝阳区", "丰台区", "东城区", "西城区", "通州区", "石景山区", "昌平区"] },
  { city: "上海", districts: ["浦东新区", "徐汇区", "静安区", "黄浦区", "长宁区", "闵行区", "杨浦区", "普陀区"] },
  { city: "深圳", districts: ["南山区", "福田区", "宝安区", "龙岗区", "罗湖区", "龙华区", "光明区", "坪山区"] },
  { city: "广州", districts: ["天河区", "海珠区", "黄埔区", "番禺区", "白云区", "越秀区", "南沙区", "增城区"] },
  { city: "杭州", districts: ["西湖区", "余杭区", "滨江区", "拱墅区", "上城区", "萧山区", "临平区", "钱塘区"] },
  { city: "成都", districts: ["高新区", "武侯区", "锦江区", "金牛区", "青羊区", "成华区", "天府新区", "双流区"] },
  { city: "南京", districts: ["鼓楼区", "玄武区", "秦淮区", "建邺区", "栖霞区", "江宁区", "浦口区", "六合区"] },
  { city: "武汉", districts: ["洪山区", "武昌区", "江汉区", "硚口区", "汉阳区", "青山区", "东湖高新区", "江夏区"] },
  { city: "西安", districts: ["雁塔区", "高新区", "莲湖区", "碑林区", "新城区", "长安区", "未央区", "曲江新区"] },
  { city: "苏州", districts: ["工业园区", "姑苏区", "虎丘区", "吴中区", "相城区", "新区", "昆山", "常熟"] },
  { city: "重庆", districts: ["渝北区", "江北区", "渝中区", "南岸区", "九龙坡区", "沙坪坝区", "两江新区", "高新区"] },
  { city: "天津", districts: ["滨海新区", "南开区", "河西 区", "和平区", "河东 区", "河北区", "西青区", "东丽区"] },
  { city: "长沙", districts: ["岳麓区", "雨花区", "芙蓉区", "天心区", "开福区", "长沙县", "望城区", "经开区"] },
  { city: "郑州", districts: ["郑东新区", "金水区", "二七区", "中原区", "管城区", "高新区", "经开区", "航空港区"] },
  { city: "东莞", districts: ["南城区", "东城区", "莞城区", "万江区", "虎门镇", "长安镇", "塘厦镇", "松山湖"] },
  { city: "佛山", districts: ["禅城区", "南海区", "顺德区", "高明区", "三水区", "狮山镇", "北滘镇", "大沥镇"] },
  { city: "宁波", districts: ["鄞州区", "海曙区", "江北区", "镇海区", "北仑区", "高新区", "杭州湾", "慈溪"] },
  { city: "无锡", districts: ["新吴区", "滨湖区", "梁溪区", "锡山区", "惠山区", "宜兴市", "江阴市", "经开区"] },
  { city: "青岛", districts: ["黄岛区", "崂山区", "市南区", "市北区", "城阳区", "李沧区", "即墨区", "高新区"] },
  { city: "济南", districts: ["历下区", "市中区", "槐荫区", "天桥区", "历城区", "高新区", "章丘区", "莱芜区"] },
  { city: "福州", districts: ["鼓楼区", "台江区", "仓山区", "晋安区", "马尾区", "长乐区", "高新区", "滨海新城"] },
  { city: "厦门", districts: ["思明区", "湖里区", "海沧区", "集美区", "同安区", "翔安区", "火炬区", "自贸区"] },
  { city: "珠海", districts: ["香洲区", "横琴新区", "高新区", "斗门区", "金湾区", "高栏港区", "万山区", "保税区"] },
  { city: "大连", districts: ["高新区", "甘井子区", "沙河口区", "中山区", "西岗区", "金普新区", "开发区", "保税区"] },
  { city: "沈阳", districts: ["浑南区", "和平区", "沈河区", "铁西区", "皇姑区", "大东区", "于洪区", "沈北新区"] },
  { city: "哈尔滨", districts: ["南岗区", "道里区", "香坊区", "松北区", "道外区", "平房区", "呼兰区", "经开区"] },
  { city: "长春", districts: ["朝阳区", "南关区", "宽城区", "二道区", "绿园区", "高新区", "经开区", "汽开区"] },
  { city: "昆明", districts: ["五华区", "盘龙区", "官渡区", "西山区", "呈贡区", "高新区", "经开区", "滇池度假区"] },
  { city: "贵阳", districts: ["观山湖区", "南明区", "云岩区", "花溪区", "乌当区", "白云区", "高新区", "经开区"] },
  { city: "南昌", districts: ["红谷滩区", "东湖区", "西湖区", "青云谱区", "青山湖区", "高新区", "经开区", "湾里区"] },
  { city: "合肥", districts: ["高新区", "政务区", "蜀山区", "庐阳区", "包河区", "经开区", "新站区", "肥西县"] },
  { city: "石家庄", districts: ["裕华区", "长安区", "桥西区", "新华区", "高新区", "经开区", "正定县", "鹿泉区"] },
  { city: "太原", districts: ["小店区", "迎泽区", "杏花岭区", "尖草坪区", "万柏林区", "晋源区", "高新区", "经开区"] },
  { city: "兰州", districts: ["城关区", "七里河区", "西固区", "安宁区", "高新区", "经开区", "兰州新区", "红古区"] },
  { city: "南宁", districts: ["青秀区", "兴宁区", "江南区", "西乡塘区", "良庆区", "邕宁区", "高新区", "经开区"] },
  { city: "海口", districts: ["龙华区", "美兰区", "秀英区", "琼山区", "高新区", "江东新区", "综保区", "复兴城"] },
  { city: "乌鲁木齐", districts: ["天山区", "沙依巴克区", "新市区", "水磨沟区", "头屯河区", "高新区", "经开区", "米东区"] },
  { city: "呼和浩特", districts: ["赛罕区", "新城区", "玉泉区", "回民区", "如意开发区", "金桥区", "金山高新区", "武川县"] }
];

const companyNames = [
  "星河科技", "云图互动", "海纳数据", "北辰智能", "青木未来", "光年网络",
  "星火教育", "至简医疗", "飞羽出行", "智谷供应链", "晨曦电商", "未来智造",
  "蓝鲸企业服务", "钛马信息", "华耀云计算", "数联智造", "云慧城市", "博创未来",
  "锐捷网络", "凌云系统", "卓品数字", "新程人才", "盛世明光", "中科软通",
  "启明星辰", "浪潮数据", "华光新媒体", "恒创互联", "天际空间", "领航无忧",
  "水滴石科技", "微创方舟", "天汇星云", "百川归海", "云帆远航", "锐益数据",
  "信步天下", "聚合数据", "数智引擎", "深视科技", "飞鸟智能", "领视创新",
  "云筑空间", "明远科技", "博明威视", "聚合洞察", "云腾智达", "明日矩阵",
  "灵境无限", "链动未来", "数觅科技", "云起龙跃", "飞轮数据", "点睛创新",
  "光影传媒", "华创视界", "云端互联", "浪潮云服", "领睿数据", "锐视未来",
  "数栖云端", "新萌科技", "深蓝算法", "云锋数据", "星图智脑", "聚云未来",
  "华信天成", "微光聚能", "云翰数据", "明科创新", "云智未来", "聚创时代",
  "华睿数据", "微云天下", "数聚星云", "新程智联", "博创数据", "云图未来",
  "闪亮视界", "云创空间", "华光数据", "明远互联", "数智云端", "聚星未来",
  "华创互联", "微光数据", "云腾互联", "明科互联", "云智互联", "聚创互联",
  "华睿互联", "微云智联", "数聚互联", "新程互联", "博创互联", "云图互联"
];

const industries = [
  "互联网",
  "智能制造",
  "医疗健康",
  "教育培训",
  "电商零售",
  "物流供应链",
  "金融科技",
  "企业服务",
  "文化娱乐",
  "旅游出行",
  "房产家居",
  "新能源汽车",
  "人工智能",
  "信息安全",
  "游戏产业",
  "现代农业",
  "新材料",
  "能源科技"
];

const jobFamilies = [
  { title: "前端开发工程师", tags: ["Vue2", "React", "TypeScript", "Node.js"], category: "技术" },
  { title: "后端开发工程师", tags: ["Java", "Spring Boot", "Go", "Python"], category: "技术" },
  { title: "全栈工程师", tags: ["Vue2", "Node.js", "MySQL", "Redis"], category: "技术" },
  { title: "移动端开发工程师", tags: ["Flutter", "React Native", "iOS", "Android"], category: "技术" },
  { title: "算法工程师", tags: ["Python", "TensorFlow", "PyTorch", "深度学习"], category: "技术" },
  { title: "数据工程师", tags: ["Python", "Spark", "Flink", "Hive"], category: "技术" },
  { title: "产品经理", tags: ["需求分析", "B端产品", "C端产品", "数据增长"], category: "产品" },
  { title: "UI设计师", tags: ["Figma", "Sketch", "交互设计", "动效设计"], category: "设计" },
  { title: "视觉设计师", tags: ["PS", "AI", "品牌设计", "插画"], category: "设计" },
  { title: "测试工程师", tags: ["自动化测试", "接口测试", "性能测试", "质量保障"], category: "技术" },
  { title: "运维工程师", tags: ["Linux", "Docker", "Kubernetes", "DevOps"], category: "技术" },
  { title: "安全工程师", tags: ["渗透测试", "安全架构", "代码审计", "应急响应"], category: "技术" },
  { title: "数据分析师", tags: ["Python", "SQL", "Tableau", "Excel"], category: "数据" },
  { title: "产品运营", tags: ["用户增长", "活动策划", "内容运营", "社群运营"], category: "运营" },
  { title: "市场策划", tags: ["品牌推广", "渠道合作", "营销增长", "商务拓展"], category: "运营" },
  { title: "商务经理", tags: ["客户拓展", "渠道合作", "商务谈判", "项目管理"], category: "商务" },
  { title: "HR专员", tags: ["招聘", "培训", "薪酬", "员工关系"], category: "HR" },
  { title: "财务专员", tags: ["会计核算", "税务申报", "预算管理", "财务分析"], category: "职能" },
  { title: "行政助理", tags: ["日程管理", "会务组织", "采购管理", "后勤保障"], category: "职能" },
  { title: "供应链专员", tags: ["采购管理", "仓储物流", "供应商管理", "成本控制"], category: "运营" },
  { title: "质量管理", tags: ["质量体系", "来料检验", "过程控制", "客户投诉"], category: "质量" },
  { title: "机械工程师", tags: ["SolidWorks", "AutoCAD", "结构设计", "工艺规划"], category: "技术" },
  { title: "电气工程师", tags: ["PLC", "电路设计", "电气调试", "控制系统"], category: "技术" },
  { title: "嵌入式工程师", tags: ["C语言", "STM32", "RTOS", "驱动开发"], category: "技术" },
  { title: "售前工程师", tags: ["方案编写", "技术交流", "招投标", "需求调研"], category: "售前" },
  { title: "项目经理", tags: ["PMP", "敏捷管理", "风险控制", "资源协调"], category: "管理" },
  { title: "法务专员", tags: ["合同审核", "法律咨询", "合规管理", "知识产权"], category: "职能" },
  { title: "文案策划", tags: ["内容创作", "文案撰写", "品牌传播", "媒体关系"], category: "内容" },
  { title: "主播/直播运营", tags: ["直播带货", "内容策划", "粉丝运营", "数据复盘"], category: "运营" },
  { title: "医药代表", tags: ["医院开拓", "客情维护", "学术推广", "销售达成"], category: "销售" },
  { title: "留学顾问", tags: ["院校申请", "文书撰写", "签证办理", "留学规划"], category: "咨询" },
  { title: "课程顾问", tags: ["课程销售", "需求分析", "续费转化", "学员管理"], category: "销售" },
  { title: "理财顾问", tags: ["客户开发", "资产配置", "产品推荐", "财富规划"], category: "金融" },
  { title: "保险顾问", tags: ["保险规划", "客户开拓", "理赔服务", "团队管理"], category: "金融" },
  { title: "餐饮运营", tags: ["门店管理", "食品安全", "人员排班", "成本管控"], category: "运营" },
  { title: "酒店管理", tags: ["前厅管理", "客房运营", "收益管理", "宾客关系"], category: "运营" },
  { title: "物业管家", tags: ["业主服务", "设备维护", "社区运营", "投诉处理"], category: "服务" },
  { title: "健身教练", tags: ["私教课程", "团课教学", "会员维护", "业绩达成"], category: "服务" },
  { title: "摄影摄像师", tags: ["商业摄影", "视频拍摄", "后期剪辑", "灯光布置"], category: "创意" },
  { title: "短视频编导", tags: ["脚本策划", "拍摄统筹", "后期审核", "账号运营"], category: "内容" }
];

const benefitsPool = [
  "六险一金", "七险一金", "八险一金", "商业保险",
  "弹性上班", "弹性工作", "远程办公", "申请 remote",
  "年度体检", "季度体检", "免费体检",
  "带薪年假", "带薪病假", "带薪婚假", "带薪产假",
  "双休", "大小周", "单双轮休",
  "绩效奖金", "年终奖金", "项目奖金", "股票期权",
  "餐补", "免费工作餐", "餐食补贴",
  "租房补贴", "住房补贴", "员工宿舍",
  "节日礼金", "生日福利", "结婚礼金", "生育礼金",
  "年度旅游", "outing", "团建活动", "部门团建",
  "交通补贴", "通讯补贴", "差旅报销",
  "定期调薪", "晋升机会", "培训体系", "导师制",
  "免费健身房", "下午茶", "零食饮料", "节日活动",
  "人才引进", "落户支持", "签证办理"
];

const employmentTypes = ["全职", "实习", "校招", "社招", "兼职", "外包"];
const educationLevels = ["初中", "中专", "高中", "大专", "本科", "硕士", "博士"];
const experiences = ["无需经验", "1年以内", "1-3年", "3-5年", "5-10年", "10年以上", "经验不限"];
const salaryRanges = ["4k以下", "4-8k", "8-12k", "12-18k", "18-25k", "25-35k", "35-50k", "50k以上"];

const companyObjects = companyNames.map((name, index) => {
  const cityInfo = cityGroups[index % cityGroups.length];
  const industriesLen = industries.length;
  return {
    id: `company-${index + 1}`,
    name,
    industry: industries[index % industriesLen],
    city: cityInfo.city,
    district: cityInfo.districts[index % cityInfo.districts.length],
    scale: [
      "50人以下", "50-99人", "100-199人", "200-499人",
      "500-999人", "1000-1999人", "2000-4999人", "5000-9999人", "10000人以上"
    ][index % 9],
    financing: ["不需要融资", "天使轮", "A轮", "B轮", "C轮", "D轮及以上", "已上市"][index % 7],
    rating: Number((3.8 + (index % 22) * 0.05).toFixed(1)),
    openJobs: 10 + (index % 8) * 7 + (index % 3) * 3,
    hrCount: 3 + (index % 5) * 2,
    cityCount: 1 + (index % 6),
    summary: `${name}专注${industries[index % industriesLen]}赛道，主营业务覆盖全国多个城市，致力于为企业和人才提供高效协同的数字化解决方案。`
  };
});

const jobs = Array.from({ length: 2880 }, (_, index) => {
  const family = jobFamilies[index % jobFamilies.length];
  const company = companyObjects[index % companyObjects.length];
  const cityInfo = cityGroups[index % cityGroups.length];
  const district = cityInfo.districts[(index * 7 + 3) % cityInfo.districts.length];
  const salaryBase = 4 + (index % 20) * 2;
  const salaryMax = salaryBase + 4 + (index % 8) * 2;
  const publishedDays = (index % 30) + 1;
  const benefitStart = (index * 13 + 5) % benefitsPool.length;

  return {
    id: `job-${index + 1}`,
    title: family.title,
    companyId: company.id,
    company: company.name,
    industry: company.industry,
    category: family.category,
    city: cityInfo.city,
    district,
    location: `${cityInfo.city} · ${district}`,
    salary: salaryBase < salaryMax ? `${salaryBase}k-${salaryMax}k` : `${salaryBase}k`,
    salaryMin: salaryBase,
    salaryMax,
    experience: experiences[index % experiences.length],
    education: educationLevels[index % educationLevels.length],
    employmentType: employmentTypes[index % employmentTypes.length],
    tags: [
      family.tags[index % family.tags.length],
      family.tags[(index + 2) % family.tags.length],
      company.financing === "已上市" ? "上市公司" : company.financing,
      industries[index % industries.length]
    ],
    benefits: [
      benefitsPool[benefitStart],
      benefitsPool[(benefitStart + 3) % benefitsPool.length],
      benefitsPool[(benefitStart + 7) % benefitsPool.length],
      benefitsPool[(benefitStart + 11) % benefitsPool.length]
    ],
    publishedAt: publishedDays === 1 ? "今天" : publishedDays === 2 ? "昨天" : `${publishedDays}天前`,
    applicants: 5 + (index % 120) * 2,
    urgent: index % 11 === 0,
    remote: index % 13 === 0,
    fresh: index % 5 === 0,
    description: [
      `负责${family.tags[0]}相关核心业务开发，与产品、设计、测试团队紧密协作，共同推进项目交付。`,
      `参与系统架构设计与技术选型，持续优化代码质量，提升产品性能与用户体验。`,
      `主导或参与关键模块的技术攻关，沉淀可复用的技术方案与业务组件。`,
      `关注行业技术动态，结合业务实际情况推动技术创新与落地。`,
      `配合团队完成项目里程碑，跟进需求评审、开发、测试、上线的全流程。`
    ],
    requirements: [
      `熟悉${family.tags[0]}或${family.tags[1]}，有独立负责项目或模块的经验优先。`,
      `具备良好的编程习惯与代码风格，理解常见设计模式，能写出高质量可维护代码。`,
      `善于沟通协作，能清晰表达技术方案与思路，具备良好的团队合作精神。`,
      `对工作充满热情，有责任心，执行力强，能承受一定工作压力。`,
      `计算机相关专业背景或具备对应岗位实际项目经验者从优考虑。`
    ]
  };
});

const applications = Array.from({ length: 1200 }, (_, index) => {
  const job = jobs[index % jobs.length];
  const statusList = ["待沟通", "简历筛选", "笔试中", "初面", "复试", "谈薪中", "已发 Offer", "已拒绝", "已取消"];
  return {
    id: `delivery-${index + 1}`,
    candidate: `候选人${String(index + 1).padStart(4, "0")}`,
    jobId: job.id,
    jobTitle: job.title,
    company: job.company,
    city: job.city,
    salary: job.salary,
    status: statusList[index % statusList.length],
    updatedAt: `2026-03-${String((index % 28) + 1).padStart(2, "0")}`,
    matchScore: 58 + (index % 41),
    source: ["BOSS直聘", "智联招聘", "前程无忧", "猎聘", "内部推荐", "官网投递"][index % 6]
  };
});

const companies = companyObjects;

const portalMetrics = [
  { label: "在线岗位", value: jobs.length, suffix: "个" },
  { label: "合作企业", value: companies.length, suffix: "家" },
  { label: "覆盖城市", value: cityGroups.length, suffix: "座" },
  { label: "本周新增", value: Math.floor(jobs.length / 8), suffix: "个职位" }
];

export { applications, companies, jobs, portalMetrics, cityGroups };
