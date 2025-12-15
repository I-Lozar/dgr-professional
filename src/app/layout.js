import Footer from "./components/Footer/Footer";
import "./styles/globals.css";
import HeaderWrapper from "@/app/components/Header/HeaderWrapper";

import { Roboto, Roboto_Condensed } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
  variable: "--font-roboto",
});

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
  variable: "--font-roboto-condensed",
});

export const metadata = {
  title: "DGR Spark",
  description: "Gama Spark de DGR Professional",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${roboto.variable} ${robotoCondensed.variable}`}>
      <body>
        <HeaderWrapper>{children}</HeaderWrapper>
        <Footer />
      </body>
    </html>
  );
}
