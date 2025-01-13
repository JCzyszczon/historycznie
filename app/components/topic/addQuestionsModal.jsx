"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import Button from "../elements/Button";
import { FaCircleInfo, FaTrash } from "react-icons/fa6";
import { useGetTopicQuestions } from "../../hooks/useGetTopicQuestions";
import LoadingElement from "../elements/loadingElement";
import { useSaveQuestions } from "../../hooks/useSaveQuestions";
import { useGenerateAIQuestions } from "../../hooks/useGenerateAIQuestions";
import { toast } from "react-toastify";

export default function AddQuestionsModal({
  htmlContent,
  topicId,
  closeAddQuestionsModal,
}) {
  const modalRef = useRef(null);
  const {
    questions: fetchedQuestions,
    isLoading,
    isError,
  } = useGetTopicQuestions(topicId);
  const [questions, setQuestions] = useState([]);
  const { saveQuestions } = useSaveQuestions();
  const { generateQuestions } = useGenerateAIQuestions();
  const [isGenerateLoading, setIsGenerateLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && !isError && fetchedQuestions.length > 0) {
      setQuestions(fetchedQuestions);
    }
  }, [fetchedQuestions, isLoading, isError]);

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeAddQuestionsModal();
    }
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: null,
        text: "",
        options: ["", "", "", ""],
        correct: "",
        isTemporary: true,
      },
    ]);
  };

  const handleRemoveQuestion = (index) => {
    if (!questions[index].isTemporary) {
      toast.error("Nie można usunąć pytań pobranych z bazy danych.");
      return;
    }
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    if (field === "options") {
      updatedQuestions[index].options = value;
    } else {
      updatedQuestions[index][field] = value;
    }
    setQuestions(updatedQuestions);
  };

  const handleGenerateQuestions = async () => {
    try {
      setIsGenerateLoading(true);
      const generatedQuestions = await generateQuestions(topicId, htmlContent);

      if (
        generatedQuestions.questions &&
        generatedQuestions.questions.length > 0
      ) {
        setQuestions((prevQuestions) => [
          ...prevQuestions,
          ...generatedQuestions.questions,
        ]);
        toast.success("Pytania wygenerowane pomyślnie!");
      } else {
        toast.warn("Nie udało się wygenerować pytań.");
      }
      setIsGenerateLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Wystąpił błąd podczas generowania pytań.");
      setIsGenerateLoading(false);
    }
  };

  const handleSave = async () => {
    const isValid = questions.every(
      (q) =>
        q.text.trim() !== "" &&
        q.options.every((opt) => opt.trim() !== "") &&
        q.correct.trim() !== ""
    );

    if (!isValid) {
      toast.error("Upewnij się, że wszystkie pytania są poprawnie wypełnione.");
      return;
    }

    try {
      await saveQuestions(topicId, questions);
      toast.success("Pytania zapisane pomyślnie!");
      closeAddQuestionsModal();
    } catch (error) {
      console.error(error);
      toast.error("Wystąpił błąd podczas zapisywania pytań.");
    }
  };

  return (
    <section className='w-screen min-h-dvh max-h-[100px] z-[1100] fixed left-0 top-0 right-0 overflow-x-hidden overflow-y-scroll bg-[#11111199]'>
      <section
        onClick={handleOutsideClick}
        className='w-screen min-h-dvh z-[1101] flex flex-col justify-center items-center px-2 py-8'
      >
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, type: "tween" }}
          exit={{ opacity: 0 }}
          ref={modalRef}
          className='w-full max-w-5xl min-h-[680px] h-auto pb-4 flex flex-col gap-8 relative bg-background rounded-2xl pt-14 border border-borderColor overflow-y-hidden'
        >
          <IoMdClose
            title='Close Modal'
            onClick={closeAddQuestionsModal}
            className='absolute right-3 top-3 text-3xl text-descriptionColor hover:text-primaryColor duration-200 cursor-pointer'
          />
          <section className='w-full flex justify-center items-center'>
            <h2 className='font-nunito text-2xl font-extrabold tracking-wide text-center'>
              Pytania do tematu
            </h2>
          </section>
          <section className='w-full flex justify-end items-center gap-2 px-4'>
            <Button
              onClick={handleAddQuestion}
              variant='secondary'
              className='!py-2 !max-w-[160px]'
              disabled={isGenerateLoading}
            >
              Dodaj
            </Button>
            <Button
              variant='primary'
              disabled={isGenerateLoading}
              className='!py-2 !max-w-[160px]'
              onClick={handleGenerateQuestions}
            >
              {isGenerateLoading ? <LoadingElement /> : "Generuj"}
            </Button>
          </section>
          {!isLoading && !isError ? (
            <section className='w-full flex flex-col gap-2 px-4'>
              {questions.length > 0 ? (
                <>
                  {questions.map((q, index) => (
                    <div
                      key={index}
                      className='flex flex-col gap-2 border border-borderColor p-4 rounded-md'
                    >
                      <section className='w-full flex justify-between items-center gap-2'>
                        <h3 className='text-lg font-nunito font-extrabold tracking-wide'>
                          Pytanie {index + 1}
                        </h3>
                        <Button
                          onClick={() => handleRemoveQuestion(index)}
                          className=' text-red-500 hover:text-red-700 duration-200 text-sm font-bold !max-w-[60px] !py-2'
                          title='Usuń pytanie'
                        >
                          <FaTrash />
                        </Button>
                      </section>
                      <textarea
                        value={q.text}
                        onChange={(e) =>
                          handleQuestionChange(index, "text", e.target.value)
                        }
                        placeholder='Wpisz treść pytania...'
                        className='border p-2 rounded-md w-full'
                      />
                      <div className='flex flex-col gap-2'>
                        {q.options.map((opt, optIndex) => (
                          <input
                            key={optIndex}
                            value={opt}
                            onChange={(e) => {
                              const newOptions = [...q.options];
                              newOptions[optIndex] = e.target.value;
                              handleQuestionChange(
                                index,
                                "options",
                                newOptions
                              );
                            }}
                            placeholder={`Opcja ${String.fromCharCode(
                              65 + optIndex
                            )}`}
                            className='border p-2 rounded-md'
                          />
                        ))}
                      </div>
                      <select
                        value={q.correct}
                        onChange={(e) =>
                          handleQuestionChange(index, "correct", e.target.value)
                        }
                        className='border p-2 rounded-md'
                      >
                        <option value=''>Wybierz poprawną odpowiedź</option>
                        {q.options.map((opt, optIndex) => (
                          <option key={optIndex} value={opt}>
                            {opt
                              ? opt
                              : `Opcja ${String.fromCharCode(65 + optIndex)}`}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </>
              ) : (
                <section className='w-full h-full min-h-[400px] flex flex-col justify-center items-center gap-4'>
                  <FaCircleInfo className='text-4xl text-descriptionColor' />
                  <p className='sm:text-base text-sm text-descriptionColor text-center'>
                    Obecnie nie ma żadnych pytań.
                  </p>
                </section>
              )}
            </section>
          ) : (
            <section className='w-full flex min-h-[400px] justify-center items-center'>
              <LoadingElement variant='primary' />
            </section>
          )}
          <section className='w-full flex justify-center items-center'>
            <Button
              onClick={handleSave}
              disabled={isGenerateLoading}
              variant='primary'
              className='!max-w-[240px]'
            >
              Zapisz
            </Button>
          </section>
        </motion.section>
      </section>
    </section>
  );
}
