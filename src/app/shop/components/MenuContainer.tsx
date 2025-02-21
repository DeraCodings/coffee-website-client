'use client'

import { useState } from 'react'
import { ProductShape } from '@/utils/types' 
import MenuTabs from './MenuTabs'
import ProductGrid from './ProductGrid'
import Pagination from './Pagination' 

// How many products to show per page
const ITEMS_PER_PAGE = 8;

export default function MenuContainer({ initialProducts }: { initialProducts: ProductShape[] }) {
  // Keep track of which tab is selected
  const [activeCategory, setActiveCategory] = useState<string>('Coffee brews');
  // Keep track of which page we're on
  const [currentPage, setCurrentPage] = useState(1);

  // Filter products based on the selected category
  const filteredProducts = initialProducts.filter(
    product => product.category.name === activeCategory
  );

  // Calculate how many pages we need
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  // Get just the products for the current page
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // This function changes the category and resets to page 1
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  return (
    <>
      <MenuTabs 
        activeCategory={activeCategory} 
        onCategoryChange={handleCategoryChange}
        categories={[...new Set(initialProducts.map(p => p.category.name))]}
      />
      
      <ProductGrid products={paginatedProducts} />

      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  )
}