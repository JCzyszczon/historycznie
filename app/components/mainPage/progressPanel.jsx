"use client";
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Image from "next/image";
import Link from "next/link";
import LoadingElement from "../elements/loadingElement";
import { useGetUserPanelProgress } from "../../hooks/useGetUserPanelProgress";

function ProgressPanel({ userId }) {
  const { progress, isLoading, isError } = useGetUserPanelProgress(userId);

  console.log(progress);

  return (
    <section className='w-full max-w-5xl flex flex-col gap-4 justify-center items-center p-4 rounded-2xl bg-background'>
      <h3 className='w-full text-start text-xl font-extrabold font-nunito tracking-wide '>
        Twoje postępy
      </h3>
      <section className='w-full flex flex-row gap-4 overflow-auto'>
        {!isLoading && !isError && progress ? (
          <>
            {progress.map((era, index) => (
              <Link
                href={`/lekcje/${era.eraId}/${era.eraName}`}
                key={index}
                className='w-full flex min-w-[200px] aspect-square justify-center items-center group rounded-2xl bg-background2 overflow-hidden relative'
              >
                <Image
                  src={era.imageUrl}
                  alt={era.eraName}
                  width={400}
                  height={400}
                  className='w-full h-full aspect-square object-cover brightness-[0.6] group-hover:brightness-75 duration-200'
                />
                <CircularProgressbar
                  value={era.percentage}
                  text={`${era.percentage}%`}
                  styles={buildStyles({
                    textSize: "22px",
                    pathTransitionDuration: 0.5,
                    pathColor: "#58cc02",
                    textColor: "#58cc02",
                    trailColor: "#d6d6d6",
                    backgroundColor: "#58cc02",
                  })}
                  className='max-w-[100px] absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2'
                />
                <section className='absolute left-1/2 -translate-x-1/2 bottom-3 bg-background rounded-xl px-4 py-1'>
                  <h3 className='font-nunito font-extrabold tracking-wide'>
                    {era.eraName}
                  </h3>
                </section>
              </Link>
            ))}
          </>
        ) : (
          <section className='w-full min-h-[236px] flex flex-col gap-4 justify-center items-center'>
            <LoadingElement variant='primary' />
            <h2 className='text-descriptionColor text-lg font-bold'>
              Ładowanie...
            </h2>
          </section>
        )}
      </section>
    </section>
  );
}

export default ProgressPanel;
