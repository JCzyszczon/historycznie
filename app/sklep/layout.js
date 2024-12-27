import { Inter, Nunito } from "next/font/google";
import "../globals.css";
import { Providers } from "../providers";
import Navbar from "../components/navigation/navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata = {
  title: "Sklep z nagrodami - Historycznie",
  description:
    "Wymień punkty na nagrody w naszym sklepie! Odkrywaj historię, zdobywaj punkty za aktywność i wymieniaj je na atrakcyjne nagrody. Sprawdź, co możesz zyskać!",
};

export default function RootLayout({ children }) {
  return (
    <html lang='pl'>
      <head>
        <meta name='apple-mobile-web-app-title' content='Historycznie' />
      </head>
      <body className={`${inter.variable} ${nunito.variable}`}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
