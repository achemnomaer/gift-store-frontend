"use client";
import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export default function FilterContextProvider({ children }) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <FilterContext.Provider
      value={{
        mobileFiltersOpen,
        setMobileFiltersOpen,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilterContext() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error(
      "useFilterContext must be used within a MobileFilterContextProvider"
    );
  }

  return context;
}
