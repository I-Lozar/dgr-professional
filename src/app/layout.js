import Footer from "./components/Footer/Footer";
import "./styles/globals.css";
import HeaderWrapper from "@/app/components/Header/HeaderWrapper";

export const metadata = {
  title: "DGR Spark",
  description: "Gama Spark de DGR Professional",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <HeaderWrapper>
          {children}
        </HeaderWrapper>
      <Footer />
    </body>
    </html>
  );
}
