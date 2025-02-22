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