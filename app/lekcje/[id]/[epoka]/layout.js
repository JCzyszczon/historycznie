import { Inter, Nunito } from "next/font/google";
import "../../../globals.css";
import { Providers } from "../../../providers";
import { ToastContainer } from "react-toastify";
import Dashboard from "../../../components/dashboard/dashboard";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata = {
  title: "Epoka - Historycznie",
  description: "Epoka",
};

export default function AuthLayout({ children }) {
  return (
    <html lang='pl'>
      <body className={`${inter.variable} ${nunito.variable}`}>
        <Providers>
          <Dashboard />
          {children}
          <ToastContainer position='top-right' autoClose={3000} />
        </Providers>
      </body>
    </html>
  );
}
