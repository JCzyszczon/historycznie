"use client";
import Link from "next/link";
import React, { use, useState, useEffect } from "react";
import { FaArrowLeft, FaCircleInfo } from "react-icons/fa6";
import { useGetTopicsContent } from "../../../../../hooks/useGetTopicsContent";
import LoadingElement from "../../../../../components/elements/loadingElement";
import { generateHTML } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "../../../../../components/TipTap/HeadingExtension";
import ImageResize from "tiptap-extension-resize-image";
import { useSession } from "next-auth/react";
import Button from "../../../../../components/elements/Button";
import AddQuestionsModal from "../../../../../components/topic/addQuestionsModal";
import { useCheckTopicResult } from "../../../../../hooks/useCheckTopicResult";
import { AnimatePresence } from "framer-motion";
import QuizModal from "../../../../../components/topic/quizModal";
import { useGetErasContent } from "../../../../../hooks/useGetUserProgress";

export default function Home({ params }) {
  const { data: session } = useSession();
  const { id, topicId } = use(params);
  const { content, isLoading, isError, mutate } = useGetTopicsContent(topicId);
  const {
    isPassed,
    isLoading: isTopicResultsLoading,
    isError: isTopicResultsError,
  } = useCheckTopicResult(topicId, session?.user.id);
  const [isQuestionsModalOpen, setIsQuestionsModalOpen] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const { mutate: mutateErasContent } = useGetErasContent(
    id,
    session?.user?.id
  );

  const htmlContent = content
    ? generateHTML(content, [
        TextAlign.configure({ types: ["paragraph", "heading"] }),
        StarterKit,
        Image,
        TextStyle,
        Heading,
        ImageResize,
      ])
    : "";

  useEffect(() => {
    if (isQuestionsModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isQuestionsModalOpen]);

  useEffect(() => {
    if (isQuizModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isQuizModalOpen]);

  return (
    <>
      <section className='w-full flex flex-col bg-background2 justify-center items-center min-h-dvh px-2 py-20 relative'>
        {session?.user?.role === "admin" && (
          <section className='flex justify-center items-center gap-2 absolute right-5 top-5'>
            <Button
              variant='primary'
              onClick={() => setIsQuestionsModalOpen(true)}
            >
              Pytania
            </Button>
            <Link href={`./${topicId}/edit`}>
              <Button variant='primary'>Edytuj</Button>
            </Link>
          </section>
        )}
        <section className='w-full max-w-5xl min-h-[700px] h-full rounded-2xl overflow-hidden bg-background px-6 py-12'>
          {!isLoading && !isError ? (
            <>
              {content ? (
                <>
                  <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                  {!isTopicResultsLoading && !isTopicResultsError && (
                    <section className='w-full flex justify-center items-center'>
                      {isPassed ? (
                        <Button
                          onClick={() => setIsQuizModalOpen(true)}
                          variant='secondary'
                          className='!max-w-[240px]'
                        >
                          Rozwiąż ponownie
                        </Button>
                      ) : (
                        <Button
                          onClick={() => setIsQuizModalOpen(true)}
                          variant='primary'
                          className='!max-w-[240px]'
                        >
                          Rozwiąż test
                        </Button>
                      )}
                    </section>
                  )}
                </>
              ) : (
                <section className='w-full h-full min-h-[700px] flex flex-col justify-center items-center gap-4'>
                  <FaCircleInfo className='text-4xl text-descriptionColor' />
                  <p className='sm:text-base text-sm text-descriptionColor text-center'>
                    Brak treści. Wejdź w kreator edycji, aby dodać nowe
                    materiały.
                  </p>
                </section>
              )}
            </>
          ) : (
            <section className='w-full h-full min-h-[700px] flex justify-center items-center'>
              <LoadingElement variant='primary' />
            </section>
          )}
        </section>
      </section>
      <AnimatePresence initial={false} mode='wait' onExitComplete={() => null}>
        {isQuestionsModalOpen && (
          <AddQuestionsModal
            htmlContent={htmlContent}
            topicId={topicId}
            closeAddQuestionsModal={() => {
              setIsQuestionsModalOpen(false);
            }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence initial={false} mode='wait' onExitComplete={() => null}>
        {isQuizModalOpen && (
          <QuizModal
            mutateErasContent={mutateErasContent}
            userId={session?.user?.id}
            topicId={topicId}
            closeQuizModal={() => {
              setIsQuizModalOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
