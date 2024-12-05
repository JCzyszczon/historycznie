"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import CrownHost from "../../img/crown-host.png";
import { motion } from "framer-motion";
import Button from "../elements/Button";
import { useRouter } from "next/navigation";

export default function GameEndModal({ updateRanking, playerId }) {
  const player = updateRanking.find((p) => p.id === playerId);
  const router = useRouter();

  if (!player) {
    return <p>Gracz o podanym ID nie istnieje w rankingu.</p>;
  }

  return (
    <section className='w-screen min-h-dvh z-[1100] fixed left-0 top-0 right-0 overflow-x-hidden overflow-y-scroll bg-[#11111199]'>
      <section className='w-screen min-h-dvh flex justify-center items-center px-2 py-8'>
        <motion.section
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className='w-full max-w-[500px] min-h-[400px] h-auto flex flex-col justify-center items-center gap-6 bg-background rounded-2xl p-6 border border-borderColor shadow-lg'
        >
          <Image
            src={CrownHost}
            width={80}
            height={80}
            alt='Crown image'
            className='w-[80px] h-[80px]'
          />
          <h2 className='text-2xl font-nunito font-bold text-center'>
            Gratulacje!
          </h2>
          <p className='text-lg font-[500]'>
            {`Zająłeś ${player.position} miejsce z wynikiem ${player.score} pkt.`}
          </p>
          <Button
            variant='primary'
            className='!mt-6 !max-w-[300px]'
            onClick={() => router.push("/")}
          >
            Strona główna
          </Button>
        </motion.section>
      </section>
    </section>
  );
}
