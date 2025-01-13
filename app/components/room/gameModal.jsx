import React, { useEffect, useState } from "react";
import CastleImage from "../../img/castle.png";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Button from "../elements/Button";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import LoadingElement from "../elements/loadingElement";
import GoldMedal from "../../img/gold-medal.png";
import SilverMedal from "../../img/silver-medal.png";
import BronzeMedal from "../../img/bronze-medal.png";
import { FaTrophy } from "react-icons/fa6";
import RankingModal from "./rankingModal";

function GameModal({
  currentQuestion,
  currentQuestionIndex,
  roomInfo,
  timeLeft,
  selectedAnswer,
  isAnswered,
  isCorrect,
  handleAnswerClick,
  updateRanking,
}) {
  const [isRankingModalOpen, setIsRankingModalOpen] = useState(false);
  const [timerKey, setTimerKey] = useState(0);

  useEffect(() => {
    setTimerKey((prevKey) => prevKey + 1);
  }, [currentQuestionIndex]);

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <p className='font-extrabold text-lg text-textColor'>0</p>;
    }

    remainingTime = timeLeft;

    return (
      <p
        className={`font-extrabold text-lg ${
          remainingTime <= 3 ? "text-primaryColor" : "text-textColor"
        }`}
      >
        {remainingTime}
      </p>
    );
  };

  return (
    <section className='w-screen min-h-dvh max-h-[100px] z-[1100] fixed left-0 top-0 right-0 overflow-x-hidden overflow-y-scroll bg-[#11111199]'>
      <section className='w-screen min-h-dvh bg-background2 rounded-2xl flex lg:flex-row flex-col justify-center items-center gap-4 px-2 py-8'>
        <motion.section
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className='w-full max-w-5xl h-[700px] flex flex-col justify-between items-center gap-6 bg-background rounded-2xl sm:px-6 px-4 py-12 border border-borderColor shadow-lg relative'
        >
          {currentQuestion ? (
            <>
              <div className='absolute right-6 top-4 flex justify-center items-center'>
                <CountdownCircleTimer
                  key={timerKey}
                  isPlaying
                  duration={10}
                  strokeWidth={3}
                  size={60}
                  colors={["#171717", "#58cc02"]}
                  colorsTime={[10, 0]}
                  onComplete={() => ({ shouldRepeat: false })}
                >
                  {renderTime}
                </CountdownCircleTimer>
              </div>
              <div
                onClick={() => setIsRankingModalOpen(true)}
                className='absolute top-6 left-8 sm:hidden flex flex-col justify-center items-center group'
              >
                <FaTrophy className='text-3xl text-textColor group-hover:text-primaryColor duration-200' />
                <p className='text-xs font-nunito font-bold text-textColor group-hover:text-primaryColor duration-200'>
                  Ranking
                </p>
              </div>
              <section className='w-full flex flex-col justify-start items-start gap-6 h-full'>
                <section className='w-full flex justify-center items-center'>
                  <Image
                    src={CastleImage}
                    alt='Castle Image'
                    width={100}
                    height={100}
                    className='sm:w-[100px] w-[84px] sm:h-[100px] h-[84px]'
                  />
                </section>
                <h2 className='w-full sm:text-3xl text-[26px] font-nunito font-bold text-center'>{`Pytanie ${currentQuestionIndex}/${roomInfo.questionsCount}`}</h2>
                <section className='w-full flex justify-start items-start h-full'>
                  <section className='w-full flex justify-start items-center bg-background2 rounded-lg px-8 py-8 relative'>
                    <span className='absolute left-1/2 -translate-x-1/2 sm:-top-[15px] -top-[13px] sm:text-sm text-xs font-nunito font-[700] rounded-xl px-2 py-1 bg-background2 border border-borderColor'>
                      {currentQuestion.category}
                    </span>
                    <p className='font-[500] sm:text-base text-sm'>
                      {currentQuestion?.text}
                    </p>
                  </section>
                </section>
              </section>
              <section className='w-full grid grid-cols-2 sm:gap-4 gap-2 auto-rows-[1fr]'>
                {currentQuestion?.options.map((option, index) => {
                  const isSelected = selectedAnswer === option;

                  return (
                    <Button
                      disabled={isAnswered}
                      key={index}
                      variant={
                        isSelected && isCorrect
                          ? "primary"
                          : isSelected && !isCorrect
                          ? "bad"
                          : "secondary"
                      }
                      onClick={() => handleAnswerClick(option)}
                      className={`!h-[100px] !flex !justify-center !items-center !whitespace-normal`}
                    >
                      {option}
                    </Button>
                  );
                })}
              </section>
            </>
          ) : (
            <section className='w-full h-full min-h-[600px] flex justify-center items-center'>
              <section className='flex flex-col justify-center items-center gap-4'>
                <LoadingElement variant='primary' />
                <p className='text-descriptionColor text-lg font-bold'>
                  Ponowne łączenie...
                </p>
              </section>
            </section>
          )}
        </motion.section>
        <motion.section
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className='w-full max-w-lg h-[700px] bg-background rounded-2xl border border-borderColor shadow-lg overflow-hidden sm:flex hidden'
        >
          <section className='w-full h-full flex flex-col gap-6 px-6 py-12 overflow-y-scroll custom-scrollbar'>
            <h2 className='text-2xl font-nunito font-bold text-center'>
              Ranking graczy
            </h2>
            {updateRanking ? (
              <section className='w-full flex flex-col justify-start items-start gap-4'>
                {updateRanking.map((player, index) => (
                  <section
                    key={index}
                    className='w-full flex justify-between items-center gap-2'
                  >
                    <div className='flex justify-start items-center gap-4'>
                      {player.position === 1 ? (
                        <Image
                          src={GoldMedal}
                          alt='Gold Medal'
                          width={100}
                          height={100}
                          className='w-[30px] h-[30px]'
                        />
                      ) : player.position === 2 ? (
                        <Image
                          src={SilverMedal}
                          alt='Silver Medal'
                          width={100}
                          height={100}
                          className='w-[30px] h-[30px]'
                        />
                      ) : player.position === 3 ? (
                        <Image
                          src={BronzeMedal}
                          alt='Bronze Medal'
                          width={100}
                          height={100}
                          className='w-[30px] h-[30px]'
                        />
                      ) : (
                        <p className='text-lg w-[30px] text-center'>
                          {player.position}.
                        </p>
                      )}
                      <Image
                        src={player.avatar}
                        alt='User Avatar'
                        width={60}
                        height={60}
                        className='w-[40px] h-[40px]'
                      />
                      <p className='text-lg font-nunito w-full max-w-[240px] overflow-hidden text-ellipsis text-nowrap'>
                        {player.username}
                      </p>
                    </div>
                    <p className='text-lg font-bold'>{player.score} pkt</p>
                  </section>
                ))}
              </section>
            ) : (
              <section className='w-full min-h-[500px] h-full flex justify-center items-center'>
                <LoadingElement variant='primary' />
              </section>
            )}
          </section>
        </motion.section>
      </section>
      <AnimatePresence initial={false} mode='wait' onExitComplete={() => null}>
        {isRankingModalOpen && (
          <RankingModal
            rankingData={updateRanking}
            closeRankingModal={() => setIsRankingModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export default GameModal;
