import { defineQuery } from 'groq';

// Carousel Items Query
export const CAROUSEL_QUERY = defineQuery(/* groq */ `
  *[_type == "carouselItem"] | order(order asc) {
    _id,
    order,
    title,
    description,
    mediaType,
    "imageUrl": image.asset->url,
    "videoUrl": video.asset->url,
    youtubeUrl,
    link

  }

`);

// All Units Query
export const UNITS_QUERY = defineQuery(/* groq */ `
  *[_type == "unit"] | order(select(name == "Sede" => 0, 1) asc, name asc) {
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
    radioUrl,
    footerDescription,
    socialLinks[] {
      platform,
      url
    }
  }
`);

// Mission Project Query
export const MISSION_PROJECT_QUERY = defineQuery(/* groq */ `
  *[_type == "missionProject"][0] {
    _id,
    title,
    subtitle,
    badge,
    contentTitle,
    description,
    stats[] {
      iconName,
      label,
      value,
      suffix
    }
  }
`);

