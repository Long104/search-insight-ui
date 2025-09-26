/**
 * Application constants
 */

export const APP_NAME = "Kalifind Search Widget";
export const APP_VERSION = "1.0.0";

// API Configuration
export const API_ENDPOINTS = {
  SEARCH: "/search",
  AUTOCOMPLETE: "/autocomplete",
  PRODUCTS: "/products",
  RECOMMENDATIONS: "/recommendations",
} as const;

// Default Configuration
export const DEFAULT_CONFIG = {
  SEARCH_DEBOUNCE_MS: 300,
  MAX_AUTOCOMPLETE_SUGGESTIONS: 8,
  DEFAULT_PRODUCTS_PER_PAGE: 12,
  MOBILE_PRODUCTS_PER_PAGE: 6,
  MAX_PRICE: 1000,
  MIN_QUERY_LENGTH: 1,
} as const;

// Store Types
export const STORE_TYPES = {
  SHOPIFY: "shopify",
  WOOCOMMERCE: "woocommerce",
  CUSTOM: "custom",
} as const;

// Product Status
export const PRODUCT_STATUS = {
  ACTIVE: "active",
  DRAFT: "draft",
  ARCHIVED: "archived",
} as const;

// Animation Durations
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

// Breakpoints (matching Tailwind CSS)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  "2XL": 1536,
} as const;

// Z-Index Layers
export const Z_INDEX = {
  DROPDOWN: 50,
  MODAL: 100,
  TOAST: 150,
  TOOLTIP: 200,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error occurred. Please try again.",
  SEARCH_FAILED: "Search failed. Please try again.",
  LOAD_MORE_FAILED: "Failed to load more products.",
  CART_ADD_FAILED: "Failed to add product to cart.",
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  PRODUCT_ADDED_TO_CART: "Product added to cart successfully!",
} as const;
