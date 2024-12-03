import React from "react";
import { useBanners } from "../../hooks/useBanners";
import { usePurchaseBanner } from "../../hooks/usePurchaseBanner";
import LoadingElement from "../elements/loadingElement";
import Image from "next/image";
import CoinsImage from "../../img/5252389.png";
import Button from "../elements/Button";

function BuyAvatars({ userId, userPoints, pointsMutate, addNotification }) {
  const {
    banners,
    isLoading,
    isError,
    mutate: bannersMutate,
  } = useBanners(userId);
  const { purchaseBanner } = usePurchaseBanner();

  const handlePurchase = async (avatar) => {
    if (userPoints < avatar.price) {
      addNotification("Nie masz wystarczającej liczby punktów.");
      return;
    }
    try {
      await purchaseBanner(userId, avatar.id);
      addNotification("Pomyślnie zakupiono baner.", "success");
      bannersMutate();
      pointsMutate();
    } catch (error) {
      addNotification(error.message || "Nie udało się kupić baneru.");
    }
  };

  return (
    <section className='w-full h-full flex flex-col justify-start items-center gap-2 sm:overflow-y-scroll overflow-visible custom-scrollbar'>
      {isLoading || isError || !banners ? (
        <section className='w-full h-full min-h-[420px] flex justify-center items-center'>
          <LoadingElement variant='primary' />
        </section>
      ) : (
        <section
          className={`w-full grid-shop-banners bg-background2 sm:px-0 px-[4px] rounded-2xl py-4 ${
            banners.length > 1 ? "justify-center" : "justify-start"
          }`}
        >
          {banners.map((banner) => (
            <section
              key={banner.id}
              className='border border-borderColor h-[224px] rounded-xl flex overflow-hidden relative'
            >
              <Image
                src={banner.imageUrl}
                alt={banner.name}
                width={686}
                height={224}
                className='w-full h-full object-cover object-center'
              />
              <p className='absolute left-2 top-2 bg-background rounded-2xl px-4 py-1 font-notino font-[600] sm:text-base text-sm'>
                {banner.name}
              </p>
              <div className='absolute right-2 top-2 bg-background rounded-2xl px-3 py-1 flex justify-center items-center gap-1'>
                <Image
                  src={CoinsImage}
                  alt='Coins Image'
                  className='w-auto sm:h-[18px] h-[14px] aspect-square'
                />
                <p className='text-base text-gray-500 font-[500]'>
                  {banner.price}
                </p>
              </div>
              <Button
                onClick={() => handlePurchase(banner)}
                disabled={banner.owned}
                variant={banner.owned ? "secondary" : "primary"}
                className='absolute right-1 bottom-1 max-w-[200px]'
              >
                {banner.owned ? "Posiadane" : "Kup teraz"}
              </Button>
            </section>
          ))}
        </section>
      )}
    </section>
  );
}

export default BuyAvatars;
