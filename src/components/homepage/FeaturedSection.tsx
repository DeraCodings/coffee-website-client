import { baseURL, fetchData, fetchProducts } from "@/functions/fetchHomePage";
import { query } from "@/utils/data";
import { Product } from "@/utils/types";
import FeaturedProductCard from "../FeaturedProductCard";

async function FeaturedSection() {
  const homePageData = await fetchData(query);
  const productsData = await fetchProducts();

  const featuredSectionData = homePageData?.homePage?.layout[2];
  const heading = featuredSectionData?.heading?.text;

  console.log(productsData?.products);

  const products: Product[] = productsData?.products;

  return (
    <div className="h-full md:h-screen flex flex-col gap-14 justify-center">
      <h2 className="text-center text-2xl mt-8 md:mt-4 md:text-3xl font-bold text-[#443227]">
        {heading}
      </h2>
      <div className="flex flex-col gap-8 md:gap-1 md:flex-row md:px-12 md:justify-evenly items-center">
        {products.map(product => {
          let image = {
            url: "",
            alternativeText: "",
          };
          product?.images.forEach(imageObj => (image = imageObj));
          const imageUrl = `${baseURL}${image?.url}`;
          return (
            <FeaturedProductCard
              altText={image?.alternativeText}
              name={product?.name}
              image={imageUrl}
              description={product?.description}
              price={product?.price}
              key={product?.name}
            />
          );
        })}
      </div>
    </div>
  );
}

export default FeaturedSection;
