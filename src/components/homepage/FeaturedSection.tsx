import { fetchData, fetchProducts } from "@/functions/fetchHomePage";
import { query } from "@/utils/data";
import { ProductShape } from "@/utils/types";
import FeaturedProductCard from "../FeaturedProductCard";
import { playfairDisplay } from "@/utils/font-config";

async function FeaturedSection() {
  const homePageData = await fetchData(query);
  const productsData = await fetchProducts(4);

  const featuredSectionData = homePageData?.homePage?.layout[2];
  const heading = featuredSectionData?.heading?.text;

  console.log(productsData?.products);

  // const products: Product[] = productsData?.products;
  const products: ProductShape[] = productsData?.products;


  return (
    <div className="h-full md:h-screen flex flex-col gap-14 justify-center">
      <h2 className={`text-center text-2xl mt-8 md:mt-4 md:text-3xl font-bold text-[#443227] ${playfairDisplay.className}`}>
        {heading}
      </h2>
      <div className="flex flex-col gap-8 md:gap-1 md:flex-row md:px-12 md:justify-evenly items-center">
        {products.map(product => {
          let image = {
            url: "",
            alternativeText: "",
          };
          product?.images.forEach(imageObj => (image = imageObj));
          const imageUrl = `${image?.url}`;
          return (
            <FeaturedProductCard
              altText={image?.alternativeText}
              name={product?.name}
              image={imageUrl}
              price={product?.price}
              key={product?.name}
              product={product}
            />
          );
        })}
      </div>
    </div>
  );
}

export default FeaturedSection;
