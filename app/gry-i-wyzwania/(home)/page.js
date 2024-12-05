"use client";
import Image from "next/image";
import React, { useState } from "react";
import TempleImage from "../../img/2210_w015_n003_1037b_p15_1037.jpg";
import ThroneImage from "../../img/vecteezy_castle-hall-with-thrones-for-king-and-queen-vector_15486156.jpg";
import TreasureImage from "../../img/—Pngtree—yellow treasure chest decoration illustration_4584777.png";
import { TbUserQuestion } from "react-icons/tb";
import Button from "../../components/elements/Button";
import { IoGameController } from "react-icons/io5";
import Link from "next/link";

export default function Home() {
  return (
    <section className='w-full flex bg-background2 justify-center items-center min-h-dvh px-2 py-20'>
      <section className='w-full max-w-5xl sm:h-[640px] h-auto sm:min-h-0 min-h-[640px] bg-background rounded-2xl flex flex-col justify-start sm:items-start items-center sm:overflow-hidden overflow-visible z-[1] sm:px-10 px-2 py-10 gap-10'>
        <h1 className='font-nunito text-2xl font-extrabold tracking-wide text-center'>
          Gry do nauki historii
        </h1>
        <section className='w-full h-full flex lg:flex-nowrap flex-wrap justify-start items-start gap-4'>
          <section className='w-full h-full flex flex-col justify-start items-center bg-background2 gap-4 rounded-2xl overflow-hidden group'>
            <div className='w-full h-full min-h-[220px] flex relative'>
              <Image
                src={TempleImage}
                alt='Temple Image'
                width={420}
                height={220}
                className='w-full h-full min-h-[220px] object-cover blur-[1px] group-hover:blur-0 duration-200'
              />
              <div className='w-full h-full absolute left-0 top-0 bg-background opacity-40 group-hover:opacity-20 duration-200'></div>
              <div className='w-[90px] h-[90px] bg-background flex justify-center items-center rounded-full absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2'>
                <IoGameController className='text-5xl text-textColor group-hover:text-primaryColor duration-200' />
              </div>
            </div>
            <section className='w-full h-full px-2'>
              <section className='w-full h-full flex flex-col justify-start items-center gap-4 p-4 bg-background rounded-2xl'>
                <h2 className='font-nunito text-2xl font-extrabold tracking-wide text-center'>
                  Gra quizowa
                </h2>
                <p className='text-base text-descriptionColor text-center'>
                  Testuj umiejętności, rywalizuj z innymi użytkownikami i
                  zdobywaj trofea!
                </p>
              </section>
            </section>
            <section className='w-full flex justify-center items-center px-2 pb-4'>
              <Link href='/gry-i-wyzwania/gra-quizowa' className='w-full'>
                <Button variant='primary'>Utwórz lub dołącz</Button>
              </Link>
            </section>
          </section>
          <section className='w-full h-full flex flex-col justify-start items-center bg-background2 gap-4 rounded-2xl overflow-hidden group'>
            <div className='w-full h-full min-h-[220px] flex relative'>
              <Image
                src={ThroneImage}
                alt='Temple Image'
                width={420}
                height={220}
                className='w-full h-full min-h-[220px] object-cover blur-[1px] group-hover:blur-0 duration-200'
              />
              <div className='w-full h-full absolute left-0 top-0 bg-background opacity-40 group-hover:opacity-20 duration-200'></div>
              <div className='w-[90px] h-[90px] bg-background flex justify-center items-center rounded-full absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2'>
                <TbUserQuestion className='text-5xl text-textColor group-hover:text-primaryColor duration-200' />
              </div>
            </div>
            <section className='w-full h-full px-2'>
              <section className='w-full h-full flex flex-col justify-start items-center gap-4 p-4 bg-background rounded-2xl'>
                <h2 className='font-nunito text-2xl font-extrabold tracking-wide text-center'>
                  Zgadnij kto to
                </h2>
                <p className='text-base text-descriptionColor text-center'>
                  Odgadnij wylosowaną postać historyczną z jak najmniejszą
                  ilościa podpowiedzi.
                </p>
              </section>
            </section>
            <section className='w-full flex justify-center items-center px-2 pb-4'>
              <Button variant='primary'>Graj</Button>
            </section>
          </section>
          <section className='w-full h-full flex flex-col justify-start items-center bg-background border border-borderColor gap-7 overflow-hidden rounded-2xl'>
            <section className='w-full h-full px-4 pt-4'>
              <section className='w-full h-full min-h-[204px] flex justify-center items-center bg-background2 rounded-2xl'>
                <Image
                  src={TreasureImage}
                  alt='Treasure Image'
                  width={400}
                  height={220}
                  quality={100}
                  className='w-[190px] h-[190px] object-cover'
                />
              </section>
            </section>
            <section className='w-full h-full flex flex-col justify-start text-center items-center gap-4 px-2'>
              <h2 className='font-nunito text-2xl font-extrabold tracking-wide text-center'>
                Codzienne wyzwanie
              </h2>
              <p className='text-descriptionColor'>
                Dołącz do wyzwania i zgarnij wyjątkowe nagrody!
              </p>
            </section>
            <section className='w-full flex justify-center items-center px-2 pb-4'>
              <Button variant='primary'>Dołącz do wyzwania</Button>
            </section>
          </section>
        </section>
      </section>
    </section>
  );
}
