"use client";
import React, { useState, useEffect } from "react";
import TempleImage from "../../img/2210_w015_n003_1037b_p15_1037.jpg";
import ThroneImage from "../../img/vecteezy_castle-hall-with-thrones-for-king-and-queen-vector_15486156.jpg";
import TreasureImage from "../../img/—Pngtree—yellow treasure chest decoration illustration_4584777.png";
import { TbUserQuestion } from "react-icons/tb";
import { IoGameController } from "react-icons/io5";
import { GameCard, ChallengeCard } from "../../components/gamePanel/gameCards";
import { AnimatePresence } from "framer-motion";
import ChallengeGameModal from "../../components/challangeGame/challengeGameModal";
import GuessWhoModal from "../../components/guessWhoGame/guessWhoModal";

export default function Home() {
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);
  const [isGuessWhoModalOpen, setIsGuessWhoModalOpen] = useState(false);

  useEffect(() => {
    if (isChallengeModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isChallengeModalOpen]);

  useEffect(() => {
    if (isGuessWhoModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isGuessWhoModalOpen]);

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
      "Odgadnij wylosowaną postać historyczną z jak najmniejszą ilością podpowiedzi.",
    buttonText: "Graj",
    buttonLink: null,
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
    <>
      <section className='w-full flex bg-background2 justify-center items-center min-h-dvh px-2 py-20'>
        <section className='w-full max-w-5xl sm:h-[640px] h-auto sm:min-h-0 min-h-[640px] bg-background rounded-2xl flex flex-col justify-start sm:items-start items-center sm:overflow-y-scroll custom-scrollbar overflow-visible z-[1] sm:px-10 px-2 py-10 gap-10'>
          <h1 className='font-nunito text-2xl font-extrabold tracking-wide text-center'>
            Gry do nauki historii
          </h1>
          <section className='w-full h-full grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:justify-start justify-center items-start gap-4 lg:pb-0 sm:pb-[900px] pb-0'>
            <GameCard gameInfo={quizGame} />
            <GameCard
              gameInfo={guessGame}
              handleOpenGuessWhoModal={() => setIsGuessWhoModalOpen(true)}
            />
            <ChallengeCard
              gameInfo={challengeGame}
              handleOpenChallangeModal={() => setIsChallengeModalOpen(true)}
            />
          </section>
        </section>
      </section>
      <AnimatePresence initial={false} mode='wait' onExitComplete={() => null}>
        {isChallengeModalOpen && (
          <ChallengeGameModal
            closeChallangeGameModal={() => {
              setIsChallengeModalOpen(false);
            }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence initial={false} mode='wait' onExitComplete={() => null}>
        {isGuessWhoModalOpen && (
          <GuessWhoModal
            closeGuessWhoModal={() => {
              setIsGuessWhoModalOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
