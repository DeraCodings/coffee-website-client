import { baseURL, fetchData } from "@/functions/fetchHomePage";
import TestimonialCard from "../TestimonialCard";
import { query } from "@/utils/data";
import { Testimonials } from "@/utils/types";



async function TestimonialSection() {
  const homePageData = await fetchData(query);
  const testimonialData = homePageData?.homePage?.layout[3];
  const heading = testimonialData?.heading;
  const testimonials: Testimonials[] = testimonialData?.testimonials;
  console.log(heading, testimonials);
  return (
    <section className="px-16 flex flex-col justify-center gap-8 md:gap-3 my-16 md:my-2 h-full md:h-screen">
      <h2 className="text-3xl text-[#443227] font-bold text-center py-4">{heading?.text}</h2>
      <section className="flex flex-col flex-wrap justify-around items-center gap-8 md:flex-nowrap md:flex-row">
        {testimonials.map((testimonial, index: number) => {
          const imageUrl = `${baseURL}${testimonial.image?.image?.url}`;
          return (
            <TestimonialCard
              key={index}
              image={imageUrl}
              alternativeText={testimonial?.image?.image?.alternativeText}
              name={testimonial?.name?.text}
              quote={testimonial?.testimonial?.text}
            />
          );
        })}
      </section>
    </section>
  );
}

export default TestimonialSection;
