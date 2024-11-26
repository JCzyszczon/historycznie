import React from "react";
import { usePurchasedBanners } from "../../hooks/usePurchasedBanners";
import { useSetActiveBanner } from "../../hooks/useSetActiveBanner";
import Image from "next/image";
import Button from "../elements/Button";
import MoneyBag from "../../img/money-bag.png";
import LoadingElement from "../elements/loadingElement";

function EditBanner({ user, mutateUser }) {
  const { banners, isLoading, isError } = usePurchasedBanners(user.id);

  const { setActiveBanner } = useSetActiveBanner(user.id, mutateUser);

  const handleSetActive = (bannerId) => {
    setActiveBanner(bannerId);
  };

  return (
    <section className='w-full flex flex-col justify-start items-center gap-2 overflow-y-scroll custom-scrollbar'>
      {isLoading || isError || !banners ? (
        <section className='w-full h-full flex justify-center items-center'>
          <LoadingElement variant='primary' />
        </section>
      ) : (
        <section
          className={`w-full grid-panel sm:py-12 py-8 sm:px-8 px-4 ${
            banners.length > 1 ? "justify-center" : "justify-start"
          }`}
        >
          {banners.map((banner) => (
            <section
              key={banner.id}
              className='p-4 border border-borderColor rounded-xl flex flex-col justify-between items-center gap-6'
            >
              <div className='flex flex-col justify-between items-center gap-3'>
                <Image
                  src={banner.imageUrl}
                  alt={banner.name}
                  width={80}
                  height={80}
                  className='sm:w-20 w-16 sm:h-20 h-16 rounded-full'
                />
                <p className='font-notino font-[600] sm:text-base text-sm'>
                  {banner.name}
                </p>
              </div>
              {banner.imageUrl === user.activeBanner.imageUrl ? (
                <Button variant='secondary' disabled>
                  Aktywny
                </Button>
              ) : (
                <Button
                  onClick={() => handleSetActive(banner.id)}
                  variant='primary'
                >
                  Wybierz
                </Button>
              )}
            </section>
          ))}
        </section>
      )}
    </section>
  );
}

export default EditBanner;
