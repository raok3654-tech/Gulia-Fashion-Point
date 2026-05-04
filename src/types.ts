export enum Category {
  Men = "Men",
  Women = "Women",
  Kids = "Kids",
  Footwear = "Footwear",
  Accessories = "Accessories",
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // Base in INR
  category: Category;
  subCategory: string;
  images: string[];
  sizes: string[];
  colors: string[];
  stock: number;
  rating: number;
  reviewsCount: number;
  isFeatured: boolean;
  discount?: number;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: 'customer' | 'admin';
  preferredCurrency: string;
  preferredCountry: string;
  wishlist: string[];
  addresses: Address[];
}

export interface Address {
  id: string;
  type: 'home' | 'work';
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
  size?: string;
  color?: string;
}

export interface Country {
  code: string;
  name: string;
  currency: string;
  symbol: string;
  flag: string;
}

export const COUNTRIES: Country[] = [
  { code: 'IN', name: 'India', currency: 'INR', symbol: '₹', flag: '🇮🇳' },
  { code: 'US', name: 'USA', currency: 'USD', symbol: '$', flag: '🇺🇸' },
  { code: 'GB', name: 'UK', currency: 'GBP', symbol: '£', flag: '🇬🇧' },
  { code: 'EU', name: 'Europe', currency: 'EUR', symbol: '€', flag: '🇪🇺' },
];
