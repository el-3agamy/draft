// "use client";
// import ServiceCard from './ServiceCard/ServiceCard'
// import { useLocale } from "next-intl";
// import { useTranslations } from "next-intl";
// import { getServicesObjArr } from "../../../data/servicesData";
// export type serviceObjType = {
//     id: number;
//     title: string;
//     body: string;
//     img: string,
//     discover: string
// };


// export default function Services() {
//     const locale = useLocale();
//     const t = useTranslations("Services");
//     const servicesObjArr = getServicesObjArr(t);


//     return (
//         <>
//             <section
//                 className='flex flex-col items-center justify-center gap-y-1 py-16 px-3 bg-ivory-100' id='services'>

//                 <h1 className='  text-emerald-900 text-2xl md:text-5xl font-black  mb-10'>
//                     <span
//                         className='relative after:absolute after:start-0 after:bottom-0 after:h-0.5 after:w-full  pb-2 after:bg-amber-400'
//                     >
//                         {t("titleLined")}
//                     </span>
//                     {" "}
//                     {t("titleRest")}
//                 </h1>
//                 {/* DESCRIPTION */}
//                 <p
//                     className="text-center md:text-[18px] text-[12px] font-bold  md:p-0 "
//                 >


//                     {t("desc1")}
//                     <br />
//                     {t("desc2")}

//                 </p>

//                 {/* =================== Cards Container ============= */}
//                 {/* <div className='bg-emerald-500 flex flex-col justify-center items-center'> */}
//                 <div className=" flex flex-col items-center justify-center flex-wrap md:flex-row md:justify-start   my-5  md:w-275  md:px-0  gap-6 ">
//                     {servicesObjArr.map((obj) => (
//                         <ServiceCard
//                             key={obj.id}
//                             obj={obj}
//                         // href={`/${locale}/services/${obj.id}`}
//                         />
//                     ))}
//                 </div>
//                 {/* </div> */}
//             </section>
//         </>
//     )
// }


import Image from 'next/image'
import {getLocale, getTranslations} from 'next-intl/server'
import {client} from '@/sanity/lib/client'
import {SERVICES_QUERY} from '@/sanity/lib/queries'
import {urlFor} from '@/sanity/lib/image'
import ServiceCard from './ServiceCard/ServiceCard'

export type serviceObjType = {
  // id: string
  id: number 
  title: string
  body: string
  img: string
  discover: string
}

type SanityService = {
  // _id: string;
  _id: number;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  image?: Parameters<typeof urlFor>[0];
};

export default async function Services() {
  const locale = await getLocale()
  const t = await getTranslations('Services')

  const services = await client.fetch<SanityService[]>(SERVICES_QUERY)

  const servicesObjArr: serviceObjType[] = services.map((service) => ({
    id: service._id,
    title: locale === 'ar' ? service.titleAr : service.titleEn,
    body: locale === 'ar' ? service.descriptionAr : service.descriptionEn,
    img: service.image ? urlFor(service.image).width(700).url() : '/placeholder.jpg',
    discover: t('serviceOne.discover'),
  }))

  return (
    <section
      className="flex flex-col items-center justify-center gap-y-1 py-16 px-3 bg-ivory-100"
      id="services"
    >
      <h1 className="text-emerald-900 text-2xl md:text-5xl font-black mb-10">
        <span className="relative after:absolute after:start-0 after:bottom-0 after:h-0.5 after:w-full pb-2 after:bg-amber-400">
          {t('titleLined')}
        </span>{' '}
        {t('titleRest')}
      </h1>

      <p className="text-center md:text-[18px] text-[12px] font-bold">
        {t('desc1')}
        <br />
        {t('desc2')}
      </p>

      <div className="flex flex-col items-center justify-center flex-wrap md:flex-row md:justify-start my-5 md:w-275 md:px-0 gap-6">
        {servicesObjArr.map((obj) => (
          <ServiceCard key={obj.id} obj={obj} />
        ))}
      </div>
    </section>
  )
}