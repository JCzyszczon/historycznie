"use client";
import React from "react";
import { FaCircleInfo } from "react-icons/fa6";
import Button from "../elements/Button";
import Link from "next/link";
import { useUserPoints } from "../../hooks/useUserPoints";
import ShopNews from "./shopNews";
import ChallengeGamePanel from "./challengeGamePanel";
import ProgressPanel from "./progressPanel";

function MainPanel({ userId }) {
  const { mutate } = useUserPoints(userId);

  return (
    <section className='w-full flex flex-col bg-background2 gap-4 justify-start items-center min-h-screen sm:pt-40 pt-20 pb-20 px-4'>
      <ProgressPanel userId={userId} />
      <section className='w-full max-w-5xl grid sm:grid-cols-[1fr_2fr] grid-cols-1 gap-4 auto-cols-fr'>
        <section className='w-full flex flex-col gap-4 justify-start items-center rounded-2xl bg-background px-2 py-6'>
          <h3 className='w-full max-w-[205px] text-center text-lg font-extrabold font-nunito tracking-wide text-nowrap overflow-hidden text-ellipsis'>
            Codzienne wyzwanie
          </h3>
          <ChallengeGamePanel userId={userId} />
        </section>
        <section className='w-full flex justify-center items-center rounded-2xl bg-background pl-2 pr-1 py-2'>
          <ShopNews userId={userId} pointsMutate={mutate} />
        </section>
      </section>
    </section>
  );
}

export default MainPanel;
