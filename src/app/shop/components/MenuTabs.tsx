"use client";

import { fraunces } from "@/utils/font-config";

interface MenuTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
}

export default function MenuTabs({
  activeCategory,
  onCategoryChange,
  categories,
}: MenuTabsProps) {
  return (
    <div className="mb-8 flex justify-center border-b border-[#bf935f]/20">
      <div className="flex space-x-8">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 text-lg capitalize transition-all duration-300 ${
              activeCategory === category
                ? "-mb-[2px] border-b-2 border-[#bf935f] text-[#bf935f]"
                : "text-[#443227] hover:text-[#bf935f]"
            } ${fraunces.className}`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
