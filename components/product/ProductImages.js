"use client";

import { normalizeImageUrl } from "@/lib";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function ProductImages({ main_image }) {
  const mainImage = [
    {
      original: normalizeImageUrl(main_image),
      originalAlt: "product image",
      thumbnail: normalizeImageUrl(main_image),
      thumbnailAlt: "product image",
      thumbnailHeight: 40,
      thumbnailWidth: 40,
    },
  ];

  return <ImageGallery items={mainImage} />;
}
