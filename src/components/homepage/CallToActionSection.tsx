import { fetchData } from "@/functions/fetchHomePage";
import { query } from "@/utils/data";
import { playfairDisplay } from "@/utils/font-config";
import { CTAData } from "@/utils/types";


async function CallToActionSection() {
  const homePageData = await fetchData(query);
  const callToActionSectionData: CTAData =
    homePageData?.homePage?.layout[4];
  const imageUrl = `${callToActionSectionData?.backgroundImage?.image?.url}`;
  console.log(callToActionSectionData);
  return (
    <div
      style={{ backgroundImage: `url(${imageUrl})` }}
      className="flex h-screen items-center justify-center bg-cover bg-center bg-no-repeat"
    >
      <h2 className={`text-5xl text-center font-extrabold text-white ${playfairDisplay.className}`}>
        {callToActionSectionData?.text?.text}
      </h2>
    </div>
  );
}

export default CallToActionSection;
