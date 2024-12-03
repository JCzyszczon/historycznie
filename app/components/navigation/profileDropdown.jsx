"use client";
import React from "react";
import { motion } from "framer-motion";
import Button from "../elements/Button";
import { signOut } from "next-auth/react";
import { IoCart, IoPerson, IoSettingsSharp } from "react-icons/io5";
import { useUser } from "../../hooks/useUser";
import Link from "next/link";
import Image from "next/image";

function ProfileDropdown({ session, onClose }) {
  const { user, isLoading, isError } = useUser(session.user.id);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className='profile-dropdown px-4 py-6 w-full max-w-[240px] z-[1000] gap-4 font-inter bg-background border border-borderColor absolute right-0 top-12 rounded-2xl drop-shadow-lg flex flex-col justify-start items-center'
    >
      <Link
        onClick={onClose}
        href={`/uzytkownik/${session.user.id}`}
        className='w-full flex gap-4 justify-start items-center px-2 py-2 bg-transparent hover:bg-gray-50 cursor-pointer duration-200 rounded-2xl'
      >
        {isLoading || isError ? (
          <div className='w-[40px] h-[40px] rounded-full bg-gray-300 animate-pulse'></div>
        ) : (
          <Image
            src={user.activeAvatar.imageUrl}
            width={40}
            height={40}
            alt='Profile Avatar'
            className='w-[40px] h-[40px] rounded-full'
          />
        )}
        <div className='flex flex-col justify-center items-start gap-0'>
          {isLoading || isError ? (
            <h3 className='w-[80px] h-[24px] bg-gray-300 animate-pulse rounded-lg'></h3>
          ) : (
            <h3 className='w-full max-w-[100px] overflow-hidden text-nowrap text-ellipsis text-base text-textColor font-[600]'>
              {user.username}
            </h3>
          )}
          {isLoading || isError ? (
            <p className='w-[100px] h-[20px] bg-gray-300 animate-pulse rounded-lg'></p>
          ) : (
            <p className='w-full max-w-[120px] overflow-hidden text-nowrap text-ellipsis text-sm text-descriptionColor font-light'>
              {user.email}
            </p>
          )}
        </div>
      </Link>
      <span className='w-full h-[1px] bg-borderColor rounded-full'></span>
      <ul className='text-base w-full flex flex-col justify-center items-center gap-4 font-[500] px-1'>
        <li className='w-full text-descriptionColor hover:text-textColor duration-200'>
          <Link
            onClick={onClose}
            href={`/uzytkownik/${session.user.id}`}
            className='w-full flex justify-start items-center gap-4'
          >
            <IoPerson className='text-lg' />
            <span>Twoje konto</span>
          </Link>
        </li>
        <li className='w-full text-descriptionColor hover:text-textColor duration-200'>
          <Link
            onClick={onClose}
            href={"/sklep"}
            className='w-full flex justify-start items-center gap-4'
          >
            <IoCart className='text-lg' />
            <span>Sklep z nagrodami</span>
          </Link>
        </li>
        <li className='w-full flex justify-start items-center gap-4 text-descriptionColor hover:text-textColor duration-200 cursor-pointer'>
          <IoSettingsSharp className='text-lg' />
          <span>Ustawienia</span>
        </li>
      </ul>
      <span className='w-full h-[1px] bg-borderColor rounded-full'></span>
      <div className='w-full px-1'>
        <Button onClick={() => signOut()}>Wyloguj się</Button>
      </div>
    </motion.section>
  );
}

export default ProfileDropdown;
