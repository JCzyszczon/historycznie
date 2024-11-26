import React from "react";
import { usePurchasedAvatars } from "../../hooks/usePurchasedAvatars";
import { useSetActiveAvatar } from "../../hooks/useSetActiveAvatar";
import Image from "next/image";
import Button from "../elements/Button";
import MoneyBag from "../../img/money-bag.png";

function EditAvatar({ user, mutateUser }) {
  const { avatars, isLoading, isError } = usePurchasedAvatars(user.id);

  const { setActiveAvatar } = useSetActiveAvatar(user.id, mutateUser);

  const handleSetActive = (avatarId) => {
    setActiveAvatar(avatarId);
  };

  return (
    <section className='w-full flex flex-col justify-start items-center gap-2 overflow-y-scroll custom-scrollbar'>
      {isLoading || isError || !avatars ? (
        <p>Ładowanie...</p>
      ) : (
        <section
          className={`w-full grid-panel sm:py-12 py-8 sm:px-8 px-4 ${
            avatars.length > 1 ? "justify-center" : "justify-start"
          }`}
        >
          {avatars.map((avatar) => (
            <section
              key={avatar.id}
              className='p-4 border border-borderColor rounded-xl flex flex-col justify-between items-center gap-6'
            >
              <div className='flex flex-col justify-between items-center gap-3'>
                <Image
                  src={avatar.imageUrl}
                  alt={avatar.name}
                  width={80}
                  height={80}
                  className='sm:w-20 w-16 sm:h-20 h-16 rounded-full'
                />
                <p className='font-notino font-[600] sm:text-base text-sm'>
                  {avatar.name}
                </p>
              </div>
              {avatar.imageUrl === user.activeAvatar.imageUrl ? (
                <Button variant='secondary' disabled>
                  Aktywny
                </Button>
              ) : (
                <Button
                  onClick={() => handleSetActive(avatar.id)}
                  variant='primary'
                >
                  Wybierz
                </Button>
              )}
            </section>
          ))}
          <div className='p-4 border border-primaryColor rounded-xl flex flex-col justify-between items-center gap-2 relative'>
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
              Odkryj przedmioty
            </p>
            <Button variant='primary'>Sklep</Button>
          </div>
        </section>
      )}
    </section>
  );
}

export default EditAvatar;
