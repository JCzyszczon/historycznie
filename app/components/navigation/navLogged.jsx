"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ProfileDropdown from "./profileDropdown";
import Image from "next/image";
import CoinsImage from "../../img/5252389.png";
import UserPoints from "./userPoints";
import { useUser } from "../../hooks/useUser";
import NotificationsIcon from "./notificationsIcon";
import Logo from "../elements/Logo";

function NavLogged({ session }) {
  const { user, isLoading, isError } = useUser(session.user.id);

  const [navState, setNavState] = useState(false);
  const [profileState, setProfileState] = useState(false);
  const profileRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    if (navState) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [navState]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target) &&
        !event.target.closest(".profile-dropdown")
      ) {
        setProfileState(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <section className='w-full max-w-5xl flex justify-between items-center gap-4 relative z-[100]'>
        <section className='sm:w-full w-auto flex justify-start items-center'>
          <Logo />
        </section>
        <nav className='w-full sm:flex hidden justify-end items-center gap-4 lg:text-lg text-base font-bold font-nunito text-borderColor relative'>
          <ul className='w-full sm:flex hidden justify-center flex-nowrap text-nowrap items-center lg:gap-6 gap-4 navbar-menu'>
            <li className={`duration-200 ${pathname === "/" ? "active" : ""}`}>
              <Link href='/'>Strona główna</Link>
            </li>
            <li
              className={`duration-200 ${
                pathname === "/lekcje" ? "active" : ""
              }`}
            >
              <Link href='/lekcje'>Lekcje</Link>
            </li>
            <li
              className={`duration-200 ${
                pathname === "/gry-i-wyzwania" ? "active" : ""
              }`}
            >
              <Link href='/gry-i-wyzwania'>Gry i wyzwania</Link>
            </li>
          </ul>
        </nav>
        <section className='w-full flex justify-end items-center gap-4 text-lg cursor-pointer select-none'>
          <Link href={"/sklep"}>
            <section className='flex justify-center items-center gap-1'>
              <Image
                src={CoinsImage}
                alt='Coins Image'
                className='w-auto sm:h-[26px] h-[22px] aspect-square'
              />
              <UserPoints session={session} />
            </section>
          </Link>
          <NotificationsIcon session={session} />
          <section className='flex justify-center items-center'>
            {isLoading || isError || !user ? (
              <div className='lg:w-[40px] w-[32px] lg:h-[40px] h-[32px] rounded-full bg-gray-300 animate-pulse'></div>
            ) : (
              <Image
                ref={profileRef}
                onClick={() => setProfileState(!profileState)}
                src={user.activeAvatar.imageUrl}
                width={40}
                height={40}
                alt='Profile Avatar'
                className='lg:w-[40px] w-[32px] lg:h-[40px] h-[32px] rounded-full'
              />
            )}
          </section>
          <button
            onClick={() => setNavState(!navState)}
            className='sm:hidden flex h-full py-3'
            title={navState ? "Close Menu" : "Open Menu"}
          >
            <span className='flex flex-col gap-[6px] justify-between items-center'>
              <div
                className={`w-[16px] h-[1px] bg-textColor duration-200 ${
                  navState
                    ? "rotate-45 translate-y-[3.5px]"
                    : "rotate-0 translate-y-0"
                }`}
              ></div>
              <div
                className={`w-[16px] h-[1px] bg-textColor duration-200 ${
                  navState
                    ? "-rotate-45 -translate-y-[3.5px]"
                    : "rotate-0 translate-y-0"
                }`}
              ></div>
            </span>
          </button>
        </section>
        <AnimatePresence>
          {profileState && (
            <ProfileDropdown
              session={session}
              onClose={() => setProfileState(false)}
            />
          )}
        </AnimatePresence>
      </section>
      <AnimatePresence>
        {navState && (
          <motion.section
            initial={{ height: 0 }}
            animate={{ height: "100dvh" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
            className='w-full sm:hidden flex flex-col bg-background justify-center items-center gap-4 overflow-auto pb-10'
          >
            <ul className='w-full flex flex-col justify-center items-center gap-10 navbar-menu text-xl font-bold font-nunito text-borderColor'>
              <li
                className={`duration-200 ${pathname === "/" ? "active" : ""}`}
              >
                <Link onClick={() => setNavState(false)} href='/'>
                  Strona główna
                </Link>
              </li>
              <li
                className={`duration-200 ${
                  pathname === "/lekcje" ? "active" : ""
                } hover:text-descriptionColor duration-200`}
              >
                <Link onClick={() => setNavState(false)} href='/lekcje'>
                  Lekcje
                </Link>
              </li>
              <li
                className={`duration-200 ${
                  pathname === "/gry-i-wyzwania" ? "active" : ""
                } hover:text-descriptionColor duration-200`}
              >
                <Link onClick={() => setNavState(false)} href='/gry-i-wyzwania'>
                  Gry i wyzwania
                </Link>
              </li>
            </ul>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}

export default NavLogged;
