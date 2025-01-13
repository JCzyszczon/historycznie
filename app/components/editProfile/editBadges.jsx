import React from "react";
import { useUserBadges } from "../../hooks/useUserBadges";
import { useSetActiveBadge } from "../../hooks/useSetActiveBadge";
import { useRemoveActiveBadge } from "../../hooks/useRemoveActiveBadge";
import { useActiveBadges } from "../../hooks/useActiveBadges";
import Image from "next/image";
import Button from "../elements/Button";
import LoadingElement from "../elements/loadingElement";
import { toast } from "react-toastify";
import { FaCircleInfo } from "react-icons/fa6";

function EditBadges({ user }) {
  const {
    badges,
    isLoading: isUserBadgesLoading,
    isError: isUserBadgesError,
  } = useUserBadges(user.id);
  const {
    activeBadges,
    isLoading: isActiveBadgesLoading,
    isError: isActiveBadgesError,
    mutate: mutateActiveBadges,
  } = useActiveBadges(user.id);
  const { setActiveBadge } = useSetActiveBadge(mutateActiveBadges);
  const { removeActiveBadge } = useRemoveActiveBadge(mutateActiveBadges);

  const handleSetActiveBadge = async (userId, badgeId) => {
    try {
      const result = await setActiveBadge(userId, badgeId);
      if (result) {
        toast.success(result.message || "Pomyślnie ustawiono odznakę.");
      }
    } catch (error) {
      toast.error(error.message || "Bład podczas ustawiania odznaki.");
    }
  };

  const handleRemoveActiveBadge = async (userId, badgeId) => {
    try {
      const result = await removeActiveBadge(userId, badgeId);
      if (result) {
        toast.success(result.message || "Pomyślnie usunięto odznakę.");
      }
    } catch (error) {
      toast.error(error.message || "Błąd podczas usuwania odznaki.");
    }
  };

  console.log(
    isUserBadgesLoading,
    isUserBadgesError,
    isActiveBadgesLoading,
    isActiveBadgesError,
    badges,
    activeBadges
  );

  return (
    <section className='w-full h-full flex flex-col justify-start items-center gap-2 overflow-y-scroll custom-scrollbar'>
      {isUserBadgesLoading ||
      isUserBadgesError ||
      isActiveBadgesLoading ||
      isActiveBadgesError ? (
        <section className='w-full h-full flex justify-center items-center'>
          <LoadingElement variant='primary' />
        </section>
      ) : (
        <>
          {badges.length === 0 || !activeBadges ? (
            <section className='w-full h-full sm:min-h-0 min-h-[400px] flex flex-col justify-center items-center gap-4'>
              <FaCircleInfo className='text-4xl text-descriptionColor' />
              <p className='sm:text-base text-sm text-descriptionColor text-center'>
                Nie posiadasz jeszcze żadnych odznak.
              </p>
            </section>
          ) : (
            <section
              className={`w-full grid-panel-avatars sm:py-12 py-8 sm:px-8 px-4 ${
                badges.length > 2 ? "justify-center" : "justify-start"
              }`}
            >
              {badges.map((badge) => {
                const isActive = activeBadges.some(
                  (activeBadge) => activeBadge.id === badge.id
                );

                return (
                  <section
                    key={badge.id}
                    className='p-4 border border-borderColor rounded-xl flex flex-col justify-between items-center gap-6'
                  >
                    <div className='flex flex-col justify-between items-center gap-3'>
                      <Image
                        src={badge.iconUrl}
                        alt={badge.name}
                        width={160}
                        height={160}
                        className='sm:w-20 w-16 sm:h-20 h-16 rounded-full'
                      />
                      <h4 className='font-notino font-[600] sm:text-base text-sm'>
                        {badge.name}
                      </h4>
                    </div>
                    <Button
                      variant={isActive ? "secondary" : "primary"}
                      onClick={() =>
                        isActive
                          ? handleRemoveActiveBadge(user.id, badge.id)
                          : handleSetActiveBadge(user.id, badge.id)
                      }
                      className='mt-2'
                    >
                      {isActive ? "Usuń" : "Wybierz"}
                    </Button>
                  </section>
                );
              })}
            </section>
          )}
        </>
      )}
    </section>
  );
}

export default EditBadges;
