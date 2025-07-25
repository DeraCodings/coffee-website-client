import { Card } from "@/components/ui/card";
import { fetchAboutPageData } from "@/functions/fetchHomePage";
import { aboutPageQuery } from "@/utils/data";
import { fraunces, lato, playfairDisplay } from "@/utils/font-config";
import { ApiResponse } from "@/utils/types";
import { MapPin } from "lucide-react";
import Image from "next/image";


export default async function AboutPage() {
  const aboutPageData: ApiResponse = await fetchAboutPageData(aboutPageQuery);
  const data = aboutPageData.aboutPage;
  const cards = [data?.AboutUs[8], data?.AboutUs[9], data?.AboutUs[10]];
  const communityCards = [
    data?.AboutUs[13],
    data?.AboutUs[14],
    data?.AboutUs[15],
  ];
  console.log(data?.AboutUs);
  console.log("Community Cards: ", communityCards);
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div
        className="flex h-screen items-center justify-center"
        style={{
          backgroundImage: `url(${data?.AboutUs[2]?.image?.url})`,
        }}
      >
        <div className="flex flex-col items-center justify-center px-4 py-24 text-center text-white md:py-32">
          <h1 className={`${playfairDisplay.className} mb-4 w-full text-center text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl`}>
            {data?.AboutUs[0]?.headingText}
            {/* <span className="text-[#bf935f]">Perfected</span>. */}
          </h1>
          <p className={`${lato.className} mx-auto max-w-2xl text-lg text-gray-200 md:text-xl`}>
            Crafting exceptional coffee experiences since 2015
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="md:h-screen px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            <div className="flex flex-col justify-center">
              <h2 className={`${playfairDisplay.className} mb-6 text-3xl font-bold text-center md:text-left tracking-tight text-[#443227] md:text-4xl`}>
                {data?.AboutUs[3]?.headingText}
              </h2>
              <div className={`${lato.className} space-y-4 text-[#171310] px-5 md:px-0 leading-relaxed`}>
                <p>{data?.AboutUs[4]?.description}</p>
              </div>
            </div>
            <div className="flex h-full items-center justify-center rounded-xl md:h-auto">
              <Image
                src={`${data?.AboutUs[5]?.image?.url}`}
                alt={`${data?.AboutUs[5]?.image?.alternativeText}`}
                width={1000}
                height={1000}
                className="block h-4/5 w-full rounded-md object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Coffee Section */}
      <section className="md:h-screen bg-[#443227] px-4 py-16 text-white md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className={`${playfairDisplay.className} mb-6 text-center text-3xl font-bold tracking-tight md:text-4xl`}>
            {data?.AboutUs[6]?.headingText}
          </h2>
          <p className={`${lato.className} mx-auto mb-12 max-w-3xl text-center`}>
            {data?.AboutUs[7]?.description}
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            {cards.map((card, index) => {
              // const Icon =ICON_MAP[card.iconName as keyof typeof ICON_MAP] || Coffee;
              return (
                <Card className="bg-white/10" key={index}>
                  <div className="p-6">
                    {/* <Icon className="mb-4 h-10 w-10 text-[#bf935f]" /> */}
                    <h3 className={`${fraunces.className} mb-2 text-xl font-bold`}>
                      {card?.card_title}
                    </h3>
                    <p className={`${lato.className} text-gray-200`}>{card?.card_description}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Community Section */}
      <section className="md:h-screen px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className={`${playfairDisplay.className} mb-6 text-center text-3xl font-bold tracking-tight text-[#443227] md:text-4xl`}>
            {data?.AboutUs[11]?.headingText}
          </h2>
          <p className={`${lato.className} mx-auto mb-12 max-w-3xl text-center text-[#171310]`}>
            {data?.AboutUs[12]?.description}
          </p>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {communityCards.map((communityCard, index) => (
              <div
                className="group relative h-[20rem] overflow-hidden rounded-lg"
                key={index}
              >
                <Image
                  src={`${communityCard?.card_image?.url}`}
                  alt={communityCard?.card_image?.alternativeText || ""}
                  width={600}
                  height={600}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 w-full bg-black/50 p-6 text-white">
                  <h3 className={`${fraunces.className} mb-1 text-xl font-bold`}>
                    {communityCard?.card_title}
                  </h3>
                  <p className={`${lato.className} text-sm`}>{communityCard?.card_description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Us Section */}
      <section className="bg-[#070707] px-4 py-16 text-white md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className={`${playfairDisplay.className} mb-6 text-3xl font-bold tracking-tight md:text-4xl`}>
                Visit Us
              </h2>
              <div className="mb-8 space-y-4">
                <div className="flex items-start">
                  <MapPin className="mr-3 h-6 w-6 shrink-0 text-[#bf935f]" />
                  <div>
                    {/* <h3 className="font-medium">Main Roastery & Café</h3> */}
                    <p className={`${lato.className} text-gray-300`}>{data?.company_address}</p>
                  </div>
                </div>
                <div>
                  <h3 className={`${fraunces.className} mb-2 font-medium`}>Hours</h3>
                  <ul className="space-y-1 text-gray-300">
                    <li className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>{data?.open_hours?.["Monday-Friday"]}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Saturday</span>
                      <span>{data?.open_hours?.Saturday}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Sunday</span>
                      <span>{data?.open_hours?.Sunday}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className={`${fraunces.className} text-xl font-bold`}>Get Involved</h3>
                <p className={`${lato.className}`}>
                  Whether you&apos;re a coffee aficionado or just beginning your
                  journey, we&apos;d love to welcome you into our community.
                  Stop by for a cup, join a workshop, or simply chat with our
                  baristas about what makes coffee so magical.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
