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
  title: "Codzienne wyzwanie - Historycznie",
  description: "Codzienne wyzwanie",
};

export default function AuthLayout({ children }) {
  return (
    <html lang='pl'>
      <body className={`${inter.variable} ${nunito.variable}`}>
        <Providers>
          {children}
          <ToastContainer position='top-right' autoClose={3000} />
        </Providers>
      </body>
    </html>
  );
}
