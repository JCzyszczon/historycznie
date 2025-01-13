import React, { useEffect, useState } from "react";
import CastleImage from "../../img/castle.png";
import { motion } from "framer-motion";
import Image from "next/image";
import Button from "../elements/Button";
import LoadingElement from "../elements/loadingElement";
import useGetTopicTestQuestions from "../../hooks/useGetTopicTestQuestions";
import { FaArrowLeft } from "react-icons/fa6";
import { useSetTopicTestResult } from "../../hooks/useSetTopicTestResult";
import { toast } from "react-toastify";

function QuizModal({ mutateErasContent, userId, topicId, closeQuizModal }) {
  const {
    questions: fetchedQuestions,
    isLoading,
    isError,
  } = useGetTopicTestQuestions(topicId);
  const { setTopicTestResult } = useSetTopicTestResult();
  const [userAnswers, setUserAnswers] = useState({});
  const [questions, setQuestions] = useState(null);
  const [results, setResults] = useState(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);

  useEffect(() => {
    if (fetchedQuestions && !questions) {
      setQuestions(fetchedQuestions);
    }
  }, [fetchedQuestions, questions]);

  const handleAnswerChange = (questionId, answer) => {
    if (isQuizSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSubmit = async () => {
    if (!questions) return;

    const totalQuestions = questions.length;
    let correctCount = 0;

    questions.forEach((question) => {
      if (userAnswers[question.id] === question.correct) {
        correctCount++;
      }
    });

    const incorrectCount = totalQuestions - correctCount;
    const isPassed = correctCount === totalQuestions;

    setResults({
      correctCount,
      incorrectCount,
      isPassed,
    });
    setIsQuizSubmitted(true);

    try {
      await setTopicTestResult(userId, topicId, userAnswers);
      mutateErasContent();
      toast.success("Wyniki zapisane pomyślnie!");
    } catch (error) {
      console.error("Błąd podczas zapisywania wyników:", error);
      toast.error("Nie udało się zapisać wyników.");
    }
  };

  console.log(questions);

  return (
    <section className='w-screen min-h-dvh max-h-[100px] z-[1100] fixed left-0 top-0 right-0 overflow-x-hidden overflow-y-scroll bg-[#11111199]'>
      <section className='w-screen min-h-dvh bg-background2 rounded-2xl flex lg:flex-row flex-col-reverse justify-center items-start gap-4 px-2 py-8'>
        <FaArrowLeft
          onClick={closeQuizModal}
          className='absolute left-5 z-[10] top-5 text-3xl cursor-pointer'
        />
        <motion.section
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className='w-full max-w-5xl min-h-[700px] flex flex-col justify-between items-center gap-6 bg-background rounded-2xl sm:px-6 px-4 py-12 border border-borderColor shadow-lg relative'
        >
          <section className='w-full flex flex-col justify-start items-start gap-6 h-full'>
            <section className='w-full flex justify-center items-center'>
              <Image
                src={CastleImage}
                alt='Castle Image'
                width={140}
                height={140}
                className='sm:w-[90px] w-[80px] sm:h-[90px] h-[80px]'
              />
            </section>
            {!isLoading && questions ? (
              questions.map((question, index) => (
                <div
                  key={question.id}
                  className='w-full flex justify-start items-start flex-col gap-4 p-4 rounded-2xl bg-background2'
                >
                  <h3 className='font-nunito text-textColor text-xl font-extrabold tracking-wide'>
                    Pytanie {index + 1}
                  </h3>
                  <div className='w-full flex justify-start items-center rounded-lg bg-background text-base text-descriptionColor font-[500] p-2'>
                    <p>{question.text}</p>
                  </div>
                  {question.options.map((option, idx) => (
                    <label
                      key={idx}
                      className={`w-full flex justify-start items-center gap-2 px-2 py-1 bg-gray-50 rounded-xl ${
                        isQuizSubmitted &&
                        question.correct === option &&
                        "!bg-green-200 !border-green-500"
                      } ${
                        isQuizSubmitted &&
                        userAnswers[question.id] === option &&
                        userAnswers[question.id] !== question.correct &&
                        "!bg-red-200 !border-red-500"
                      }`}
                    >
                      <input
                        type='radio'
                        name={`question-${question.id}`}
                        value={option}
                        disabled={isQuizSubmitted}
                        onChange={() => handleAnswerChange(question.id, option)}
                        className='hidden peer'
                      />
                      <div className='w-5 h-5 border-2 border-gray-400 rounded-lg flex justify-center items-center peer-checked:border-primaryColor peer-checked:bg-primaryColor transition-all duration-200'></div>
                      {option}
                    </label>
                  ))}
                </div>
              ))
            ) : (
              <section className='w-full h-full min-h-[400px] flex justify-center items-center'>
                <LoadingElement variant='primary' />
              </section>
            )}
          </section>
        </motion.section>
        <motion.section
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className='w-full sm:sticky relative top-2 max-w-lg h-[700px] bg-background rounded-2xl border border-borderColor shadow-lg overflow-hidden flex'
        >
          <section className='w-full h-full flex flex-col gap-6 px-6 py-12 overflow-y-scroll custom-scrollbar'>
            <h1 className='w-full sm:text-3xl text-[26px] font-nunito font-bold text-center'>
              Test z wiedzy
            </h1>
            <p className='text-base text-descriptionColor text-start'>
              Rozwiąż test wybierając jedną z czterech odpowiedzi dla każdego
              pytania. Wszystkie zadania oparte są o materiał danego tematu. Aby
              zaliczyć temat należy odpowiedzieć poprawnie na wszysktie pytania.
            </p>
            <section className='w-full h-full'>
              {results && (
                <section className='w-full flex flex-col justify-start items-start gap-2 p-4 rounded-2xl bg-background2'>
                  <h3 className='font-nunito text-xl font-extrabold text-textColor tracking-wide'>
                    Podsumowanie
                  </h3>
                  <p className='text-base text-descriptionColor'>
                    Poprawne odpowiedzi: {results.correctCount}
                  </p>
                  <p className='text-base text-descriptionColor'>
                    Niepoprawne odpowiedzi: {results.incorrectCount}
                  </p>
                  <p
                    className={`text-base font-bold ${
                      results.isPassed ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {results.isPassed ? "Zaliczony!" : "Niezaliczony!"}
                  </p>
                </section>
              )}
            </section>
            <Button
              variant={results ? "secondary" : "primary"}
              onClick={results ? closeQuizModal : handleSubmit}
            >
              {results ? "Powrót" : "Wyślij"}
            </Button>
          </section>
        </motion.section>
      </section>
    </section>
  );
}

export default QuizModal;
