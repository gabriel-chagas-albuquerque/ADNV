import { defineQuery } from 'groq';

// Carousel Items Query
export const CAROUSEL_QUERY = defineQuery(/* groq */ `
  *[_type == "carouselItem"] | order(order asc) {
    _id,
    order,
    title,
    description,
    "imageUrl": image.asset->url,
    link
  }
`);

// All Units Query
export const UNITS_QUERY = defineQuery(/* groq */ `
  *[_type == "unit"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    address,
    "imageUrl": image.asset->url
  }
`);

// Single Unit Query by Slug
export const UNIT_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "unit" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    address,
    description,
    schedule[] {
      day,
      time,
      activity
    },
    pastorName,
    whatsappGroups[] {
      name,
      link
    },
    "imageUrl": image.asset->url
  }
`);

// Site Settings Query
export const SITE_SETTINGS_QUERY = defineQuery(/* groq */ `
  *[_type == "siteSettings"][0] {
    _id,
    title,
    "logoUrl": logo.asset->url,
    themeMode,
    primaryColor,
    secondaryColor,
    aboutText,
    mission,
    vision,
    values,
    contactPhone,
    contactEmail,
    address,
    socialLinks[] {
      platform,
      url
    }
  }
`);
