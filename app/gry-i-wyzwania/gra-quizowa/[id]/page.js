"use client";
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { FaArrowLeft } from "react-icons/fa6";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import LoadingElement from "../../../components/elements/loadingElement";
import Button from "../../../components/elements/Button";
import { FaLock, FaUnlock } from "react-icons/fa";
import KingImage from "../../../img/king.png";
import CrownHost from "../../../img/crown-host.png";
import RoomEditModal from "../../../components/room/roomEditModal";
import { AnimatePresence } from "framer-motion";
import GameEndModal from "../../../components/room/gameEndModal";
import SurpriseBoxImage from "../../../img/surprise-box.png";
import PyramidsImage from "../../../img/pyramids.png";
import MusketeerImage from "../../../img/musketeer.png";
import TankImage from "../../../img/tank.png";
import { toast } from "react-toastify";
import GameModal from "../../../components/room/gameModal";

const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL, {
  transports: ["websocket"],
  reconnection: true,
});

export default function Home() {
  const { data: session, status } = useSession();
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
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [updateRanking, setUpdateRanking] = useState();
  const [openEndModal, setOpenEndModal] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState({});

  useEffect(() => {
    if (roomInfo) {
      const roomName = roomInfo.name;
      document.title = roomName
        ? `Pokój ${roomName} - Historycznie`
        : "Gra quizowa - Historycznie";
    }
  }, [roomInfo]);

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
    if (roomInfo.isGameStarted) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [roomInfo]);

  useEffect(() => {
    socket.on("roomSettingsUpdated", (updatedRoom) => {
      setRoomInfo(updatedRoom);
    });

    return () => {
      socket.off("roomSettingsUpdated");
    };
  }, []);

  useEffect(() => {
    socket.on("gameStarted", ({ question, questionIndex, timeLeft }) => {
      toast.info("Gra została rozpoczęta.");
      setCurrentQuestion(question);
      setCurrentQuestionIndex(questionIndex);
      setTimeLeft(timeLeft);
      setQuestionStartTime(Date.now());
      setIsAnswered(false);
    });

    socket.on("nextQuestion", ({ question, questionIndex, timeLeft }) => {
      setCurrentQuestion(question);
      setCurrentQuestionIndex(questionIndex);
      setTimeLeft(timeLeft);
      setQuestionStartTime(Date.now());
      setIsAnswered(false);
    });

    return () => {
      socket.off("gameStarted");
      socket.off("nextQuestion");
    };
  }, []);

  useEffect(() => {
    socket.on("updateRanking", ({ ranking }) => {
      setUpdateRanking(ranking);
    });

    return () => {
      socket.off("updateRanking");
    };
  }, []);

  useEffect(() => {
    socket.on("gameEnded", ({ ranking }) => {
      setUpdateRanking(ranking);
      setOpenEndModal(true);
    });

    return () => {
      socket.off("gameEnded");
    };
  }, [isAnswered]);

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
        setError("Nie znaleziono Id użytkownika lub Id pokoju");
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

    const handleBeforeUnload = (event) => {
      socket.emit("refreshRoom", { roomId, userId });
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      socket.emit("leaveRoom", { roomId, userId });
    };
  }, [userId, roomId, status]);

  const handleLeaveRoom = () => {
    router.push("/gry-i-wyzwania/gra-quizowa");
  };

  const handleSaveRoomSettings = (updatedRoomData) => {
    socket.emit("updateRoomSettings", { roomId, updatedRoomData });
  };

  const handleStartGame = () => {
    if (roomInfo.hostId === userId) {
      socket.emit("startGame", { roomId, userId });
    }
  };

  const handleAnswerClick = (selectedAnswer) => {
    if (!currentQuestion) return;

    setIsAnswered(true);
    const responseTime = Date.now() - questionStartTime;
    setSelectedAnswer(selectedAnswer);
    const isAnswerCorrect = selectedAnswer === currentQuestion.correct;
    setIsCorrect(isAnswerCorrect);

    setAnsweredQuestions((prev) => ({
      ...prev,
      [currentQuestion.gameQuestionId]: true,
    }));

    socket.emit("submitAnswer", {
      roomId,
      userId,
      gameQuestionId: currentQuestion.gameQuestionId,
      answer: selectedAnswer,
      responseTime,
    });
  };

  useEffect(() => {
    socket.on("timeUpdate", (data) => {
      setTimeLeft(data.timeLeft);
    });

    return () => {
      socket.off("timeUpdate");
    };
  }, []);

  useEffect(() => {
    socket.on("questionTimeout", async ({ currentQuestion }) => {
      const alreadyAnswered =
        answeredQuestions[currentQuestion?.gameQuestionId];
      if (alreadyAnswered) {
        console.log("Użytkownik udzielił odpowiedzi.");
      } else {
        socket.emit("submitAnswer", {
          roomId,
          userId,
          gameQuestionId: currentQuestion?.gameQuestionId,
          answer: null,
          responseTime: 10000,
        });
      }
    });

    return () => {
      socket.off("questionTimeout");
    };
  }, [answeredQuestions]);

  return (
    <>
      <section className='w-full flex bg-background2 relative justify-center items-center min-h-dvh px-2 py-20'>
        <button
          onClick={handleLeaveRoom}
          className='text-3xl absolute left-5 top-5 hover:text-primaryColor duration-200'
        >
          <FaArrowLeft />
        </button>
        {isLoading || status === "loading" || error ? (
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
                          width={100}
                          height={100}
                          className='w-[34px] h-[34px]'
                        />
                      )}
                    </section>
                  ))}
                </section>
                <section className='w-full sm:h-full sm:max-h-[200px] h-[200px] bg-background2 rounded-2xl overflow-hidden'>
                  <section className='w-full h-full flex flex-col justify-start items-start gap-2 overflow-y-scroll custom-scrollbar px-4 py-2'>
                    <section className='w-full flex justify-start items-start'>
                      <h3 className='text-base font-nunito font-extrabold tracking-wide'>
                        Komunikaty:
                      </h3>
                    </section>
                    <section className='w-full flex flex-col justify-start items-start gap-2'>
                      {messages.map((message, index) => (
                        <p
                          key={index}
                          className='text-descriptionColor sm:text-[15px] text-sm'
                          dangerouslySetInnerHTML={{ __html: message }}
                        />
                      ))}
                    </section>
                  </section>
                </section>
              </section>
            </section>
            <section className='w-full sm:max-w-[460px] max-w-none flex flex-col justify-between items-start bg-background2 rounded-2xl py-8 px-4 gap-8 relative'>
              <section className='w-full flex flex-col justify-start items-start gap-4'>
                <section className='w-full flex justify-center items-center'>
                  <h2 className='text-center sm:text-2xl text-xl font-nunito font-extrabold tracking-wide'>
                    Informacje o grze
                  </h2>
                </section>
                <section className='w-full flex justify-start items-start gap-3 bg-background rounded-md px-4 py-4 mt-4'>
                  <h4 className='font-bold sm:text-base text-[15px]'>
                    Nazwa pokoju:
                  </h4>
                  <p className='text-descriptionColor sm:text-base text-sm'>
                    {roomInfo.name || "Brak danych"}
                  </p>
                </section>
                <section className='w-full grid grid-cols-2 auto-rows-fr sm:justify-start justify-center items-start gap-2'>
                  <section className='w-full sm:h-[110px] h-[100px] bg-background text-descriptionColor rounded-lg flex justify-center items-center relative'>
                    {roomInfo.password ? (
                      <FaLock className='sm:text-3xl text-2xl -translate-y-[6px]' />
                    ) : (
                      <FaUnlock className='sm:text-3xl text-2xl -translate-y-[6px]' />
                    )}
                    <h4 className='text-sm font-extrabold text-textColor absolute bottom-2 left-1/2 -translate-x-1/2'>
                      {roomInfo.password ? "Prywatny" : "Publiczny"}
                    </h4>
                  </section>
                  <section className='w-full h-full max-h-[140px] bg-background text-descriptionColor rounded-lg flex justify-center items-center relative'>
                    <p className='sm:text-4xl text-3xl -translate-y-[6px]'>
                      {roomInfo.questionsCount || "Brak danych"}
                    </p>
                    <h4 className='text-sm font-extrabold text-textColor absolute bottom-2 left-1/2 -translate-x-1/2'>
                      Pytań
                    </h4>
                  </section>
                  <section className='w-full h-full max-h-[140px] bg-background text-descriptionColor rounded-lg flex justify-center items-center relative'>
                    <Image
                      src={
                        roomInfo.category === "Losowe"
                          ? SurpriseBoxImage
                          : roomInfo.category === "Starożytność"
                          ? PyramidsImage
                          : roomInfo.category === "Średniowiecze"
                          ? KingImage
                          : roomInfo.category === "Nowożytność"
                          ? MusketeerImage
                          : roomInfo.category === "Współczesność"
                          ? TankImage
                          : KingImage
                      }
                      alt='Category Image'
                      width={80}
                      height={80}
                      className='sm:w-[44px] w-[40px] sm:h-[44px] h-[40px] -translate-y-[6px]'
                    />
                    <h4 className='text-sm font-extrabold text-textColor absolute bottom-2 left-1/2 -translate-x-1/2'>
                      {roomInfo.category || "Brak danych"}
                    </h4>
                  </section>
                </section>
              </section>
              <section className='w-full flex flex-col gap-2 justify-center items-center'>
                {roomInfo.hostId === userId && (
                  <Button
                    variant='secondary'
                    onClick={() => setIsRoomEditModalOpen(true)}
                  >
                    Edytuj
                  </Button>
                )}
                <Button
                  variant={roomInfo.hostId === userId ? "primary" : "secondary"}
                  disabled={roomInfo.hostId !== userId}
                  onClick={handleStartGame}
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
      <AnimatePresence initial={false} mode='wait' onExitComplete={() => null}>
        {roomInfo.isGameStarted && (
          <GameModal
            roomInfo={roomInfo}
            currentQuestion={currentQuestion}
            currentQuestionIndex={currentQuestionIndex}
            selectedAnswer={selectedAnswer}
            timeLeft={timeLeft}
            isAnswered={isAnswered}
            isCorrect={isCorrect}
            handleAnswerClick={handleAnswerClick}
            updateRanking={updateRanking}
          />
        )}
      </AnimatePresence>
      <AnimatePresence initial={false} mode='wait' onExitComplete={() => null}>
        {openEndModal && (
          <GameEndModal updateRanking={updateRanking} playerId={userId} />
        )}
      </AnimatePresence>
    </>
  );
}
