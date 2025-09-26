/**
 * Environment configuration
 */

import type { Environment } from "../types";

const env: Environment = {
  NODE_ENV: (import.meta.env.NODE_ENV ?? "development") as Environment["NODE_ENV"],
  VITE_FRONTEND_URL: import.meta.env.VITE_FRONTEND_URL as string | undefined,
  VITE_BACKEND_URL: import.meta.env.VITE_BACKEND_URL as string | undefined,
};

export const config = {
  // Environment
  isDevelopment: env.NODE_ENV === "development",
  isProduction: env.NODE_ENV === "production",
  isTest: env.NODE_ENV === "test",

  // URLs
  frontendUrl: env.VITE_FRONTEND_URL ?? "http://localhost:8080",
  backendUrl: env.VITE_BACKEND_URL ?? "https://kalifinder-backend-yf78.onrender.com/api",

  // Feature flags
  enableDebug: env.NODE_ENV === "development" || import.meta.env.VITE_ENABLE_DEBUG === "true",
  enableAnalytics:
    env.NODE_ENV === "production" && import.meta.env.VITE_ENABLE_ANALYTICS !== "false",

  // API Configuration
  api: {
    timeout: 10000,
    retries: 3,
    baseUrl: env.VITE_BACKEND_URL ?? "https://kalifinder-backend-yf78.onrender.com/api",
  },
} as const;

// Type assertion to ensure config is readonly
export type Config = typeof config;
