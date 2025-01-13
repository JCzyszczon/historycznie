"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Button from "../elements/Button";
import CoinImage from "../../img/5252389.png";
import Link from "next/link";
import DiamondHeartImage from "../../img/diamond-heart.png";

export default function GuessWhoFinishModal({ results, gameData }) {
  console.log(results);
  console.log(gameData);

  return (
    <section className='w-screen min-h-dvh z-[1100] max-h-[100px] fixed left-0 top-0 right-0 overflow-x-hidden overflow-y-scroll bg-[#11111199]'>
      <section className='w-screen min-h-dvh flex justify-center items-center px-2 py-8'>
        <motion.section
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className='w-full max-w-[500px] min-h-[400px] h-auto flex flex-col justify-center items-center gap-6 bg-background rounded-2xl px-4 pt-4 pb-10 border border-borderColor shadow-lg'
        >
          <section className='w-full flex flex-col gap-2 justify-center items-center bg-background2 rounded-2xl p-4'>
            <Image
              src={gameData.character.imageUrl}
              width={400}
              height={400}
              alt='Character Image'
              className='w-auto sm:max-h-[220px] max-h-[180px] h-auto object-contain rounded-lg'
            />
            <h3 className='text-lg font-nunito text-center font-extrabold tracking-wide'>
              {gameData.character.name}
            </h3>
            <p className='text-sm font-nunito text-center text-descriptionColor font-bold'>
              {gameData.character.description}
            </p>
          </section>
          <h2 className='text-2xl font-nunito font-bold text-center sm:px-2 px-0 mt-2 '>
            {results.success
              ? "Gratulacje! Udało ci się odgadnąć postać."
              : "Niestety nie udało ci się odgadnąć postaci. Spróbuj ponownie."}
          </h2>
          <p className='text-descriptionColor text-base text-center'>
            Poniżej znajdziesz podsumowanie gry.
          </p>
          <section className='w-full grid sm:grid-cols-3 grid-cols-2 auto-cols-fr gap-4 bg-background2 rounded-2xl p-4'>
            <section className='w-full flex flex-col justify-center items-center gap-2 rounded-xl bg-background px-2 pt-2 pb-2'>
              <span className='w-full h-[48px] flex justify-center items-end gap-0'>
                <p className='text-base font-extrabold font-nunito'>
                  {results.remainingLives}x
                </p>
                <Image
                  src={DiamondHeartImage}
                  alt='Temple Image'
                  className='w-auto h-[38px]'
                />
              </span>
              <h4 className='font-nunito text-sm font-extrabold tracking-wider text-descriptionColor'>
                Pozostałe życia
              </h4>
            </section>
            <section className='w-full flex flex-col justify-center items-center gap-2 rounded-xl bg-background px-2 pt-2 pb-2'>
              <span className='w-full h-[48px] flex justify-center items-end gap-[2px]'>
                <p className='text-base font-extrabold font-nunito'>
                  +{results.earnedPoints}
                </p>
                <Image
                  src={CoinImage}
                  alt='Coin Image'
                  className='w-auto h-[32px]'
                />
              </span>
              <h4 className='font-nunito text-sm font-extrabold tracking-wider text-descriptionColor'>
                Monety
              </h4>
            </section>
          </section>
          <section className='w-full flex flex-col justify-center items-center gap-2 mt-4'>
            <Button onClick={() => window.location.reload()} variant='primary'>
              Zagraj ponownie
            </Button>
            <Link href='/' className='w-full'>
              <Button variant='secondary'>Strona główna</Button>
            </Link>
          </section>
        </motion.section>
      </section>
    </section>
  );
}
