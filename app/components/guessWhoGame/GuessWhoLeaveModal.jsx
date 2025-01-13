"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Button from "../elements/Button";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import MapImage from "../../img/old-map.png";

export default function GuessWhoLeaveModal({ closeModal }) {
  const modalRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  return (
    <section className='w-screen min-h-dvh max-h-[100px] z-[1100] fixed left-0 top-0 right-0 overflow-x-hidden overflow-y-scroll bg-[#11111199]'>
      <section
        onClick={handleOutsideClick}
        className='w-screen min-h-dvh z-[1101] flex flex-col justify-center items-center px-2 py-8'
      >
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, type: "tween" }}
          exit={{ opacity: 0 }}
          ref={modalRef}
          className='w-full max-w-[500px] h-auto flex flex-col gap-4 shadow-lg relative bg-background rounded-2xl pt-6 border border-borderColor overflow-y-hidden'
        >
          <IoMdClose
            title='Close Modal'
            onClick={closeModal}
            className='absolute right-3 top-3 text-3xl text-descriptionColor hover:text-primaryColor duration-200 cursor-pointer'
          />
          <section className='w-full flex justify-center items-center'>
            <Image src={MapImage} alt='Map Image' className='w-[82px] h-auto' />
          </section>
          <section className='w-full h-full flex flex-col justify-start items-center gap-4 px-4'>
            <h2 className='font-nunito text-2xl font-extrabold tracking-wide text-center'>
              Czy napewno chcesz opuścić grę?
            </h2>
            <p className='sm:text-base text-sm font-nunito text-descriptionColor text-center'>
              Po wyjściu twoja gra zostanie zapisana jako porażka.
            </p>
          </section>
          <section className='w-full flex flex-col-reverse gap-2 justify-center items-center px-4 pb-6 pt-4 relative'>
            <Link href='/gry-i-wyzwania' className='w-full'>
              <Button variant='secondary'>Strona główna</Button>
            </Link>
            <Button onClick={closeModal} variant='primary'>
              Zostań
            </Button>
          </section>
        </motion.section>
      </section>
    </section>
  );
}
