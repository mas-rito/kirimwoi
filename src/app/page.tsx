import type { Metadata } from "next"

import { HeaderComponent } from "@/components/molecules/header"
import { HeroComponent } from "@/components/organisms/heroSection"

export const metadata: Metadata = {
  title: "KirimWoi - Easy to share your files",
  description:
    "KirimWoi makes it easy for you to send and share files with friends through links, providing a fast, simple, and efficient file-sharing experience.",
  icons: "/icons/kirimwoi.svg",
  keywords:
    "file sharing, easy sharing, quick file transfer, link sharing, email sharing, efficient file sharing",
  authors: [{ name: "KirimWoi", url: "https://www.kirimwoi.cloud" }],
  themeColor: "#ffffff",
  openGraph: {
    title: "KirimWoi - Easy to share your files",
    description:
      "KirimWoi makes it easy for you to send and share files with friends through links, providing a fast, simple, and efficient file-sharing experience.",
    url: "https://kirimwoi.cloud",
    siteName: "KirimWoi",
    images: [
      {
        url: "https://kirimwoi.cloud/og.png",
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default function Home() {
  return (
    <main>
      <HeaderComponent />
      <HeroComponent />
    </main>
  )
}
