"use client";

import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { FaArrowLeft } from "react-icons/fa";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import LoadingElement from "../../../components/elements/loadingElement";
import Button from "../../../components/elements/Button";
import { FaLock, FaUnlock } from "react-icons/fa";
import KingImage from "../../../img/king.png";
import CrownHost from "../../../img/crown-host.png";
import { MdEdit } from "react-icons/md";
import RoomEditModal from "../../../components/room/roomEditModal";
import { AnimatePresence } from "framer-motion";

const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL, {
  transports: ["websocket"],
  reconnection: true,
});

export default function Home() {
  const { data: session, status } = useSession(); // Sprawdzamy status sesji
  const router = useRouter();
  const params = useParams();
  const userId = session?.user?.id;
  const roomId = params?.id;

  const [players, setPlayers] = useState([]);
  const [roomInfo, setRoomInfo] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRoomEditModalOpen, setIsRoomEditModalOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (isRoomEditModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isRoomEditModalOpen]);

  useEffect(() => {
    socket.on("roomSettingsUpdated", (updatedRoom) => {
      setRoomInfo(updatedRoom); // Aktualizowanie danych pokoju w stanie
    });

    return () => {
      socket.off("roomSettingsUpdated"); // Oczyszczanie po zakończeniu komponentu
    };
  }, []);

  useEffect(() => {
    socket.on("roomMessage", (messageData) => {
      setMessages((prevMessages) => [...prevMessages, messageData.message]);
    });

    return () => {
      socket.off("roomMessage");
    };
  }, []);

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    const initializeRoom = () => {
      if (!userId || !roomId) {
        setError("Missing user ID or room ID.");
        setIsLoading(false);
        return;
      }

      socket.emit("joinRoom", { roomId, userId });

      socket.on("roomInfo", (info) => {
        setRoomInfo(info);
      });

      socket.on("roomPlayersUpdate", (updatedPlayers) => {
        setPlayers(updatedPlayers);
        setIsLoading(false);
      });

      socket.on("error", (errMsg) => {
        setError(errMsg);
        setIsLoading(false);
      });

      socket.on("roomClosed", (data) => {
        console.log(data.message);
        router.push("/gry-i-wyzwania/gra-quizowa");
      });

      return () => {
        socket.emit("leaveRoom", { roomId, userId });
        socket.off("roomInfo");
        socket.off("roomPlayersUpdate");
        socket.off("roomClosed");
        socket.off("error");
      };
    };

    initializeRoom();

    const handleBeforeUnload = () => {
      socket.emit("leaveRoom", { roomId, userId });
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [userId, roomId, status]);

  const handleLeaveRoom = () => {
    socket.emit("leaveRoom", { roomId, userId });
    router.push("/gry-i-wyzwania/gra-quizowa");
  };

  const handleSaveRoomSettings = (updatedRoomData) => {
    socket.emit("updateRoomSettings", { roomId, updatedRoomData });
    console.log("Zaktualizowano dane pokoju:", updatedRoomData);
    //console.log(updatedRoomData);
  };

  if (error) {
    return <p className='text-red-500'>Error: {error}</p>;
  }

  console.log(players);
  //console.log(roomInfo);

  return (
    <>
      <section className='w-full flex bg-background2 relative justify-center items-center min-h-dvh px-2 py-20'>
        <button
          onClick={handleLeaveRoom}
          className='text-3xl absolute left-5 top-5 hover:text-primaryColor duration-200'
        >
          <FaArrowLeft />
        </button>
        {isLoading || status === "loading" ? (
          <section className='flex flex-col justify-center items-center gap-4'>
            <LoadingElement variant='primary' />
            <h2 className='text-descriptionColor text-lg font-bold'>
              Dołączanie...
            </h2>
          </section>
        ) : (
          <section className='w-full max-w-5xl sm:h-[700px] h-auto sm:min-h-0 min-h-[700px] bg-background rounded-2xl flex sm:flex-row flex-col-reverse sm:justify-normal justify-end sm:overflow-hidden p-4 gap-4'>
            <section className='w-full h-full flex flex-col gap-6 justify-start items-start'>
              <section className='w-full h-full flex flex-col justify-between items-start gap-4 px-0 pt-6'>
                <h2 className='text-center text-xl font-nunito font-extrabold tracking-wide pl-2'>
                  Lista graczy:
                </h2>
                <section className='w-full h-full sm:max-h-none max-h-[220px] min-h-[200px] overflow-y-scroll custom-scrollbar px-4 py-4 flex flex-col justify-start items-start gap-4'>
                  {players.map((player, index) => (
                    <section
                      key={index}
                      className='w-full flex gap-4 justify-between items-center'
                    >
                      <section className='w-full flex justify-start items-center gap-4'>
                        <Image
                          src={player.user?.activeAvatar.imageUrl}
                          alt={player.user?.activeAvatar.name}
                          width={38}
                          height={38}
                          className='w-[38px] h-[38px]'
                        />
                        <p className='text-textColor font-[500]'>
                          {player.user?.username || "Nieznany gracz"}
                        </p>
                      </section>
                      {player.isHost && (
                        <Image
                          src={CrownHost}
                          alt='Host Crown'
                          width={40}
                          height={40}
                          className='w-[34px] h-[34px]'
                        />
                      )}
                    </section>
                  ))}
                </section>
                <section className='w-full sm:h-full sm:max-h-[200px] h-[200px] bg-background2 rounded-2xl flex flex-col justify-start items-start gap-2 overflow-y-scroll custom-scrollbar px-4 py-2'>
                  <section className='w-full flex justify-start items-start'>
                    <h3 className='text-base font-nunito font-extrabold tracking-wide'>
                      Komunikaty:
                    </h3>
                  </section>
                  <section className='w-full flex flex-col justify-start items-start gap-2'>
                    {messages.map((message, index) => (
                      <p key={index} className='text-descriptionColor'>
                        {message}
                      </p>
                    ))}
                  </section>
                </section>
              </section>
            </section>
            <section className='w-full sm:max-w-[460px] max-w-none flex flex-col justify-between items-start bg-background2 rounded-2xl py-8 px-4 gap-8 relative'>
              {roomInfo.hostId === userId && (
                <button
                  onClick={() => setIsRoomEditModalOpen(true)}
                  className='absolute right-4 top-4 bg-background rounded-lg p-1 flex items-center border border-borderColor group cursor-pointer z-[2]'
                >
                  <MdEdit className='text-xl text-descriptionColor group-hover:text-primaryColor duration-200' />
                  <div className='overflow-hidden max-w-0 group-hover:max-w-[100px] transition-[max-width] duration-500'>
                    <p className='ml-2 text-sm font-medium text-descriptionColor'>
                      Edytuj
                    </p>
                  </div>
                </button>
              )}
              <section className='w-full flex flex-col justify-start items-start gap-4'>
                <section className='w-full flex justify-center items-center'>
                  <h2 className='text-center text-2xl font-nunito font-extrabold tracking-wide'>
                    Informacje o grze
                  </h2>
                </section>
                <section className='w-full flex justify-start items-start gap-3 bg-background rounded-md px-4 py-4 mt-4'>
                  <h4 className='font-bold'>Nazwa pokoju:</h4>
                  <p>{roomInfo.name || "Brak danych"}</p>
                </section>
                <section className='w-full grid-room-sqares sm:justify-start justify-center items-start gap-2'>
                  <section className='w-full h-[110px] bg-background text-descriptionColor rounded-lg flex justify-center items-center relative'>
                    {roomInfo.password ? (
                      <FaLock className='text-3xl -translate-y-[6px]' />
                    ) : (
                      <FaUnlock className='text-3xl -translate-y-[6px]' />
                    )}
                    <h4 className='text-sm font-extrabold text-descriptionColor absolute bottom-2 left-1/2 -translate-x-1/2'>
                      Status
                    </h4>
                  </section>
                  <section className='w-full h-full max-h-[140px] bg-background text-descriptionColor rounded-lg flex justify-center items-center relative'>
                    <p className='text-4xl -translate-y-[6px]'>
                      {roomInfo.questionsCount || "Brak danych"}
                    </p>
                    <h4 className='text-sm font-extrabold text-descriptionColor absolute bottom-2 left-1/2 -translate-x-1/2'>
                      Pytania
                    </h4>
                  </section>
                  <section className='w-full h-full max-h-[140px] bg-background text-descriptionColor rounded-lg flex justify-center items-center relative'>
                    <Image
                      src={KingImage}
                      alt='King Image'
                      width={44}
                      height={44}
                      className='w-[44px] h-[44px] -translate-y-[6px]'
                    />
                    <h4 className='text-sm font-extrabold text-descriptionColor absolute bottom-2 left-1/2 -translate-x-1/2'>
                      {roomInfo.category || "Brak danych"}
                    </h4>
                  </section>
                </section>
              </section>
              <section className='w-full flex justify-center items-center'>
                <Button
                  variant={roomInfo.hostId === userId ? "primary" : "secondary"}
                >
                  {roomInfo.hostId === userId ? "Start" : "Oczekiwanie.."}
                </Button>
              </section>
            </section>
          </section>
        )}
      </section>
      <AnimatePresence initial={false} mode='wait' onExitComplete={() => null}>
        {isRoomEditModalOpen && (
          <RoomEditModal
            closeRoomEditModal={() => setIsRoomEditModalOpen(false)}
            initialRoomData={roomInfo}
            onSave={handleSaveRoomSettings}
          />
        )}
      </AnimatePresence>
    </>
  );
}
