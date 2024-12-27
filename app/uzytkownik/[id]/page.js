"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useUser } from "../../hooks/useUser";
import { useSession } from "next-auth/react";
import { MdEdit } from "react-icons/md";
import { FaClock } from "react-icons/fa6";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import EditModal from "../../components/editProfile/editModal";
import ProfileAchievements from "../../components/profileElements/profileAchievements";
import ProfileBadges from "../../components/profileElements/profileBadges";
import AchievementsModal from "../../components/profileElements/achievementsModal";

export default function Home() {
  const { data: session } = useSession();
  const params = useParams();
  const userId = params?.id;
  const { user, isLoading, isError, mutate } = useUser(userId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAchievementModalOpen, setIsAchievementModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (isAchievementModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isAchievementModalOpen]);

  useEffect(() => {
    if (user) {
      const userName = user.username;
      document.title = userName
        ? `${userName} - Historycznie`
        : "Profil - Historycznie";
    }
  }, [user, isLoading, isError]);

  return (
    <>
      <section className='w-full flex flex-col bg-background2 justify-center items-center min-h-dvh px-2 py-20'>
        <section className='w-full max-w-5xl sm:h-[624px] h-[800px] bg-background rounded-2xl flex flex-col justify-start items-center overflow-hidden z-[1]'>
          <section className='w-full sm:min-h-[360px] min-h-[320px] relative'>
            {isLoading || isError || !user ? (
              <div className='w-full sm:h-[360px] h-[320px] flex bg-gray-300 animate-pulse'></div>
            ) : (
              <Image
                src={user.activeBanner.imageUrl}
                width={1024}
                height={360}
                quality={100}
                alt='Profile Banner'
                className='w-full h-full object-cover object-center'
              />
            )}
            {!isLoading && session && userId === session.user.id && (
              <button
                onClick={() => setIsModalOpen(true)}
                className='absolute right-4 top-4 bg-background rounded-lg p-1 flex items-center border border-borderColor group cursor-pointer z-[2]'
              >
                <MdEdit className='text-xl text-descriptionColor group-hover:text-primaryColor duration-200' />
                <div className='overflow-hidden max-w-0 group-hover:max-w-[100px] transition-[max-width] duration-500'>
                  <p className='ml-2 text-sm font-medium text-descriptionColor'>
                    Edytuj
                  </p>
                </div>
              </button>
            )}
            <section className='absolute sm:left-4 left-1/2 sm:translate-x-0 -translate-y-1/2 -translate-x-1/2 top-1/2 h-[280px] bg-[#ffffffdd] drop-shadow-lg rounded-3xl w-full max-w-[240px] border border-borderColor gap-4 flex flex-col justify-start items-center px-4 py-4'>
              <div className='h-full'>
                {isLoading || isError || !user ? (
                  <div className='w-[110px] h-[110px] rounded-full bg-gray-300 animate-pulse'></div>
                ) : (
                  <Image
                    src={user.activeAvatar.imageUrl}
                    width={110}
                    height={110}
                    alt='Profile Avatar'
                    className='w-[110px] h-[110px] rounded-full'
                  />
                )}
              </div>
              <section className='flex h-full flex-col justify-between items-start gap-2'>
                <div className='w-full flex flex-col justify-start items-center gap-1'>
                  {isLoading || isError || !user ? (
                    <h1 className='w-[120px] h-[32px] bg-gray-300 animate-pulse rounded-lg'></h1>
                  ) : (
                    <h1 className='text-2xl w-full max-w-[180px] overflow-hidden text-ellipsis text-nowrap font-bold text-center font-nunito'>
                      {user.username}
                    </h1>
                  )}
                  {isLoading || isError || !user ? (
                    <h2 className='w-[160px] h-[28px] bg-gray-300 animate-pulse rounded-lg'></h2>
                  ) : (
                    <h2 className='text-lg text-center w-full max-w-[180px] overflow-hidden text-ellipsis text-nowrap font-medium text-descriptionColor'>
                      {user.name + " " + user.surname}
                    </h2>
                  )}
                </div>
                {isLoading || isError || !user ? (
                  <p className='w-[170px] h-[20px] bg-gray-300 animate-pulse rounded-lg'></p>
                ) : (
                  <div className='flex gap-2 justify-center items-center'>
                    <FaClock className='text-sm text-descriptionColor' />
                    <h3 className='text-xs font-medium text-descriptionColor'>
                      Dołączył{" "}
                      {new Intl.DateTimeFormat("pl-PL", {
                        month: "long",
                        year: "numeric",
                      }).format(new Date(user.createdAt))}
                    </h3>
                  </div>
                )}
              </section>
            </section>
          </section>
          <section className='w-full h-full flex sm:flex-row flex-col justify-center items-center sm:gap-6 gap-4 sm:px-4 px-2 sm:py-0 py-4'>
            {isLoading || isError || !user ? (
              <section className='w-full h-[220px] flex bg-gray-300 animate-pulse rounded-2xl'></section>
            ) : (
              <ProfileAchievements
                userId={user?.id}
                limit={3}
                openAchievementModal={() => setIsAchievementModalOpen(true)}
              />
            )}
            {isLoading || isError || !user ? (
              <section className='w-full h-[220px] flex bg-gray-300 animate-pulse rounded-2xl'></section>
            ) : (
              <ProfileBadges userId={user?.id} />
            )}
          </section>
        </section>
      </section>
      <AnimatePresence initial={false} mode='wait' onExitComplete={() => null}>
        {isModalOpen && (
          <EditModal
            user={user}
            mutateUser={mutate}
            closeModal={() => setIsModalOpen(false)}
          />
        )}
      </AnimatePresence>
      <AnimatePresence initial={false} mode='wait' onExitComplete={() => null}>
        {isAchievementModalOpen && (
          <AchievementsModal
            userId={user?.id}
            closeAchievementsModal={() => setIsAchievementModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
