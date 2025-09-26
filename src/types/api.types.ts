/**
 * API and data-related types
 */
import type { Product } from "./product.types";

export interface InitialData {
  totalProducts: number;
  maxPrice: number;
  availableCategories: string[];
  availableBrands: string[];
  categoryCounts: { [key: string]: number };
  brandCounts: { [key: string]: number };
  availableColors?: string[];
  availableSizes?: string[];
  availableTags?: string[];
  colorCounts?: { [key: string]: number };
  sizeCounts?: { [key: string]: number };
  tagCounts?: { [key: string]: number };
  products?: Product[]; // Store products with cart fields for cart operations
}

// Generic API Response interface
export interface ApiResponse<T = unknown> {
  data?: T;
  success?: boolean;
  error?: string;
  message?: string;
}

// Popular Searches API Response
export interface PopularSearchesResponse {
  searches: string[];
}

// Autocomplete API Response
export interface AutocompleteResponse {
  suggestions: string[];
  products: Product[];
}

// Facet Configuration
export interface FacetConfiguration {
  field: string;
  visible: boolean;
  enabled?: boolean;
}

// Generic API Error interface
export interface ApiError {
  message: string;
  code?: string | number;
  details?: unknown;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface SearchResponse {
  products: Product[];
  total: number;
  hasMore?: boolean;
  facets?: FacetData;
  suggestions?: string[];
}

export interface FacetData {
  categories: FacetItem[];
  brands: FacetItem[];
  colors: FacetItem[];
  sizes: FacetItem[];
  tags: FacetItem[];
  priceRange: {
    min: number;
    max: number;
  };
}

export interface FacetItem {
  value: string;
  label: string;
  count: number;
}

// Cart and Commerce related
export interface CartItem {
  productId: string;
  variantId?: string;
  quantity: number;
  price: number;
  title: string;
  image?: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface CartProduct extends Product {
  storeUrl?: string;
  shopifyVariantId?: string;
  wooProductId?: string;
}

export interface CartResponse {
  success: boolean;
  message: string;
  cart?: Cart;
  error?: string;
}

// Recommendation related
export interface Recommendation {
  products: Product[];
  type: "popular" | "trending" | "similar" | "recent";
  title: string;
}

// Type guards for safe API response handling
export const isSearchResponse = (obj: unknown): obj is SearchResponse => {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "products" in obj &&
    Array.isArray((obj as SearchResponse).products)
  );
};

export const isAutocompleteResponse = (obj: unknown): obj is AutocompleteResponse => {
  return (
    typeof obj === "object" &&
    obj !== null &&
    (("suggestions" in obj && Array.isArray((obj as AutocompleteResponse).suggestions)) ||
      ("products" in obj && Array.isArray((obj as AutocompleteResponse).products)))
  );
};

export const isApiError = (obj: unknown): obj is ApiError => {
  return typeof obj === "object" && obj !== null && "message" in obj;
};
