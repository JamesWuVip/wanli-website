// ===== 完整的国际化翻译对象 =====
const translations = {
    'zh-CN': {
        // 导航栏
        'nav.brand': '智理科技',
        'nav.home': '首页',
        'nav.services': '服务',
        'nav.cases': '案例',
        'nav.tech': '技术',
        'nav.contact': '联系',
        'nav.cta': '立即咨询',

        // Hero区域
        'hero.badge': '🤖 AI技术专家 · 教育大厂产研高管 · 专业外包服务',
        'hero.title1': '您的专属',
        'hero.title2': 'AI技术开发团队',
        'hero.subtitle': '承接企业软件开发外包项目',
        'hero.desc': '核心团队来自国内头部教育科技公司产研高管,深耕AI应用落地多年,为您提供从需求分析到上线运维的全流程技术服务',
        'hero.services': 'AI应用开发 · 智能教育系统 · 企业管理平台 · 电商解决方案 · 移动APP',
        'hero.cta1': '开始项目',
        'hero.cta2': '查看案例',

        // 数据统计
        'stats.value1': '100%',
        'stats.label1': '按期交付',
        'stats.value2': '24/7',
        'stats.label2': '稳定运行',
        'stats.value3': '5年+',
        'stats.label3': '行业经验',

        // 服务部分
        'services.title': '核心服务',
        'services.subtitle': '打造极致的数字化产品',

        'services.ai.title': 'AI智能应用',
        'services.ai.desc': '基于GPT-4、Claude等前沿模型,打造智能对话、文档处理、数据分析等AI解决方案',
        'services.ai.tag1': 'NLP',
        'services.ai.tag2': 'ML',
        'services.ai.tag3': 'LLM',

        'services.enterprise.title': '企业级系统',
        'services.enterprise.desc': 'ERP、CRM、OA等企业管理系统,微服务架构,高并发高可用',
        'services.enterprise.tag1': '微服务',
        'services.enterprise.tag2': 'Cloud',
        'services.enterprise.tag3': 'DevOps',

        'services.web.title': '现代Web应用',
        'services.web.desc': 'React、Next.js、Vue等技术栈,打造极致用户体验的Web应用',
        'services.web.tag1': 'React',
        'services.web.tag2': 'Next.js',
        'services.web.tag3': 'TypeScript',

        'services.mobile.title': '移动应用开发',
        'services.mobile.desc': 'iOS、Android原生开发,React Native跨平台方案',
        'services.mobile.tag1': 'iOS',
        'services.mobile.tag2': 'Android',
        'services.mobile.tag3': 'RN',

        'services.web3.title': 'Web3 & 区块链',
        'services.web3.desc': '智能合约、DApp、NFT平台等区块链应用开发',
        'services.web3.tag1': 'Solidity',
        'services.web3.tag2': 'Ethereum',
        'services.web3.tag3': 'Web3.js',

        'services.consulting.title': '技术咨询服务',
        'services.consulting.desc': '架构设计、技术选型、代码审查、性能优化',
        'services.consulting.tag1': '架构',
        'services.consulting.tag2': '优化',
        'services.consulting.tag3': '审查',

        // 案例展示
        'cases.title': '精选案例',
        'cases.subtitle': '我们为客户打造的优秀作品',

        'cases.case1.badge': 'SaaS · AI · 数据可视化',
        'cases.case1.name': 'AI数据分析平台',
        'cases.case1.title': '智能商业分析系统',
        'cases.case1.desc': '为某头部电商平台打造的AI驱动的商业智能分析系统,实时洞察业务数据',

        'cases.case2.badge': '企业系统 · 微服务 · Cloud',
        'cases.case2.name': '智能ERP系统',
        'cases.case2.title': '云原生企业管理平台',
        'cases.case2.desc': '为某制造业集团开发的全流程企业资源管理系统,支持10000+并发用户',

        'cases.case3.badge': '移动应用 · AI · 健康',
        'cases.case3.name': '健康管理App',
        'cases.case3.title': 'AI健康助手应用',
        'cases.case3.desc': '结合AI的个人健康管理应用,100万+活跃用户,App Store 4.8分评价',

        'cases.case4.badge': '电商 · 小程序 · 直播',
        'cases.case4.name': '新零售电商',
        'cases.case4.title': '社交电商平台',
        'cases.case4.desc': '集直播、社交、电商于一体的新零售平台,日GMV突破500万',

        'cases.case5.badge': 'Web3 · 区块链 · NFT',
        'cases.case5.name': 'NFT交易平台',
        'cases.case5.title': '数字艺术品交易平台',
        'cases.case5.desc': '基于以太坊的NFT铸造与交易平台,累计交易额超1000 ETH',

        'cases.case6.badge': '教育 · AI · 直播',
        'cases.case6.name': '在线教育平台',
        'cases.case6.title': '智能教育SaaS系统',
        'cases.case6.desc': 'AI驱动的在线教育平台,支持直播、录播、AI批改,服务50万+学员',

        // 技术栈
        'tech.title': '技术栈',
        'tech.subtitle': '使用最前沿的技术打造产品',

        // 联系表单
        'contact.title': '开始您的项目',
        'contact.subtitle': '让我们一起创造非凡的数字化体验',

        'contact.form.name': '您的姓名',
        'contact.form.name.placeholder': '张先生',
        'contact.form.phone': '联系电话',
        'contact.form.phone.placeholder': '138-0000-0000',
        'contact.form.projectType': '项目类型',
        'contact.form.projectType.placeholder': '请选择项目类型',
        'contact.form.projectType.ai': 'AI应用开发',
        'contact.form.projectType.enterprise': '企业系统',
        'contact.form.projectType.web': 'Web应用',
        'contact.form.projectType.mobile': '移动应用',
        'contact.form.projectType.web3': 'Web3/区块链',
        'contact.form.projectType.consulting': '技术咨询',
        'contact.form.message': '项目描述',
        'contact.form.message.placeholder': '简单描述您的项目需求和目标...',
        'contact.form.submit': '提交咨询 →',
        'contact.form.privacy': '🔒 您的信息将被严格保密 · ⚡ 2小时内快速响应',

        'contact.quick.phone.label': '电话咨询',
        'contact.quick.phone.value': '138-1179-6300',
        'contact.quick.email.label': '邮件联系',
        'contact.quick.email.value': 'wuning@wanli.ai',
        'contact.quick.wechat.label': '微信咨询',
        'contact.quick.wechat.value': '扫码添加',

        // 页脚
        'footer.brand': '智理科技',
        'footer.desc': '专注于为企业提供世界级的数字化解决方案。我们的团队由来自顶尖科技公司的资深工程师组成,致力于用技术推动商业创新。',

        'footer.services.title': '服务',
        'footer.services.ai': 'AI应用开发',
        'footer.services.enterprise': '企业系统',
        'footer.services.web': 'Web应用',
        'footer.services.mobile': '移动应用',

        'footer.contact.title': '联系',
        'footer.contact.phone': '📞 138-1179-6300',
        'footer.contact.email': '📧 wuning@wanli.ai',
        'footer.contact.location': '📍 北京市',

        'footer.copyright': '© 2024 北京智理科技有限公司. All Rights Reserved.',

        // 表单提示
        'form.submitting': '提交中...',
        'form.success': '✓ 提交成功',
        'form.error.phone': '请输入正确的手机号码',
        'form.notification.success': '感谢您的咨询！我们将在2小时内与您联系',
        'form.notification.error': '提交失败,请直接拨打电话:138-1179-6300',

        // 确认弹窗
        'confirm.title': '提交成功！',
        'confirm.subtitle': '我们已收到您的咨询',
        'confirm.name': '姓名',
        'confirm.phone': '电话',
        'confirm.response': '预计响应',
        'confirm.response.value': '2小时内',
        'confirm.call': '或直接拨打:138-1179-6300',
        'confirm.close': '关闭'
    },

    'zh-TW': {
        // 導航欄
        'nav.brand': '智理科技',
        'nav.home': '首頁',
        'nav.services': '服務',
        'nav.cases': '案例',
        'nav.tech': '技術',
        'nav.contact': '聯繫',
        'nav.cta': '立即諮詢',

        // Hero區域
        'hero.badge': '🤖 AI技術專家 · 教育大廠產研高管 · 專業外包服務',
        'hero.title1': '您的專屬',
        'hero.title2': 'AI技術開發團隊',
        'hero.subtitle': '承接企業軟體開發外包項目',
        'hero.desc': '核心團隊來自國內頭部教育科技公司產研高管,深耕AI應用落地多年,為您提供從需求分析到上線運維的全流程技術服務',
        'hero.services': 'AI應用開發 · 智能教育系統 · 企業管理平台 · 電商解決方案 · 移動APP',
        'hero.cta1': '開始項目',
        'hero.cta2': '查看案例',

        // 數據統計
        'stats.value1': '100%',
        'stats.label1': '按期交付',
        'stats.value2': '24/7',
        'stats.label2': '穩定運行',
        'stats.value3': '5年+',
        'stats.label3': '行業經驗',

        // 服務部分
        'services.title': '核心服務',
        'services.subtitle': '打造極致的數位化產品',

        'services.ai.title': 'AI智能應用',
        'services.ai.desc': '基於GPT-4、Claude等前沿模型,打造智能對話、文檔處理、數據分析等AI解決方案',
        'services.ai.tag1': 'NLP',
        'services.ai.tag2': 'ML',
        'services.ai.tag3': 'LLM',

        'services.enterprise.title': '企業級系統',
        'services.enterprise.desc': 'ERP、CRM、OA等企業管理系統,微服務架構,高並發高可用',
        'services.enterprise.tag1': '微服務',
        'services.enterprise.tag2': 'Cloud',
        'services.enterprise.tag3': 'DevOps',

        'services.web.title': '現代Web應用',
        'services.web.desc': 'React、Next.js、Vue等技術棧,打造極致用戶體驗的Web應用',
        'services.web.tag1': 'React',
        'services.web.tag2': 'Next.js',
        'services.web.tag3': 'TypeScript',

        'services.mobile.title': '移動應用開發',
        'services.mobile.desc': 'iOS、Android原生開發,React Native跨平台方案',
        'services.mobile.tag1': 'iOS',
        'services.mobile.tag2': 'Android',
        'services.mobile.tag3': 'RN',

        'services.web3.title': 'Web3 & 區塊鏈',
        'services.web3.desc': '智能合約、DApp、NFT平台等區塊鏈應用開發',
        'services.web3.tag1': 'Solidity',
        'services.web3.tag2': 'Ethereum',
        'services.web3.tag3': 'Web3.js',

        'services.consulting.title': '技術諮詢服務',
        'services.consulting.desc': '架構設計、技術選型、代碼審查、性能優化',
        'services.consulting.tag1': '架構',
        'services.consulting.tag2': '優化',
        'services.consulting.tag3': '審查',

        // 案例展示
        'cases.title': '精選案例',
        'cases.subtitle': '我們為客戶打造的優秀作品',

        'cases.case1.badge': 'SaaS · AI · 數據可視化',
        'cases.case1.name': 'AI數據分析平台',
        'cases.case1.title': '智能商業分析系統',
        'cases.case1.desc': '為某頭部電商平台打造的AI驅動的商業智能分析系統,實時洞察業務數據',

        'cases.case2.badge': '企業系統 · 微服務 · Cloud',
        'cases.case2.name': '智能ERP系統',
        'cases.case2.title': '雲原生企業管理平台',
        'cases.case2.desc': '為某製造業集團開發的全流程企業資源管理系統,支持10000+並發用戶',

        'cases.case3.badge': '移動應用 · AI · 健康',
        'cases.case3.name': '健康管理App',
        'cases.case3.title': 'AI健康助手應用',
        'cases.case3.desc': '結合AI的個人健康管理應用,100萬+活躍用戶,App Store 4.8分評價',

        'cases.case4.badge': '電商 · 小程序 · 直播',
        'cases.case4.name': '新零售電商',
        'cases.case4.title': '社交電商平台',
        'cases.case4.desc': '集直播、社交、電商於一體的新零售平台,日GMV突破500萬',

        'cases.case5.badge': 'Web3 · 區塊鏈 · NFT',
        'cases.case5.name': 'NFT交易平台',
        'cases.case5.title': '數位藝術品交易平台',
        'cases.case5.desc': '基於以太坊的NFT鑄造與交易平台,累計交易額超1000 ETH',

        'cases.case6.badge': '教育 · AI · 直播',
        'cases.case6.name': '在線教育平台',
        'cases.case6.title': '智能教育SaaS系統',
        'cases.case6.desc': 'AI驅動的在線教育平台,支持直播、錄播、AI批改,服務50萬+學員',

        // 技術棧
        'tech.title': '技術棧',
        'tech.subtitle': '使用最前沿的技術打造產品',

        // 聯繫表單
        'contact.title': '開始您的項目',
        'contact.subtitle': '讓我們一起創造非凡的數位化體驗',

        'contact.form.name': '您的姓名',
        'contact.form.name.placeholder': '張先生',
        'contact.form.phone': '聯繫電話',
        'contact.form.phone.placeholder': '138-0000-0000',
        'contact.form.projectType': '項目類型',
        'contact.form.projectType.placeholder': '請選擇項目類型',
        'contact.form.projectType.ai': 'AI應用開發',
        'contact.form.projectType.enterprise': '企業系統',
        'contact.form.projectType.web': 'Web應用',
        'contact.form.projectType.mobile': '移動應用',
        'contact.form.projectType.web3': 'Web3/區塊鏈',
        'contact.form.projectType.consulting': '技術諮詢',
        'contact.form.message': '項目描述',
        'contact.form.message.placeholder': '簡單描述您的項目需求和目標...',
        'contact.form.submit': '提交諮詢 →',
        'contact.form.privacy': '🔒 您的資訊將被嚴格保密 · ⚡ 2小時內快速響應',

        'contact.quick.phone.label': '電話諮詢',
        'contact.quick.phone.value': '138-1179-6300',
        'contact.quick.email.label': '郵件聯繫',
        'contact.quick.email.value': 'wuning@wanli.ai',
        'contact.quick.wechat.label': '微信諮詢',
        'contact.quick.wechat.value': '掃碼添加',

        // 頁腳
        'footer.brand': '智理科技',
        'footer.desc': '專注於為企業提供世界級的數位化解決方案。我們的團隊由來自頂尖科技公司的資深工程師組成,致力於用技術推動商業創新。',

        'footer.services.title': '服務',
        'footer.services.ai': 'AI應用開發',
        'footer.services.enterprise': '企業系統',
        'footer.services.web': 'Web應用',
        'footer.services.mobile': '移動應用',

        'footer.contact.title': '聯繫',
        'footer.contact.phone': '📞 138-1179-6300',
        'footer.contact.email': '📧 wuning@wanli.ai',
        'footer.contact.location': '📍 北京市',

        'footer.copyright': '© 2024 北京智理科技有限公司. All Rights Reserved.',

        // 表單提示
        'form.submitting': '提交中...',
        'form.success': '✓ 提交成功',
        'form.error.phone': '請輸入正確的手機號碼',
        'form.notification.success': '感謝您的諮詢！我們將在2小時內與您聯繫',
        'form.notification.error': '提交失敗,請直接撥打電話:138-1179-6300',

        // 確認彈窗
        'confirm.title': '提交成功！',
        'confirm.subtitle': '我們已收到您的諮詢',
        'confirm.name': '姓名',
        'confirm.phone': '電話',
        'confirm.response': '預計響應',
        'confirm.response.value': '2小時內',
        'confirm.call': '或直接撥打:138-1179-6300',
        'confirm.close': '關閉'
    },

    'en': {
        // Navigation
        'nav.brand': 'Zhili Tech',
        'nav.home': 'Home',
        'nav.services': 'Services',
        'nav.cases': 'Cases',
        'nav.tech': 'Tech',
        'nav.contact': 'Contact',
        'nav.cta': 'Get Started',

        // Hero Section
        'hero.badge': '🤖 AI Experts · EdTech Leaders · Professional Outsourcing',
        'hero.title1': 'Your Dedicated',
        'hero.title2': 'AI Development Team',
        'hero.subtitle': 'Enterprise Software Development Outsourcing',
        'hero.desc': 'Our core team consists of senior R&D executives from leading EdTech companies, providing end-to-end technical services from requirement analysis to deployment and maintenance',
        'hero.services': 'AI Development · Smart Education · Enterprise Systems · E-commerce · Mobile Apps',
        'hero.cta1': 'Start Project',
        'hero.cta2': 'View Cases',

        // Stats
        'stats.value1': '100%',
        'stats.label1': 'On-Time Delivery',
        'stats.value2': '24/7',
        'stats.label2': 'Stable Operation',
        'stats.value3': '5+ Years',
        'stats.label3': 'Industry Experience',

        // Services Section
        'services.title': 'Core Services',
        'services.subtitle': 'Building Exceptional Digital Products',

        'services.ai.title': 'AI Applications',
        'services.ai.desc': 'Build intelligent solutions powered by GPT-4, Claude and other cutting-edge models for dialogue, document processing, and data analysis',
        'services.ai.tag1': 'NLP',
        'services.ai.tag2': 'ML',
        'services.ai.tag3': 'LLM',

        'services.enterprise.title': 'Enterprise Systems',
        'services.enterprise.desc': 'ERP, CRM, OA and other enterprise management systems with microservices architecture, high concurrency and availability',
        'services.enterprise.tag1': 'Microservices',
        'services.enterprise.tag2': 'Cloud',
        'services.enterprise.tag3': 'DevOps',

        'services.web.title': 'Modern Web Apps',
        'services.web.desc': 'Build exceptional user experiences with React, Next.js, Vue and other modern tech stacks',
        'services.web.tag1': 'React',
        'services.web.tag2': 'Next.js',
        'services.web.tag3': 'TypeScript',

        'services.mobile.title': 'Mobile Development',
        'services.mobile.desc': 'Native iOS & Android development and cross-platform solutions with React Native',
        'services.mobile.tag1': 'iOS',
        'services.mobile.tag2': 'Android',
        'services.mobile.tag3': 'RN',

        'services.web3.title': 'Web3 & Blockchain',
        'services.web3.desc': 'Smart contracts, DApps, NFT platforms and other blockchain application development',
        'services.web3.tag1': 'Solidity',
        'services.web3.tag2': 'Ethereum',
        'services.web3.tag3': 'Web3.js',

        'services.consulting.title': 'Technical Consulting',
        'services.consulting.desc': 'Architecture design, technology selection, code review, performance optimization',
        'services.consulting.tag1': 'Architecture',
        'services.consulting.tag2': 'Optimization',
        'services.consulting.tag3': 'Review',

        // Cases Section
        'cases.title': 'Featured Cases',
        'cases.subtitle': 'Exceptional Work We Built for Our Clients',

        'cases.case1.badge': 'SaaS · AI · Data Visualization',
        'cases.case1.name': 'AI Analytics Platform',
        'cases.case1.title': 'Intelligent Business Analytics',
        'cases.case1.desc': 'AI-powered business intelligence system for a leading e-commerce platform with real-time insights',

        'cases.case2.badge': 'Enterprise · Microservices · Cloud',
        'cases.case2.name': 'Smart ERP System',
        'cases.case2.title': 'Cloud-Native Enterprise Platform',
        'cases.case2.desc': 'Full-process enterprise resource management system for a manufacturing group, supporting 10,000+ concurrent users',

        'cases.case3.badge': 'Mobile · AI · Healthcare',
        'cases.case3.name': 'Health Management App',
        'cases.case3.title': 'AI Health Assistant',
        'cases.case3.desc': 'AI-powered personal health management app with 1M+ active users and 4.8 App Store rating',

        'cases.case4.badge': 'E-commerce · Mini Program · Live',
        'cases.case4.name': 'New Retail E-commerce',
        'cases.case4.title': 'Social Commerce Platform',
        'cases.case4.desc': 'Integrated live streaming, social and e-commerce platform with daily GMV exceeding 5M CNY',

        'cases.case5.badge': 'Web3 · Blockchain · NFT',
        'cases.case5.name': 'NFT Marketplace',
        'cases.case5.title': 'Digital Art Trading Platform',
        'cases.case5.desc': 'Ethereum-based NFT minting and trading platform with cumulative trading volume exceeding 1000 ETH',

        'cases.case6.badge': 'Education · AI · Live',
        'cases.case6.name': 'Online Education Platform',
        'cases.case6.title': 'Smart Education SaaS',
        'cases.case6.desc': 'AI-powered online education platform with live streaming, recorded courses, and AI grading, serving 500K+ students',

        // Tech Stack
        'tech.title': 'Tech Stack',
        'tech.subtitle': 'Building Products with Cutting-Edge Technologies',

        // Contact Form
        'contact.title': 'Start Your Project',
        'contact.subtitle': 'Let\'s Create Extraordinary Digital Experiences Together',

        'contact.form.name': 'Your Name',
        'contact.form.name.placeholder': 'Mr. Zhang',
        'contact.form.phone': 'Phone Number',
        'contact.form.phone.placeholder': '138-0000-0000',
        'contact.form.projectType': 'Project Type',
        'contact.form.projectType.placeholder': 'Select project type',
        'contact.form.projectType.ai': 'AI Development',
        'contact.form.projectType.enterprise': 'Enterprise System',
        'contact.form.projectType.web': 'Web Application',
        'contact.form.projectType.mobile': 'Mobile App',
        'contact.form.projectType.web3': 'Web3/Blockchain',
        'contact.form.projectType.consulting': 'Technical Consulting',
        'contact.form.message': 'Project Description',
        'contact.form.message.placeholder': 'Briefly describe your project requirements and goals...',
        'contact.form.submit': 'Submit Inquiry →',
        'contact.form.privacy': '🔒 Your information is strictly confidential · ⚡ Quick response within 2 hours',

        'contact.quick.phone.label': 'Phone Inquiry',
        'contact.quick.phone.value': '138-1179-6300',
        'contact.quick.email.label': 'Email Contact',
        'contact.quick.email.value': 'wuning@wanli.ai',
        'contact.quick.wechat.label': 'WeChat Inquiry',
        'contact.quick.wechat.value': 'Scan to Add',

        // Footer
        'footer.brand': 'Zhili Tech',
        'footer.desc': 'Dedicated to providing world-class digital solutions for enterprises. Our team consists of senior engineers from top tech companies, committed to driving business innovation through technology.',

        'footer.services.title': 'Services',
        'footer.services.ai': 'AI Development',
        'footer.services.enterprise': 'Enterprise Systems',
        'footer.services.web': 'Web Applications',
        'footer.services.mobile': 'Mobile Apps',

        'footer.contact.title': 'Contact',
        'footer.contact.phone': '📞 138-1179-6300',
        'footer.contact.email': '📧 wuning@wanli.ai',
        'footer.contact.location': '📍 Beijing, China',

        'footer.copyright': '© 2024 Beijing Zhili Technology Co., Ltd. All Rights Reserved.',

        // Form Messages
        'form.submitting': 'Submitting...',
        'form.success': '✓ Success',
        'form.error.phone': 'Please enter a valid phone number',
        'form.notification.success': 'Thank you for your inquiry! We will contact you within 2 hours',
        'form.notification.error': 'Submission failed, please call directly: 138-1179-6300',

        // Confirmation Modal
        'confirm.title': 'Submitted Successfully!',
        'confirm.subtitle': 'We have received your inquiry',
        'confirm.name': 'Name',
        'confirm.phone': 'Phone',
        'confirm.response': 'Expected Response',
        'confirm.response.value': 'Within 2 Hours',
        'confirm.call': 'Or call directly: 138-1179-6300',
        'confirm.close': 'Close'
    }
};
