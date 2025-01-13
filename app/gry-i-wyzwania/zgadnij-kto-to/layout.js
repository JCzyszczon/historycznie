import { Suspense } from "react";
import { Inter, Nunito } from "next/font/google";
import "../../globals.css";
import { Providers } from "../../providers";
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
  title: "Zgadnij kto to - Historycznie",
  description: "Zgadnij kto to",
};

export default function AuthLayout({ children }) {
  return (
    <html lang='pl'>
      <body className={`${inter.variable} ${nunito.variable}`}>
        <Providers>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          <ToastContainer position='top-right' autoClose={3000} />
        </Providers>
      </body>
    </html>
  );
}
