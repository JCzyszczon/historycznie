"use client";
import React, { useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
import { useUserQuizGames } from "../../hooks/useUserQuizGames";
import { FaCircleInfo } from "react-icons/fa6";

export default function QuizGamesModal({ closeQuizGamesModal, userId }) {
  const modalRef = useRef(null);
  const { gameResults, isLoading, isError } = useUserQuizGames(userId);

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeQuizGamesModal();
    }
  };

  const handleClose = () => {
    closeQuizGamesModal();
  };

  const calculateGameStats = (game) => {
    const totalAnswers = game.answers.length;
    const correctAnswers = game.answers.filter(
      (answer) => answer.isCorrect
    ).length;
    const incorrectAnswers = totalAnswers - correctAnswers;

    return {
      accuracy: ((correctAnswers / totalAnswers) * 100).toFixed(2),
      correctAnswers,
      incorrectAnswers,
    };
  };

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
          className='w-full max-w-3xl sm:h-[700px] sm:min-h-0 min-h-[700px] h-auto flex bg-background rounded-2xl border border-borderColor sm:overflow-hidden overflow-visible'
        >
          <section className='w-full h-full flex flex-col gap-8 relative pt-14 overflow-y-scroll custom-scrollbar px-4 pb-12 sm:pb-0'>
            <IoMdClose
              title='Close Modal'
              onClick={handleClose}
              className='absolute right-3 top-3 text-3xl text-descriptionColor hover:text-primaryColor duration-200 cursor-pointer'
            />
            <section className='w-full h-min flex justify-center items-center px-2'>
              <h2 className='font-nunito text-2xl font-extrabold tracking-wide text-center'>
                Historia gier quizowych
              </h2>
            </section>
            <section className='w-full h-full flex flex-col justify-start items-start gap-8 overflow-x-auto custom-scrollbar'>
              {!isLoading && !isError && gameResults ? (
                <>
                  {gameResults?.length > 0 ? (
                    <table className='table-auto w-full text-left border-collapse'>
                      <thead>
                        <tr className='bg-gray-200 text-descriptionColor border'>
                          <th className='px-4 py-2 text-center text-[15px]'>
                            Miejsce
                          </th>
                          <th className='px-4 py-2 text-center text-[15px]'>
                            Punkty
                          </th>
                          <th className='px-4 py-2 text-center text-[15px]'>
                            Poprawne
                          </th>
                          <th className='px-4 py-2 text-center text-[15px]'>
                            Niepoprawne
                          </th>
                          <th className='px-4 py-2 text-center text-[15px]'>
                            Skuteczność
                          </th>
                          <th className='px-4 py-2 text-center text-[15px]'>
                            Data
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {gameResults.map((game, index) => {
                          const { accuracy, correctAnswers, incorrectAnswers } =
                            calculateGameStats(game.game);
                          return (
                            <tr key={game.id} className='hover:bg-gray-100'>
                              <td className='border px-4 py-2 text-center text-[15px] font-extrabold'>
                                {game.position}
                              </td>
                              <td className='border px-4 py-2 text-center text-[15px] font-bold text-descriptionColor'>
                                {game.score}
                              </td>
                              <td className='border px-4 py-2 text-center text-[15px] text-primaryColor font-extrabold'>
                                {correctAnswers}
                              </td>
                              <td className='border px-4 py-2 text-center text-[15px] text-red-500 font-extrabold'>
                                {incorrectAnswers}
                              </td>
                              <td className='border px-4 py-2 text-center text-[15px] text-descriptionColor font-bold'>
                                {accuracy}%
                              </td>
                              <td className='border px-4 py-2 text-center text-[15px] text-descriptionColor'>
                                {new Date(game.game.startedAt).toLocaleString(
                                  "pl-PL",
                                  {
                                    day: "2-digit",
                                    month: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    <section className='w-full h-full sm:min-h-0 min-h-[400px] flex flex-col justify-center items-center gap-4'>
                      <FaCircleInfo className='text-4xl text-descriptionColor' />
                      <p className='sm:text-base text-sm text-descriptionColor text-center'>
                        Brak danych do wyświetlenia.
                      </p>
                    </section>
                  )}
                </>
              ) : (
                <></>
              )}
            </section>
          </section>
        </motion.section>
      </section>
    </section>
  );
}
