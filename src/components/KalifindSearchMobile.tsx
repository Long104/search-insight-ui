import { Search, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Product } from "../types";

interface KalifindSearchMobileProps {
  searchRef: React.RefObject<HTMLDivElement>;
  inputRef: React.RefObject<HTMLInputElement>;
  searchQuery: string;
  handleSearch: (query: string) => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onClose: () => void;
  showAutocomplete?: boolean;
  setShowAutocomplete?: (show: boolean) => void;
  autocompleteSuggestions?: string[];
  isAutocompleteLoading?: boolean;
  handleSuggestionClick?: (suggestion: string) => void;
  highlightedSuggestionIndex?: number;
  setHighlightedSuggestionIndex?: (index: number) => void;
  setHasSearched?: (hasSearched: boolean) => void;
  isInteractingWithDropdown?: boolean;
  setIsInteractingWithDropdown?: (interacting: boolean) => void;
}

const KalifindSearchMobile: React.FC<KalifindSearchMobileProps> = ({
  searchRef,
  inputRef,
  searchQuery,
  handleSearch,
  handleKeyDown,
  onClose,
  showAutocomplete: _showAutocomplete = false,
  setShowAutocomplete: _setShowAutocomplete,
  autocompleteSuggestions: _autocompleteSuggestions = [],
  isAutocompleteLoading: _isAutocompleteLoading = false,
  handleSuggestionClick: _handleSuggestionClick,
  highlightedSuggestionIndex = -1,
  setHighlightedSuggestionIndex: _setHighlightedSuggestionIndex,
  setHasSearched,
  isInteractingWithDropdown = false,
  setIsInteractingWithDropdown,
}) => {
  // Mobile component's own autocomplete state
  const [mobileShowAutocomplete, setMobileShowAutocomplete] = useState(false);
  const [mobileAutocompleteSuggestions, setMobileAutocompleteSuggestions] = useState<string[]>([]);
  const [mobileIsAutocompleteLoading, setMobileIsAutocompleteLoading] = useState(false);

  // Mobile autocomplete logic - self-contained like desktop
  useEffect(() => {
    if (!searchQuery.trim()) {
      setMobileAutocompleteSuggestions([]);
      setMobileIsAutocompleteLoading(false);
      setMobileShowAutocomplete(false);
      return;
    }

    setMobileShowAutocomplete(true);
    const debounceTimer = setTimeout(() => {
      void (async () => {
        setMobileIsAutocompleteLoading(true);
        try {
          const params = new URLSearchParams();
          params.append("q", searchQuery);
          params.append("storeUrl", "https://findifly.kinsta.cloud"); // Use the store URL

          const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/v1/autocomplete?${params.toString()}`,
            {}
          );

          if (!response.ok) {
            throw new Error("bad response");
          }

          const result = await response.json() as unknown;

          // Handle different response formats
          let rawSuggestions: string[] = [];
          if (Array.isArray(result)) {
            rawSuggestions = result
              .map((r: Product) => r.title || (r.name ?? "Unknown Product"))
              .filter(Boolean);
          } else if (result && typeof result === 'object' && 'suggestions' in result && Array.isArray((result as { suggestions: unknown }).suggestions)) {
            const { suggestions } = result as { suggestions: string[] };
            rawSuggestions = suggestions.map((s: string) => String(s));
          } else if (result && typeof result === 'object' && 'products' in result && Array.isArray((result as { products: unknown }).products)) {
            const { products } = result as { products: Product[] };
            rawSuggestions = products
              .map((r: Product) => r.title || (r.name ?? "Unknown Product"))
              .filter(Boolean);
          }

          setMobileAutocompleteSuggestions(rawSuggestions.slice(0, 10));
        } catch (error) {
          console.error("Mobile autocomplete error:", error);
          setMobileAutocompleteSuggestions([]);
        } finally {
          setMobileIsAutocompleteLoading(false);
        }
      })();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  // Mobile suggestion click handler - same as desktop
  const handleMobileSuggestionClick = (suggestion: string) => {
    // Close autocomplete
    setMobileShowAutocomplete(false);
    setMobileAutocompleteSuggestions([]);
    setMobileIsAutocompleteLoading(false);

    // Set the search query and trigger search
    handleSearch(suggestion);

    // Add to recent searches if needed
    setHasSearched?.(true);

    // Blur input to close mobile keyboard
    inputRef.current?.blur();
  };

  // Mobile-specific click outside handler - same as desktop
  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     const target = event.target as HTMLElement;
  //
  //     console.log("Mobile click outside debug:", {
  //       target: target.tagName,
  //       targetClass: target.className,
  //       inputRef: inputRef.current,
  //       inputContains: inputRef.current ? inputRef.current.contains(target) : false,
  //       searchRef: searchRef.current,
  //       searchContains: searchRef.current ? searchRef.current.contains(target) : false,
  //     });
  //
  //     // First, check if click is on the mobile search input itself using data attributes
  //     const searchInput = target.closest("[data-search-input]");
  //     if (searchInput) {
  //       console.log("Mobile: Click detected on search input, keeping autocomplete open");
  //       return;
  //     }
  //
  //     // Check if the click is on a suggestion item or autocomplete dropdown
  //     const isSuggestionClick = target.closest("[data-suggestion-item]");
  //     const isAutocompleteClick = target.closest("[data-autocomplete-dropdown]");
  //
  //     if (isSuggestionClick || isAutocompleteClick) {
  //       console.log("Mobile: Click detected on suggestion item or dropdown, not closing autocomplete");
  //       return;
  //     }
  //
  //     // Check if click is within the mobile search container
  //     if (searchRef.current && searchRef.current.contains(target)) {
  //       console.log("Mobile: Click detected within search container, keeping autocomplete open");
  //       return;
  //     }
  //
  //     // Only close if click is truly outside everything
  //     console.log("Mobile: Click outside detected, closing autocomplete");
  //     setMobileShowAutocomplete(false);
  //   };
  //
  //   document.addEventListener("click", handleClickOutside);
  //   return () => document.removeEventListener("click", handleClickOutside);
  // }, [inputRef, searchRef]);

  return (
    <div className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="w-full bg-background py-2">
        <div className="mx-auto flex w-full flex-col justify-center lg:flex-row lg:gap-24">
          <div
            className="relative h-full w-full flex-1 px-[8px] sm:px-[16px]"
            ref={searchRef}
            data-mobile-search-container="true"
          >
            <div className="flex h-full w-full flex-1 items-center gap-2">
              <div className="flex h-full w-full">
                <div className="relative h-full w-full flex-1">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-muted-foreground" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    data-mobile-search-input="true"
                    data-search-input="true"
                    onChange={(e) => {
                      handleSearch(e.target.value);
                      setHasSearched?.(true);
                    }}
                    onFocus={() => {
                      if (searchQuery.length > 0) {
                        setMobileShowAutocomplete(true);
                      }
                    }}
                    onBlur={(e) => {
                      // Only close autocomplete if the blur is not caused by clicking on a suggestion
                      const relatedTarget = e.relatedTarget as HTMLElement | null;
                      const isClickingOnSuggestion =
                        relatedTarget?.closest("[data-suggestion-item]") ??
                        relatedTarget?.closest("[data-autocomplete-dropdown]");

                      if (!isClickingOnSuggestion && !isInteractingWithDropdown) {
                        // Longer delay to allow for autocomplete to show and user to interact
                        setTimeout(() => {
                          setMobileShowAutocomplete(false);
                        }, 300);
                      }
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="Search"
                    className="h-full w-full border-none py-2 pl-10 pr-4 text-base text-foreground placeholder-muted-foreground ring-0 focus:outline-none"
                    autoFocus
                  />{" "}
                </div>
                <button
                  className="flex-shrink-0 rounded-lg transition-colors duration-200 hover:bg-muted/20"
                  aria-label="Close search"
                  onClick={onClose}
                >
                  <X className="mr-3 h-5 w-5 text-muted-foreground transition-colors duration-200 hover:text-foreground" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Autocomplete dropdown for mobile */}
      {mobileShowAutocomplete &&
        searchQuery.length > 0 &&
        (mobileIsAutocompleteLoading || mobileAutocompleteSuggestions.length > 0) && (
          <div
            data-autocomplete-dropdown="true"
            className="absolute left-0 right-0 top-full z-[9999999] mx-4 mt-1 rounded-lg border border-border bg-background shadow-lg"
            onMouseEnter={() => setIsInteractingWithDropdown?.(true)}
            onMouseLeave={() => setIsInteractingWithDropdown?.(false)}
          >
            <div className="p-4">
              {mobileIsAutocompleteLoading ? (
                <div className="flex items-center justify-center gap-2 py-3 text-muted-foreground">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent"></div>
                  <span>Loading suggestions...</span>
                </div>
              ) : mobileAutocompleteSuggestions.length > 0 ? (
                <>
                  <h3 className="mb-3 text-sm font-medium text-foreground">Suggestions</h3>
                  <div className="space-y-2">
                    {mobileAutocompleteSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        data-suggestion-item="true"
                        className={`flex cursor-pointer items-center gap-2 rounded p-2 transition-colors hover:bg-muted ${index === highlightedSuggestionIndex ? "bg-muted" : ""
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          // Use mobile's own suggestion click handler
                          handleMobileSuggestionClick(suggestion);
                        }}
                      >
                        <Search className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{suggestion}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-center duration-300 animate-in fade-in">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted duration-500 animate-in zoom-in">
                    <Search className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="duration-500 animate-in slide-in-from-bottom-2">
                    <p className="mb-1 font-medium text-foreground">Search not found</p>
                    <p className="text-sm text-muted-foreground">
                      No suggestions found for "{searchQuery}"
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
    </div>
  );
};

export default KalifindSearchMobile;
