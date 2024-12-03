"use client";
import Image from "next/image";
import React from "react";
import Button from "../elements/Button";
import { useAchievements } from "../../hooks/useAchievements";

function ProfileAchievements({ userId, limit, openAchievementModal }) {
  const { achievements, isLoading, isError } = useAchievements(userId, limit);
  const placeholderCount = achievements
    ? limit - achievements.achievements.length
    : limit;

  const handleOpenAchievementModal = () => {
    openAchievementModal();
  };

  return (
    <>
      {isLoading || isError || !achievements ? (
        <section className='w-full h-[220px] flex bg-gray-300 animate-pulse rounded-2xl'></section>
      ) : (
        <section className='w-full h-full max-h-[240px] flex flex-col justify-start items-center gap-4 md:p-4 px-2 py-4'>
          <div className='w-full flex gap-2 justify-between items-center'>
            <h3 className='w-full max-w-[205px] font-extrabold font-nunito tracking-wide text-nowrap overflow-hidden text-ellipsis'>
              Najnowsze osiągnięcia
            </h3>
            <Button
              onClick={handleOpenAchievementModal}
              variant='primary'
              className='max-w-[100px] !py-[6px] !text-sm !px-2'
            >
              Zobacz
            </Button>
          </div>
          <div className='w-full h-full grid grid-cols-3 gap-4'>
            {achievements.achievements.map((achievement) => (
              <div
                key={achievement.achievement.name}
                className='flex h-full flex-col gap-2 justify-start items-center'
              >
                <div className='w-full h-full sm:max-h-[120px] max-h-[100px] flex justify-center items-center rounded-2xl bg-background2 drop-shadow-lg '>
                  <Image
                    src={achievement.achievement.iconUrl}
                    width={60}
                    height={60}
                    className='sm:w-[60px] w-[50px] sm:h-[60px] h-[50px]'
                    alt={achievement.achievement.name}
                    quality={100}
                  />
                </div>
                <h4 className='w-[calc(100%-1px)] text-center font-[500] text-sm text-descriptionColor text-nowrap overflow-hidden text-ellipsis'>
                  {achievement.achievement.name}
                </h4>
              </div>
            ))}
            {Array.from({ length: placeholderCount }).map((_, index) => (
              <div
                key={`placeholder-${index}`}
                className='w-full flex h-full flex-col gap-2 justify-start items-center'
              >
                <div className='w-full h-full sm:max-h-[120px] max-h-[100px] flex rounded-2xl bg-transparent border-dashed border-2'></div>
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

export default ProfileAchievements;
