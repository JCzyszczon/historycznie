import React from "react";
import Image from "next/image";
import Battle from "../../img/battle-2.png";
import Link from "next/link";

function Logo() {
  return (
    <Link
      href={"/"}
      className='flex justify-start items-center sm:gap-2 gap-[2px] select-none'
    >
      <Image
        src={Battle}
        alt='Swords Icon'
        width={100}
        height={100}
        className='lg:w-[28px] w-[24px] lg:h-[28px] h-[24px]'
      />
      <h2 className='lg:text-xl text-base font-extrabold font-nunito tracking-wide text-primaryColor duration-200 sm:flex hidden'>
        Historycznie
      </h2>
      <h2 className='text-xl font-extrabold font-nunito tracking-wide text-primaryColor duration-200 sm:hidden flex'>
        H
      </h2>
    </Link>
  );
}

export default Logo;
