// import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getRelatedProducts } from "@/functions/fetchHomePage";
import { getProductByName } from "@/functions/fetchHomePage";
import CartProductCard from "@/components/CartProductCard";
import { ProductShape } from "@/utils/types";
import { fromSlug } from "@/utils/slug";
// import { Metadata } from "next";

// interface PageProps {
//   params: {
//     slug: string;
//   };
// }

// app/items/[slug]/page.tsx
// export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
//   try {
//     const restoredProductName = fromSlug(params.slug);
//     const product = await getProductByName(restoredProductName);
    
//     if (!product) {
//       return {
//         title: "Product Not Found | Terra & Brews",
//         description: "Could not find the requested product",
//       };
//     }

//     return {
//       title: `${product.name} | Terra & Brews`,
//       description: product.description,
//       openGraph: {
//         images: [product.images[0]?.url || '/default-coffee.jpg'],
//       },
//     };
//   } catch (error) {
//     console.log("Error occurred: ", error);
//     return {
//       title: "Error | Terra & Brews",
//       description: "An error occurred while loading product information",
//     };
//   }
// }

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const restoredProductName = fromSlug(slug);

  const product = await getProductByName(restoredProductName);
  const relatedProducts = await getRelatedProducts(
    product?.category?.documentId,
    product?.documentId,
  );

  console.log("Product Name:", restoredProductName);
  console.log("Product:", product);
  console.log("Related Products:", relatedProducts);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link
              href="/products"
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Link>
            <div className="text-sm text-gray-500">
              <Link href="/" className="hover:text-gray-700">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/products" className="hover:text-gray-700">
                Products
              </Link>
              <span className="mx-2">/</span>
              <span>{product?.name}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Product Details */}
        <CartProductCard product={product} />
        {/* Product Information Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description" className="bg-red-400">Description</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-6">
              <div className="rounded-lg bg-white p-6">
                <h3 className="mb-4 text-lg font-semibold">
                  Product Description
                </h3>
                <p className="mb-4 leading-relaxed text-gray-600">
                  {product?.description}
                </p>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="mb-2 font-medium">Tasting Notes</h4>
                  </div>
                  <div>
                    <h4 className="mb-2 font-medium">
                      Recommended Brewing Methods
                    </h4>
                  </div>
                </div>
              </div>
            </TabsContent>
            {/* <TabsContent value="details" className="mt-6">
              <div className="rounded-lg bg-white p-6">
                <h3 className="mb-4 text-lg font-semibold">Product Details</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Origin:</span>
                      <span>{mockProduct.attributes.origin}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Altitude:</span>
                      <span>{mockProduct.attributes.altitude}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Varietals:</span>
                      <span>{mockProduct.attributes.varietals}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Processing:</span>
                      <span>{mockProduct.attributes.processingMethod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Roast Level:</span>
                      <span>{mockProduct.attributes.roastLevel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Weight:</span>
                      <span>{mockProduct.attributes.weight}</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <div className="rounded-lg bg-white p-6">
                <h3 className="mb-4 text-lg font-semibold">Customer Reviews</h3>
                <p className="text-gray-600">Reviews feature coming soon...</p>
              </div>
            </TabsContent> */}
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="mb-8 text-2xl font-bold text-gray-900">
            Related Products
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((product: ProductShape) => (
              <Link
                key={product?.documentId}
                href={`/products/${product?.name}`}
                className="group"
              >
                <div className="overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={`${product?.images[0]?.url}`}
                      alt={`${product.images[0]?.alternativeText}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="mb-1 font-semibold text-gray-900 transition-colors group-hover:text-amber-700">
                      {product?.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-amber-900">
                        ${product.price}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
