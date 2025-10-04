'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, Car } from 'lucide-react';
import { CarCategory } from '@/lib/types';
import { carCategories } from '@/lib/data';

interface CarCategoryDropdownProps {
  currentLang: string;
  isScrolled?: boolean;
}

const CarCategoryDropdown: React.FC<CarCategoryDropdownProps> = ({ 
  currentLang, 
  isScrolled = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle mouse enter
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsHovering(true);
    setIsOpen(true);
  };

  // Handle mouse leave with delay
  const handleMouseLeave = () => {
    setIsHovering(false);
    timeoutRef.current = setTimeout(() => {
      if (!isHovering) {
        setIsOpen(false);
      }
    }, 100); // Reduced delay for faster response
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Close on click outside and global Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsHovering(false);
      }
    };

    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setIsHovering(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpen(!isOpen);
    } else if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  // Get localized category names
  const getLocalizedCategoryName = (category: CarCategory) => {
    // For now, return the displayName. In a full implementation,
    // this would use the translation system
    return category.displayName;
  };

  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={dropdownRef}
    >
      {/* Trigger Button */}
      <button
        className={`relative group font-semibold tracking-wide flex items-center space-x-1 ${
          isScrolled
            ? "text-gray-800 dark:text-gray-200"
            : "text-white"
        } transition-colors duration-200`}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Car categories menu"
      >
        <span className="duration-75 group-hover:text-brand-gold dark:group-hover:text-brand-gold">
          Maşınlar
        </span>
        <ChevronDown 
          className={`h-4 w-4 transition-transform duration-150 ${
            isOpen ? 'rotate-180' : ''
          } group-hover:text-brand-gold`}
        />
        
        {/* Premium underline */}
        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-brand-gold via-yellow-400 to-brand-gold transition-all duration-200 group-hover:w-full rounded-full shadow-[0_0_8px_rgba(245,183,84,0.8)]"></span>
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute top-full left-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 transition-all duration-150 ${
          isOpen 
            ? 'opacity-100 visible translate-y-0' 
            : 'opacity-0 invisible -translate-y-2'
        }`}
        role="menu"
        aria-orientation="vertical"
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <Car className="h-5 w-5 text-brand-gold" />
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Maşın Kateqoriyaları
            </h3>
          </div>
        </div>

        {/* Categories List */}
        <div className="py-2">
          {carCategories.map((category) => (
            <Link
              key={category.id}
              href={`/cars?category=${category.name}`}
              prefetch={false}
              className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 group"
              role="menuitem"
              onClick={() => setIsOpen(false)}
            >
              {/* Category Icon */}
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-brand-gold/20 to-yellow-400/20 rounded-lg flex items-center justify-center mr-3 group-hover:from-brand-gold/30 group-hover:to-yellow-400/30 transition-colors">
                <span className="text-lg">{category.icon}</span>
              </div>
              
              {/* Category Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-brand-gold transition-colors">
                    {getLocalizedCategoryName(category)}
                  </h4>
                  {category.count && (
                    <span className="text-xs bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  )}
                </div>
                {category.description && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">
                    {category.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
          <Link
            href="/cars"
            prefetch={true}
            className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-brand-gold hover:text-brand-gold/80 hover:bg-brand-gold/5 rounded-md transition-colors duration-150"
            onClick={() => setIsOpen(false)}
          >
            Bütün Maşınları Gör
            <ChevronDown className="h-4 w-4 ml-1 rotate-[-90deg]" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCategoryDropdown;