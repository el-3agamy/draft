


import Image from 'next/image'
import {getLocale, getTranslations} from 'next-intl/server'
import {client} from '@/sanity/lib/client'
import {SERVICES_QUERY} from '@/sanity/lib/queries'
import {urlFor} from '@/sanity/lib/image'
import ServiceCard from './ServiceCard/ServiceCard'
import { sanityFetch } from '@/sanity/lib/live'

export type serviceObjType = {
  id: string
  // id: number 
  title: string
  body: string
  img: string
  discover: string
}

type SanityService = {
  _id: string;
  // _id: number;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  image?: Parameters<typeof urlFor>[0];
};

export default async function Services() {
  const locale = await getLocale()
  const t = await getTranslations('Services')

  // const services = await client.fetch<SanityService[]>(SERVICES_QUERY)
  const {data} = await sanityFetch({ query :  SERVICES_QUERY}) ;
  const services = (data ?? []) as SanityService[];
 
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