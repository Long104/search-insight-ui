/**
 * UI and component-related types
 */

export interface IsOpenState {
  isOpen: boolean;
  toggleIsOpen: () => void;
}

export interface LoadingState {
  isLoading: boolean;
  isLoadingMore?: boolean;
  error?: string | null;
}

export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface SearchWidgetConfig {
  storeUrl?: string;
  theme?: "light" | "dark" | "auto";
  primaryColor?: string;
  hideHeader?: boolean;
  showFilters?: boolean;
  maxResults?: number;
  enableAutocomplete?: boolean;
  enableInfiniteScroll?: boolean;
}

export interface ShadowDOMSearchDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  storeUrl?: string;
}

export interface SearchWidgetProps extends SearchWidgetConfig {
  onClose?: () => void;
  searchQuery?: string;
  setSearchQuery: (query: string) => void;
  hasSearched: boolean;
  setHasSearched: (hasSearched: boolean) => void;
}

export interface MobileSearchProps {
  searchRef: React.RefObject<HTMLDivElement>;
  inputRef: React.RefObject<HTMLInputElement>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showAutocomplete: boolean;
  setShowAutocomplete: (show: boolean) => void;
  isAutocompleteLoading: boolean;
  autocompleteSuggestions: string[];
  onClose: () => void;
  handleSearch: (query: string) => void;
  handleSuggestionClick: (suggestion: string) => void;
  handleKeyDown: (event: React.KeyboardEvent) => void;
}

export interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  hasSearched: boolean;
  setHasSearched: React.Dispatch<React.SetStateAction<boolean>>;
  storeUrl?: string;
  hideHeader?: boolean;
}

// Animation and interaction states
export type AnimationState = "entering" | "entered" | "exiting" | "exited";

export interface InteractionState {
  isHovered: boolean;
  isFocused: boolean;
  isPressed: boolean;
}

// Responsive breakpoints
export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export interface ResponsiveValue<T> {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  "2xl"?: T;
}
