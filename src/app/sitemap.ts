
import type { MetadataRoute } from "next";

const BASE_URL = "https://dr-mohamed-yasser-swart.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [""];

  return routes.flatMap((route) =>
    ["ar", "en"].map((locale) => ({
      url: `${BASE_URL}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.7,
      alternates: {
        languages: {
          ar: `${BASE_URL}/ar${route}`,
          en: `${BASE_URL}/en${route}`,
        },
      },
    }))
  );
}
