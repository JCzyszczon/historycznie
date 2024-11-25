"use client";
import React, { useEffect, useState } from "react";
import Button from "../elements/Button";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { signIn } from "next-auth/react";

function NavUnlogged() {
  const [navState, setNavState] = useState(false);

  useEffect(() => {
    if (navState) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [navState]);

  return (
    <>
      <section className='w-full max-w-5xl flex justify-between items-center gap-4'>
        <h2>Logo</h2>
        <section className='w-full sm:flex hidden justify-end flex-wrap items-center box-border gap-2'>
          <Button
            onClick={() => signIn()}
            variant='primary'
            className='flex-1 min-w-fit max-w-[160px]'
          >
            Logowanie
          </Button>
          <Link href='/auth/rejestracja'>
            <Button
              variant='secondary'
              className='flex-1 min-w-fit max-w-[160px]'
            >
              Rejestracja
            </Button>
          </Link>
        </section>
        <button
          onClick={() => setNavState(!navState)}
          className='sm:hidden flex h-full py-3'
          title={navState ? "Close Menu" : "Open Menu"}
        >
          <span className='flex flex-col gap-[6px] justify-between items-center'>
            <div
              className={`w-[16px] h-[1px] bg-textColor duration-200 ${
                navState
                  ? "rotate-45 translate-y-[3.5px]"
                  : "rotate-0 translate-y-0"
              }`}
            ></div>
            <div
              className={`w-[16px] h-[1px] bg-textColor duration-200 ${
                navState
                  ? "-rotate-45 -translate-y-[3.5px]"
                  : "rotate-0 translate-y-0"
              }`}
            ></div>
          </span>
        </button>
      </section>
      <AnimatePresence>
        {navState && (
          <motion.section
            initial={{ height: 0 }}
            animate={{ height: "26dvh" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
            className='w-full sm:hidden flex flex-col bg-background justify-end items-center gap-4 overflow-auto pb-10 px-[9px]'
          >
            <Button variant='primary' onClick={() => signIn()}>
              Logowanie
            </Button>
            <Link href='/auth/rejestracja' className='w-full'>
              <Button variant='secondary'>Rejestracja</Button>
            </Link>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}

export default NavUnlogged;
