import React from "react";
import Logo from "../elements/Logo";
import Button from "../elements/Button";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import Link from "next/link";

function Footer() {
  return (
    <>
      <footer className='w-full bg-background flex flex-col justify-center items-center'>
        <section className='w-full max-w-7xl flex justify-between items-center sm:flex-row flex-col sm:gap-4 gap-8 pt-14 py-10 border-b-2 border-borderColor px-4'>
          <section className='w-full flex justify-center sm:items-start items-center flex-1 flex-col gap-4'>
            <Logo />
            <p className='text-descriptionColor sm:text-start text-center font-nunito font-extrabold'>
              Projekt realizowany w ramach pracy inżynierskiej AGH.
            </p>
          </section>
          <section className='w-full max-w-[340px] sm:flex hidden flex-1 flex-col gap-4'>
            <h5 className='text-descriptionColor sm:text-start text-center sm:text-xl text-lg font-nunito font-extrabold'>
              Dołącz teraz i odkryj z nami historię na nowo w{" "}
              <span className='text-primaryColor'>Historycznie</span>.
            </h5>
            <section className='w-full flex justify-center items-center gap-2'>
              <Link href='/auth/rejestracja' className='w-full'>
                <Button variant='primary' className='!py-[10px]'>
                  Dołącz
                </Button>
              </Link>
              <Link href='/auth/logowanie' className='w-full'>
                <Button variant='secondary' className='!py-[10px]'>
                  Mam już konto
                </Button>
              </Link>
            </section>
          </section>
        </section>
        <section className='w-full max-w-7xl flex sm:flex-row flex-col-reverse justify-between items-center sm:gap-4 gap-8 py-6 px-4'>
          <p className='text-base font-extrabold text-descriptionColor font-nunito'>
            &copy; 2025 JCzyszczon
          </p>
          <section className='w-auto flex sm:flex-row flex-col justify-between items-center sm:gap-10 gap-6'>
            <section className='w-full flex justify-center items-center gap-4'>
              <Link
                href='/'
                className='text-nowrap text-base text-descriptionColor hover:text-primaryColor duration-200'
              >
                Użyte materiały
              </Link>
              <Link
                href='/'
                className='text-nowrap text-base text-descriptionColor hover:text-primaryColor duration-200'
              >
                Polityka prywatności
              </Link>
            </section>
            <section className='w-full flex justify-center items-center gap-4'>
              <Link href='/'>
                <FaGithub className='text-2xl text-descriptionColor hover:text-primaryColor duration-200' />
              </Link>
              <Link href='/'>
                <FaLinkedin className='text-2xl text-descriptionColor hover:text-primaryColor duration-200' />
              </Link>
            </section>
          </section>
        </section>
        <section className='w-full h-[7px] bg-primaryColor'></section>
      </footer>
    </>
  );
}

export default Footer;
