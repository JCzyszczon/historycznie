import React from "react";
import { useBadges } from "../../hooks/useBadges";
import { usePurchaseBadge } from "../../hooks/usePurchaseBadge";
import LoadingElement from "../elements/loadingElement";
import Image from "next/image";
import CoinsImage from "../../img/5252389.png";
import Button from "../elements/Button";

function BuyBadges({ userId, userPoints, pointsMutate, addNotification }) {
  const {
    badges,
    isLoading,
    isError,
    mutate: badgesMutate,
  } = useBadges(userId);
  const { purchaseBadge } = usePurchaseBadge();

  const handlePurchase = async (badge) => {
    if (userPoints < badge.price) {
      addNotification("Nie masz wystarczającej liczby punktów!");
      return;
    }
    try {
      await purchaseBadge(userId, badge.id);
      addNotification("Pomyślnie zakupiono odznakę.", "success");
      badgesMutate();
      pointsMutate();
    } catch (error) {
      addNotification(error.message || "Nie udało się kupić odznaki.");
    }
  };

  return (
    <section className='w-full h-full flex flex-col justify-start items-center gap-2 overflow-y-scroll custom-scrollbar'>
      {isLoading || isError || !badges ? (
        <section className='w-full h-full min-h-[420px] flex justify-center items-center'>
          <LoadingElement variant='primary' />
        </section>
      ) : (
        <section
          className={`w-full ${
            badges.length < 4
              ? "h-full sm:min-h-0 min-h-[600px] sm:px-[53px]"
              : "h-fit sm:px-0"
          } grid-panel-avatars bg-background2 px-[4px] rounded-2xl py-4 ${
            badges.length > 2 ? "justify-center" : "justify-start"
          }`}
        >
          {badges.map((badge) => (
            <section
              key={badge.id}
              className='p-4 border h-min border-borderColor bg-background rounded-xl flex flex-col justify-between items-center gap-6'
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
                onClick={() => handlePurchase(badge)}
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
  );
}

export default BuyBadges;
