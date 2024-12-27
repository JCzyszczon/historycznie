"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Button from "../elements/Button";
import Input from "../elements/Input";
import Notification from "../../components/notification";

export default function RoomEditModal({
  closeRoomEditModal,
  initialRoomData,
  onSave,
}) {
  const modalRef = useRef(null);
  const [notifications, setNotifications] = useState([]);
  const questionsOptions = [10, 15, 20];
  const categories = [
    "Starożytność",
    "Średniowiecze",
    "Nowożytność",
    "Współczesność",
  ];

  const addNotification = (message, type = "error") => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    }, 2000);
  };

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
      addNotification("Nazwa pokoju nie może być pusta!");
      return;
    }
    if (questionsCount < 1) {
      addNotification("Liczba pytań musi być większa od 0!");
      return;
    }

    const updatedRoomData = {
      name: roomName.trim(),
      questionsCount: parseInt(questionsCount, 10),
      category: questionsCategory,
      password: roomPassword || null,
    };

    onSave(updatedRoomData);
    addNotification("Zmieniono ustawienia gry.", "success");
    closeRoomEditModal();
  };

  return (
    <section className='w-screen min-h-dvh z-[1100] fixed left-0 top-0 right-0 overflow-x-hidden overflow-y-scroll bg-[#11111199]'>
      <section
        onClick={handleOutsideClick}
        className='w-screen min-h-dvh flex justify-center items-center px-2 py-8'
      >
        <motion.section
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          ref={modalRef}
          className='w-full max-w-[500px] h-auto flex flex-col gap-6 bg-background rounded-2xl p-6 border border-borderColor shadow-lg'
        >
          <h2 className='text-2xl font-nunito font-bold text-center'>
            Edytuj ustawienia pokoju
          </h2>

          <form className='flex flex-col gap-4'>
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
                  Liczba pytań:
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
                  Kategoria:
                </label>
              </section>
              <section className='w-full flex flex-wrap gap-4'>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type='button'
                    value={questionsCategory}
                    onClick={() => setQuestionsCategory(cat)}
                    className={`p-2 rounded-md ${
                      questionsCategory === cat
                        ? "bg-primaryColor text-white"
                        : "bg-borderColor text-descriptionColor"
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

          <div className='flex justify-end gap-4 mt-4'>
            <Button variant='secondary' onClick={closeRoomEditModal}>
              Anuluj
            </Button>
            <Button variant='primary' onClick={handleSave}>
              Zapisz
            </Button>
          </div>
        </motion.section>
      </section>
      <Notification notifications={notifications} />
    </section>
  );
}
