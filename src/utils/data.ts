export const query = `query HomePage {
  homePage {
    Navigation {
      ... on ComponentTopNavigationNavgationLinks {
        navLinks {
          href
          text
        }
      }
    }
    layout {
      ... on ComponentLayoutTestimonialSection {
        heading {
          text
        }
        testimonials {
          image {
            image {
              alternativeText
              url
            }
          }
          name {
            text
          }
          testimonial {
            text
          }
        }
      }
      ... on ComponentLayoutOurStory {
        heading {
          text
        }
        story
        images {
          image {
            alternativeText
            url
          }
        }
      }
      ... on ComponentLayoutHeroSection {
        HeroImage {
          image {
            alternativeText
            url
          }
        }
        cta {
          text
          href
        }
        heading {
          text
        }
        subheading {
          text
        }
      }
      ... on ComponentLayoutFooter {
        pageLinks {
          href
          text
        }
      }
      ... on ComponentLayoutFeaturedSection {
        heading {
          text
        }
      }
      ... on ComponentLayoutCallToActionSection {
        backgroundImage {
          image {
            alternativeText
            url
          }
        }
        text {
          text
        }
      }
      ... on Error {
        code
        message
      }
    }
  }
}`;

export const categoryQuery = `query Category {
  categories {
    name
    description
    products {
      name
      price
      quantity
      images {
        alternativeText
        url
      }
      description
    }
  }
}`;

export const productsQuery = `query Products($pagination: PaginationArg) {
  products(pagination: $pagination) {
    name
    price
    images {
      alternativeText
      url
    }
    description
    documentId
  }
}`;

export const entireProductQuery = `query Products {
  products {
    name
    price
    images {
      alternativeText
      url
    }
    description
    category {
      documentId
      name
      description
    }
    documentId
  }
}`

export const aboutPageQuery = `query AboutPage {
  aboutPage {
    AboutUs {
      ... on ComponentComponentsHeading {
        headingText: text
      }
      ... on ComponentComponentsDescription {
        description: text
      }
      ... on ComponentComponentsImage {
        image {
          alternativeText
          url
        }
      }
      ... on ComponentComponentsCard {
        card_title
        card_image {
          alternativeText
          url
        }
        card_description
      }
    }
    company_address
    gentle_nudge
    open_hours
  }
}`

export const allProductsQuery = `query AboutPage {
  products {
    documentId
    name
    price
    description
    quantity
    category {
      name
      documentId
      description
    }
    images {
      alternativeText
      url
    }
  }
}`;

export const productByNameQuery = `query Products($filters: ProductFiltersInput) {
  products(filters: $filters) {
    documentId
    category {
      name
    }
    name
    price
    quantity
    images {
      alternativeText
      url
    }
  }
}`;