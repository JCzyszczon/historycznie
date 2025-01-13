"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "../elements/Button";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import TreasureImage from "../../img/18956256.jpg";
import CoinImage from "../../img/5252389.png";
import HelmetImage from "../../img/helmet.png";
import TempleImage from "../../img/2210_w015_n003_1037b_p15_1037.jpg";
import { useDailyChallengeStatus } from "../../hooks/useDailyChallengeStatus";
import { useSession } from "next-auth/react";
import LoadingElement from "../elements/loadingElement";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa6";

export default function ChallengeGameModal({ closeChallangeGameModal }) {
  const { data: session } = useSession();
  const router = useRouter();
  const userId = session?.user?.id;
  const modalRef = useRef(null);
  const {
    streak,
    challengeUnlocked,
    nextAvailableChallenge,
    isLoading,
    isError,
  } = useDailyChallengeStatus(userId);
  const [timeLeft, setTimeLeft] = useState(null);

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeChallangeGameModal();
    }
  };

  useEffect(() => {
    if (nextAvailableChallenge) {
      const interval = setInterval(() => {
        const now = new Date();
        const timeDiff = new Date(nextAvailableChallenge) - now;

        if (timeDiff <= 0) {
          setTimeLeft(null);
          clearInterval(interval);
        } else {
          const hours = Math.floor(timeDiff / (1000 * 60 * 60));
          const minutes = Math.floor(
            (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
          setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [nextAvailableChallenge]);

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
            onClick={closeChallangeGameModal}
            className='absolute right-3 top-3 text-3xl text-descriptionColor hover:text-primaryColor duration-200 cursor-pointer'
          />
          {!isLoading && !isError ? (
            <span className='absolute top-5 left-1/2 -translate-x-1/2 bg-primaryColor flex justify-center items-center rounded-2xl sm:px-8 px-6 sm:py-2 py-[6px] text-background text-sm font-bold'>
              Dzień {streak} - {streak + 1}
            </span>
          ) : (
            <span className='sm:w-[112px] w-[96px] sm:h-[36px] h-[32px] absolute top-5 left-1/2 -translate-x-1/2 bg-gray-300 rounded-2xl animate-pulse'></span>
          )}
          <section className='w-full flex justify-center items-center'>
            <Image
              src={TreasureImage}
              alt='Treasure Image'
              className='w-[420px] h-auto'
              quality={100}
            />
          </section>
          <section className='w-full h-full flex flex-col justify-start items-center gap-4 px-4'>
            <h2 className='font-nunito text-2xl font-extrabold tracking-wide text-center'>
              Codzienne wyzwanie
            </h2>
            <p className='sm:text-base text-sm font-nunito text-descriptionColor text-center'>
              Odpowiedz poprawnie na conajmniej 3 z 5 pytań w ciągu 30 sekund i
              odblokuj wyjątkowe nagrody!
            </p>
            <section className='w-full rounded-2xl bg-background2 p-4 flex flex-col justify-start items-start gap-6'>
              <h3 className='text-base font-nunito font-extrabold tracking-wide'>
                Nagrody:
              </h3>
              <section className='w-full grid sm:grid-cols-3 grid-cols-2 auto-cols-fr gap-4'>
                <section
                  className={`${
                    !isLoading &&
                    !isError &&
                    streak >= 0 &&
                    "border border-primaryColor"
                  } w-full flex flex-col justify-center items-center gap-2 rounded-xl bg-background px-2 pt-6 pb-2 relative`}
                >
                  <span className='w-full max-w-[80px] text-center justify-center items-center absolute left-1/2 -translate-x-1/2 -top-3 bg-primaryColor text-background text-xs px-2 py-1 rounded-2xl'>
                    Codziennie
                  </span>
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
                <section
                  className={`${
                    !isLoading &&
                    !isError &&
                    (streak + 1) % 5 === 0 &&
                    streak > 0 &&
                    "border border-primaryColor"
                  } w-full flex flex-col justify-center items-center gap-2 rounded-xl bg-background px-2 pt-6 pb-2 relative`}
                >
                  <span className='w-full max-w-[80px] text-center absolute left-1/2 -translate-x-1/2 -top-3 bg-primaryColor text-background text-xs px-2 py-1 rounded-2xl'>
                    Co 5 dni
                  </span>
                  <span className='w-full h-[48px] flex flex-col justify-center items-center gap-1'>
                    <Image
                      src={HelmetImage}
                      alt='Random Avatar Image'
                      className='w-[38px] h-[38px]'
                    />
                  </span>
                  <h4 className='font-nunito text-sm font-extrabold tracking-wider text-descriptionColor'>
                    <span className='sm:inline hidden'>Losowy</span>{" "}
                    <span className='sm:lowercase uppercase'>a</span>
                    watar
                  </h4>
                </section>
                <section
                  className={`${
                    !isLoading &&
                    !isError &&
                    (streak + 1) % 10 === 0 &&
                    streak > 0 &&
                    "border border-primaryColor"
                  } w-full flex flex-col justify-center items-center gap-2 rounded-xl bg-background px-2 pt-6 pb-2 relative`}
                >
                  <span className='w-full max-w-[80px] text-center absolute left-1/2 -translate-x-1/2 -top-3 bg-primaryColor text-background text-xs px-2 py-1 rounded-2xl'>
                    Co 10 dni
                  </span>
                  <span className='w-full h-[48px] flex flex-col justify-center items-center gap-1'>
                    <Image
                      src={TempleImage}
                      alt='Temple Image'
                      className='w-auto h-[38px] rounded-lg'
                    />
                  </span>
                  <h4 className='font-nunito text-sm font-extrabold tracking-wider text-descriptionColor'>
                    <span className='sm:inline hidden'>Losowe</span>{" "}
                    <span className='sm:lowercase uppercase'>t</span>
                    ło
                  </h4>
                </section>
              </section>
            </section>
          </section>
          {!isLoading && !isError && streak >= 0 ? (
            <section className='w-full flex justify-center items-center px-4 pb-6 relative'>
              {challengeUnlocked ? (
                <Button
                  onClick={() =>
                    router.push("/gry-i-wyzwania/codzienne-wyzwanie")
                  }
                  variant='primary'
                >
                  Rozpocznij
                </Button>
              ) : (
                <>
                  <span className='absolute left-1/2 -translate-x-1/2 -top-[10px] bg-primaryColor rounded-2xl px-4 py-[2px] z-[1000] text-xs text-background font-nunito font-extrabold'>
                    Dostępne za:
                  </span>
                  <Button variant='secondary' disabled={!challengeUnlocked}>
                    {timeLeft ? (
                      `${timeLeft}`
                    ) : (
                      <LoadingElement variant='primary' />
                    )}
                  </Button>
                </>
              )}
            </section>
          ) : (
            <section className='w-full flex justify-center items-center px-4 pb-6'>
              <Button variant='primary'>
                <LoadingElement />
              </Button>
            </section>
          )}
        </motion.section>
      </section>
    </section>
  );
}
