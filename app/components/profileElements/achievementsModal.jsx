"use client";
import React, { useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
import { useAchievements } from "../../hooks/useAchievements";
import Image from "next/image";

export default function AchievementsModal({ closeAchievementsModal, userId }) {
  const modalRef = useRef(null);
  const { achievements, isLoading, isError } = useAchievements(userId);
  const percentOfAchievements =
    achievements &&
    Math.round(
      (achievements.achievements.length / achievements.totalAchievementsCount) *
        100
    );

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeAchievementsModal();
    }
  };

  console.log(achievements);

  const handleClose = () => {
    closeAchievementsModal();
  };

  return (
    <section className='w-screen min-h-[100vh] max-h-[100px] z-[1100] fixed left-0 top-0 right-0 overflow-x-hidden overflow-y-scroll bg-[#11111199]'>
      <section
        onClick={handleOutsideClick}
        className='w-screen min-h-[100vh] z-[1101] flex flex-col justify-center items-center px-2 py-8'
      >
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, type: "tween" }}
          exit={{ opacity: 0 }}
          ref={modalRef}
          className='w-full max-w-[520px] h-[700px] flex flex-col gap-8 relative bg-background rounded-2xl pt-14 border border-borderColor overflow-y-hidden'
        >
          <IoMdClose
            title='Close Modal'
            onClick={handleClose}
            className='absolute right-3 top-3 text-3xl text-descriptionColor hover:text-primaryColor duration-200 cursor-pointer'
          />
          <section className='w-full h-min flex justify-center items-center px-2'>
            {isLoading || isError || !achievements ? (
              <></>
            ) : (
              <h2 className='font-nunito text-2xl font-extrabold tracking-wide text-center'>
                {`Osiągnięcia (${percentOfAchievements}%)`}
              </h2>
            )}
          </section>
          <section className='w-full h-full flex flex-col justify-start items-center gap-8 px-4 pb-12 overflow-y-scroll custom-scrollbar'>
            {isLoading || isError || !achievements ? (
              <></>
            ) : (
              <>
                {achievements.achievements.map((achievement) => (
                  <section
                    key={achievement.achievement.name}
                    className='w-full flex gap-4'
                  >
                    <section className='w-full max-w-[100px] flex min-h-[100px] rounded-2xl h-full bg-background2 justify-center items-center'>
                      <Image
                        src={achievement.achievement.iconUrl}
                        width={160}
                        height={160}
                        className='sm:w-[60px] w-[50px] sm:h-[60px] h-[50px]'
                        alt={achievement.achievement.name}
                      />
                    </section>
                    <section className='w-full flex flex-col justify-start items-start gap-2'>
                      <span className='bg-primaryColor px-2 py-1 rounded-xl text-xs text-background'>
                        {new Intl.DateTimeFormat("pl-PL", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }).format(new Date(achievement.achievedAt))}
                      </span>
                      <div className='w-full flex flex-col justify-center items-start gap-1'>
                        <h3 className='font-nunito font-bold tracking-wide text-lg'>
                          {achievement.achievement.name}
                        </h3>
                        <p className='text-descriptionColor font-light text-sm'>
                          {achievement.achievement.description}
                        </p>
                      </div>
                    </section>
                  </section>
                ))}
              </>
            )}
          </section>
        </motion.section>
      </section>
    </section>
  );
}
