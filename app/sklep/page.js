"use client";
import React, { useState } from "react";
import CoinsImage from "../img/5252389.png";
import Image from "next/image";
import { useUserPoints } from "../hooks/useUserPoints";
import Button from "../components/elements/Button";
import { useSession } from "next-auth/react";
import BuyAvatars from "../components/shop/buyAvatars";
import BuyBanners from "../components/shop/buyBanners";
import BuyBadges from "../components/shop/buyBadges";
import BuyNews from "../components/shop/buyNews";
import Notification from "../components/notification";
import { FaImagePortrait, FaImage, FaUser, FaMedal } from "react-icons/fa6";
import { IoIosPricetag } from "react-icons/io";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("News");
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { points, isLoading, isError, mutate } = useUserPoints(userId);
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = "error") => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    }, 2000);
  };

  return (
    <section className='w-full flex flex-col bg-background2 justify-center items-center min-h-dvh px-2 py-20'>
      <section className='w-full max-w-5xl sm:h-[700px] h-auto sm:min-h-0 min-h-[700px] bg-background rounded-2xl flex flex-col justify-start items-start sm:overflow-hidden overflow-visible z-[1] sm:px-8 px-2 sm:py-8 py-4 gap-6'>
        <section className='w-full sm:h-[52px] h-auto flex sm:flex-row flex-col-reverse sm:justify-between justify-center sm:items-center items-end gap-2'>
          <section className='w-full max-w-[500px] h-full flex justify-center items-center sm:gap-4 gap-2 bg-background2 rounded-2xl py-1 px-2'>
            <Button
              onClick={() => setActiveCategory("News")}
              variant={activeCategory === "News" ? "primary" : "secondary"}
              className='max-w-[140px] !py-[10px] !sm:text-base !text-sm !flex !justify-center !items-center'
            >
              <p className='sm:flex hidden justify-center items-center'>
                Nowości
              </p>
              <IoIosPricetag className='text-xl sm:hidden flex justify-center items-center' />
            </Button>
            <Button
              onClick={() => setActiveCategory("Avatars")}
              variant={activeCategory === "Avatars" ? "primary" : "secondary"}
              className='max-w-[140px] !py-[10px] !sm:text-base !text-sm !flex !justify-center !items-center'
            >
              <p className='sm:flex hidden justify-center items-center'>
                Awatary
              </p>
              <FaImagePortrait className='text-xl sm:hidden flex justify-center items-center' />
            </Button>
            <Button
              onClick={() => setActiveCategory("Banners")}
              variant={activeCategory === "Banners" ? "primary" : "secondary"}
              className='max-w-[140px] !py-[10px] !sm:text-base !text-sm !flex !justify-center !items-center'
            >
              <p className='sm:flex justify-center items-center hidden'>Tła</p>
              <FaImage className='text-xl sm:hidden flex justify-center items-center' />
            </Button>
            <Button
              onClick={() => setActiveCategory("Badges")}
              variant={activeCategory === "Badges" ? "primary" : "secondary"}
              className='max-w-[140px] !py-[10px] !sm:text-base !text-sm !flex !justify-center !items-center'
            >
              <p className='sm:flex hidden justify-center items-center'>
                Odznaki
              </p>
              <FaMedal className='text-xl sm:hidden flex justify-center items-center' />
            </Button>
          </section>
          <section className='w-full sm:max-w-[160px] max-w-[120px] h-full flex rounded-2xl justify-center py-1 items-center bg-background2 gap-2'>
            <Image
              src={CoinsImage}
              alt='Coins Image'
              className='w-auto sm:h-[28px] h-[22px] aspect-square'
            />
            {isLoading || isError || points < 0 ? (
              <p className='w-[70px] h-[24px] animate-pulse bg-gray-300 rounded-lg'></p>
            ) : (
              <p className='text-textColor font-[600] text-base'>{points}</p>
            )}
          </section>
        </section>
        {activeCategory === "News" ? (
          <BuyNews
            userId={userId}
            pointsMutate={mutate}
            addNotification={addNotification}
          />
        ) : activeCategory === "Avatars" ? (
          <BuyAvatars
            userId={userId}
            pointsMutate={mutate}
            addNotification={addNotification}
          />
        ) : activeCategory === "Banners" ? (
          <BuyBanners
            userId={userId}
            pointsMutate={mutate}
            addNotification={addNotification}
          />
        ) : activeCategory === "Badges" ? (
          <BuyBadges
            userId={userId}
            pointsMutate={mutate}
            addNotification={addNotification}
          />
        ) : (
          <></>
        )}
      </section>
      <Notification notifications={notifications} />
    </section>
  );
}
