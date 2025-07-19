"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFetchAllProducts } from "@/hooks/useFetchAllProducts";
import ProductCard from "@/components/ProductCard";

// Define the shape of your product data
type ProductAvailability = "in-stock" | "limited" | "out-of-stock";

interface ImageShape {
  alternativeText: string | null;
  url: string;
}

interface CategoryShape {
  documentId: string;
  name: string;
  description: string | null;
}

export interface BaseProductShape {
  documentId: string;
  name: string;
  description: string | null;
  price: number;
  category: CategoryShape;
  images: ImageShape[];
  availability?: ProductAvailability;
}

export interface ExtendedProductShape extends BaseProductShape {
  rating?: number;
  roastLevel?: string;
  origin?: string;
}

function toSlug(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .replace(/[^\w\-]+/g, "") // Remove non-word characters
    .replace(/\-\-+/g, "-"); // Replace multiple dashes with single dash
}

export default function ProductsPage() {
  const { products, loading, error } = useFetchAllProducts();
  const [activeTab, setActiveTab] = useState<"Coffee brews" | "Coffee beans">(
    "Coffee beans",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [sortBy, setSortBy] = useState("name");

  console.log("Products:", products);

  const filteredProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    return products
      .filter(product => product.category.name === activeTab)
      .filter(
        product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (product.description &&
            product.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase())),
      )
      .filter(
        product =>
          product.price >= priceRange[0] && product.price <= priceRange[1],
      )
      .sort((a, b) => {
        switch (sortBy) {
          case "price-low":
            return a.price - b.price;
          case "price-high":
            return b.price - a.price;
          default:
            return a.name.localeCompare(b.name);
        }
      });
  }, [activeTab, searchQuery, priceRange, sortBy, products]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg text-gray-500">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8 flex flex-col items-center gap-5">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Our Products
          </h1>
          <p className="text-gray-600">Discover our premium coffee selection</p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center">
          <div className="mb-8 flex w-fit space-x-1 p-1">
            <button
              onClick={() => setActiveTab("Coffee beans")}
              className={`px-6 py-3 font-medium transition-colors duration-150 ${
                activeTab === "Coffee beans"
                  ? "border-b-2 border-amber-900 text-amber-900"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Coffee Beans
            </button>
            <button
              onClick={() => setActiveTab("Coffee brews")}
              className={`px-6 py-3 font-medium transition-colors duration-150 ${
                activeTab === "Coffee brews"
                  ? "border-b-2 border-amber-900 text-amber-900"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Brewed Coffee
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="">
          <div className="mb-8 flex flex-col items-center justify-evenly gap-7 p-6 md:flex-row">
            {/* Search */}
            <div className="relative">
              <Search
                className="absolute left-3 top-4 -translate-y-1/2 transform text-gray-400"
                size={18}
              />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Price Range */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </label>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={50}
                min={0}
                step={1}
                className="w-full"
              />
            </div>

            {/* Sort By */}
            <div>
              <label className="mb-2 block text-center text-sm font-medium text-gray-700">
                Sort By
              </label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>

          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-center my-5 py-6">
          <p className="text-sm font-bold text-gray-600">
            {filteredProducts.length} products found
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid h-full grid-cols-1 gap-8 sm:grid-cols-2 md:h-screen lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map(product => {
            const slug = toSlug(product?.name);
            return (
              <Link
                key={product.documentId}
                href={`/products/${encodeURIComponent(slug)}`}
                className="group"
              >
                <ProductCard product={product} />
              </Link>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-lg text-gray-500">
              No products found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
