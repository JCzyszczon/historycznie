"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDailyChallengeStatus } from "../../hooks/useDailyChallengeStatus";
import { useDailyChallengeStart } from "../../hooks/useDailyChallengeStart";
import LoadingElement from "../../components/elements/loadingElement";
import Image from "next/image";
import CartoonCastleImage from "../../img/2210_w015_n003_1037b_p15_1037.jpg";
import Button from "../../components/elements/Button";
import { useDailyChallengeAnswers } from "../../hooks/useDailyChallengeAnswers";
import { useSubmitChallenge } from "../../hooks/useDailyChallengeSubmit";
import ChallengeSummaryModal from "../../components/challangeGame/challengeSummaryModal";
import { AnimatePresence } from "framer-motion";

export default function DailyChallenge() {
  const { data: session } = useSession();
  const router = useRouter();
  const userId = session?.user?.id;

  const {
    streak,
    challengeUnlocked,
    nextAvailableChallenge,
    isLoading,
    isError,
  } = useDailyChallengeStatus(userId);

  const { startChallenge } = useDailyChallengeStart();
  const { saveAnswersBeforeUnload } = useDailyChallengeAnswers();
  const { submitChallenge } = useSubmitChallenge();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([null, null, null, null, null]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [results, setResults] = useState();
  const answersRef = useRef(answers);

  useEffect(() => {
    if (!isLoading && !challengeUnlocked) {
      router.push("/gry-i-wyzwania");
    }
  }, [isLoading, challengeUnlocked, router]);

  useEffect(() => {
    if (challengeUnlocked && questions.length === 0 && userId) {
      startChallenge(userId)
        .then((data) => {
          setQuestions(data.questions);
          const totalTestTime = data.timeRemaining;
          setTimeRemaining(totalTestTime);

          const initialAnswers = Array(data.questions.length).fill(null);

          if (data.answers && data.answers.length > 0) {
            data.answers.forEach((answer, index) => {
              initialAnswers[index] = answer;
            });
          }

          setAnswers(initialAnswers);
        })
        .catch((err) => console.error("Błąd pobierania pytań:", err));
    }
  }, [challengeUnlocked, questions.length, startChallenge, userId]);

  useEffect(() => {
    if (!userId) return; // Nie ustawiaj interwału, jeśli userId jest undefined.

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1 || results) {
          clearInterval(interval);
          if (!results) handleChallengeSubmit(userId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [userId, results]);

  useEffect(() => {
    const handleBeforeUnload = async (event) => {
      if (results) return;
      event.preventDefault();
      if (answersRef.current && answersRef.current.length > 0) {
        await saveAnswersBeforeUnload(userId, answersRef.current);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [answers, userId, saveAnswersBeforeUnload, results]);

  const handleAnswerSelect = (index, answer) => {
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[index] = answer;
      return newAnswers;
    });
  };

  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleChallengeSubmit(userId);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleChallengeSubmit = async ({ userId }) => {
    console.log(answersRef.current);

    try {
      const result = await submitChallenge(
        userId || session?.user?.id,
        answersRef.current
      );

      if (result) {
        setResults(result);
        setIsSummaryModalOpen(true);
      }
    } catch (error) {
      console.error("Błąd przesyłania wyników:", error.message);
    }
  };

  return (
    <>
      <section className='w-full flex flex-col bg-background2 sm:justify-center justify-start items-center min-h-dvh px-2 py-20'>
        <section className='w-full max-w-5xl sm:h-[700px] h-auto bg-background rounded-2xl flex flex-col sm:px-8 px-2 sm:py-8 py-4 gap-6'>
          {!isLoading &&
          !isError &&
          challengeUnlocked &&
          questions.length > 0 ? (
            <>
              <section className='w-full sm:h-[320px] h-[260px] flex justify-center items-center relative'>
                <Image
                  src={CartoonCastleImage}
                  alt='Castle Image'
                  quality={100}
                  className='w-full h-full object-cover rounded-xl brightness-75'
                />
                <section className='w-full flex justify-between items-end gap-4 absolute top-0 left-0 px-4 py-4'>
                  <section className='flex sm:w-[138px] w-auto flex-col gap-0 bg-background rounded-2xl px-4 py-2 justify-start items-center'>
                    <h4 className='sm:text-sm text-xs font-nunito font-extrabold tracking-wide text-descriptionColor'>
                      Pytanie:
                    </h4>
                    <p className='w-full sm:text-2xl text-xl font-bold text-center text-textColor'>
                      {currentQuestionIndex + 1}/{questions.length}
                    </p>
                  </section>
                  <section className='flex sm:w-[138px] w-auto flex-col gap-0 bg-background rounded-2xl px-4 py-2 justify-start items-center'>
                    <h4 className='sm:text-sm text-xs font-nunito font-extrabold tracking-wide text-descriptionColor'>
                      Pozostały czas:
                    </h4>
                    <p
                      className={`w-full sm:text-2xl text-xl font-bold text-center ${
                        timeRemaining < 10
                          ? "text-primaryColor"
                          : "text-textColor"
                      }`}
                    >
                      {Math.max(0, timeRemaining)}
                    </p>
                  </section>
                </section>
                <section className='w-full absolute bottom-0 left-0 right-0 flex justify-center items-center px-4 py-4'>
                  <section className='w-full flex justify-start items-center bg-background rounded-2xl sm:px-8 px-4 sm:py-8 py-4'>
                    <p className='font-[500] sm:text-base text-sm'>
                      {questions[currentQuestionIndex]?.text}
                    </p>
                  </section>
                </section>
              </section>
              <section className='flex flex-col gap-4'>
                {questions[currentQuestionIndex]?.options.map((option) => (
                  <button
                    key={option}
                    onClick={() =>
                      handleAnswerSelect(currentQuestionIndex, option)
                    }
                    className={`w-full text-left px-4 py-2 rounded-lg border duration-200 ${
                      answers[currentQuestionIndex] === option
                        ? "bg-primaryColor text-white"
                        : "bg-background2"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </section>
              <section className='w-full flex gap-2 justify-center items-center'>
                <Button
                  onClick={goToPreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  Poprzednie
                </Button>
                <Button onClick={goToNextQuestion} variant='primary'>
                  {currentQuestionIndex < questions.length - 1
                    ? "Następne"
                    : "Prześlij"}
                </Button>
              </section>
            </>
          ) : (
            <section className='w-full h-full sm:min-h-0 min-h-[600px] flex flex-col justify-center items-center gap-4'>
              <LoadingElement variant='primary' />
              <h2 className='text-descriptionColor text-lg font-bold'>
                Ładowanie...
              </h2>
            </section>
          )}
        </section>
      </section>
      <AnimatePresence initial={false} mode='wait' onExitComplete={() => null}>
        {isSummaryModalOpen && <ChallengeSummaryModal results={results} />}
      </AnimatePresence>
    </>
  );
}
