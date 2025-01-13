import React from "react";
import Button from "../elements/Button";
import { useUserGuessGames } from "../../hooks/useUserGuessGames";
import { FaCircleInfo } from "react-icons/fa6";
import Link from "next/link";
import HeartImage from "../../img/diamond-heart.png";
import Image from "next/image";
import SurpriseBoxImage from "../../img/surprise-box.png";
import PyramidsImage from "../../img/pyramids.png";
import MusketeerImage from "../../img/musketeer.png";
import TankImage from "../../img/tank.png";
import KingImage from "../../img/king.png";
import CoinImage from "../../img/5252389.png";

function GuessGamesStats({ userId, handleGuessGamesModal }) {
  const { gameResults, isLoading, isError } = useUserGuessGames(userId);

  const gameCategory = "Starożytność";

  console.log(gameResults);

  return (
    <section className='w-full flex flex-col justify-start items-center rounded-2xl bg-background gap-4 md:pl-8 md:pr-6 px-4 py-4'>
      <div className='w-full h-full max-h-[36px] flex gap-2 justify-between items-center'>
        <h3 className='w-full max-w-[205px] font-extrabold font-nunito tracking-wide text-nowrap overflow-hidden text-ellipsis'>
          Gry w "Zgadnij kto to"
        </h3>
        {!isLoading && !isError && gameResults.length > 0 && (
          <Button
            onClick={handleGuessGamesModal}
            variant='primary'
            className='max-w-[120px] !py-[6px] !text-sm !px-2'
          >
            Historia
          </Button>
        )}
      </div>
      {!isLoading && !isError && gameResults.length > 0 ? (
        <>
          <section className='w-full flex justify-center items-center'>
            <section className='w-full flex flex-col gap-4 justify-center items-start h-[280px] bg-background2 rounded-2xl sm:px-2 px-1 py-4'>
              <h4 className='w-full text-center text-base font-extrabold font-nunito text-descriptionColor'>
                Ostatnia gra
              </h4>
              <section className='w-full grid grid-cols-3 auto-cols-fr gap-4 px-2'>
                <section className='w-full flex flex-col justify-center items-center gap-2 rounded-xl bg-background px-2 pt-2 pb-2'>
                  <span className='w-full h-[48px] flex justify-center items-end gap-0'>
                    <p className='sm:text-base text-sm font-extrabold font-nunito'>
                      {gameResults[0].remainingLives}x
                    </p>
                    <Image
                      src={HeartImage}
                      alt='Heart Image'
                      className='w-auto sm:h-[38px] h-[28px]'
                    />
                  </span>
                  <h4 className='font-nunito text-sm flex gap-[2px] font-extrabold tracking-wider text-descriptionColor'>
                    <span className='sm:flex hidden'>Pozostałe</span>{" "}
                    <span className='sm:first-letter:lowercase first-letter:uppercase'>
                      życia
                    </span>
                  </h4>
                </section>
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
                  <span className='w-full h-[48px] flex justify-center items-end gap-[2px]'>
                    <p className='sm:text-base text-sm font-extrabold font-nunito'>
                      +{gameResults[0].earnedPoints}
                    </p>
                    <Image
                      src={CoinImage}
                      alt='Coin Image'
                      className='w-auto sm:h-[32px] h-[24px]'
                    />
                  </span>
                  <h4 className='font-nunito text-sm font-extrabold tracking-wider text-descriptionColor'>
                    Monety
                  </h4>
                </section>
              </section>
              <section className='w-full flex justify-center items-center px-2'>
                <section className='w-full rounded-2xl bg-background p-4 flex justify-center items-center'>
                  {gameResults[0].isPassed ? (
                    <p className='font-nunito font-extrabold tracking-wide text-primaryColor'>
                      Zwycięstwo
                    </p>
                  ) : (
                    <p className='font-nunito font-extrabold tracking-wide text-red-500'>
                      Porażka
                    </p>
                  )}
                </section>
              </section>
            </section>
          </section>
          <section className='w-full flex flex-col justify-center items-center gap-4'>
            <h4 className='w-full text-start font-extrabold font-nunito tracking-wide'>
              Statystyki
            </h4>
            {!isLoading && !isError && gameResults ? (
              <section className='w-full flex gap-2'>
                <section className='w-full flex flex-col justify-center items-center gap-0 bg-background2 rounded-2xl py-2'>
                  <section className='flex justify-center items-center gap-2'>
                    {gameResults.slice(0, 5).map((game, index) => (
                      <p
                        key={index}
                        className={`sm:text-[17px] text-base font-extrabold ${
                          game.isPassed ? "text-primaryColor" : "text-red-500"
                        }`}
                      >
                        {game.isPassed ? "W" : "L"}
                      </p>
                    ))}
                  </section>
                  <h5 className='text-xs font-nunito font-bold text-descriptionColor'>
                    Wyniki (ostatnie 5 gier)
                  </h5>
                </section>
                <section className='w-fit flex flex-col justify-center items-center gap-0 bg-background2 rounded-2xl py-2 px-2'>
                  <p className='sm:text-[17px] text-base font-bold'>
                    {gameResults.length}
                  </p>
                  <h5 className='text-xs font-nunito font-bold text-descriptionColor text-nowrap'>
                    Rozegrane gry
                  </h5>
                </section>
              </section>
            ) : (
              <section className='w-full h-[80px] rounded-2xl bg-background2 animate-pulse'></section>
            )}
          </section>
        </>
      ) : (
        <section className='w-full h-[360px] flex justify-center items-center flex-col gap-2'>
          <FaCircleInfo className='text-4xl text-descriptionColor' />
          <p className='sm:text-base text-sm text-descriptionColor text-center'>
            Nie rozegrano jeszcze żadnej gry.
          </p>
          <Link className='max-w-[400px] mt-4' href='/gry-i-wyzwania'>
            <Button variant='primary' className='!py-2'>
              Zagraj teraz
            </Button>
          </Link>
        </section>
      )}
    </section>
  );
}

export default GuessGamesStats;
