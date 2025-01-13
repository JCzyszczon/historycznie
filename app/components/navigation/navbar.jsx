import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../utils/authOptions";
import NavLogged from "./navLogged";
import NavUnlogged from "./navUnlogged";
import NavbarBackgroundHandler from "./navbarBackgroundHandler";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <header className='fixed w-full left-0 top-0 z-[100] sm:bg-transparent bg-background duration-200 lg:px-10 px-6 sm:py-8 py-4 flex flex-col justify-center items-center'>
      <NavbarBackgroundHandler />
      {session ? <NavLogged session={session} /> : <NavUnlogged />}
    </header>
  );
}
