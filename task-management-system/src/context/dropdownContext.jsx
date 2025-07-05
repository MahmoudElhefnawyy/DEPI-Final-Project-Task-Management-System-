// src/context/dropdownContext.js
import { createContext, useState, useContext } from 'react';

const DropdownContext = createContext();

export const DropdownProvider = ({ children }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);0
  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const closeAll = () => {
    setActiveDropdown(null);
  };

  return (
    <DropdownContext.Provider value={{ activeDropdown, toggleDropdown, closeAll }}>
      {children}
    </DropdownContext.Provider>
  );
};

export const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('useDropdown must be used within a DropdownProvider');
  }
  return context;
};