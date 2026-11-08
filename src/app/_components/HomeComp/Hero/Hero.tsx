
import React from "react";
import { useTranslations } from "next-intl";
import { Suspense } from "react"
export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="relative isolate flex min-h-screen items-center
      justify-center overflow-hidden bg-emerald-950 px-6 text-center">

      {/* <Suspense  fallback= {<p>video is loading ....</p>}> */}

      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="absolute inset-0 -z-20 size-full object-cover "
      >
        <source src="/backGroundVideo.mp4" type="video/mp4" />
      </video>

      {/* </Suspense> */}

      {/* Emerald overlay */}
      <div className="absolute inset-0 -z-10 bg-black/60" />

      {/* Hero content */}
      <div className="max-w-4xl text-white">
        <h1 className="text-3xl  font-bold leading-tight md:text-6xl">
          {t("title")}
        </h1>

        <p className="mt-3 text-lg text-gold-300  font-bold md:text-2xl">
          {t("subtitle")}
        </p>
      </div>
    </section>
  );
}
