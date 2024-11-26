"use client";
import React, { useRef, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
import EditNavbar from "./editNavbar";
import EditAvatar from "./editAvatar";
import EditBanner from "./editBanner";

export default function EditModal({ closeModal, user, mutateUser }) {
  const modalRef = useRef(null);
  const [activePanel, setActivePanel] = useState("Avatars");

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  const handleClose = () => {
    closeModal();
  };

  return (
    <section className='w-screen min-h-[100vh] max-h-[100px] z-[1100] fixed left-0 top-0 right-0 overflow-x-hidden overflow-y-scroll bg-[#11111199]'>
      <section
        onClick={handleOutsideClick}
        className='w-screen min-h-[100vh] z-[1101] flex flex-col justify-center items-center px-2 py-8'
      >
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, type: "tween" }}
          exit={{ opacity: 0 }}
          ref={modalRef}
          className='w-full max-w-[1000px] h-[700px] flex sm:flex-row flex-col relative bg-background rounded-2xl border border-borderColor overflow-hidden'
        >
          <IoMdClose
            title='Close Modal'
            onClick={handleClose}
            className='absolute right-3 top-3 text-3xl text-descriptionColor hover:text-primaryColor duration-200 cursor-pointer'
          />
          <EditNavbar
            activePanel={activePanel}
            setActivePanel={setActivePanel}
          />
          {activePanel === "Avatars" ? (
            <EditAvatar user={user} mutateUser={mutateUser} />
          ) : activePanel === "Banners" ? (
            <EditBanner user={user} mutateUser={mutateUser} />
          ) : (
            <></>
          )}
        </motion.section>
      </section>
    </section>
  );
}
