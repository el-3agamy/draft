import React from 'react';
import BranchCard from "./Branch/Branch";
import { useTranslations } from 'next-intl';


export default function Locations() {
  const t = useTranslations("Locations");
  const branches = [
    {
      name: t("firstLocation.addressTitle"),
      address: t("firstLocation.address"),
      phone: "01100054391",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3423.037291165365!2d30.84401317558756!3d30.91358177449762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzDCsDU0JzQ4LjkiTiAzMMKwNTAnNDcuNyJF!5e0!3m2!1sen!2sus!4v1792490115503!5m2!1sen!2sus"
    },
    {
      name: t("secondLocation.addressTitle"),
      address: t("secondLocation.address"),
      phone: "01100054391",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3426.6736837216413!2d30.978483975583618!3d30.811784074546253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzDCsDQ4JzQyLjQiTiAzMMKwNTgnNTEuOCJF!5e0!3m2!1sen!2sus!4v1792490749346!5m2!1sen!2sus"
    },
    {
      name: t("secondLocation.addressTitle"),
      address: t("secondLocation.address"),
      phone: "01100054391",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3426.6736837216413!2d30.978483975583618!3d30.811784074546253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzDCsDQ4JzQyLjQiTiAzMMKwNTgnNTEuOCJF!5e0!3m2!1sen!2sus!4v1792490749346!5m2!1sen!2sus"
    },
    // {
    //   name: t("thirdLocation.addressTitle"),
    //   address: t("thirdLocation.address"),
    //   phone: "01099999999",
    //   mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9286.966800188598!2d4.4922501744043295!3d51.928248615596914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c434a8df07bd51%3A0x24c15d2139f4bfd!2sa%26o%20Hostel%20Rotterdam%20City!5e1!3m2!1sar!2snl!4v1791808663317!5m2!1sar!2snl" ,
    // },
    // {
    //    name: t("fourthLocation.addressTitle"),
    //   address: t("fourthLocation.address"),
    //   phone: "01099999999",
    //   mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9286.966800188598!2d4.4922501744043295!3d51.928248615596914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c434a8df07bd51%3A0x24c15d2139f4bfd!2sa%26o%20Hostel%20Rotterdam%20City!5e1!3m2!1sar!2snl!4v1791808663317!5m2!1sar!2snl" ,
    // },
    // {
    //   name: t("fivthLocation.addressTitle"),
    //   address: t("fivthLocation.address"),
    //   phone: "01099999999",
    //   mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9286.966800188598!2d4.4922501744043295!3d51.928248615596914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c434a8df07bd51%3A0x24c15d2139f4bfd!2sa%26o%20Hostel%20Rotterdam%20City!5e1!3m2!1sar!2snl!4v1791808663317!5m2!1sar!2snl" ,
    // },
  ];
  return (
    <section className="flex flex-col items-center justify-center mx-auto max-w-7xl px-4 py-16 " id='locations' >
      <h1
        className="
        mb-20
          relative
          font-black
          text-2xl
          md:text-5xl
          text-emerald-900
          pb-2
          after:absolute
          after:bottom-0
          after:start-0
          after:h-0.5
          after:w-full
          after:bg-amber-400
        "
      >
        {t("title")}
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {branches.map((branch, ind) => (
          <BranchCard key={ind} {...branch} />
        ))}
      </div>
    </section>
  );
}
