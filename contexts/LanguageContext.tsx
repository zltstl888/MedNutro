import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'EN' | 'CN' | 'HK';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  EN: {
    // Nav
    'nav.origin': 'Origin',
    'nav.global': 'Global Engine',
    'nav.solutions': 'Solutions',
    'nav.join': 'Join Elite',
    'nav.brand_sub': 'Natural Balance',

    // Hero
    'hero.eyebrow': 'The Future of Cellular Health',
    'hero.title_1': 'Precise Definition',
    'hero.title_highlight': 'High-Efficiency',
    'hero.title_2': 'Nutrition Standards.',
    'hero.tagline': 'Science Solved · Borderless · Life Ignited',
    'hero.cta': 'Explore The Science',
    'hero.scroll': 'Scroll',

    // Origin
    'origin.label': 'The Origin',
    'origin.title': 'From "Darkest Moment" \nto Life Awakening',
    'origin.text': 'We realized that taking hundreds of pills daily was just ineffective consumption. True health isn\'t about dosage stacking—it\'s about Precision Intervention.',
    'origin.quote': '"Health is not a game of numbers. It is the art of cellular precision."',

    // Global Engine
    'global.title': 'Global Engine',
    'global.desc': 'Borderless innovation. Swiss Precision. American Research. Canadian Manufacturing.',
    'global.swiss_title': 'Brand Origin',
    'global.swiss_desc': 'Swiss Registration',
    'global.usa_title': 'Research Partner',
    'global.usa_desc': 'Hopkins Washington Lab',
    'global.can_title': 'Manufacturing',
    'global.can_desc': 'GMP Certified',
    'global.stat_hubs': 'Global Layout',
    'global.stat_quality': 'Quality Benchmark',
    'global.val_quality': 'Clinical Grade+',

    // Product Showcase
    'prod.white.badge': 'Cellular Balance',
    'prod.white.title': 'IPE EPA White Bottle',
    'prod.white.subtitle': 'Rebuilding the Cellular Self-Healing Barrier',
    'prod.white.feat1': 'Patented Inflammation Blocking Matrix',
    'prod.white.feat2': 'EPA Purity ≥ 90% (Clinical Grade)',
    'prod.white.feat3': 'Total Omega-3 ≥ 97%',
    'prod.chart.title': 'Purity Comparison (%)',
    'prod.chart.common': 'Common Fish Oil',
    'prod.chart.mednutro': 'MedNutro IPE',
    'prod.white.bottle_sub': 'Fish Oil Extract',
    'prod.white.bottle_badge': 'Clinical Strength',

    'prod.black.badge': 'Cellular Rejuvenation',
    'prod.black.title': 'Women\'s 40+ Beauty Formula',
    'prod.black.subtitle': 'From Inside - Beauty & Balance',
    'prod.black.desc': 'Specially formulated for women 40+. Balances vaginal bacteria and pH, promotes tightening and rejuvenating.',
    'prod.black.stat1': 'Microbiome',
    'prod.black.stat2': 'Rejuvenating',
    'prod.black.bottle_name': 'Women\'s 40+',
    'prod.black.bottle_sub': 'Beauty Formula',
    'prod.black.tech': 'HWLL Technology',

    // Footer
    'footer.text': 'Make health your quantifiable elite asset. Join us on a journey of precise intervention.',
    'footer.placeholder': 'Enter email for updates',
    'footer.subscribe': 'Subscribe',
    'footer.col_prod': 'Products',
    'footer.col_prod_1': 'IPE EPA White Bottle',
    'footer.col_prod_2': 'Women\'s 40+ Black Bottle',
    'footer.col_prod_3': 'Lab Reports',
    'footer.col_co': 'Company',
    'footer.col_co_1': 'Our Science',
    'footer.col_co_2': 'Global Partners',
    'footer.col_co_3': 'Contact Us',
    'footer.col_co_4': 'Privacy Policy',
    'footer.copy': '© 2024 MedNutro Global. All rights reserved. Made in Canada.',
  },
  CN: {
    'nav.origin': '品牌起源',
    'nav.global': '全球引擎',
    'nav.solutions': '核心方案',
    'nav.join': '开启精英之旅',
    'nav.brand_sub': '自然 · 平衡',

    'hero.eyebrow': '预见 · 细胞健康的未来',
    'hero.title_1': '重新定义',
    'hero.title_highlight': '高效能',
    'hero.title_2': '营养新标准',
    'hero.tagline': '科学解码 · 无界创新 · 生命焕活',
    'hero.cta': '探索核心科学',
    'hero.scroll': '滑动探索',

    'origin.label': '起源故事',
    'origin.title': '从 “至暗时刻” \n到生命觉醒',
    'origin.text': '我们深知，日服百粒的堆砌并非健康正途，而是身体的无效负担。真正的健康不应是剂量的盲目叠加，而在于细胞层级的精准干预。',
    'origin.quote': '“健康不是一场数字游戏，而是细胞微观世界的精准艺术。”',

    'global.title': '全球引擎',
    'global.desc': '以无国界创新为理念。承袭瑞士精密工艺，依托美国尖端研发，贯彻加拿大严苛制造。',
    'global.swiss_title': '品牌源头',
    'global.swiss_desc': '瑞士注册商标',
    'global.usa_title': '研发高地',
    'global.usa_desc': '霍普金斯华盛顿联合实验室',
    'global.can_title': '生产制造',
    'global.can_desc': 'GMP 认证制药级工厂',
    'global.stat_hubs': '全球布局',
    'global.stat_quality': '品质标杆',
    'global.val_quality': '临床级标准+',

    'prod.white.badge': '细胞稳态平衡',
    'prod.white.title': 'IPE EPA 极纯白瓶',
    'prod.white.subtitle': '定义鱼油新标准 · >90% 乙酯型 EPA',
    'prod.white.feat1': '专利炎症阻断基质',
    'prod.white.feat2': 'EPA 纯度 > 90% (乙酯型)',
    'prod.white.feat3': '总 Omega-3 含量 ≥ 97%',
    'prod.chart.title': '纯度对比 (%)',
    'prod.chart.common': '普通鱼油',
    'prod.chart.mednutro': 'MedNutro IPE',
    'prod.white.bottle_sub': '高纯度鱼油软胶囊',
    'prod.white.bottle_badge': '临床级纯度',

    'prod.black.badge': '内源之美',
    'prod.black.title': '女性 40+ 焕颜黑瓶',
    'prod.black.subtitle': '私密微生态平衡 · 紧致与焕活',
    'prod.black.desc': '专为 40+ 女性定制。HWLL 技术协同调节阴道菌群与 pH 值平衡。从内而外，促进紧致与年轻化。',
    'prod.black.stat1': '微生态平衡',
    'prod.black.stat2': '紧致焕活',
    'prod.black.bottle_name': '女性 40+',
    'prod.black.bottle_sub': '焕颜美学配方',
    'prod.black.tech': 'HWLL 专利技术',

    'footer.text': '让健康成为您可量化的精英资产。加入我们的精准干预之旅。',
    'footer.placeholder': '输入邮箱订阅资讯',
    'footer.subscribe': '订阅',
    'footer.col_prod': '核心产品',
    'footer.col_prod_1': 'IPE EPA 白瓶',
    'footer.col_prod_2': '女性 40+ 焕颜黑瓶',
    'footer.col_prod_3': '实验室质检报告',
    'footer.col_co': '关于公司',
    'footer.col_co_1': '科研理念',
    'footer.col_co_2': '全球合作伙伴',
    'footer.col_co_3': '联系我们',
    'footer.col_co_4': '隐私政策',
    'footer.copy': '© 2024 MedNutro Global. 保留所有权利。加拿大制造。',
  },
  HK: {
    'nav.origin': '品牌起源',
    'nav.global': '環球引擎',
    'nav.solutions': '核心方案',
    'nav.join': '開啟精英之旅',
    'nav.brand_sub': '自然 · 平衡',

    'hero.eyebrow': '預見 · 細胞健康的未來',
    'hero.title_1': '重新定義',
    'hero.title_highlight': '高效能',
    'hero.title_2': '營養新標準',
    'hero.tagline': '科學解碼 · 無界創新 · 生命煥活',
    'hero.cta': '探索核心科學',
    'hero.scroll': '滑動探索',

    'origin.label': '起源故事',
    'origin.title': '從「至暗時刻」 \n到生命覺醒',
    'origin.text': '我們深知，日服百粒的堆砌並非健康正途，而是身體的無效負擔。真正的健康不應是劑量的盲目疊加，而在於細胞層級的精準干預。',
    'origin.quote': '「健康不是一場數字遊戲，而是細胞微觀世界的精準藝術。」',

    'global.title': '環球引擎',
    'global.desc': '以無國界創新為理念。承襲瑞士精密工藝，依托美國尖端研發，貫徹加拿大嚴苛製造。',
    'global.swiss_title': '品牌源頭',
    'global.swiss_desc': '瑞士註冊商標',
    'global.usa_title': '研發高地',
    'global.usa_desc': '霍普金斯華盛頓聯合實驗室',
    'global.can_title': '生產製造',
    'global.can_desc': 'GMP 認證製藥級工廠',
    'global.stat_hubs': '全球佈局',
    'global.stat_quality': '品質標竿',
    'global.val_quality': '臨床級標準+',

    'prod.white.badge': '細胞穩態平衡',
    'prod.white.title': 'IPE EPA 極純白瓶',
    'prod.white.subtitle': '定義魚油新標準 · >90% 乙酯型 EPA',
    'prod.white.feat1': '專利炎症阻斷基質',
    'prod.white.feat2': 'EPA 純度 > 90% (乙酯型)',
    'prod.white.feat3': '總 Omega-3 含量 ≥ 97%',
    'prod.chart.title': '純度對比 (%)',
    'prod.chart.common': '普通魚油',
    'prod.chart.mednutro': 'MedNutro IPE',
    'prod.white.bottle_sub': '高純度魚油軟膠囊',
    'prod.white.bottle_badge': '臨床級純度',

    'prod.black.badge': '內源之美',
    'prod.black.title': '女性 40+ 煥顏黑瓶',
    'prod.black.subtitle': '私密微生態平衡 · 緊緻與煥活',
    'prod.black.desc': '專為 40+ 女性定制。HWLL 技術協同調節陰道菌群與 pH 值平衡。從內而外，促進緊緻與年輕化。',
    'prod.black.stat1': '微生態平衡',
    'prod.black.stat2': '緊緻煥活',
    'prod.black.bottle_name': '女性 40+',
    'prod.black.bottle_sub': '煥顏美學配方',
    'prod.black.tech': 'HWLL 專利技術',

    'footer.text': '讓健康成為您可量化的精英資產。加入我們的精準干預之旅。',
    'footer.placeholder': '輸入郵箱訂閱資訊',
    'footer.subscribe': '訂閱',
    'footer.col_prod': '核心產品',
    'footer.col_prod_1': 'IPE EPA 白瓶',
    'footer.col_prod_2': '女性 40+ 煥顏黑瓶',
    'footer.col_prod_3': '實驗室質檢報告',
    'footer.col_co': '關於公司',
    'footer.col_co_1': '科研理念',
    'footer.col_co_2': '環球合作夥伴',
    'footer.col_co_3': '聯繫我們',
    'footer.col_co_4': '隱私政策',
    'footer.copy': '© 2024 MedNutro Global. 保留所有權利。加拿大製造。',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('EN');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};