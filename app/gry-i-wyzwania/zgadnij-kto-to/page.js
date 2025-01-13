"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Button from "../../components/elements/Button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { AnimatePresence } from "framer-motion";
import GuessWhoLeaveModal from "../../components/guessWhoGame/GuessWhoLeaveModal";
import { useSearchParams } from "next/navigation";
import { useGuessWhoStart } from "../../hooks/useGuessWhoStart";
import QuestionImage from "../../img/question.png";
import CastleImage from "../../img/vecteezy_castle-hall-with-thrones-for-king-and-queen-vector_15486156.jpg";
import HeartIcon from "../../img/diamond-heart.png";
import { toast } from "react-toastify";
import { IoSend } from "react-icons/io5";
import { useGuessWhoFinish } from "../../hooks/useGuessWhoFinish";
import GuessWhoFinishModal from "../../components/guessWhoGame/guessWhoFinishModal";

export default function DailyChallenge() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { startGuessWhoGame } = useGuessWhoStart();
  const { finishGuessWhoGame } = useGuessWhoFinish();
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "Losowe";

  const [gameData, setGameData] = useState(null);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [lives, setLives] = useState(5);
  const [inputValue, setInputValue] = useState("");
  const [unlockedHints, setUnlockedHints] = useState([]);
  const [error, setError] = useState(null);
  const [isGuessGameLeaveModalOpen, setIsGuessGameLeaveModalOpen] =
    useState(false);

  const [gameInitialized, setGameInitialized] = useState(false);

  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const [finalResults, setFinalResults] = useState(null);
  const [isFinishGuessModalOpen, setIsFinishGuessModalOpen] = useState(false);

  useEffect(() => {
    if (isGuessGameLeaveModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isGuessGameLeaveModalOpen]);

  useEffect(() => {
    const startGame = async () => {
      try {
        if (userId && category && !gameInitialized) {
          const data = await startGuessWhoGame(userId, category);
          setGameData(data);
          setLives(data.remainingLives);
          setUnlockedHints([data.character.hints[0]]);
          setGameInitialized(true);

          console.log(data);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    startGame();
  }, [userId, category, gameInitialized, startGuessWhoGame]);

  useEffect(() => {
    if (gameData) {
      const filtered = gameData.allCharacters.filter((character) =>
        character.name.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredCharacters(filtered);
    }
  }, [inputValue, gameData]);

  const handleSelectCharacter = (character) => {
    setInputValue(character.name);
    setFilteredCharacters([]);
    setIsDropdownVisible(false);
  };

  const handleAnswer = () => {
    if (!gameData) return;

    if (!inputValue.trim()) {
      toast.error("Proszę podać nazwę.");
      return;
    }

    const correctAnswer = gameData.character.name.toLowerCase();
    if (inputValue.toLowerCase() === correctAnswer) {
      handleFinishGame();
      toast.success("Gratulacje! Odpowiedź jest poprawna!");
    } else {
      if (lives > 1) {
        toast.error("Błędna postać. Graj dalej.");
        const nextHint = gameData.character.hints[unlockedHints.length] || null;
        setLives((prev) => prev - 1);
        if (nextHint) {
          setUnlockedHints((prev) => [...prev, nextHint]);
          setCurrentHintIndex(currentHintIndex + 1);
        }
      } else {
        setLives((prev) => prev - 1);
        handleFinishGame(0);
        toast.error("Koniec gry. Spróbuj ponownie!");
      }
    }

    setInputValue("");
  };

  useEffect(() => {
    const handleBeforeUnload = async (event) => {
      if (finalResults) return;
      event.preventDefault();
      handleFinishGame(0);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [gameData, finalResults]);

  const handleFinishGame = async (newLives) => {
    const finishLives = newLives !== undefined ? newLives : lives;

    try {
      const result = await finishGuessWhoGame(
        gameData.gameId,
        userId || session?.user?.id,
        finishLives
      );

      if (result) {
        setFinalResults(result);
        setIsFinishGuessModalOpen(true);
      }
    } catch (error) {
      console.error("Błąd przesyłania wyników:", error.message);
    }
  };

  const handleHintNavigation = (direction) => {
    if (direction === "prev" && currentHintIndex > 0) {
      setCurrentHintIndex((prev) => prev - 1);
    } else if (
      direction === "next" &&
      currentHintIndex < unlockedHints.length - 1
    ) {
      setCurrentHintIndex((prev) => prev + 1);
    }
  };

  return (
    <Suspense fallback={<div>Ładowanie...</div>}>
      <section className='w-full flex flex-col bg-background2 sm:justify-center justify-start items-center min-h-dvh px-2 py-20 relative'>
        <button
          onClick={() => setIsGuessGameLeaveModalOpen(true)}
          className='text-3xl absolute left-5 top-5 hover:text-primaryColor duration-200'
        >
          <FaArrowLeft />
        </button>
        <section className='w-full max-w-5xl sm:h-[700px] sm:min-h-0 min-h-[600px] h-auto bg-background rounded-2xl flex flex-col sm:px-8 px-2 sm:py-8 py-4 gap-6'>
          <section className='w-full flex justify-center items-center relative select-none'>
            <section className='absolute right-4 bottom-0 flex gap-0 justify-center items-end'>
              {!gameData ? (
                <p className='w-[27px] h-[32px] rounded-lg bg-gray-200 animate-pulse'></p>
              ) : (
                <p className='font-nunito text-2xl font-extrabold'>{lives}x</p>
              )}
              <Image
                src={HeartIcon}
                alt='Heart Icon'
                className='sm:w-[42px] w-[36px] sm:h-[42px] h-[36px]'
              />
            </section>
            <Image
              src={CastleImage}
              alt='Castle Image'
              className='sm:w-[140px] w-[110px] sm:h-[140px] h-[110px] rounded-full object-cover border border-borderColor drop-shadow-lg brightness-90'
            />
            <Image
              src={QuestionImage}
              alt='Question Image'
              className='sm:w-[80px] w-[68px] h-auto absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2'
            />
            <section className='absolute left-4 bottom-0 flex gap-2 justify-center items-end'>
              <FaArrowLeft
                className={`text-2xl cursor-pointer ${
                  currentHintIndex === 0 ? "opacity-50" : ""
                }`}
                onClick={() => handleHintNavigation("prev")}
              />
              <FaArrowRight
                className={`text-2xl cursor-pointer ${
                  currentHintIndex === unlockedHints.length - 1
                    ? "opacity-50"
                    : ""
                }`}
                onClick={() => handleHintNavigation("next")}
              />
            </section>
          </section>
          {!gameData ? (
            <section className='w-full h-[200px] bg-gray-200 animate-pulse rounded-2xl'></section>
          ) : (
            <>
              <section className='w-full flex justify-start items-start flex-col gap-2 bg-background2 rounded-2xl sm:px-8 px-4 sm:py-4 py-2'>
                <h4 className='sm:text-xl text-lg font-nunito font-extrabold tracking-wide'>
                  Podpowiedź {currentHintIndex + 1}
                </h4>
                <p className='font-[500] sm:text-base text-sm'>
                  {unlockedHints[currentHintIndex]?.text || "Brak podpowiedzi"}
                </p>
              </section>
              <section className='w-full h-full'>
                <section className='w-full relative'>
                  <input
                    type='text'
                    value={inputValue}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAnswer();
                      }
                    }}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                      setIsDropdownVisible(true);
                    }}
                    onFocus={() => setIsDropdownVisible(true)}
                    onBlur={() => {
                      setTimeout(() => setIsDropdownVisible(false), 150);
                    }}
                    placeholder='Wpisz nazwę postaci...'
                    className='w-full p-2 border rounded outline-none focus:ring-primaryColor focus:border-primaryColor'
                  />
                  <Button
                    onClick={handleAnswer}
                    disabled={lives < 1 ? true : false}
                    variant='primary'
                    className='!absolute !right-0 !top-1/2 !-translate-y-1/2 !w-min !py-2 !flex !justify-center !items-center'
                  >
                    <p className='sm:flex hidden'>Wyślij</p>
                    <IoSend className='text-xl sm:hidden flex' />
                  </Button>
                </section>
                {isDropdownVisible &&
                  inputValue &&
                  filteredCharacters.length > 0 && (
                    <ul className='w-full h-auto max-h-[300px] mt-2 bg-white border rounded overflow-x-hidden overflow-y-scroll custom-scrollbar'>
                      {filteredCharacters.map((character) => (
                        <li
                          key={character.id}
                          onClick={() => handleSelectCharacter(character)}
                          className='p-2 hover:bg-gray-200 cursor-pointer'
                        >
                          {character.name}
                        </li>
                      ))}
                    </ul>
                  )}
              </section>
            </>
          )}
        </section>
      </section>
      <AnimatePresence initial={false} mode='wait' onExitComplete={() => null}>
        {isGuessGameLeaveModalOpen && (
          <GuessWhoLeaveModal
            closeModal={() => {
              handleFinishGame(0);
            }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence initial={false} mode='wait' onExitComplete={() => null}>
        {isFinishGuessModalOpen && (
          <GuessWhoFinishModal results={finalResults} gameData={gameData} />
        )}
      </AnimatePresence>
    </Suspense>
  );
}
