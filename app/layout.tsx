import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Commercial Cleaning Phoenix AZ | Post-Construction Cleaning Scottsdale | AMC Professionals",
  description: "AMC Professionals: Phoenix's trusted commercial cleaning company. Post-construction cleaning, final clean, medical facilities. $271K+ active pipeline. 90% closing rate. Free quotes. Call 251-477-5676.",
  keywords: "commercial cleaning Phoenix, post-construction cleaning Scottsdale, final construction cleaning Arizona, medical facility cleaning, janitorial services Phoenix, construction cleaning company",
  openGraph: {
    title: "AMC Professionals | Commercial Cleaning Phoenix",
    description: "Post-construction cleaning experts serving Phoenix metro. $271K+ pipeline, 90% closing rate.",
    url: "https://amc-professionals.com",
    siteName: "AMC Professionals",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "AMC Professionals LLC",
              "image": "https://amc-professionals.com/logo.png",
              "description": "Commercial cleaning and post-construction cleaning services in Phoenix, AZ",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Phoenix",
                "addressRegion": "AZ",
                "addressCountry": "US"
              },
              "telephone": "+1-251-477-5676",
              "email": "amcprofessionalscs@gmail.com",
              "url": "https://amc-professionals.com",
              "priceRange": "$$$",
              "areaServed": ["Phoenix", "Scottsdale", "Tempe", "Glendale", "Goodyear"],
              "serviceType": ["Commercial Cleaning", "Post-Construction Cleaning", "Medical Facility Cleaning", "Floor Scrubbing"]
            })
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}