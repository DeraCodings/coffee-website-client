import { fetchData } from "@/functions/fetchHomePage";
import { query } from "@/utils/data";
import { PageLinks } from "@/utils/types";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";


async function Footer() {
  const homePageData = await fetchData(query);
  const footerData: PageLinks = homePageData?.homePage?.layout[5];
  const privacyLinks = footerData?.pageLinks.slice(0, 3);
  const shopLinks = footerData?.pageLinks.slice(3, 5);
  const aboutUsLinks = footerData?.pageLinks.slice(5);

  console.log(footerData, privacyLinks, shopLinks, aboutUsLinks);
  return (
    <footer className="py-16 px-8 text-white bg-[#171310]">
      <div className="flex flex-col gap-5 md:flex-row justify-center md:gap-8">
        <div>
          <h3 className="text-xl font-semibold text-center md:text-left text-[#bf935f]">Privacy</h3>
          <ul className="text-center my-4 md:my-2 md:text-left">
            {privacyLinks.map((link, index: number) => (
              <li key={index}>
                <Link href={link?.href} className="hover:text-[#bf925f] hover:underline transition-all duration-200">{link?.text}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-center md:text-left text-[#bf935f]">Shop</h3>
          <ul className="text-center my-4 md:my-2 md:text-left">
            {shopLinks.map((link, index: number) => (
              <li key={index}>
                <Link href={link?.href} className="hover:text-[#bf925f] hover:underline transition-all duration-200">{link?.text}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-center md:text-left text-[#bf935f]">About us</h3>
          <ul className="text-center my-4 md:my-2 md:text-left">
            {aboutUsLinks.map((link, index: number) => (
              <li key={index}>
                <Link href={link?.href} className="hover:text-[#bf925f] hover:underline transition-all duration-200">{link?.text}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="text-xl text-center font-semibold my-4 text-[#bf935f]">Social media</div>
      <div className="flex flex-row justify-center gap-7">
        <Link href="#" className="hover:text-[#bf925f] hover:underline transition-all duration-200"><FaSquareXTwitter size={30} /></Link>
        <Link href="#" className="hover:text-[#bf925f] hover:underline transition-all duration-200"><FaFacebook size={30} /></Link>
        <Link href="#" className="hover:text-[#bf925f] hover:underline transition-all duration-200"><RiInstagramFill size={30} /></Link>
      </div>
    </footer>
  );
}

export default Footer;
