import { Inter, Nunito } from "next/font/google";
import "../globals.css";
import { Providers } from "../providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata = {
  title: "Logowanie - Create Next App",
  description: "Strona logowania",
};

export default function AuthLayout({ children }) {
  return (
    <html lang='pl'>
      <body className={`${inter.variable} ${nunito.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
