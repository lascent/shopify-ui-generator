import type React from "react";
import type { Metadata } from "next";
import Script from "next/script";
import {
  Archivo,
  Bebas_Neue,
  Bricolage_Grotesque,
  Cabin,
  Cormorant_Garamond,
  Crimson_Pro,
  DM_Sans,
  Exo_2,
  Figtree,
  Geist,
  IBM_Plex_Sans,
  Inter,
  Josefin_Sans,
  Karla,
  Libre_Baskerville,
  Lora,
  Manrope,
  Merriweather,
  Mulish,
  Noto_Sans,
  Noto_Serif,
  Montserrat,
  Nunito_Sans,
  Outfit,
  Playfair_Display,
  PT_Sans,
  Plus_Jakarta_Sans,
  Poppins,
  Quicksand,
  Raleway,
  Roboto,
  Rubik,
  Sora,
  Source_Sans_3,
  Space_Grotesk,
  Urbanist,
  Work_Sans,
} from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-poppins" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-plus-jakarta" });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const ibmPlexSans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-ibm-plex-sans" });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-roboto" });
const sourceSans3 = Source_Sans_3({ subsets: ["latin"], variable: "--font-source-sans-3" });
const nunitoSans = Nunito_Sans({ subsets: ["latin"], variable: "--font-nunito-sans" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const urbanist = Urbanist({ subsets: ["latin"], variable: "--font-urbanist" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree" });
const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const workSans = Work_Sans({ subsets: ["latin"], variable: "--font-work-sans" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });
const playfairDisplay = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair-display" });
const libreBaskerville = Libre_Baskerville({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-libre-baskerville" });
const cormorantGaramond = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-cormorant-garamond" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });
const bricolageGrotesque = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage-grotesque" });
const rubik = Rubik({ subsets: ["latin"], variable: "--font-rubik" });
const raleway = Raleway({ subsets: ["latin"], variable: "--font-raleway" });
const karla = Karla({ subsets: ["latin"], variable: "--font-karla" });
const mulish = Mulish({ subsets: ["latin"], variable: "--font-mulish" });
const notoSans = Noto_Sans({ subsets: ["latin"], variable: "--font-noto-sans" });
const notoSerif = Noto_Serif({ subsets: ["latin"], variable: "--font-noto-serif" });
const ptSans = PT_Sans({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-pt-sans" });
const merriweather = Merriweather({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-merriweather" });
const crimsonPro = Crimson_Pro({ subsets: ["latin"], variable: "--font-crimson-pro" });
const josefinSans = Josefin_Sans({ subsets: ["latin"], variable: "--font-josefin-sans" });
const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: "400", variable: "--font-bebas-neue" });
const cabin = Cabin({ subsets: ["latin"], variable: "--font-cabin" });
const quicksand = Quicksand({ subsets: ["latin"], variable: "--font-quicksand" });
const exo2 = Exo_2({ subsets: ["latin"], variable: "--font-exo-2" });

export const metadata: Metadata = {
  title: "Shopify UI Generator",
  description: "Open-source generative Shopify-style storefront UI designer with adaptive composition, typography, commerce interactions, media and motion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={[
          inter.variable,
          manrope.variable,
          poppins.variable,
          dmSans.variable,
          plusJakarta.variable,
          geist.variable,
          ibmPlexSans.variable,
          roboto.variable,
          sourceSans3.variable,
          nunitoSans.variable,
          outfit.variable,
          urbanist.variable,
          sora.variable,
          figtree.variable,
          archivo.variable,
          spaceGrotesk.variable,
          workSans.variable,
          montserrat.variable,
          playfairDisplay.variable,
          libreBaskerville.variable,
          cormorantGaramond.variable,
          lora.variable,
          bricolageGrotesque.variable,
          rubik.variable,
          raleway.variable,
          karla.variable,
          mulish.variable,
          notoSans.variable,
          notoSerif.variable,
          ptSans.variable,
          merriweather.variable,
          crimsonPro.variable,
          josefinSans.variable,
          bebasNeue.variable,
          cabin.variable,
          quicksand.variable,
          exo2.variable,
          "font-sans antialiased",
        ].join(" ")}
      >
        {process.env.NODE_ENV === "development" ? (
          <Script id="sanitize-extension-hydration-attrs" strategy="beforeInteractive">
            {`(() => {
              const attrs = ["bis_skin_checked", "cz-shortcut-listen", "data-new-gr-c-s-check-loaded", "data-gr-ext-installed"];
              const clean = (root = document) => {
                for (const attr of attrs) {
                  root.querySelectorAll?.("[" + attr + "]").forEach((node) => node.removeAttribute(attr));
                  if (root.documentElement?.hasAttribute?.(attr)) root.documentElement.removeAttribute(attr);
                  if (root.body?.hasAttribute?.(attr)) root.body.removeAttribute(attr);
                }
              };
              clean();
              const observer = new MutationObserver((records) => {
                for (const record of records) {
                  if (record.type === "attributes" && attrs.includes(record.attributeName || "")) {
                    record.target.removeAttribute(record.attributeName);
                  }
                }
              });
              observer.observe(document.documentElement, { subtree: true, attributes: true, attributeFilter: attrs });
              window.setTimeout(() => observer.disconnect(), 4000);
            })();`}
          </Script>
        ) : null}
        {children}
      </body>
    </html>
  );
}
