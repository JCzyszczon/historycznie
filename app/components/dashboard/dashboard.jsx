"use client";
import React, { useState, useEffect } from "react";
import { useGetErasContent } from "../../hooks/useGetUserProgress";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { usePathname } from "next/navigation";
import LoadingElement from "../elements/loadingElement";
import Link from "next/link";
import { FaCircleInfo, FaPlus } from "react-icons/fa6";
import Button from "../elements/Button";
import AddLessonModal from "./addLessonModal";
import { AnimatePresence, motion } from "framer-motion";
import EditLessonModal from "./editLessonModal";
import AddTopicModal from "./addTopicModal";
import EditTopicModal from "./editTopicModal";
import { FaEdit } from "react-icons/fa";
import Image from "next/image";
import CheckedImage from "../../img/checked.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Dashboard() {
  const [isMinimized, setIsMinimized] = useState(false);
  const pathname = usePathname();

  const toggleMinimize = () => setIsMinimized((prev) => !prev);

  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { id: eraId, epoka: eraName } = useParams();
  const { progress, isLoading, isError, mutate } = useGetErasContent(
    eraId,
    userId
  );
  console.log(progress);

  const [isAddLessonModalOpen, setIsAddLessonModalOpen] = useState(false);
  const [isEditLessonModalOpen, setIsEditLessonModalOpen] = useState(false);
  const [isAddTopicModalOpen, setIsAddTopicModalOpen] = useState(false);
  const [isEditTopicModalOpen, setIsEditTopicModalOpen] = useState(false);
  const [lessonId, setLessonId] = useState("");
  const [topicId, setTopicId] = useState("");

  const openEditLessonModal = (id) => {
    setLessonId(id);
    setIsEditLessonModalOpen(true);
  };

  const openEditTopicModal = (id) => {
    setTopicId(id);
    setIsEditTopicModalOpen(true);
  };

  const openAddTopicModal = (id) => {
    setLessonId(id);
    setIsAddTopicModalOpen(true);
  };

  useEffect(() => {
    if (isEditLessonModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isEditLessonModalOpen]);

  useEffect(() => {
    if (isEditTopicModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isEditTopicModalOpen]);

  useEffect(() => {
    if (isAddLessonModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isAddLessonModalOpen]);

  useEffect(() => {
    if (isAddTopicModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isAddTopicModalOpen]);

  const isIntroductionActive = new RegExp(`^/lekcje/${eraId}/${eraName}$`).test(
    pathname
  );

  return (
    <>
      <button
        onClick={toggleMinimize}
        className='fixed top-5 left-5 z-[101] p-2 bg-primaryColor text-white rounded-full shadow-md'
      >
        {isMinimized ? <FaChevronRight /> : <FaChevronLeft />}
      </button>

      <motion.section
        initial={{ x: -320 }}
        animate={{
          x: isMinimized ? -320 : 0,
          opacity: isMinimized ? 0 : 1,
        }}
        transition={{ duration: 0.3 }}
        className={`fixed left-4 top-4 z-[100] h-[calc(100dvh-32px)] w-full max-w-[320px] rounded-2xl overflow-hidden border border-borderColor bg-background drop-shadow-xl`}
      >
        <section className='w-full h-full px-4 py-10 overflow-x-hidden overflow-y-scroll custom-scrollbar'>
          <h2 className='text-xl text-center font-nunito font-extrabold tracking-wide mb-4 first-letter:uppercase'>
            {decodeURIComponent(eraName)}
          </h2>
          {!isLoading && !isError ? (
            <>
              {progress && progress.length > 0 ? (
                <ul className='w-full flex flex-col justify-start items-start gap-4'>
                  <section className='w-full flex justify-between items-center gap-2'>
                    <Link
                      href={`/lekcje/${eraId}/${eraName}`}
                      className={`font-bold w-full max-w-[270px] overflow-hidden text-nowrap text-ellipsis ${
                        isIntroductionActive
                          ? "text-textColor font-extrabold"
                          : "text-descriptionColor font-bold"
                      }`}
                    >
                      <li>Wprowadzenie</li>
                    </Link>
                    {session?.user?.role === "admin" && (
                      <Button
                        variant='primary'
                        onClick={() => setIsAddLessonModalOpen(true)}
                        className='!max-w-[50px] !flex !justify-center !items-center !py-1'
                      >
                        <FaPlus className='text-lg' />
                      </Button>
                    )}
                  </section>
                  {progress.map((lesson) => (
                    <LessonItem
                      key={lesson.id}
                      lesson={lesson}
                      eraId={eraId}
                      eraName={eraName}
                      openEditLessonModal={openEditLessonModal}
                      openAddTopicModal={openAddTopicModal}
                      openEditTopicModal={openEditTopicModal}
                    />
                  ))}
                </ul>
              ) : (
                <section className='w-full h-auto min-h-[400px] flex flex-col justify-center items-center gap-4'>
                  <FaCircleInfo className='text-4xl text-descriptionColor' />
                  <p className='text-sm text-descriptionColor text-center'>
                    Brak treści. Dodaj nowe lekcje oraz tematy.
                  </p>
                  {session?.user?.role === "admin" && (
                    <Button
                      variant='primary'
                      onClick={() => setIsAddLessonModalOpen(true)}
                      className='!max-w-[200px] !py-2'
                    >
                      Dodaj
                    </Button>
                  )}
                </section>
              )}
            </>
          ) : (
            <section className='w-full h-auto min-h-[400px] flex flex-col justify-center items-center gap-4'>
              <LoadingElement variant='primary' />
              <h3 className='text-lg text-descriptionColor font-bold'>
                Ładowanie...
              </h3>
            </section>
          )}
          <Link
            href='/lekcje'
            className='absolute bottom-2 left-1/2 -translate-x-1/2 z-[10] w-[90%]'
          >
            <Button>Wyjdź</Button>
          </Link>
        </section>
      </motion.section>
      <AnimatePresence initial={false} mode='wait' onExitComplete={() => null}>
        {isAddLessonModalOpen && (
          <AddLessonModal
            eraId={eraId}
            mutateData={mutate}
            closeAddLessonModal={() => {
              setIsAddLessonModalOpen(false);
            }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence initial={false} mode='wait' onExitComplete={() => null}>
        {isEditLessonModalOpen && (
          <EditLessonModal
            lessonId={lessonId}
            mutateData={mutate}
            closeEditLessonModal={() => {
              setIsEditLessonModalOpen(false);
            }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence initial={false} mode='wait' onExitComplete={() => null}>
        {isAddTopicModalOpen && (
          <AddTopicModal
            lessonId={lessonId}
            mutateData={mutate}
            closeAddTopicModal={() => {
              setIsAddTopicModalOpen(false);
            }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence initial={false} mode='wait' onExitComplete={() => null}>
        {isEditTopicModalOpen && (
          <EditTopicModal
            topicId={topicId}
            mutateData={mutate}
            closeEditTopicModal={() => {
              setIsEditTopicModalOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function LessonItem({
  lesson,
  eraId,
  eraName,
  openEditLessonModal,
  openAddTopicModal,
  openEditTopicModal,
}) {
  const isLessonCompleted = lesson.isCompleted;
  const pathname = usePathname();
  const { data: session } = useSession();

  const isActiveLesson = pathname.includes(`/lekcja/${lesson.id}`);

  return (
    <>
      <li className='w-full flex flex-col justify-start items-start gap-2'>
        <section className='w-full flex justify-between items-center'>
          <section className='flex justify-start items-center gap-2'>
            <Link
              href={`/lekcje/${eraId}/${eraName}/lekcja/${lesson.id}`}
              className={`font-bold w-full max-w-[270px] overflow-hidden text-nowrap text-ellipsis ${
                isActiveLesson
                  ? "!text-textColor !font-extrabold"
                  : "text-descriptionColor font-bold"
              } ${
                isLessonCompleted
                  ? "text-primaryColor"
                  : "text-descriptionColor"
              }`}
            >
              {lesson.title}
            </Link>
            {isLessonCompleted && (
              <Image
                src={CheckedImage}
                alt='Checked Image'
                width={80}
                height={80}
                className='w-[18px] h-[18px]'
              />
            )}
          </section>
          <section className='flex justify-center items-center gap-2'>
            {session?.user?.role === "admin" && (
              <>
                <Button
                  onClick={() => openAddTopicModal(lesson.id)}
                  variant='primary'
                  className='!max-w-[50px] !flex !justify-center !items-center !py-1'
                >
                  <FaPlus className='text-lg' />
                </Button>
                <Button
                  variant='primary'
                  className='!max-w-[50px] !flex !justify-center !items-center !py-1'
                  onClick={() => openEditLessonModal(lesson.id)}
                >
                  <FaEdit className='text-lg' />
                </Button>
              </>
            )}
          </section>
        </section>
        <ul className='pl-4 w-full flex flex-col justify-start items-start gap-1'>
          {lesson.topics.map((topic) => {
            const isTopicPassed = topic.isPassed;
            const isActiveTopic = pathname.includes(`/temat/${topic.id}`);

            return (
              <section
                key={topic.id}
                className='w-full flex justify-between items-center gap-2'
              >
                <section className='flex justify-start items-center gap-2'>
                  <Link href={`/lekcje/${eraId}/${eraName}/temat/${topic.id}`}>
                    <li
                      className={`${
                        isActiveTopic
                          ? "!text-textColor !font-extrabold"
                          : "text-descriptionColor font-normal"
                      } ${
                        isTopicPassed
                          ? "text-primaryColor"
                          : "text-descriptionColor"
                      } w-full max-w-[240px] overflow-hidden text-nowrap text-ellipsis`}
                    >
                      {topic.title}
                    </li>
                  </Link>
                  {isTopicPassed && (
                    <Image
                      src={CheckedImage}
                      alt='Checked Image'
                      width={80}
                      height={80}
                      className='w-[18px] h-[18px]'
                    />
                  )}
                </section>
                {session?.user?.role === "admin" && (
                  <Button
                    variant='primary'
                    className='!max-w-[46px] !flex !justify-center !items-center !py-0'
                    onClick={() => openEditTopicModal(topic.id)}
                  >
                    <FaEdit className='text-xl' />
                  </Button>
                )}
              </section>
            );
          })}
        </ul>
      </li>
    </>
  );
}
