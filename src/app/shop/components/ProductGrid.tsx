import { ProductShape } from "@/utils/types";
import ProductCard from "./ProductCard";

export default function ProductGrid({
  products,
}: {
  products: ProductShape[];
}) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
      {products.map(product => (
        <ProductCard key={product.name} product={product} />
      ))}
    </div>
  );
}
