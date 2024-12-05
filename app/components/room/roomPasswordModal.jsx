"use client";
import React, { useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
import Button from "../elements/Button";
import Input from "../elements/Input";
import Notification from "../notification";
import { useRouter } from "next/navigation";
import { useRoomPassword } from "../../hooks/useRoomPassword";

export default function RoomPasswordModal({ room, closeModal }) {
  const modalRef = useRef(null);
  const [password, setPassword] = useState();
  const [notifications, setNotifications] = useState([]);
  const router = useRouter();
  const { joinRoom } = useRoomPassword();

  const addNotification = (message, type = "error") => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password) {
      addNotification("Hasło jest wymagane.");
      return;
    }

    try {
      await joinRoom(password, room.id);
      router.push(`/gry-i-wyzwania/gra-quizowa/${room.id}`);
    } catch (error) {
      addNotification(
        error.message || "Wystąpił błąd podczas dołączania do pokoju."
      );
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
          className='w-full max-w-[400px] h-[300px] flex flex-col gap-8 relative bg-background rounded-2xl pt-14 border border-borderColor overflow-y-hidden'
        >
          <IoMdClose
            title='Close Modal'
            onClick={handleClose}
            className='absolute right-3 top-3 text-3xl text-descriptionColor hover:text-primaryColor duration-200 cursor-pointer'
          />
          <section className='w-full flex justify-center items-center'>
            <h2 className='font-nunito text-2xl font-extrabold tracking-wide text-center'>
              Podaj hasło
            </h2>
          </section>
          <form
            onSubmit={handleSubmit}
            className='w-full h-full flex flex-col px-4 gap-4'
          >
            <section className='w-full h-full flex flex-col justify-start items-start gap-4'>
              <Input
                type='password'
                name='password'
                labelText='Hasło pokoju:'
                onChange={(e) => setPassword(e.target.value)}
              />
            </section>
            <section className='w-full flex justify-center items-center px-4 pb-8'>
              <Button type='submit' variant='primary'>
                Wejdź
              </Button>
            </section>
          </form>
        </motion.section>
      </section>
      <Notification notifications={notifications} />
    </section>
  );
}
