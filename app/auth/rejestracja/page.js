import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../utils/authOptions";
import RegistrationPanel from "../../components/registration/registrationPanel";
import { IoClose } from "react-icons/io5";
import { redirect } from "next/navigation";
import Link from "next/link";

export const metadata = {
  title: "Rejestracja - Historycznie",
  description:
    "Zarejestruj się już teraz, aby odkryć wszystkie atrakcje na stronie!",
};

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <section className='w-full min-h-dvh flex justify-center items-center relative bg-background2 px-2 py-20'>
      <Link href='/'>
        <IoClose className='text-3xl absolute left-5 top-5 hover:text-primaryColor duration-200' />
      </Link>
      <RegistrationPanel />
    </section>
  );
}
