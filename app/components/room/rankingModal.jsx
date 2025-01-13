"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import LoadingElement from "../elements/loadingElement";
import GoldMedal from "../../img/gold-medal.png";
import SilverMedal from "../../img/silver-medal.png";
import BronzeMedal from "../../img/bronze-medal.png";
import Image from "next/image";

export default function RankingModal({ closeRankingModal, rankingData }) {
  const modalRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeRankingModal();
    }
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
          className='w-full max-w-[500px] h-[680px] flex flex-col gap-8 shadow-lg relative bg-background rounded-2xl pt-14 border border-borderColor overflow-y-hidden'
        >
          <IoMdClose
            title='Close Modal'
            onClick={closeRankingModal}
            className='absolute right-3 top-3 text-3xl text-descriptionColor hover:text-primaryColor duration-200 cursor-pointer'
          />
          <h2 className='text-2xl font-nunito font-bold text-center'>
            Ranking graczy
          </h2>
          {rankingData ? (
            <section className='w-full flex flex-col justify-start items-start gap-4 px-4'>
              {rankingData.map((player, index) => (
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
                        className='sm:w-[30px] w-[26px] sm:h-[30px] h-[26px]'
                      />
                    ) : player.position === 2 ? (
                      <Image
                        src={SilverMedal}
                        alt='Silver Medal'
                        width={100}
                        height={100}
                        className='sm:w-[30px] w-[26px] sm:h-[30px] h-[26px]'
                      />
                    ) : player.position === 3 ? (
                      <Image
                        src={BronzeMedal}
                        alt='Bronze Medal'
                        width={100}
                        height={100}
                        className='sm:w-[30px] w-[26px] sm:h-[30px] h-[26px]'
                      />
                    ) : (
                      <p className='sm:text-lg text-base sm:w-[30px] w-[26px] text-center'>
                        {player.position}.
                      </p>
                    )}
                    <Image
                      src={player.avatar}
                      alt='User Avatar'
                      width={60}
                      height={60}
                      className='sm:w-[40px] w-[36px] sm:h-[40px] h-[36px]'
                    />
                    <p className='sm:text-lg text-base font-nunito w-full max-w-[140px] overflow-hidden text-ellipsis text-nowrap'>
                      {player.username}
                    </p>
                  </div>
                  <p className='sm:text-lg text-base font-bold'>
                    {player.score} pkt
                  </p>
                </section>
              ))}
            </section>
          ) : (
            <section className='w-full min-h-[500px] h-full flex justify-center items-center'>
              <LoadingElement variant='primary' />
            </section>
          )}
        </motion.section>
      </section>
    </section>
  );
}
