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
    'nav.global': '全球科技',
    'nav.solutions': '核心方案',
    'nav.join': '开启精英之旅',
    'nav.brand_sub': '自然 · 平衡',

    'hero.eyebrow': '预见 · 细胞健康的未来',
    'hero.title_1': '精准定义',
    'hero.title_highlight': '高效营养',
    'hero.title_2': '新标准',
    'hero.tagline': '科学有解 · 跨境无界 · 生命当燃',
    'hero.cta': '探索核心科学',
    'hero.scroll': '滑动探索',

    'origin.label': '觉醒故事',
    'origin.title': '从“每日百粒无效消耗” \n到生命觉醒',
    'origin.text': '从“每日百粒无效消耗”到“精准干预”的生命转折，让我们意识到真正的健康来自细胞层级的精准干预。',
    'origin.quote': '“健康不是剂量堆砌，而是精准干预。”',

    'global.title': '全球科技',
    'global.desc': '瑞士注册传承精工标准，与霍普金斯·华盛顿生命医学实验室（HWLL）战略合作；所有产品加拿大制造，严格遵循全球 GMP 标准。',
    'global.swiss_title': '瑞士基因',
    'global.swiss_desc': '瑞士注册，传承百年精工标准',
    'global.usa_title': '战略合作',
    'global.usa_desc': '霍普金斯·华盛顿生命医学实验室（HWLL）',
    'global.can_title': '加国生产',
    'global.can_desc': '加拿大制造，严格遵循全球 GMP 标准',
    'global.stat_hubs': '全球布局',
    'global.stat_quality': '品质标杆',
    'global.val_quality': '临床级标准+',

    'prod.white.badge': '细胞平衡',
    'prod.white.title': '细胞平衡小白瓶 IPE EPA',
    'prod.white.subtitle': '重建细胞自愈屏障',
    'prod.white.feat1': '专利炎症阻断矩阵',
    'prod.white.feat2': 'EPA 纯度 ≥ 90%',
    'prod.white.feat3': '总 Omega-3 ≥ 97%',
    'prod.chart.title': '纯度对比 (%)',
    'prod.chart.common': '普通鱼油',
    'prod.chart.mednutro': 'MedNutro IPE',
    'prod.white.bottle_sub': 'IPE EPA 高纯鱼油',
    'prod.white.bottle_badge': '临床级鱼油',

    'prod.black.badge': '女士细胞焕能',
    'prod.black.title': '女士细胞焕能小黑瓶',
    'prod.black.subtitle': '守护女性魅力与荷尔蒙平衡',
    'prod.black.desc': '搭载 HWLL 氧自由基捕获技术，22 种活性自由基清除剂，构建抗氧化网络，守护女性魅力与荷尔蒙平衡。',
    'prod.black.stat1': '自由基清除剂',
    'prod.black.stat2': '抗氧化网络',
    'prod.black.bottle_name': '女性 40+',
    'prod.black.bottle_sub': '焕能配方',
    'prod.black.tech': 'HWLL 氧自由基捕获技术',

    'footer.text': '让健康成为您可被量化的精英资产。加入精准营养之旅。',
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
    'nav.global': '環球科技',
    'nav.solutions': '核心方案',
    'nav.join': '開啟精英之旅',
    'nav.brand_sub': '自然 · 平衡',

    'hero.eyebrow': '預見 · 細胞健康的未來',
    'hero.title_1': '精準定義',
    'hero.title_highlight': '高效營養',
    'hero.title_2': '新標準',
    'hero.tagline': '科學有解 · 跨境無界 · 生命當燃',
    'hero.cta': '探索核心科學',
    'hero.scroll': '滑動探索',

    'origin.label': '覺醒故事',
    'origin.title': '從「每日百粒無效消耗」 \n到生命覺醒',
    'origin.text': '從「每日百粒無效消耗」到「精準干預」的生命轉折，讓我們意識到真正的健康來自細胞層級的精準干預。',
    'origin.quote': '「健康不是劑量堆砌，而是精準干預。」',

    'global.title': '環球科技',
    'global.desc': '瑞士註冊傳承精工標準，與霍普金斯·華盛頓生命醫學實驗室（HWLL）戰略合作；所有產品加拿大製造，嚴格遵循全球 GMP 標準。',
    'global.swiss_title': '瑞士基因',
    'global.swiss_desc': '瑞士註冊，傳承百年精工標準',
    'global.usa_title': '戰略合作',
    'global.usa_desc': '霍普金斯·華盛頓生命醫學實驗室（HWLL）',
    'global.can_title': '加國生產',
    'global.can_desc': '加拿大製造，嚴格遵循全球 GMP 標準',
    'global.stat_hubs': '全球佈局',
    'global.stat_quality': '品質標竿',
    'global.val_quality': '臨床級標準+',

    'prod.white.badge': '細胞平衡',
    'prod.white.title': '細胞平衡小白瓶 IPE EPA',
    'prod.white.subtitle': '重建細胞自癒屏障',
    'prod.white.feat1': '專利炎症阻斷矩陣',
    'prod.white.feat2': 'EPA 純度 ≥ 90%',
    'prod.white.feat3': '總 Omega-3 ≥ 97%',
    'prod.chart.title': '純度對比 (%)',
    'prod.chart.common': '普通魚油',
    'prod.chart.mednutro': 'MedNutro IPE',
    'prod.white.bottle_sub': 'IPE EPA 高純魚油',
    'prod.white.bottle_badge': '臨床級魚油',

    'prod.black.badge': '女士細胞煥能',
    'prod.black.title': '女士細胞煥能小黑瓶',
    'prod.black.subtitle': '守護女性魅力與荷爾蒙平衡',
    'prod.black.desc': '搭載 HWLL 氧自由基捕獲技術，22 種活性自由基清除劑，構建抗氧化網絡，守護女性魅力與荷爾蒙平衡。',
    'prod.black.stat1': '自由基清除劑',
    'prod.black.stat2': '抗氧化網絡',
    'prod.black.bottle_name': '女性 40+',
    'prod.black.bottle_sub': '煥能配方',
    'prod.black.tech': 'HWLL 氧自由基捕獲技術',

    'footer.text': '讓健康成為您可被量化的精英資產。加入精準營養之旅。',
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
