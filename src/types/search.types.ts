/**
 * Search and filter-related types
 */

export interface SearchConfig {
  storeUrl?: string | undefined;
}

export interface FilterState {
  categories: string[];
  priceRange: [number, number];
  colors: string[];
  sizes: string[];
  brands: string[];
  genders?: string[];
  tags: string[];
  // Mandatory facets
  stockStatus: string[]; // In Stock, Out of Stock, On Backorder
  featuredProducts: boolean; // Featured vs Regular products
  saleStatus: boolean; // On Sale vs Regular Price
}

// Facet configuration for mandatory and optional facets
export interface FacetConfig {
  field: string; // Facet field name
  label: string; // Display label
  visible: boolean; // Show/hide facet
  terms: number; // Number of terms to show
  mandatory: boolean; // Whether this is a mandatory facet
}

// Mandatory facets (Always Visible)
export interface MandatoryFacets {
  stockStatus: boolean; // In Stock vs Out of Stock
  featuredProducts: boolean; // Featured vs Regular products
  saleStatus: boolean; // On Sale vs Regular Price
}

// Optional facets (Can be hidden)
export interface OptionalFacets {
  categories: boolean;
  priceRange: boolean;
  colors: boolean;
  sizes: boolean;
  brands: boolean;
  genders: boolean;
  tags: boolean;
}

export interface FacetCounts {
  [key: string]: number;
}

export interface AutocompleteQuery {
  query: string;
  maxSuggestions?: number;
  categories?: string[];
}

export interface AutocompleteSuggestion {
  text: string;
  type: "product" | "category" | "brand" | "query";
  count?: number;
  category?: string;
}

export interface SearchQuery {
  query?: string;
  page?: number;
  limit?: number;
  filters?: Partial<FilterState>;
  sortBy?: "relevance" | "price_asc" | "price_desc" | "name" | "newest";
}
