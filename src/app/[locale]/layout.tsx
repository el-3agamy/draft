

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

import { routing } from "@/i18n/routing";
import "../globals.css";
import Navbar from "../_components/HomeComp/Navbar/Navbar";
import Footer from "../_components/Footer/Footer";

const BASE_URL = "https://dr-mohamed-yasser-swart.vercel.app";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const expoArabic = localFont({
  src: [
    {
      path: "../../../public/fonts/ExpoArabic-Light.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/ExpoArabic-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/ExpoArabic-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-expo-arabic",
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === "ar";

  const title = isArabic
    ? "دكتور محمد ياسر | دكتور أسنان"
    : "Dr. Mohamed Yasser | Dentist";

  const description = isArabic
    ? 
    "عيادة الدكتور محمد ياسر لطب الأسنان في مصر، وتقع في محافظة الغربية، وتحديداً في بسيون و طنطا."
    // "تعرف على خدمات دكتور محمد ياسر في طب الأسنان، واكتشف الخدمات المتاحة وتواصل لحجز موعد."
    : 
    "Dr. Mohamed Yasser Dental Clinic in Egypt located in Gharbia governorate specifically in Bassyon & Tanta"
    // "Explore Dr. Mohamed Yasser's dental services, learn about available treatments, and contact the clinic to book an appointment.";

  return {
    metadataBase: new URL(BASE_URL),

    title,
    description,

    icons: {
      icon: "/dr.jpeg",
    },

    alternates: {
      canonical: `/${locale}`,
      languages: {
        ar: "/ar",
        en: "/en",
      },
      
    },

    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${locale}`,
      siteName: isArabic
        ? "دكتور محمد ياسر"
        : "Dr. Mohamed Yasser",
      locale: isArabic ? "ar_EG" : "en_US",
      type: "website",
    },
  
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();
  const direction = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={direction}
      className={`${
        locale === "ar" ? expoArabic.variable : geistSans.variable
      } ${geistMono.variable} h-full antialiased max-w-full overflow-x-hidden`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
