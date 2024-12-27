"use client";
import Image from "next/image";
import React from "react";
import TempleImage from "../../img/2210_w015_n003_1037b_p15_1037.jpg";
import ThroneImage from "../../img/vecteezy_castle-hall-with-thrones-for-king-and-queen-vector_15486156.jpg";
import TreasureImage from "../../img/—Pngtree—yellow treasure chest decoration illustration_4584777.png";
import { TbUserQuestion } from "react-icons/tb";
import Button from "../../components/elements/Button";
import { IoGameController } from "react-icons/io5";
import Link from "next/link";

export default function Home() {
  const quizGame = {
    title: "Gra quizowa",
    description:
      "Testuj umiejętności, rywalizuj z innymi użytkownikami i zdobywaj trofea!",
    buttonText: "Utwórz lub dołącz",
    buttonLink: "/gry-i-wyzwania/gra-quizowa",
    image: TempleImage,
    imageDescription: "Temple Image",
    icon: (
      <IoGameController className='text-5xl text-textColor group-hover:text-primaryColor duration-200' />
    ),
  };

  const guessGame = {
    title: "Zgadnij kto to",
    description:
      "Odgadnij wylosowaną postać historyczną z jak najmniejszą ilościa podpowiedzi.",
    buttonText: "Graj",
    buttonLink: "/gry-i-wyzwania/zgadnij-kto-to",
    image: ThroneImage,
    imageDescription: "Throne Image",
    icon: (
      <TbUserQuestion className='text-5xl text-textColor group-hover:text-primaryColor duration-200' />
    ),
  };

  const challengeGame = {
    title: "Codzienne wyzwanie",
    description: "Dołącz do wyzwania i zgarnij wyjątkowe nagrody!",
    buttonText: "Dołącz do wyzwania",
    buttonLink: "/gry-i-wyzwania/codzienne-wyzwanie",
    image: TreasureImage,
    imageDescription: "Treasure Image",
  };

  return (
    <section className='w-full flex bg-background2 justify-center items-center min-h-dvh px-2 py-20'>
      <section className='w-full max-w-5xl sm:h-[640px] h-auto sm:min-h-0 min-h-[640px] bg-background rounded-2xl flex flex-col justify-start sm:items-start items-center sm:overflow-y-scroll custom-scrollbar overflow-visible z-[1] sm:px-10 px-2 py-10 gap-10'>
        <h1 className='font-nunito text-2xl font-extrabold tracking-wide text-center'>
          Gry do nauki historii
        </h1>
        <section className='w-full h-full grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:justify-start justify-center items-start gap-4 lg:pb-0 sm:pb-[900px] pb-0'>
          <GameCard gameInfo={quizGame} />
          <GameCard gameInfo={guessGame} />
          <ChallengeCard gameInfo={challengeGame} />
        </section>
      </section>
    </section>
  );
}

export function GameCard({ gameInfo }) {
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
        <Link href={gameInfo.buttonLink} className='w-full'>
          <Button variant='primary'>{gameInfo.buttonText}</Button>
        </Link>
      </section>
    </section>
  );
}

export function ChallengeCard({ gameInfo }) {
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
        <Link href={gameInfo.buttonLink} className='w-full'>
          <Button variant='primary'>{gameInfo.buttonText}</Button>
        </Link>
      </section>
    </section>
  );
}
