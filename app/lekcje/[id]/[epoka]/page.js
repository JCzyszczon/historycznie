"use client";
import Link from "next/link";
import React, { useEffect, use } from "react";
import { FaArrowLeft, FaCircleInfo } from "react-icons/fa6";
import { useGetErasContent } from "../../../hooks/useGetErasContent";
import LoadingElement from "../../../components/elements/loadingElement";
import { generateHTML } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Heading from "../../../components/TipTap/HeadingExtension";
import ImageResize from "tiptap-extension-resize-image";
import { useSession } from "next-auth/react";
import Button from "../../../components/elements/Button";

export default function Home({ params }) {
  const { data: session } = useSession();
  const { id, epoka } = use(params);
  const { content, isLoading, isError, mutate } = useGetErasContent(id);

  console.log(content);

  const htmlContent = content
    ? generateHTML(content, [
        TextAlign.configure({ types: ["paragraph", "heading"] }),
        StarterKit,
        TextStyle,
        Image,
        Heading,
        ImageResize,
      ])
    : "";

  return (
    <section className='w-full flex flex-col bg-background2 justify-center items-center min-h-dvh px-2 py-20 relative'>
      {session?.user?.role === "admin" && (
        <Link href={`${epoka}/edit`} className='absolute right-5 top-5'>
          <Button variant='primary'>Edytuj</Button>
        </Link>
      )}
      <section className='w-full max-w-5xl min-h-[700px] h-full rounded-2xl overflow-hidden bg-background px-6 py-12'>
        {!isLoading && !isError ? (
          <>
            {content ? (
              <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            ) : (
              <section className='w-full h-full min-h-[700px] flex flex-col justify-center items-center gap-4'>
                <FaCircleInfo className='text-4xl text-descriptionColor' />
                <p className='sm:text-base text-sm text-descriptionColor text-center'>
                  Brak treści. Wejdź w kreator edycji, aby dodać nowe materiały.
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
  );
}
