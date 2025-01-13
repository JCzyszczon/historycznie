"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "../elements/Button";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import { useGetLesson } from "../../hooks/useGetLesson";
import { useEditLesson } from "../../hooks/useEditLesson";
import Input from "../elements/Input";

export default function EditLessonModal({
  closeEditLessonModal,
  mutateData,
  lessonId,
}) {
  const modalRef = useRef(null);
  const { lesson, isLoading, isError } = useGetLesson(lessonId);
  const { editLesson } = useEditLesson();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (lesson) {
      setFormData({
        title: lesson.title || "",
        description: lesson.description || "",
      });
    }
  }, [lesson]);

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeEditLessonModal();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title) {
      toast.error("Lekcja musi posiadać nazwę.");
      return;
    }

    try {
      await editLesson({ id: lessonId, ...formData });
      toast.success("Pomyślnie edytowano lekcję.");
      mutateData();
      closeEditLessonModal();
    } catch (error) {
      toast.error(error.message || "Wystąpił błąd podczas edytowania lekcji.");
    }
  };

  if (isLoading) return <div>Ładowanie...</div>;
  if (isError)
    return <div>Wystąpił błąd podczas pobierania danych lekcji.</div>;

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
          className='w-full max-w-[500px] h-[680px] flex flex-col gap-8 relative bg-background rounded-2xl pt-14 border border-borderColor overflow-y-hidden'
        >
          <IoMdClose
            title='Close Modal'
            onClick={closeEditLessonModal}
            className='absolute right-3 top-3 text-3xl text-descriptionColor hover:text-primaryColor duration-200 cursor-pointer'
          />
          <section className='w-full flex justify-center items-center'>
            <h2 className='font-nunito text-2xl font-extrabold tracking-wide text-center'>
              Edytuj lekcję
            </h2>
          </section>
          <form
            onSubmit={handleSubmit}
            className='w-full h-full flex flex-col px-4 gap-4'
          >
            <section className='w-full h-full flex flex-col justify-start items-start gap-4'>
              <Input
                type='text'
                name='title'
                labelText='Nazwa lekcji'
                value={formData.title}
                onChange={handleChange}
              />
              <Input
                type='text'
                name='description'
                labelText='Opis'
                value={formData.description}
                onChange={handleChange}
              />
            </section>
            <section className='w-full flex justify-center items-center px-4 pb-8'>
              <Button type='submit' variant='primary'>
                Edytuj
              </Button>
            </section>
          </form>
        </motion.section>
      </section>
    </section>
  );
}
