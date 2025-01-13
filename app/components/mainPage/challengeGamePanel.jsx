"use client";

import React, { useState, useEffect } from "react";
import Button from "../elements/Button";
import Image from "next/image";
import { useDailyChallengeStatus } from "../../hooks/useDailyChallengeStatus";
import LoadingElement from "../elements/loadingElement";
import { useRouter } from "next/navigation";
import FireImage from "../../img/fire.png";

export default function ChallengeGamePanel({ userId }) {
  const {
    streak,
    challengeUnlocked,
    nextAvailableChallenge,
    isLoading,
    isError,
  } = useDailyChallengeStatus(userId);
  const [timeLeft, setTimeLeft] = useState(null);
  const router = useRouter();

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
    <section className='w-full h-full flex flex-col gap-4 justify-center items-center'>
      {isLoading || isError ? (
        <section className='w-full h-full flex justify-center items-center'>
          <LoadingElement variant='primary' />
        </section>
      ) : (
        <>
          <section className='w-full h-full flex flex-col gap-4 justify-center items-center relative'>
            <Image
              src={FireImage}
              width={440}
              height={440}
              alt='Diamond Image'
              className='sm:w-[100px] w-[92px] sm:h-[100px] h-[92px]'
            />
            <span className='text-3xl font-extrabold font-nunito absolute left-1/2 -translate-x-1/2 sm:top-[44%] top-[38%] bg-background w-[38px] h-[38px] rounded-full flex justify-center items-center'>
              {streak}
            </span>
            <h2 className='text-base font-extrabold tracking-wide text-descriptionColor font-nunito'>
              Seria zwycięstw
            </h2>
          </section>
          <section className='w-full bg-background2 text-center rounded-xl p-4 mb-2'>
            <p className='text-sm text-descriptionColor font-[500]'>
              Odpowiedz poprawnie na conajmniej 3 z 5 pytań w ciągu 30 sekund i
              odblokuj wyjątkowe nagrody!
            </p>
          </section>
          <section className='w-full flex justify-center items-center relative'>
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
        </>
      )}
    </section>
  );
}
