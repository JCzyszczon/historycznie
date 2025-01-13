"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "../../components/elements/Button";

export function GameCard({ gameInfo, handleOpenGuessWhoModal }) {
  return (
    <section className='w-full h-full flex flex-col justify-start items-center bg-background2 gap-4 rounded-2xl group'>
      <div className='w-full h-full sm:min-h-[220px] min-h-[180px] flex relative overflow-hidden rounded-t-2xl'>
        <Image
          src={gameInfo.image}
          alt={gameInfo.imageDescription}
          width={420}
          height={220}
          className='w-full h-full sm:min-h-[220px] min-h-[180px] object-cover blur-[1px] group-hover:blur-0 duration-200'
        />
        <div className='w-full h-full absolute left-0 top-0 bg-background opacity-40 group-hover:opacity-20 duration-200'></div>
        <div className='sm:w-[90px] w-[90px] sm:h-[90px] h-[90px] bg-background flex justify-center items-center rounded-full absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2'>
          {gameInfo.icon}
        </div>
      </div>
      <section className='w-full h-full px-2'>
        <section className='w-full h-full flex flex-col justify-start items-center gap-4 p-4 bg-background rounded-2xl'>
          <h2 className='font-nunito text-xl font-extrabold tracking-wide text-center'>
            {gameInfo.title}
          </h2>
          <p className='sm:text-base text-sm text-descriptionColor text-center'>
            {gameInfo.description}
          </p>
        </section>
      </section>
      <section className='w-full flex justify-center items-center px-2 pb-4'>
        {gameInfo.buttonLink ? (
          <Link href={gameInfo.buttonLink} className='w-full'>
            <Button variant='primary'>{gameInfo.buttonText}</Button>
          </Link>
        ) : (
          <Button onClick={handleOpenGuessWhoModal} variant='primary'>
            {gameInfo.buttonText}
          </Button>
        )}
      </section>
    </section>
  );
}

export function ChallengeCard({ gameInfo, handleOpenChallangeModal }) {
  return (
    <section className='w-full h-full flex flex-col justify-start items-center bg-background border border-borderColor gap-7 rounded-2xl group'>
      <section className='w-full h-full px-4 pt-4'>
        <section className='w-full h-full min-h-[204px] flex justify-center items-center bg-background2 rounded-2xl'>
          <Image
            src={gameInfo.image}
            alt={gameInfo.imageDescription}
            width={400}
            height={220}
            quality={100}
            className='w-[190px] h-[190px] object-cover group-hover:scale-105 duration-200'
          />
        </section>
      </section>
      <section className='w-full h-full flex flex-col justify-start text-center items-center gap-4 px-2'>
        <h2 className='font-nunito text-xl font-extrabold tracking-wide text-center'>
          {gameInfo.title}
        </h2>
        <p className='text-descriptionColor'>{gameInfo.description}</p>
      </section>
      <section className='w-full flex justify-center items-center px-2 pb-4'>
        <Button onClick={handleOpenChallangeModal} variant='primary'>
          {gameInfo.buttonText}
        </Button>
      </section>
    </section>
  );
}
