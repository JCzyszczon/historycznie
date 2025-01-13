"use client";
import React, { use } from "react";
import TipTapEditor from "../../../../components/TipTap/tipTapEditor";
import { useGetErasContent } from "../../../../hooks/useGetErasContent";
import { useUpdateErasContent } from "../../../../hooks/useUpdateErasContent";
import LoadingElement from "../../../../components/elements/loadingElement";
import { FaCircleInfo } from "react-icons/fa6";
import { toast } from "react-toastify";

export default function Home({ params }) {
  const { id } = use(params);
  const { content, isLoading, isError, mutate } = useGetErasContent(id);
  const { updateContent } = useUpdateErasContent();

  const handleSave = async (newContent) => {
    try {
      await updateContent(id, { content: newContent });
      mutate();
      toast.success("Pomyślnie zapisano zmiany.");
    } catch (error) {
      console.error("Error saving content:", error);
      toast.error("Nie udało się zapisać zmian.");
    }
  };

  return (
    <>
      {isLoading ? (
        <section className='w-full flex justify-center items-center flex-col min-h-dvh px-2 py-20'>
          <section className='flex flex-col justify-center items-center gap-4'>
            <LoadingElement variant='primary' />
            <h2 className='text-descriptionColor text-lg font-bold'>
              Ładowanie...
            </h2>
          </section>
        </section>
      ) : isError ? (
        <section className='flex flex-col justify-center items-center gap-4'>
          <FaCircleInfo className='text-4xl text-descriptionColor' />
          <p className='sm:text-base text-sm text-descriptionColor text-center'>
            Wystąpił problem podcza wyświetlania treści. Spróbuj ponownie
            później.
          </p>
        </section>
      ) : (
        <TipTapEditor content={content} onSave={handleSave} />
      )}
    </>
  );
}
