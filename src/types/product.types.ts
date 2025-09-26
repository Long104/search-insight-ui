/**
 * Product-related types and interfaces
 */

export interface Product {
  id: string;
  name?: string;
  title: string;
  image?: string;
  imageUrl?: string; // Backend sends imageUrl
  originalPrice?: number;
  currentPrice?: number;
  price: string;
  categories?: string[];
  brands?: string[];
  colors?: string[];
  sizes?: string[];
  tags?: string[];
  url?: string;
  productUrl?: string | undefined; // Backend sends productUrl
  description?: string;
  inStock?: boolean;
  stockStatus?: string;
  storeVendorId?: string;
  storeId?: string;
  storeType?: string | undefined;
  vendor?: string;
  slug?: string;
  regularPrice?: string;
  salePrice?: string;
  sku?: string;
  status?: string;
  featured?: boolean;
  storeUrl?: string | undefined;
  // Cart-specific fields
  productType?: string | undefined; // "simple" or "variable"
  shopifyVariantId?: string | undefined; // Shopify variant ID
  wooProductId?: string | undefined; // WooCommerce product ID
  shopifyProductId?: string | undefined;
}

export type ProductStatus = "active" | "draft" | "archived";

export type StoreType = "shopify" | "woocommerce" | "custom";

export type ProductType = "simple" | "variable" | "grouped" | "external";

export interface ProductSearchResult {
  products: Product[];
  total: number;
  hasMore: boolean;
  page?: number;
  limit?: number;
}

export interface ProductFilter {
  categories?: string[];
  brands?: string[];
  colors?: string[];
  sizes?: string[];
  tags?: string[];
  priceRange?: [number, number];
  inStock?: boolean;
  featured?: boolean;
  onSale?: boolean;
}
