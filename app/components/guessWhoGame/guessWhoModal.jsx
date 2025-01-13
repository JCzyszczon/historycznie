"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Button from "../elements/Button";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import QuestionImage from "../../img/question.png";
import DiamondHeartImage from "../../img/diamond-heart.png";
import InfiniteImage from "../../img/infinite-mathematical-symbol.png";
import SurpriseBoxImage from "../../img/surprise-box.png";
import PyramidsImage from "../../img/pyramids.png";
import MusketeerImage from "../../img/musketeer.png";
import TankImage from "../../img/tank.png";
import KingImage from "../../img/king.png";
import { useRouter } from "next/navigation";

export default function GuessWhoModal({ closeGuessWhoModal }) {
  const modalRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeGuessWhoModal();
    }
  };

  const router = useRouter();

  const [gameCategory, setGameCategory] = useState("Losowe");

  const categories = [
    "Losowe",
    "Starożytność",
    "Średniowiecze",
    "Nowożytność",
    "Współczesność",
  ];

  const handleChange = (e) => {
    const { value } = e.target;
    setGameCategory(value);
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
          className='w-full max-w-[500px] sm:h-[680px] h-auto flex flex-col gap-4 shadow-lg relative bg-background rounded-2xl pt-16 border border-borderColor overflow-y-hidden'
        >
          <IoMdClose
            title='Close Modal'
            onClick={closeGuessWhoModal}
            className='absolute right-3 top-3 text-3xl text-descriptionColor hover:text-primaryColor duration-200 cursor-pointer'
          />
          <section className='w-full flex justify-center items-center'>
            <Image
              src={QuestionImage}
              alt='Question Image'
              className='w-[100px] h-auto'
            />
          </section>
          <section className='w-full h-full flex flex-col justify-start items-center gap-4 px-4'>
            <h2 className='font-nunito text-2xl font-extrabold tracking-wide text-center'>
              Zgadnij kto to
            </h2>
            <p className='sm:text-base text-sm font-nunito text-descriptionColor text-center'>
              Odgadnij wylosowaną postać historyczną z jak najmniejszą ilością
              podpowiedzi.
            </p>
            <section className='w-full rounded-2xl bg-background2 p-4 flex flex-col justify-start items-start gap-4'>
              <h3 className='text-base font-nunito font-extrabold tracking-wide'>
                Ustawienia gry:
              </h3>
              <section className='w-full flex flex-col justify-start items-start gap-4'>
                <div className='w-full'>
                  <section className='flex justify-between items-center'>
                    <label
                      htmlFor={"category"}
                      className='block mb-2 text-sm font-extrabold font-nunito text-gray-900'
                    >
                      Kategoria
                    </label>
                  </section>
                  <select
                    name='category'
                    value={gameCategory}
                    onChange={handleChange}
                    className='appearance-none focus:outline-none focus:ring-0 rounded-lg bg-gray-50 border text-gray-900 focus:ring-primaryColor focus:border-primaryColor block min-w-0 w-full text-sm border-borderColor p-2.5 autofill:bg-green-100'
                  >
                    {categories.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <section className='w-full grid grid-cols-3 gap-4 auto-cols-fr'>
                  <section className='w-full flex flex-col justify-center items-center gap-2 rounded-xl bg-background px-2 pt-2 pb-2'>
                    <span className='w-full h-[48px] flex justify-center items-end gap-0'>
                      <Image
                        src={
                          gameCategory === "Losowe"
                            ? SurpriseBoxImage
                            : gameCategory === "Starożytność"
                            ? PyramidsImage
                            : gameCategory === "Średniowiecze"
                            ? KingImage
                            : gameCategory === "Nowożytność"
                            ? MusketeerImage
                            : gameCategory === "Współczesność"
                            ? TankImage
                            : KingImage
                        }
                        alt='Category Image'
                        className='w-auto h-[38px]'
                      />
                    </span>
                    <h4 className='font-nunito text-sm font-extrabold tracking-wider text-descriptionColor'>
                      Kategoria
                    </h4>
                  </section>
                  <section className='w-full flex flex-col justify-center items-center gap-2 rounded-xl bg-background px-2 pt-2 pb-2'>
                    <span className='w-full h-[48px] flex justify-center items-end gap-0'>
                      <p className='text-base font-extrabold font-nunito'>5x</p>
                      <Image
                        src={DiamondHeartImage}
                        alt='Temple Image'
                        className='w-auto h-[38px]'
                      />
                    </span>
                    <h4 className='font-nunito text-sm font-extrabold tracking-wider text-descriptionColor'>
                      Liczba żyć
                    </h4>
                  </section>
                  <section className='w-full flex flex-col justify-center items-center gap-2 rounded-xl bg-background px-2 pt-2 pb-2'>
                    <span className='w-full h-[48px] flex justify-center items-end gap-0'>
                      <Image
                        src={InfiniteImage}
                        alt='Inifnite Image'
                        className='w-auto h-[38px]'
                      />
                    </span>
                    <h4 className='font-nunito text-sm font-extrabold tracking-wider text-descriptionColor'>
                      Czas
                    </h4>
                  </section>
                </section>
              </section>
            </section>
          </section>
          <section className='w-full flex justify-center items-center px-4 pb-6 relative'>
            <Button
              onClick={() =>
                router.push(
                  `/gry-i-wyzwania/zgadnij-kto-to?category=${gameCategory}`
                )
              }
              variant='primary'
            >
              Rozpocznij
            </Button>
          </section>
        </motion.section>
      </section>
    </section>
  );
}
