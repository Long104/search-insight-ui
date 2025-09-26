import { useIsOpen } from "@/hooks/zustand";
import { Search } from "lucide-react";
import React from "react";
import ShadowDOMSearchDropdown from "./ShadowDOMSearchDropdown";
interface SearchIconProps {
  storeUrl: string;
}

const SearchIcon: React.FC<SearchIconProps> = ({ storeUrl }) => {
  const isOpen = useIsOpen((state) => state.isOpen);
  const toggleIsOpen = useIsOpen((state) => state.toggleIsOpen);

  return (
    <>
      {/* Search Icon Button */}
      <button
        onClick={toggleIsOpen}
        className="group !relative !rounded-lg !bg-background !p-2 !transition-colors !duration-200 hover:!bg-muted focus:!outline-none focus:!ring-2 focus:!ring-primary focus:!ring-offset-2"
        aria-label="Toggle search"
      >
        <Search className="!h-6 !w-6 !text-muted-foreground !transition-colors !duration-200 group-hover:!text-primary" />
      </button>

      {/* Search Dropdown */}
      <ShadowDOMSearchDropdown isOpen={isOpen} onClose={toggleIsOpen} storeUrl={storeUrl} />
    </>
  );
};

export default SearchIcon;
