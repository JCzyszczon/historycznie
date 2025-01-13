"use client";
import React, { useState, useEffect } from "react";
import { useGetAllEras } from "../../hooks/useGetAllEras";
import LoadingElement from "../../components/elements/loadingElement";
import Image from "next/image";
import Button from "../../components/elements/Button";
import { FaPlay, FaPlus } from "react-icons/fa6";
import Link from "next/link";
import { useSession } from "next-auth/react";
import AddEraModal from "../../components/era/addEraModal";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const { data: session } = useSession();
  const { eras, isLoading, isError, mutate } = useGetAllEras();
  const [isAddEraModalOpen, setIsAddEraModalOpen] = useState(false);

  useEffect(() => {
    if (isAddEraModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isAddEraModalOpen]);

  return (
    <>
      <section className='w-full flex bg-background2 justify-center items-start min-h-dvh px-2 sm:pt-40 pt-20 pb-20'>
        <section className='w-full max-w-5xl h-full sm:min-h-[640px] min-h-[640px] bg-background rounded-2xl flex flex-col justify-start sm:items-start items-center sm:overflow-y-scroll custom-scrollbar overflow-visible z-[1] sm:px-10 px-2 py-10 gap-10'>
          <section className='w-full flex justify-between items-center gap-4 sm:px-0 px-2'>
            <h1 className='font-nunito text-2xl font-extrabold tracking-wide text-center'>
              Epoki historyczne
            </h1>
            {session?.user?.role === "admin" && (
              <Button
                onClick={() => setIsAddEraModalOpen(true)}
                className='sm:!max-w-[120px] !max-w-[60px] !py-2 !flex !justify-center !items-center'
                variant='primary'
              >
                <span className='sm:flex hidden'>Dodaj</span>
                <FaPlus className='text-xl sm:hidden flex' />
              </Button>
            )}
          </section>
          {!isLoading && !isError && eras ? (
            <section className='w-full h-full grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:justify-start justify-center items-start gap-4 lg:pb-0 sm:pb-[900px] pb-0'>
              {eras.map((era) => (
                <section
                  key={era.id}
                  className='w-full h-[420px] flex flex-col gap-4 justify-start items-center rounded-xl bg-background2 overflow-hidden'
                >
                  <section className='w-full h-full max-h-[50%] relative'>
                    <Image
                      src={era.imageUrl}
                      alt={`${era.name} Image`}
                      width={600}
                      height={300}
                      className='w-full h-full object-cover brightness-90'
                    />
                    <Link href={`/lekcje/${era.id}${era.pageUrl}`}>
                      <Button
                        variant='primary'
                        className='!w-[46px] !h-[46px] !flex !justify-center !items-center !p-0 absolute right-2 bottom-2'
                      >
                        <FaPlay className='text-2xl' />
                      </Button>
                    </Link>
                  </section>
                  <section className='w-full h-full flex flex-col gap-3 justify-start items-center px-2'>
                    <h2 className='text-xl font-nunito font-extrabold tracking-wide'>
                      {era.name}
                    </h2>
                    <section className='w-full min-h-[140px] rounded-lg flex bg-background justify-start items-start p-2 mx-4'>
                      <p className='text-sm text-descriptionColor font-[500]'>
                        {era.description}
                      </p>
                    </section>
                  </section>
                </section>
              ))}
            </section>
          ) : (
            <section className='w-full h-full min-h-[400px] flex justify-center items-center'>
              <LoadingElement variant='primary' />
            </section>
          )}
        </section>
      </section>
      <AnimatePresence initial={false} mode='wait' onExitComplete={() => null}>
        {isAddEraModalOpen && (
          <AddEraModal
            mutateEras={mutate}
            closeAddEraModal={() => {
              setIsAddEraModalOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
