
import { fetchData } from "@/functions/fetchHomePage";
import { query } from "@/utils/data";
import { fraunces, lato, playfairDisplay } from "@/utils/font-config";
import Image from "next/image";
import Link from "next/link";


async function HeroSection() {
  const homePageData = await fetchData(query);

  const heroSectionComponentData = homePageData?.homePage?.layout[0];

  console.log(heroSectionComponentData);

  const heroImage = heroSectionComponentData?.HeroImage?.image;
  const cta = heroSectionComponentData?.cta;
  const heading = heroSectionComponentData?.heading;
  const subheading = heroSectionComponentData?.subheading;

  console.log("Hero Section Image: ", heroImage);

  return (
    <section className="flex h-full flex-col items-center justify-center gap-8 py-8 md:py-4 md:h-screen md:flex-row md:justify-around md:gap-1">
      <div className="flex flex-col items-center justify-center gap-8 md:pl-8 text-center">
        <h1 className={`text-3xl font-extrabold text-[#443227] md:text-5xl ${playfairDisplay.className}`}>
          {heading?.text}
        </h1>
        <h2 className={`text-xl font-light text-[#443227] md:text-2xl ${lato.className}`}>
          {subheading?.text}
        </h2>
        <div>
          <Link
            href={`${cta?.href}`}
            className={`rounded-sm bg-[#bf935f] px-4 py-2 font-semibold transition-colors hover:bg-[#443227] hover:text-white md:px-7 md:py-3 ${fraunces.className}`}
          >
            {cta?.text}
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Image
          alt={heroImage?.alternativeText}
          src={`${heroImage?.url}`}
          height={1000}
          width={1000}
          className="h-full w-full"
        />
      </div>
    </section>
  );
}

export default HeroSection;
