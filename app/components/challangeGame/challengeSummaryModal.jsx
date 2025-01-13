"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Button from "../elements/Button";
import CoinImage from "../../img/5252389.png";
import Link from "next/link";
import FireImage from "../../img/fire.png";

export default function ChallengeSummaryModal({ results }) {
  console.log(results);

  const renderReward = (reward) => {
    switch (reward.type) {
      case "avatar":
        return (
          <section
            key={reward.type}
            className='w-full flex flex-col justify-center items-center gap-2 rounded-xl bg-background2 px-2 pt-6 pb-2'
          >
            <Image
              src={reward.avatar.imageUrl}
              alt={reward.avatar.name}
              width={120}
              height={120}
              className='w-[38px] h-[38px]'
            />
            <h4 className='font-nunito text-sm font-extrabold tracking-wider text-descriptionColor'>
              Awatar
            </h4>
          </section>
        );
      case "banner":
        return (
          <section
            key={reward.type}
            className='w-full flex flex-col justify-center items-center gap-2 rounded-xl bg-background2 px-2 pt-6 pb-2'
          >
            <Image
              src={reward.banner.imageUrl}
              alt={reward.banner.name}
              width={120}
              height={120}
              className='w-auto h-[38px] rounded-lg'
            />
            <h4 className='font-nunito text-sm font-extrabold tracking-wider text-descriptionColor'>
              Tło
            </h4>
          </section>
        );
      case "points":
        return (
          <section
            key={reward.type}
            className='w-full flex flex-col justify-center items-center gap-2 rounded-xl bg-background2 px-2 pt-6 pb-2'
          >
            <span className='w-full h-[48px] flex flex-col justify-center items-center gap-1'>
              <Image
                src={CoinImage}
                alt='Coin Image'
                className='w-[24px] h-[24px]'
              />
              <p className='text-sm font-bold'>x100</p>
            </span>
            <h4 className='font-nunito text-sm font-extrabold tracking-wider text-descriptionColor'>
              Monety
            </h4>
          </section>
        );
      default:
        return null;
    }
  };

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
          <section className='w-full flex justify-center items-center relative'>
            <Image
              src={FireImage}
              width={240}
              height={240}
              alt='Fire Image'
              className='sm:w-[100px] w-[84px] sm:h-[100px] h-[84px]'
            />
            <span className='text-3xl font-extrabold font-nunito absolute left-1/2 -translate-x-1/2 top-1/2 bg-background w-[38px] h-[38px] rounded-full flex justify-center items-center'>
              {results.newStreak}
            </span>
          </section>
          <h2 className='text-2xl font-nunito font-bold text-center sm:px-1 px-0 mt-2'>
            {results.message}
          </h2>
          <p className='w-full text-center sm:text-lg text-base text-descriptionColor'>
            {results.success
              ? "Zdobyte nagrody zostały dodane do Twojego konta."
              : "Twoja seria została zresetowana. Spróbuj ponownie."}
          </p>
          <section className='w-full grid sm:grid-cols-3 grid-cols-2 auto-cols-fr gap-4'>
            {results.rewards.map((reward) => renderReward(reward))}
          </section>
          <section className='w-full flex flex-col justify-center items-center gap-4 mt-4'>
            <Link href='/' className='w-full'>
              <Button variant='primary'>Strona główna</Button>
            </Link>
          </section>
        </motion.section>
      </section>
    </section>
  );
}
