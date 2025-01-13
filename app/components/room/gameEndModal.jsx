"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Button from "../elements/Button";
import DiamondImage from "../../img/diamond.png";
import GemstoneImage from "../../img/gemstone.png";
import CoinImage from "../../img/5252389.png";
import Link from "next/link";
import CorrectImage from "../../img/checked.png";
import IncorrectImage from "../../img/cancel.png";

export default function GameEndModal({ updateRanking, playerId }) {
  const player = updateRanking.find((p) => p.id === playerId);

  if (!player) {
    return <p>Gracz o podanym ID nie istnieje w rankingu.</p>;
  }

  return (
    <section className='w-screen min-h-dvh z-[1100] max-h-[100px] fixed left-0 top-0 right-0 overflow-x-hidden overflow-y-scroll bg-[#11111199]'>
      <section className='w-screen min-h-dvh flex justify-center items-center px-2 py-8'>
        <motion.section
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className='w-full max-w-[500px] min-h-[400px] h-auto flex flex-col justify-center items-center gap-6 bg-background rounded-2xl px-4 py-10 border border-borderColor shadow-lg'
        >
          <Image
            src={DiamondImage}
            width={200}
            height={200}
            alt='Diamond Image'
            className='sm:w-[80px] w-[70px] sm:h-[80px] h-[70px]'
          />
          <h2 className='text-2xl font-nunito font-bold text-center sm:px-1 px-0 mt-2'>
            Gratulujemy zdobycia{" "}
            <span className='text-primaryColor'>
              {player.position === 1
                ? "pierwszego"
                : player.position === 2
                ? "drugiego"
                  ? player.position === 3
                  : "trzeciego"
                : player.position}{" "}
              miejsca{" "}
            </span>{" "}
            w rozgrywce!
          </h2>
          <p className='w-full text-center sm:text-lg text-base text-descriptionColor'>
            Poniżej znajdziesz podsumowanie swojej gry.
          </p>
          <section className='w-full grid grid-cols-2 auto-rows-fr sm:gap-4 gap-2'>
            <section className='w-full flex justify-center items-center gap-2 bg-background2 rounded-xl px-3 py-2'>
              <section className='h-full flex justify-center items-start'>
                <Image
                  src={CoinImage}
                  alt='Coin Image'
                  width={80}
                  height={80}
                  className='sm:w-[30px] w-[28px] h-auto'
                />
              </section>
              <section className='w-full h-full flex flex-col justify-start items-start'>
                <p className='text-base font-bold'>+{player.reward}</p>
                <p className='text-sm font-nunito text-descriptionColor'>
                  Zdobytych monet
                </p>
              </section>
            </section>
            <section className='w-full flex justify-center items-center gap-2 bg-background2 rounded-xl px-3 py-2'>
              <section className='h-full flex justify-center items-start'>
                <Image
                  src={GemstoneImage}
                  alt='Gemstone Image'
                  width={80}
                  height={80}
                  className='sm:w-[30px] w-[28px] h-auto'
                />
              </section>
              <section className='w-full h-full flex flex-col justify-start items-start'>
                <p className='text-base font-bold'>{player.score}</p>
                <p className='text-sm font-nunito text-descriptionColor'>
                  Uzyskanych punktów
                </p>
              </section>
            </section>
            <section className='w-full flex justify-center items-center gap-2 bg-background2 rounded-xl px-3 py-2'>
              <section className='h-full flex justify-center items-start'>
                <Image
                  src={CorrectImage}
                  alt='Correct Image'
                  width={80}
                  height={80}
                  className='sm:w-[30px] w-[28px] h-auto'
                />
              </section>
              <section className='w-full h-full flex flex-col justify-start items-start'>
                <p className='text-base font-bold'>{player.correctAnswers}</p>
                <p className='text-sm font-nunito text-descriptionColor'>
                  Poprawnych odpowiedzi
                </p>
              </section>
            </section>
            <section className='w-full flex justify-center items-center gap-2 bg-background2 rounded-xl px-3 py-2'>
              <section className='h-full flex justify-center items-start'>
                <Image
                  src={IncorrectImage}
                  alt='Incorrect Image'
                  width={80}
                  height={80}
                  className='sm:w-[30px] w-[28px] h-auto'
                />
              </section>
              <section className='w-full h-full flex flex-col justify-start items-start'>
                <p className='text-base font-bold'>{player.incorrectAnswers}</p>
                <p className='text-sm font-nunito text-descriptionColor'>
                  Błędnych odpowiedzi
                </p>
              </section>
            </section>
          </section>
          <section className='w-full flex flex-col justify-center items-center gap-2 mt-4'>
            <Link href='/gry-i-wyzwania/gra-quizowa' className='w-full'>
              <Button variant='primary'>Wyświetl pokoje</Button>
            </Link>
            <Link href='/' className='w-full'>
              <Button variant='secondary'>Strona główna</Button>
            </Link>
          </section>
        </motion.section>
      </section>
    </section>
  );
}
