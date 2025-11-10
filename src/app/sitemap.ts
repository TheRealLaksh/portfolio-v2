import { MetadataRoute } from "next";

const siteUrl = "https://v2.lakshp.live/"; // CHANGED

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}