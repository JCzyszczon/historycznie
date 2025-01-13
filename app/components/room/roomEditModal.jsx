"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Button from "../elements/Button";
import Input from "../elements/Input";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";

export default function RoomEditModal({
  closeRoomEditModal,
  initialRoomData,
  onSave,
}) {
  const modalRef = useRef(null);
  const questionsOptions = [5, 10, 15, 20, 25];
  const categories = [
    "Losowe",
    "Starożytność",
    "Średniowiecze",
    "Nowożytność",
    "Współczesność",
  ];

  const [roomName, setRoomName] = useState(initialRoomData?.name || "");
  const [questionsCount, setQuestionsCount] = useState(
    initialRoomData?.questionsCount || 0
  );
  const [questionsCategory, setQuestionsCategory] = useState(
    initialRoomData?.category || null
  );
  const [roomPassword, setRoomPassword] = useState(
    initialRoomData?.password || ""
  );

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeRoomEditModal();
    }
  };

  const handleSave = () => {
    if (!roomName.trim()) {
      toast.error("Nazwa pokoju nie może być pusta.");
      return;
    }
    if (questionsCount < 1) {
      toast.error("Liczba pytań musi być większa od 0!");
      return;
    }

    const updatedRoomData = {
      name: roomName.trim(),
      questionsCount: parseInt(questionsCount, 10),
      category: questionsCategory,
      password: roomPassword || null,
    };

    onSave(updatedRoomData);
    toast.success("Zmieniono ustawienia gry.");
    closeRoomEditModal();
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
          className='w-full max-w-[500px] h-[680px] flex flex-col gap-8 shadow-lg relative bg-background rounded-2xl pt-14 border border-borderColor overflow-y-hidden'
        >
          <IoMdClose
            title='Close Modal'
            onClick={closeRoomEditModal}
            className='absolute right-3 top-3 text-3xl text-descriptionColor hover:text-primaryColor duration-200 cursor-pointer'
          />
          <section className='w-full flex justify-center items-center'>
            <h2 className='font-nunito text-2xl font-extrabold tracking-wide text-center'>
              Ustawienia pokoju
            </h2>
          </section>

          <form className='flex flex-col px-4 gap-4'>
            <Input
              type='text'
              labelText='Nazwa pokoju'
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder='Wprowadź nazwę pokoju'
            />
            <div className='w-full'>
              <section className='flex justify-between items-center'>
                <label
                  htmlFor={"questionsCount"}
                  className='block mb-2 text-sm font-extrabold font-nunito text-gray-900'
                >
                  Liczba pytań
                </label>
              </section>
              <select
                name='questionsCount'
                value={questionsCount}
                onChange={(e) => setQuestionsCount(e.target.value)}
                className='appearance-none focus:outline-none focus:ring-0 rounded-lg bg-gray-50 border text-gray-900 focus:ring-primaryColor focus:border-primaryColor block min-w-0 w-full text-sm border-borderColor p-2.5 autofill:bg-green-100'
              >
                {questionsOptions.map((option) => (
                  <option key={option} value={option}>
                    {option} pytań
                  </option>
                ))}
              </select>
            </div>
            <div className='w-full'>
              <section className='flex justify-between items-center'>
                <label
                  htmlFor={"questionsCategory"}
                  className='block mb-2 text-sm font-extrabold font-nunito text-gray-900'
                >
                  Kategoria
                </label>
              </section>
              <section className='w-full grid grid-cols-2 gap-4'>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type='button'
                    value={questionsCategory}
                    onClick={() => setQuestionsCategory(cat)}
                    className={`p-2 rounded-md duration-200 ${
                      questionsCategory === cat
                        ? "bg-primaryColor text-white"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </section>
            </div>
            <Input
              type='password'
              labelText='Hasło (opcjonalne)'
              value={roomPassword}
              onChange={(e) => setRoomPassword(e.target.value)}
              placeholder='Wprowadź hasło pokoju'
            />
          </form>

          <div className='flex flex-col items-end justify-end px-8 gap-4 mt-4'>
            <Button variant='primary' onClick={handleSave}>
              Zapisz
            </Button>
          </div>
        </motion.section>
      </section>
    </section>
  );
}
