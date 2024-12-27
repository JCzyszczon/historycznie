import React from "react";
import { useAvatars } from "../../hooks/useAvatars";
import { usePurchaseAvatar } from "../../hooks/usePurchaseAvatar";
import { useBanners } from "../../hooks/useBanners";
import { usePurchaseBanner } from "../../hooks/usePurchaseBanner";
import { useBadges } from "../../hooks/useBadges";
import { usePurchaseBadge } from "../../hooks/usePurchaseBadge";
import LoadingElement from "../elements/loadingElement";
import Image from "next/image";
import CoinsImage from "../../img/5252389.png";
import Button from "../elements/Button";

function BuyNews({ userId, userPoints, pointsMutate, addNotification }) {
  const {
    avatars,
    isLoading: isLoadingAvatars,
    isError: isErrorAvatars,
    mutate: avatarsMutate,
  } = useAvatars(userId, 4);
  const { purchaseAvatar } = usePurchaseAvatar();

  const {
    banners,
    isLoading: isLoadingBanners,
    isError: isErrorBanners,
    mutate: bannersMutate,
  } = useBanners(userId, 1);
  const { purchaseBanner } = usePurchaseBanner();

  const {
    badges,
    isLoading: isLoadingBadges,
    isError: isErrorBadges,
    mutate: badgesMutate,
  } = useBadges(userId, 2);
  const { purchaseBadge } = usePurchaseBadge();

  const handlePurchaseAvatar = async (avatar) => {
    if (userPoints < avatar.price) {
      addNotification("Nie masz wystarczającej liczby punktów.");
      return;
    }
    try {
      await purchaseAvatar(userId, avatar.id);
      addNotification("Pomyślnie zakupiono awatar.", "success");
      avatarsMutate();
      pointsMutate();
    } catch (error) {
      addNotification(error.message || "Nie udało się kupić awatara.");
    }
  };

  const handlePurchaseBanner = async (avatar) => {
    if (userPoints < avatar.price) {
      addNotification("Nie masz wystarczającej liczby punktów.");
      return;
    }
    try {
      await purchaseBanner(userId, avatar.id);
      addNotification("Pomyślnie zakupiono baner", "success");
      bannersMutate();
      pointsMutate();
    } catch (error) {
      addNotification(error.message || "Nie udało się kupić baneru.");
    }
  };

  const handlePurchaseBadge = async (badge) => {
    if (userPoints < badge.price) {
      addNotification("Nie masz wystarczającej liczby punktów.");
      return;
    }
    try {
      await purchaseBadge(userId, badge.id);
      addNotification("Pomyślnie zakupiono odznakę", "success");
      badgesMutate();
      pointsMutate();
    } catch (error) {
      addNotification(error.message || "Nie udało się kupić baneru.");
    }
  };

  return (
    <section className='w-full h-full flex sm:flex-row flex-col justify-start items-start gap-2 overflow-y-scroll custom-scrollbar'>
      {isLoadingAvatars || isErrorAvatars || !avatars ? (
        <section className='w-full h-full min-h-[496px] flex justify-center items-center'>
          <LoadingElement variant='primary' />
        </section>
      ) : (
        <section
          className={`w-full grid-panel-avatars bg-background2 sm:px-0 px-[4px] rounded-2xl py-4 ${
            avatars.length > 1 ? "justify-center" : "justify-start"
          }`}
        >
          {avatars.map((avatar) => (
            <section
              key={avatar.id}
              className='p-4 border border-borderColor bg-background rounded-xl flex flex-col justify-between items-center gap-6'
            >
              <div className='flex flex-col justify-between items-center'>
                <Image
                  src={avatar.imageUrl}
                  alt={avatar.name}
                  width={80}
                  height={80}
                  className='sm:w-20 w-16 sm:h-20 h-16 rounded-full'
                />
                <p className='font-notino font-[600] sm:text-base text-sm mt-2'>
                  {avatar.name}
                </p>
                <div className='flex justify-center items-center gap-1 pt-1'>
                  <Image
                    src={CoinsImage}
                    alt='Coins Image'
                    className='w-auto sm:h-[18px] h-[14px] aspect-square'
                  />
                  <p className='text-base text-gray-500 font-[500]'>
                    {avatar.price}
                  </p>
                </div>
              </div>
              <Button
                onClick={() => handlePurchaseAvatar(avatar)}
                disabled={avatar.owned}
                variant={avatar.owned ? "secondary" : "primary"}
              >
                {avatar.owned ? "Posiadane" : "Kup teraz"}
              </Button>
            </section>
          ))}
        </section>
      )}
      <section className='w-full h-full flex flex-col gap-2 justify-start items-center'>
        {isLoadingBanners || isErrorBanners || !banners ? (
          <section className='w-full h-full min-h-[280px] flex justify-center items-center'>
            <LoadingElement variant='primary' />
          </section>
        ) : (
          <section className='w-full grid-shop-banners bg-background2 sm:px-[2px] px-[4px] rounded-2xl py-4 justify-center'>
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
                  onClick={() => handlePurchaseBanner(banner)}
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
        {isLoadingBadges || isErrorBadges || !badges ? (
          <section className='w-full h-full flex justify-center items-center'>
            <LoadingElement variant='primary' />
          </section>
        ) : (
          <section
            className={`w-full grid-panel-avatars bg-background2 sm:px-3 px-[4px] rounded-2xl py-4 ${
              badges.length > 1 ? "justify-center" : "justify-start"
            }`}
          >
            {badges.map((badge) => (
              <section
                key={badge.id}
                className='p-4 border border-borderColor bg-background rounded-xl flex flex-col justify-between items-center gap-6'
              >
                <div className='flex flex-col justify-between items-center'>
                  <Image
                    src={badge.iconUrl}
                    alt={badge.name}
                    width={160}
                    height={160}
                    className='sm:w-20 w-16 sm:h-20 h-16 rounded-full'
                  />
                  <p className='font-notino font-[600] sm:text-base text-sm mt-2'>
                    {badge.name}
                  </p>
                  <div className='flex justify-center items-center gap-1 pt-1'>
                    <Image
                      src={CoinsImage}
                      alt='Coins Image'
                      className='w-auto sm:h-[18px] h-[14px] aspect-square'
                    />
                    <p className='text-base text-gray-500 font-[500]'>
                      {badge.price}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => handlePurchaseBadge(badge)}
                  disabled={badge.owned}
                  variant={badge.owned ? "secondary" : "primary"}
                >
                  {badge.owned ? "Posiadane" : "Kup teraz"}
                </Button>
              </section>
            ))}
          </section>
        )}
      </section>
    </section>
  );
}

export default BuyNews;
