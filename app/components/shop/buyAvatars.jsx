import React from "react";
import { useAvatars } from "../../hooks/useAvatars";
import { usePurchaseAvatar } from "../../hooks/usePurchaseAvatar";
import LoadingElement from "../elements/loadingElement";
import Image from "next/image";
import CoinsImage from "../../img/5252389.png";
import Button from "../elements/Button";

function BuyAvatars({ userId, userPoints, pointsMutate, addNotification }) {
  const {
    avatars,
    isLoading,
    isError,
    mutate: avatarsMutate,
  } = useAvatars(userId);
  const { purchaseAvatar } = usePurchaseAvatar();

  const handlePurchase = async (avatar) => {
    if (userPoints < avatar.price) {
      addNotification("Nie masz wystarczającej liczby punktów!");
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

  return (
    <section className='w-full h-full flex flex-col justify-start items-center gap-2 overflow-y-scroll custom-scrollbar'>
      {isLoading || isError || !avatars ? (
        <section className='w-full h-full min-h-[420px] flex justify-center items-center'>
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
                onClick={() => handlePurchase(avatar)}
                disabled={avatar.owned}
                variant={avatar.owned ? "secondary" : "primary"}
              >
                {avatar.owned ? "Posiadane" : "Kup teraz"}
              </Button>
            </section>
          ))}
        </section>
      )}
    </section>
  );
}

export default BuyAvatars;
