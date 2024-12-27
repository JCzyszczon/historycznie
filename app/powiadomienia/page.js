"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useNotifications } from "../hooks/useNotifications";
import LoadingElement from "../components/elements/loadingElement";
import Image from "next/image";
import AchievementIcon from "../img/achievement.png";
import TrumpetIcon from "../img/trumpet.png";
import AwardIcon from "../img/award.png";
import Button from "../components/elements/Button";
import { FaCheck } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";

export default function Home() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { notifications, isLoading, isError, markAllAsRead, markAsRead } =
    useNotifications(userId);

  useEffect(() => {
    if (notifications) {
      const unreadCount = notifications.filter((n) => !n.isRead).length;
      document.title = unreadCount
        ? `(${unreadCount}) Powiadomienia - Historycznie`
        : "Powiadomienia - Historycznie";
    }
  }, [notifications, isLoading, isError]);

  return (
    <section className='w-full flex flex-col bg-background2 justify-center items-center min-h-dvh px-2 py-20'>
      <section className='w-full max-w-2xl sm:h-[700px] sm:min-h-0 min-h-[700px] h-auto flex justify-start items-start rounded-2xl flex-col bg-background sm:px-8 px-2 py-12 gap-8'>
        <section className='w-full flex justify-center items-center'>
          <h1 className='font-nunito text-2xl font-extrabold tracking-wide text-center'>
            Powiadomienia
          </h1>
        </section>
        {isLoading || isError || !notifications ? (
          <section className='w-full h-full min-h-[400px] flex justify-center items-center'>
            <LoadingElement variant={"primary"} />
          </section>
        ) : (
          <section className='w-full h-full flex flex-col justify-start items-start gap-2'>
            {notifications.length === 0 ? (
              <section className='w-full h-full min-h-[400px] flex flex-col justify-center items-center gap-4'>
                <FaCircleInfo className='text-4xl text-descriptionColor' />
                <p className='sm:text-base text-sm text-descriptionColor text-center'>
                  Brak powiadomień w ciągu ostatnich 7 dni.
                </p>
              </section>
            ) : (
              <>
                <section className='w-full flex justify-end items-center'>
                  <Button
                    onClick={markAllAsRead}
                    variant='primary'
                    className='max-w-[220px] !text-sm !py-[6px]'
                  >
                    Przeczytaj wszystko
                  </Button>
                </section>
                {notifications.map((notification) => (
                  <section
                    className={`w-full flex gap-2 justify-between items-center border border-borderColor rounded-2xl relative px-2 py-6 ${
                      notification.isRead ? "bg-gray-100" : "bg-background"
                    }`}
                    key={notification.id}
                  >
                    {!notification.isRead && (
                      <Button
                        onClick={() => markAsRead(notification.id)}
                        variant='primary'
                        className='max-w-[46px] absolute right-2 top-2 z-[4] !flex !justify-center !items-center !px-1 !py-[6px]'
                      >
                        <FaCheck className='text-base' />
                      </Button>
                    )}
                    <section className='w-full max-w-[60px] flex justify-center items-start h-full'>
                      <Image
                        src={
                          notification.type === "achievement"
                            ? AchievementIcon
                            : notification.type === "badge"
                            ? AwardIcon
                            : TrumpetIcon
                        }
                        alt='AchievementIcon'
                        className='sm:w-[40px] w-[32px] sm:h-[40px] h-[32px]'
                      />
                    </section>
                    <section className='w-full flex flex-col justify-start items-start gap-4'>
                      <h2
                        className={`font-nunito sm:text-lg text-base ${
                          notification.isRead ? "font-normal" : "font-bold"
                        }`}
                      >
                        {notification.title}
                      </h2>
                      <p className='text-descriptionColor font-light sm:text-base text-sm'>
                        {notification.message}
                      </p>
                      <p className='absolute right-4 bottom-1 text-xs text-descriptionColor'>
                        {new Intl.DateTimeFormat("pl-PL", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }).format(new Date(notification.createdAt))}
                      </p>
                    </section>
                  </section>
                ))}
              </>
            )}
          </section>
        )}
      </section>
    </section>
  );
}
