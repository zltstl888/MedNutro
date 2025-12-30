export interface ProductStats {
  value: string;
  label: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  image: string;
  colorTheme: 'blue' | 'purple';
  badge: string;
  stats?: ProductStats[];
}

export interface NavItem {
  label: string;
  href: string;
}

export interface HealthStat {
  label: string;
  value: number;
  fullMark: number;
}