import { Inter, Nunito } from "next/font/google";
import "../../globals.css";
import { Providers } from "../../providers";
import Navbar from "../../components/navigation/navbar";
import { ToastContainer } from "react-toastify";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata = {
  title: "Lekcje - Historycznie",
  description: "Lekcje - Historycznie",
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
          <ToastContainer position='top-right' autoClose={3000} />
        </Providers>
      </body>
    </html>
  );
}
