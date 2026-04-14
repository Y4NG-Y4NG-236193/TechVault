export interface SpecItem {
  label: string;
  value: string;
}

export interface SpecGroup {
  category: string;
  items: SpecItem[];
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: string;
  image: string;
  category?: string;
  specs?: string;
  detailedSpecs?: SpecGroup[];
  rating?: number;
  reviews?: number;
  badge?: string;
}
