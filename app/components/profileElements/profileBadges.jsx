"use client";
import Image from "next/image";
import React from "react";
import { useActiveBadges } from "../../hooks/useActiveBadges";
import { FaQuestionCircle } from "react-icons/fa";

function ProfileBadges({ userId }) {
  const { activeBadges, isLoading, isError } = useActiveBadges(userId);
  const placeholderCount = activeBadges ? 3 - activeBadges.length : 3;

  console.log(activeBadges);

  return (
    <>
      {isLoading || isError || !activeBadges ? (
        <section className='w-full h-[220px] flex bg-gray-300 animate-pulse rounded-2xl'></section>
      ) : (
        <section className='w-full h-full max-h-[240px] flex flex-col justify-start items-center gap-4 md:p-4 px-2 py-4'>
          <div className='w-full h-full max-h-[36px] flex gap-2 justify-between items-center'>
            <h3 className='w-full max-w-[205px] font-extrabold font-nunito tracking-wide text-nowrap overflow-hidden text-ellipsis'>
              Wyróżnione odznaki
            </h3>
          </div>
          <div className='w-full h-full grid grid-cols-3 gap-4'>
            {activeBadges.map((badge) => (
              <div
                key={badge.name}
                className='flex h-full flex-col gap-2 justify-start items-center'
              >
                <div className='w-full h-full sm:max-h-[120px] max-h-[100px] flex justify-center items-center rounded-2xl drop-shadow-lg '>
                  <Image
                    src={badge.iconUrl}
                    width={160}
                    height={160}
                    className='sm:w-[60px] w-[50px] sm:h-[60px] h-[50px] drop-shadow-xl'
                    alt={badge.name}
                  />
                </div>
                <h4 className='w-[calc(100%-1px)] text-center font-[500] text-sm text-descriptionColor text-nowrap overflow-hidden text-ellipsis'>
                  {badge.name}
                </h4>
              </div>
            ))}
            {Array.from({ length: placeholderCount }).map((_, index) => (
              <div
                key={`placeholder-${index}`}
                className='w-full flex h-full flex-col gap-2 justify-start items-center'
              >
                <div className='w-full h-full sm:max-h-[120px] max-h-[100px] flex rounded-2xl bg-transparent justify-center items-center'>
                  <FaQuestionCircle className='text-3xl text-borderColor' />
                </div>
                <h4 className='w-[calc(100%-1px)] text-center text-sm text-descriptionColor text-nowrap overflow-hidden text-ellipsis'>
                  Puste miejsce
                </h4>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default ProfileBadges;
