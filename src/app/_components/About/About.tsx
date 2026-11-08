import Image from 'next/image';
// import { useTranslations } from 'next-intl';
import { getLocale, getTranslations } from 'next-intl/server';
import { client } from '@/sanity/lib/client';
import { ABOUT_QUERY } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import { sanityFetch } from '@/sanity/lib/live';

export default async function About() {

 type AboutContent = {
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  image?: Parameters<typeof urlFor>[0];
};
  // const t = useTranslations("About");
  const t = await getTranslations("About");
  const locale = await getLocale(); // i add it for sanity 

  // const about = await client.fetch(ABOUT_QUERY);
  const { data } = await sanityFetch({
  query: ABOUT_QUERY,
});

  // const aboutContent = about as AboutContent | null;
  const about = data as AboutContent | null;

  const title = locale === 'ar'
    ? about?.titleAr
    : about?.titleEn;

  const description = locale === 'ar'
    ? about?.descriptionAr
    : about?.descriptionEn;


  return (
    <>
      <article id='about' className='relative w-full px-6 py-16 md:p-11 flex flex-col-reverse justify-center items-center md:justify-around md:items-center md:flex-row gap-10 bg-ivory-100'>

        {/* Bio Text */}
        <div className='flex-2 text-emerald-950 font-bold p-4'>
          <h1 className=' mb-11
          font-bold
          text-xl
          md:text-3xl
          text-emerald-900'>
            {t("titleRest")}

            <span className="
                        font-black
                        relative
                        pb-2
                        after:absolute
                        after:bottom-0
                        after:start-0
                        after:h-[2px]
                        after:w-full
                        after:bg-amber-400  "

            >

              {title}

            </span>
          </h1>
          <p className='text-[18px] md:text-xl '>
            {description}
          </p>
        </div>


        <div className='md:flex-1 relative w-full h-72 md:h-96 bg-red-300 rounded-xl overflow-hidden'>
          <Image
            // src="/dr.jpeg"
            src={about?.image ? urlFor(about.image).width(900).url() : '/dr.jpeg'}
            fill
            alt="Dr. Mohamed Yasser"
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

      </article>
    </>
  );
}