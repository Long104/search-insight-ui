import { handleApiError } from "@/utils/error";
import type { FacetConfiguration } from "@/types/api.types";
import type { Product } from "@/types";

const BASE_URL = import.meta.env.VITE_BACKEND_URL as string;

// Type guard functions
const isStringArray = (value: unknown): value is string[] => {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
};

const isProduct = (value: unknown): value is Product => {
  return typeof value === "object" && value !== null && "id" in value && "title" in value;
};

const isProductArray = (value: unknown): value is Product[] => {
  return Array.isArray(value) && value.every(isProduct);
};

// API service functions
export const apiService = {
  async fetchPopularSearches(storeUrl: string): Promise<string[]> {
    try {
      const response = await fetch(`${BASE_URL}/v1/search/popular?storeUrl=${storeUrl}`);

      if (!response.ok) {
        throw new Error("Failed to fetch popular searches");
      }

      const result: unknown = await response.json();
      const defaultSearches = ["shirt", "underwear", "plan"];

      if (isStringArray(result)) {
        return result;
      }

      if (typeof result === "object" && result !== null && "searches" in result) {
        const resultObj = result as Record<string, unknown>;
        if (isStringArray(resultObj.searches)) {
          return resultObj.searches;
        }
      }

      return defaultSearches;
    } catch (error) {
      console.error("Failed to fetch popular searches:", handleApiError(error));
      return ["shirt", "underwear", "plan"];
    }
  },

  async fetchFacetConfiguration(storeUrl: string): Promise<FacetConfiguration[]> {
    try {
      const response = await fetch(`${BASE_URL}/v1/facets?storeUrl=${storeUrl}`);

      if (!response.ok) {
        throw new Error("Failed to fetch facet configuration");
      }

      const result: unknown = await response.json();

      if (Array.isArray(result)) {
        return result.filter(
          (item): item is FacetConfiguration =>
            typeof item === "object" &&
            item !== null &&
            "field" in item &&
            "visible" in item &&
            typeof (item as Record<string, unknown>).field === "string" &&
            typeof (item as Record<string, unknown>).visible === "boolean"
        );
      }

      return [];
    } catch (error) {
      console.error("Failed to fetch facet configuration:", handleApiError(error));
      return [];
    }
  },

  async fetchRecommendations(storeUrl: string): Promise<Product[]> {
    try {
      const configResponse = await fetch(
        `${BASE_URL}/v1/recommendations/config?storeUrl=${storeUrl}`
      );

      if (!configResponse.ok) {
        throw new Error("Failed to fetch recommendations config");
      }

      const config: unknown = await configResponse.json();

      // Type guard for config
      const isValidConfig = (value: unknown): value is { enabled: boolean } => {
        return (
          typeof value === "object" &&
          value !== null &&
          "enabled" in value &&
          typeof (value as Record<string, unknown>).enabled === "boolean"
        );
      };

      if (!isValidConfig(config) || !config.enabled) {
        return [];
      }

      const response = await fetch(`${BASE_URL}/v1/recommendations?storeUrl=${storeUrl}`);

      if (!response.ok) {
        throw new Error("Failed to fetch recommendations");
      }

      const result: unknown = await response.json();

      if (isProductArray(result)) {
        return result;
      }

      if (typeof result === "object" && result !== null && "products" in result) {
        const { products } = result as { products: unknown };
        if (isProductArray(products)) {
          return products;
        }
      }

      return [];
    } catch (error) {
      console.error("Failed to fetch recommendations:", handleApiError(error));
      return [];
    }
  },

  async fetchAutocomplete(
    query: string,
    storeUrl: string
  ): Promise<{ suggestions: string[]; products: Product[] }> {
    try {
      const response = await fetch(
        `${BASE_URL}/v1/search/autocomplete?query=${encodeURIComponent(query)}&storeUrl=${storeUrl}`
      );

      if (!response.ok) {
        return { suggestions: [], products: [] };
      }

      const result: unknown = await response.json();

      if (
        typeof result === "object" &&
        result !== null &&
        "suggestions" in result &&
        "products" in result
      ) {
        const resultObj = result as Record<string, unknown>;

        return {
          suggestions: isStringArray(resultObj.suggestions) ? resultObj.suggestions : [],
          products: isProductArray(resultObj.products) ? resultObj.products : [],
        };
      }

      return { suggestions: [], products: [] };
    } catch (error) {
      console.error("Failed to fetch autocomplete:", handleApiError(error));
      return { suggestions: [], products: [] };
    }
  },
};
