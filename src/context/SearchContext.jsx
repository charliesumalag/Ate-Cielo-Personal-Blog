import { createContext, useContext, useState } from 'react';
// 1. create a new context
const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [searchInput, setSearchInput] = useState('');
  return (
    <SearchContext.Provider value={{ searchInput, setSearchInput }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
