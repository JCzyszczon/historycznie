import React from "react";
import Button from "../elements/Button";
import { useUserQuizGames } from "../../hooks/useUserQuizGames";
import QuizScoreChart from "./quizScoreChart";
import LoadingElement from "../elements/loadingElement";
import { FaCircleInfo } from "react-icons/fa6";
import Link from "next/link";

function QuizGamesStats({ userId, handleQuizGamesModal }) {
  const { gameResults, isLoading, isError } = useUserQuizGames(userId);

  const calculateAccuracy = (game) => {
    const totalAnswers = game.answers.length;
    const correctAnswers = game.answers.filter(
      (answer) => answer.isCorrect
    ).length;
    return ((correctAnswers / totalAnswers) * 100).toFixed(2);
  };

  return (
    <section className='w-full flex flex-col justify-start items-center rounded-2xl bg-background gap-4 md:pl-8 md:pr-6 px-4 py-4'>
      <div className='w-full h-full max-h-[36px] flex gap-2 justify-between items-center'>
        <h3 className='w-full max-w-[205px] font-extrabold font-nunito tracking-wide text-nowrap overflow-hidden text-ellipsis'>
          Gry quizowe
        </h3>
        {!isLoading && !isError && gameResults.length > 0 && (
          <Button
            onClick={handleQuizGamesModal}
            variant='primary'
            className='max-w-[120px] !py-[6px] !text-sm !px-2'
          >
            Wszystkie
          </Button>
        )}
      </div>
      {!isLoading && !isError && gameResults.length > 0 ? (
        <>
          <section className='w-full flex justify-center items-center'>
            {!isLoading && !isError && gameResults ? (
              <QuizScoreChart gameResults={gameResults} />
            ) : (
              <section className='w-full h-[260px] flex justify-center items-center flex-col gap-1'>
                <LoadingElement variant={"primary"} />
                <p className='text-sm font-[500] text-descriptionColor'>
                  Ładowanie...
                </p>
              </section>
            )}
          </section>
          <section className='w-full flex flex-col justify-center items-center gap-4'>
            <h4 className='w-full text-start font-extrabold font-nunito tracking-wide'>
              Ostatnia gra
            </h4>
            {!isLoading && !isError && gameResults ? (
              <section className='w-full grid md:grid-cols-3 grid-cols-2 auto-rows-fr gap-2'>
                <section className='w-full flex flex-col justify-center items-center gap-0 bg-background2 rounded-2xl py-2'>
                  <p className='sm:text-[17px] text-base font-bold'>
                    {gameResults[0].position}
                  </p>
                  <h5 className='text-xs font-nunito font-bold text-descriptionColor'>
                    Miejsce
                  </h5>
                </section>
                <section className='w-full flex flex-col justify-center items-center gap-0 bg-background2 rounded-2xl py-2'>
                  <p className='sm:text-[17px] text-base font-bold'>
                    {gameResults[0].score}
                  </p>
                  <h5 className='text-xs font-nunito font-bold text-descriptionColor'>
                    Punkty
                  </h5>
                </section>
                <section className='w-full flex flex-col justify-center items-center gap-0 bg-background2 rounded-2xl py-2'>
                  <p className='sm:text-[17px] text-base font-bold'>
                    {calculateAccuracy(gameResults[0].game)}%
                  </p>
                  <h5 className='text-xs font-nunito font-bold text-descriptionColor'>
                    Skuteczność
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
          <Link
            className='max-w-[400px] mt-4'
            href='/gry-i-wyzwania/gra-quizowa'
          >
            <Button variant='primary' className='!py-2'>
              Zagraj teraz
            </Button>
          </Link>
        </section>
      )}
    </section>
  );
}

export default QuizGamesStats;
