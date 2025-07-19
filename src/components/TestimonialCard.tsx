import { fraunces, lato } from "@/utils/font-config";
import { TestimonialCardProps } from "@/utils/types";
import Image from "next/image";

function TestimonialCard({
  image,
  name,
  quote,
  alternativeText,
}: TestimonialCardProps) {
  console.log(image, name, quote, alternativeText);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-center">
        <div className="h-[150px] w-[150px] rounded-full">
          <Image
            alt={alternativeText}
            src={image}
            height={100}
            width={100}
            className="h-full w-full rounded-full object-cover"
          />
        </div>
      </div>
      <h4 className={`text-center text-xl font-semibold text-[#bf925f] ${fraunces.className}`}>{name}</h4>
      <p className={`text-wrap text-[#443227] ${lato.className}`}>{quote}</p>
    </div>
  );
}

export default TestimonialCard;
