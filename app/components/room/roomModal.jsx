"use client";
import React, { useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useCreateRoom } from "../../hooks/useCreateRoom";
import Button from "../elements/Button";
import Input from "../elements/Input";
import Notification from "../notification";
import { useRouter } from "next/navigation";

export default function RoomModal({ closeModal }) {
  const modalRef = useRef(null);
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { createRoom } = useCreateRoom();
  const [notifications, setNotifications] = useState([]);
  const router = useRouter();

  const addNotification = (message, type = "error") => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    }, 2000);
  };

  const [formData, setFormData] = useState({
    name: "",
    hostId: userId,
    gameMode: "",
    questionsCount: 10,
    category: "Wszystkie",
    password: "",
  });

  const categories = [
    "Wszystkie",
    "Starożytność",
    "Średniowiecze",
    "Nowożytność",
    "Współczesność",
  ];
  const questionsOptions = [10, 15, 20];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      addNotification("Poczekalnia musi posiadać nazwę.");
      return;
    }
    try {
      const result = await createRoom(formData);
      addNotification("Utworzono nową poczekalnie.", "success");
      router.push(`/gry-i-wyzwania/gra-quizowa/${result.id}`);
      closeModal();
    } catch (error) {
      addNotification(error);
    }
  };

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  const handleClose = () => {
    closeModal();
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
          className='w-full max-w-[500px] h-[700px] flex flex-col gap-8 relative bg-background rounded-2xl pt-14 border border-borderColor overflow-y-hidden'
        >
          <IoMdClose
            title='Close Modal'
            onClick={handleClose}
            className='absolute right-3 top-3 text-3xl text-descriptionColor hover:text-primaryColor duration-200 cursor-pointer'
          />
          <section className='w-full flex justify-center items-center'>
            <h2 className='font-nunito text-2xl font-extrabold tracking-wide text-center'>
              Stwórz poczekalnię
            </h2>
          </section>
          <form
            onSubmit={handleSubmit}
            className='w-full h-full flex flex-col px-4 gap-4'
          >
            <section className='w-full h-full flex flex-col justify-start items-start gap-4'>
              <Input
                type='text'
                name='name'
                labelText='Nazwa pokoju'
                value={formData.name}
                onChange={handleChange}
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
                  value={formData.questionsCount}
                  onChange={handleChange}
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
                    htmlFor={"questionsCount"}
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
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, category: cat }))
                      }
                      className={`p-2 rounded-md duration-200 ${
                        formData.category === cat
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
                name='password'
                value={formData.password}
                onChange={handleChange}
                labelText='Hasło (opcjonalne)'
              />
            </section>
            <section className='w-full flex justify-center items-center px-4 pb-8'>
              <Button type='submit' variant='primary'>
                Utwórz
              </Button>
            </section>
          </form>
        </motion.section>
      </section>
      <Notification notifications={notifications} />
    </section>
  );
}
