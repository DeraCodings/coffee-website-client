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