"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useUser } from "../../hooks/useUser";
import { useSession } from "next-auth/react";
import { MdEdit } from "react-icons/md";
import { FaClock } from "react-icons/fa6";

export default function Home() {
  const { data: session } = useSession();
  const params = useParams();
  const userId = params.id;
  const { user, isLoading } = useUser(userId);

  return (
    <section className='w-full flex flex-col bg-background2 justify-center items-center min-h-dvh px-2 py-20'>
      <section className='w-full max-w-5xl min-h-[624px] bg-background rounded-2xl flex flex-col justify-start items-center overflow-hidden z-[1]'>
        <section className='w-full profileBackground h-[312px] relative'>
          {!isLoading && session && userId === session.user.id && (
            <div className='absolute right-4 top-4 bg-background rounded-lg p-1 flex items-center border border-borderColor group cursor-pointer z-[2]'>
              <MdEdit className='text-xl text-descriptionColor group-hover:text-primaryColor duration-200' />
              <div className='overflow-hidden max-w-0 group-hover:max-w-[100px] transition-[max-width] duration-500'>
                <p className='ml-2 text-sm font-medium text-descriptionColor'>
                  Edytuj
                </p>
              </div>
            </div>
          )}
          <section className='absolute sm:left-4 left-1/2 sm:translate-x-0 -translate-x-1/2 top-4 h-[280px] bg-[#ffffffdd] drop-shadow-lg rounded-3xl w-full max-w-[240px] border border-borderColor gap-4 flex flex-col justify-start items-center px-4 py-4'>
            <div className='h-full'>
              {isLoading ? (
                <div className='w-[110px] h-[110px] rounded-full bg-gray-300 animate-pulse'></div>
              ) : (
                <div className='w-[110px] h-[110px] rounded-full bg-primaryColor'></div>
              )}
            </div>
            <section className='flex h-full flex-col justify-between items-start gap-2'>
              <div className='w-full flex flex-col justify-start items-center gap-1'>
                {isLoading ? (
                  <h1 className='w-[120px] h-[32px] bg-gray-300 animate-pulse rounded-lg'></h1>
                ) : (
                  <h1 className='text-2xl w-full max-w-[180px] overflow-hidden text-ellipsis text-nowrap font-bold text-center font-nunito'>
                    {user.username}
                  </h1>
                )}
                {isLoading ? (
                  <h2 className='w-[160px] h-[28px] bg-gray-300 animate-pulse rounded-lg'></h2>
                ) : (
                  <h2 className='text-lg text-center w-full max-w-[180px] overflow-hidden text-ellipsis text-nowrap font-medium text-descriptionColor'>
                    {user.name + " " + user.surname}
                  </h2>
                )}
              </div>
              {isLoading ? (
                <p className='w-[170px] h-[20px] bg-gray-300 animate-pulse rounded-lg'></p>
              ) : (
                <div className='flex gap-2 justify-center items-center'>
                  <FaClock className='text-sm text-descriptionColor' />
                  <h3 className='text-xs font-medium text-descriptionColor'>
                    Dołączył{" "}
                    {new Intl.DateTimeFormat("pl-PL", {
                      month: "long",
                      year: "numeric",
                    }).format(new Date(user.createdAt))}
                  </h3>
                </div>
              )}
            </section>
          </section>
        </section>
        <p>T1</p>
      </section>
    </section>
  );
}
