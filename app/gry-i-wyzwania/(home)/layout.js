import { Inter, Nunito } from "next/font/google";
import "../../globals.css";
import { Providers } from "../../providers";
import Navbar from "../../components/navigation/navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata = {
  title: "Gry i wyzwania - Historycznie",
  description:
    "Graj i ucz się historii! Quizy, wyzwania tematyczne i inne atrakcje sprawiają, że nauka historii staje się zabawą. Sprawdź swoje umiejętności!",
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
