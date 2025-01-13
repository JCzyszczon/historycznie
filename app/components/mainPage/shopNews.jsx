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
import { toast } from "react-toastify";

function ShopNews({ userId, userPoints, pointsMutate }) {
  const {
    avatars,
    isLoading: isLoadingAvatars,
    isError: isErrorAvatars,
    mutate: avatarsMutate,
  } = useAvatars(userId, 1);
  const { purchaseAvatar } = usePurchaseAvatar();

  const {
    banners,
    isLoading: isLoadingBanners,
    isError: isErrorBanners,
    mutate: bannersMutate,
  } = useBanners(userId, 2);
  const { purchaseBanner } = usePurchaseBanner();

  const {
    badges,
    isLoading: isLoadingBadges,
    isError: isErrorBadges,
    mutate: badgesMutate,
  } = useBadges(userId, 1);
  const { purchaseBadge } = usePurchaseBadge();

  const handlePurchaseAvatar = async (avatar) => {
    if (userPoints < avatar.price) {
      toast.error("Nie masz wystarczającej liczby punktów!");
      return;
    }
    try {
      await purchaseAvatar(userId, avatar.id);
      toast.success("Pomyślnie zakupiono awatar.");
      avatarsMutate();
      pointsMutate();
    } catch (error) {
      toast.error(error.message || "Nie udało się kupić awatara.");
    }
  };

  const handlePurchaseBanner = async (avatar) => {
    if (userPoints < avatar.price) {
      toast.error("Nie masz wystarczającej liczby punktów!");
      return;
    }
    try {
      await purchaseBanner(userId, avatar.id);
      toast.success("Pomyślnie zakupiono baner.");
      bannersMutate();
      pointsMutate();
    } catch (error) {
      toast.error(error.message || "Nie udało się kupić baneru.");
    }
  };

  const handlePurchaseBadge = async (badge) => {
    if (userPoints < badge.price) {
      toast.error("Nie masz wystarczającej liczby punktów!");
      return;
    }
    try {
      await purchaseBadge(userId, badge.id);
      toast.success("Pomyślnie zakupiono odznakę.");
      badgesMutate();
      pointsMutate();
    } catch (error) {
      toast.error(error.message || "Nie udało się kupić odznaki.");
    }
  };

  console.log(avatars, badges, banners);

  return (
    <section className='w-full h-full grid sm:grid-cols-[1fr_2fr] grid-cols-1 justify-center items-center gap-1'>
      {isLoadingAvatars ||
      isLoadingBadges ||
      isErrorBadges ||
      isErrorAvatars ||
      !badges ||
      !avatars ? (
        <section className='w-full h-full sm:min-h-[496px] min-h-[224px] flex justify-center items-center'>
          <LoadingElement variant='primary' />
        </section>
      ) : (
        <section className='w-full grid sm:grid-cols-1 grid-cols-2 auto-cols-fr gap-1 bg-background2 px-1 rounded-2xl py-1 justify-center'>
          <section className='p-4 h-full border border-borderColor bg-background rounded-xl flex flex-col justify-between items-center gap-6'>
            <div className='flex flex-col justify-between items-center'>
              <Image
                src={avatars[0].imageUrl}
                alt={avatars[0].name}
                width={80}
                height={80}
                className='sm:w-[64px] w-[52px] sm:h-[64px] h-[52px] rounded-full'
              />
              <p className='font-notino font-[600] sm:text-base text-sm mt-2'>
                {avatars[0].name}
              </p>
              <div className='flex justify-center items-center gap-1 pt-1'>
                <Image
                  src={CoinsImage}
                  alt='Coins Image'
                  className='w-auto sm:h-[18px] h-[14px] aspect-square'
                />
                <p className='text-base text-gray-500 font-[500]'>
                  {avatars[0].price}
                </p>
              </div>
            </div>
            <Button
              onClick={() => handlePurchaseAvatar(avatars[0])}
              disabled={avatars[0].owned}
              variant={avatars[0].owned ? "secondary" : "primary"}
            >
              {avatars[0].owned ? "Posiadane" : "Kup teraz"}
            </Button>
          </section>
          <section className='p-4 border border-borderColor bg-background rounded-xl flex flex-col justify-between items-center gap-6'>
            <div className='flex flex-col justify-between items-center'>
              <Image
                src={badges[0].iconUrl}
                alt={badges[0].name}
                width={80}
                height={80}
                className='sm:w-[64px] w-[52px] sm:h-[64px] h-[52px] rounded-full'
              />
              <p className='font-notino font-[600] sm:text-base text-sm mt-2'>
                {badges[0].name}
              </p>
              <div className='flex justify-center items-center gap-1 pt-1'>
                <Image
                  src={CoinsImage}
                  alt='Coins Image'
                  className='w-auto sm:h-[18px] h-[14px] aspect-square'
                />
                <p className='text-base text-gray-500 font-[500]'>
                  {badges[0].price}
                </p>
              </div>
            </div>
            <Button
              onClick={() => handlePurchaseBadge(badges[0])}
              disabled={badges[0].owned}
              variant={badges[0].owned ? "secondary" : "primary"}
            >
              {badges[0].owned ? "Posiadane" : "Kup teraz"}
            </Button>
          </section>
        </section>
      )}
      <section className='w-full h-full flex flex-col gap-2 justify-start items-center'>
        {isLoadingBanners || isErrorBanners || !banners ? (
          <section className='w-full h-full sm:min-h-[280px] min-h-[236px] flex justify-center items-center'>
            <LoadingElement variant='primary' />
          </section>
        ) : (
          <>
            <section className='w-full h-full sm:hidden'>
              <section
                key={banners[0].id}
                className='w-full border border-borderColor h-[232px] first:mb-1 rounded-xl flex overflow-hidden relative'
              >
                <Image
                  src={banners[0].imageUrl}
                  alt={banners[0].name}
                  width={686}
                  height={224}
                  className='w-full h-full object-cover object-center'
                />
                <p className='absolute left-2 top-2 bg-background rounded-2xl px-4 py-1 font-notino font-[600] sm:text-base text-sm'>
                  {banners[0].name}
                </p>
                <div className='absolute right-2 top-2 bg-background rounded-2xl px-3 py-1 flex justify-center items-center gap-1'>
                  <Image
                    src={CoinsImage}
                    alt='Coins Image'
                    className='w-auto sm:h-[18px] h-[14px] aspect-square'
                  />
                  <p className='text-base text-gray-500 font-[500]'>
                    {banners[0].price}
                  </p>
                </div>
                <Button
                  onClick={() => handlePurchaseBanner(banners[0])}
                  disabled={banners[0].owned}
                  variant={banners[0].owned ? "secondary" : "primary"}
                  className='absolute right-1 bottom-1 max-w-[200px]'
                >
                  {banners[0].owned ? "Posiadane" : "Kup teraz"}
                </Button>
              </section>
            </section>

            <section className='w-full h-full sm:grid hidden sm:grid-cols-1 bg-background2 gap-1 px-1 rounded-2xl py-1 justify-center items-center'>
              {banners.map((banner) => (
                <section
                  key={banner.id}
                  className='w-full border border-borderColor h-[232px] rounded-xl flex overflow-hidden relative'
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
          </>
        )}
      </section>
    </section>
  );
}

export default ShopNews;
