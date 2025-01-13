"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Button from "../elements/Button";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import { useCreateEra } from "../../hooks/useCreateEra";
import Input from "../elements/Input";

export default function AddEraModal({ closeAddEraModal, mutateEras }) {
  const modalRef = useRef(null);
  const { createEra } = useCreateEra();

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeAddEraModal();
    }
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title) {
      toast.error("Nowa era musi posiadać nazwę.");
      return;
    }

    if (!formData.imageUrl) {
      toast.error("Nowa era musi posiadać obraz.");
      return;
    }
    try {
      const result = await createEra(formData);
      toast.success("Utworzono nową erę.");
      mutateEras();
      closeAddEraModal();
    } catch (error) {
      toast.error(error || "Wystąpił błąd podczas tworzenia ery.");
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
          className='w-full max-w-[500px] h-[680px] flex flex-col gap-8 relative bg-background rounded-2xl pt-14 border border-borderColor overflow-y-hidden'
        >
          <IoMdClose
            title='Close Modal'
            onClick={closeAddEraModal}
            className='absolute right-3 top-3 text-3xl text-descriptionColor hover:text-primaryColor duration-200 cursor-pointer'
          />
          <section className='w-full flex justify-center items-center'>
            <h2 className='font-nunito text-2xl font-extrabold tracking-wide text-center'>
              Dodaj nową erę
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
                labelText='Nazwa ery'
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
              <Input
                type='text'
                name='imageUrl'
                labelText='Link do obrazu'
                value={formData.imageUrl}
                onChange={handleChange}
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
    </section>
  );
}
