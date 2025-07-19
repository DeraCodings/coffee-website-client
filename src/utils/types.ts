import { Models } from "appwrite";

export type Links = {
  href: string;
  text: string;
};

export interface PageLinks {
  pageLinks: Links[];
}

export type ImageObject = {
  alternativeText: string;
  url: string;
};

export type Text = {
  text: string;
};

export type Image = {
  image: ImageObject;
};

export type Product = {
  name: string;
  price: number;
  images: ImageObject[];
  description: string | null;
};

export interface Category {
  name: string;
  description: string;
  products: Product[];
}

export interface CTAData {
  backgroundImage: Image;
  text: Text;
}

export interface Testimonials {
  image: Image;
  name: Text;
  testimonial: Text;
}

export interface TestimonialCardProps {
  image: string;
  name: string;
  quote: string;
  alternativeText: string;
}

export interface ProductShape {
  name: string;
  price: number;
  images: {
    alternativeText: string;
    url: string;
  }[];
  description: string | null;
  category: {
    documentId: string;
    name: string;
    description: string;
  };
  documentId: string;
}

export interface ProductsResponse {
  data: {
    products: ProductShape[];
  };
}

export interface CartItem extends ProductShape {
  quantity: number;
}

export interface ReusableInputProps {
  label: string;
  placeholder: string;
  error?: string;
  inputType: string;
  id: string;
  name?: string;
}

export interface FunctionCallResponse extends Models.Execution {
  message?: string;
  error?: string;
  success?: boolean;
  orderId?: string;
}

/** Represents an image asset with alt text and URL */
export interface AbouPageImage {
  alternativeText: string;
  url: string;
}

/** Union of all possible AboutUs item shapes */

// type CardItem = {
//   card_title: string;
//   card_image: AbouPageImage | null;
//   card_description: string;
//   iconName?: "Weekly Cuppings" | "Brewing Workshop" | "Sustainability Initiatives";
// }
export interface AboutUsItem {
  headingText?: string;
  description?: string | null;
  image?: AbouPageImage;
  card_title: string;
  card_image: AbouPageImage | null;
  card_description: string;
  iconName?: "Weekly Cuppings" | "Brewing Workshop" | "Sustainability Initiatives";
}

/** Business hours for the café */
export interface OpenHours {
  "Monday-Friday": string;
  Saturday: string;
  Sunday: string;
}

/** Main payload for the About Page */
export interface AboutPage {
  AboutUs: AboutUsItem[];
  company_address: string;
  gentle_nudge: string;
  open_hours: OpenHours;
}

/** Wrapper for the data field */
export interface ApiResponse {
  aboutPage: AboutPage;
}
