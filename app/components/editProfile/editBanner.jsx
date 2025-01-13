import React from "react";
import { usePurchasedBanners } from "../../hooks/usePurchasedBanners";
import { useSetActiveBanner } from "../../hooks/useSetActiveBanner";
import Image from "next/image";
import Button from "../elements/Button";
import MoneyBag from "../../img/money-bag.png";
import LoadingElement from "../elements/loadingElement";
import { toast } from "react-toastify";

function EditBanner({ user, mutateUser }) {
  const { banners, isLoading, isError } = usePurchasedBanners(user.id);

  const { setActiveBanner } = useSetActiveBanner(user.id, mutateUser);

  const handleSetActive = (bannerId) => {
    setActiveBanner(bannerId);
    toast.success("Pomyślnie zmieniono banner.");
  };

  return (
    <section className='w-full h-full flex flex-col justify-start items-center gap-2 overflow-y-scroll custom-scrollbar'>
      {isLoading || isError || !banners ? (
        <section className='w-full h-full flex justify-center items-center'>
          <LoadingElement variant='primary' />
        </section>
      ) : (
        <section
          className={`w-full grid-panel-banners sm:py-12 py-8 sm:px-8 px-4 ${
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
              <p className='absolute left-2 top-2 px-4 py-1 bg-background rounded-2xl font-notino text-start font-[600] sm:text-base text-sm'>
                {banner.name}
              </p>
              <div className='w-full max-w-[200px] sm:right-2 right-1/2 sm:translate-x-0 translate-x-1/2 bottom-2 absolute'>
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
              </div>
            </section>
          ))}
          <section className='p-4 border border-primaryColor rounded-xl flex flex-col justify-between items-center gap-2 relative'>
            <span className='w-full max-w-[80px] px-2 py-[3px] rounded-xl absolute -top-[12px] left-1/2 -translate-x-1/2 text-xs font-bold text-background bg-primaryColor'>
              Nowość
            </span>
            <Image
              src={MoneyBag}
              alt='Money Bag'
              width={80}
              height={80}
              className='sm:w-20 w-16 sm:h-20 h-16'
            />
            <p className='font-notino font-[600] sm:text-base text-sm'>
              Odkryj tła profilu
            </p>
            <div className='w-full max-w-[200px]'>
              <Button
                variant='primary'
                onClick={() => (window.location.href = "/sklep")}
              >
                Sklep
              </Button>
            </div>
          </section>
        </section>
      )}
    </section>
  );
}

export default EditBanner;
