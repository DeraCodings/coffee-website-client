import { BlockRendererClient } from "../BlocksRendererClient";
import Image from "next/image";
import { fetchData } from "@/functions/fetchHomePage";
import { query } from "@/utils/data";
import { playfairDisplay } from "@/utils/font-config";

async function OurStory() {
  const homePageData = await fetchData(query);

  const ourStoryComponentData = homePageData?.homePage?.layout[1];

  console.log("Our Story Component Data:", ourStoryComponentData);

  const heading = ourStoryComponentData?.heading;
  const story = ourStoryComponentData?.story;
  const images = ourStoryComponentData?.images;

  const firstImage = images[0];
  const secondImage = images[1];

  // const imageUrl = `${baseURL}${firstImage?.image?.url}`;

  console.log(heading, story, firstImage, secondImage);

  return (
    <section className="flex h-full flex-col items-center justify-center gap-8 md:h-screen md:flex-row md:items-start md:justify-around md:gap-1">
      <div className="">
        <h2
          className={`text-center text-3xl font-semibold text-[#443227] md:text-left ${playfairDisplay.className}`}
        >
          {heading?.text}
        </h2>
        <BlockRendererClient content={story} />
      </div>
      <div className="flex h-full flex-col items-center gap-8 md:h-1/2">
        <div className="flex justify-center md:flex-row-reverse">
          <div className="flex w-4/6 md:w-4/6">
            <Image
              alt={firstImage?.image?.alternativeText}
              src={`${firstImage?.image?.url}`}
              height={250}
              width={250}
              className="w-full object-cover"
            />
          </div>
          <div className="hidden h-[200px] w-[200px] md:block"></div>
        </div>
        <div className="flex justify-center md:justify-around">
          <div className="flex w-4/6 md:w-4/6">
            <Image
              alt={secondImage?.image?.alternativeText}
              src={`${secondImage?.image?.url}`}
              height={250}
              width={250}
              className="w-full object-cover"
            />
          </div>
          <div className="hidden h-[200px] w-[200px] md:block"></div>
        </div>
      </div>
    </section>
  );
}

export default OurStory;
