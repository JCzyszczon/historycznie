"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import Button from "../../components/elements/Button";
import { AnimatePresence } from "framer-motion";
import RoomModal from "../../components/room/roomModal";
import { useRooms } from "../../hooks/useRooms";
import LoadingElement from "../../components/elements/loadingElement";
import RoomPasswordModal from "../../components/room/roomPasswordModal";
import { useRoomPassword } from "../../hooks/useRoomPassword";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { FaLock, FaUnlock } from "react-icons/fa";
import { toast } from "react-toastify";

export default function Home() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const { rooms, isLoading, isError, mutate } = useRooms();
  const [room, setRoom] = useState();
  const router = useRouter();
  const { joinRoom } = useRoomPassword();

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (isPasswordModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isPasswordModalOpen]);

  const setSelectedRoom = (room) => {
    setRoom(room);
    setIsPasswordModalOpen(true);
  };

  const userJoinRoom = async (room) => {
    try {
      await joinRoom(null, room.id);
      router.push(`/gry-i-wyzwania/gra-quizowa/${room.id}`);
    } catch (error) {
      toast.error(
        error.message || "Wystąpił błąd podczas dołączania do pokoju."
      );
    }
  };

  return (
    <>
      <section className='w-full flex bg-background2 relative justify-center items-center min-h-dvh px-2 py-20'>
        <Link href='/gry-i-wyzwania'>
          <FaArrowLeft className='text-3xl absolute left-5 top-5 hover:text-primaryColor duration-200' />
        </Link>
        <section className='w-full max-w-5xl sm:h-[700px] h-auto sm:min-h-0 min-h-[700px] bg-background rounded-2xl flex flex-col justify-start items-start sm:overflow-hidden overflow-visible z-[1] sm:px-10 px-2 sm:py-10 py-4 gap-10'>
          <section className='w-full flex justify-between items-center gap-2 sm:px-0 px-2'>
            <h1 className='font-nunito sm:text-2xl text-xl font-extrabold tracking-wide text-center'>
              Dostępne pokoje gier
            </h1>
            <Button
              onClick={() => setIsModalOpen(true)}
              className='sm:max-w-[160px] max-w-min !flex !justify-center !items-center'
              variant='primary'
            >
              <p className='sm:flex hidden'>Utwórz</p>
              <FaPlus className='sm:hidden flex' />
            </Button>
          </section>
          {isLoading || isError ? (
            <section className='w-full h-full sm:min-h-0 min-h-[400px] flex justify-center items-center gap-4'>
              <LoadingElement variant='primary' />
            </section>
          ) : (
            <>
              {rooms.length < 1 ? (
                <section className='w-full h-full sm:min-h-0 min-h-[400px] flex flex-col justify-center items-center gap-4'>
                  <FaCircleInfo className='text-4xl text-descriptionColor' />
                  <p className='sm:text-base text-sm text-descriptionColor text-center'>
                    Obecnie nie ma żadnych aktywnych pokojów.
                  </p>
                </section>
              ) : (
                <section className='w-full h-full flex flex-col items-start gap-4 overflow-x-auto custom-scrollbar'>
                  <table className='table-auto w-full text-left border-collapse'>
                    <thead>
                      <tr className='bg-gray-200'>
                        <th className='px-4 py-2 text-center text-[15px]'>
                          Nazwa pokoju
                        </th>
                        <th className='px-4 py-2 text-center text-[15px]'>
                          Liczba pytań
                        </th>
                        <th className='px-4 py-2 text-center text-[15px]'>
                          Kategoria
                        </th>
                        <th className='px-4 py-2 text-center text-[15px]'>
                          Gracze
                        </th>
                        <th className='px-4 py-2 text-center text-[15px]'>
                          Status
                        </th>
                        <th className='px-4 py-2 text-center text-[15px]'></th>
                      </tr>
                    </thead>
                    <tbody>
                      {rooms.map((room) => (
                        <tr key={room.id} className='hover:bg-gray-100'>
                          <td className='border px-4 py-2 text-center text-[15px]'>
                            {room.name}
                          </td>
                          <td className='border px-4 py-2 text-center text-[15px]'>
                            {room.questionsCount}
                          </td>
                          <td className='border px-4 py-2 text-center text-[15px]'>
                            {room.category}
                          </td>
                          <td className='border px-4 py-2 text-center text-[15px]'>
                            {room.players.length}
                          </td>
                          <td className='border px-4 py-2 text-center m-auto text-[15px]'>
                            <div className='w-full flex justify-center items-center'>
                              {room.password ? (
                                <FaLock className='text-xl' />
                              ) : (
                                <FaUnlock className='text-xl' />
                              )}
                            </div>
                          </td>
                          <td className='border px-4 py-2 text-center text-[15px]'>
                            <Button
                              variant='primary'
                              onClick={() => {
                                if (room.password) {
                                  setSelectedRoom(room);
                                } else {
                                  userJoinRoom(room);
                                }
                              }}
                              className='bg-primaryColor text-white py-1 px-3 rounded hover:bg-primaryColor-dark'
                            >
                              Dołącz
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              )}
            </>
          )}
        </section>
      </section>
      <AnimatePresence initial={false} mode='wait' onExitComplete={() => null}>
        {isModalOpen && (
          <RoomModal
            closeModal={() => {
              setIsModalOpen(false);
              mutate();
            }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence initial={false} mode='wait' onExitComplete={() => null}>
        {isPasswordModalOpen && (
          <RoomPasswordModal
            closeModal={() => {
              setIsPasswordModalOpen(false);
              mutate();
            }}
            room={room}
          />
        )}
      </AnimatePresence>
    </>
  );
}
