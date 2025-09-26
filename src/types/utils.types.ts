/**
 * Utility and helper types
 */

// Utility types for better type safety
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type NonNullable<T> = T extends null | undefined ? never : T;

// Event handler types
export type EventHandler<T = Element> = (event: React.SyntheticEvent<T>) => void;

export type ChangeHandler<T = HTMLInputElement> = (event: React.ChangeEvent<T>) => void;

export type ClickHandler<T = HTMLElement> = (event: React.MouseEvent<T>) => void;

export type KeyboardHandler<T = HTMLElement> = (event: React.KeyboardEvent<T>) => void;

// Function types
export type AsyncFunction<T = void, Args extends unknown[] = []> = (...args: Args) => Promise<T>;

export type Callback<T = void, Args extends unknown[] = []> = (...args: Args) => T;

export type VoidCallback = () => void;

// State updater types
export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type StateUpdater<T> = (prevState: T) => T;

// Generic data structures
export type Dictionary<T = unknown> = Record<string, T>;

export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export type Values<T> = T[keyof T];

export type Keys<T> = keyof T;

// Environment and configuration
export interface Environment {
  NODE_ENV: "development" | "production" | "test";
  VITE_FRONTEND_URL?: string;
  VITE_BACKEND_URL?: string;
}

// Error types
export interface AppError {
  name: string;
  message: string;
  code?: string | number;
  stack?: string;
  cause?: unknown;
}

export type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
};

// Logging types
export type LogLevel = "debug" | "info" | "warn" | "error";

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: Date;
  context?: Dictionary;
}
