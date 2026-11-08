// import {defineQuery} from 'next-sanity'

// export const SERVICES_QUERY = defineQuery(`
//   *[_type == "service"] {
//     _id,
//     title,
//     description,
//     image
//   }
// `)

import {defineQuery} from 'next-sanity'

// export const SERVICES_QUERY = defineQuery(`
//   *[_type == "service"] | order(_createdAt asc) {
//     _id,
//     titleAr,
//     titleEn,
//     descriptionAr,
//     descriptionEn,
//     image
//   }
// `)

export const SERVICES_QUERY = defineQuery(`
  *[_type == "service"] | order(order asc) {
    _id,
    order,
    titleAr,
    titleEn,
    descriptionAr,
    descriptionEn,
    image
  }
`) 
;

export const ABOUT_QUERY = defineQuery(`
    *[_type == "about"] [0]{
    
      titleAr ,
      titleEn ,
      descriptionAr ,
      descriptionEn ,
      image
    }
  `)

 