import LoadingSkeleton from '@/components/LoadingSkeleton'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Our Story | Terra & Brews",
  description: "Discover our passion for quality coffee. Learn about our direct trade relationships with coffee farmers and our roasting philosophy.",
  openGraph: {
    title: "Our Story | Terra & Brews",
    description: "Discover our passion for quality coffee and our roasting philosophy.",
    images: ["https://meaningful-harmony-6ce09bfa4a.media.strapiapp.com/background_image_about_us_67a7474965.png"],
  },
};

function Loading() {
  return (
    <LoadingSkeleton />
  )
}

export default Loading