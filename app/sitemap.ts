import type { MetadataRoute } from "next";
import { getPublished, signHref } from "@/lib/signs";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const signs = [...getPublished("sentence"), ...getPublished("letter")];
  return [
    { url: `${base}/` },
    { url: `${base}/learn` },
    ...signs.map((sign) => ({ url: `${base}${signHref(sign)}` })),
  ];
}
