"use client";
import React, { useState } from "react";
import Button from "../../components/elements/Button";
import Input from "../../components/elements/Input";
import LoadingElement from "../../components/elements/loadingElement";
import Image from "next/image";
import GoogleIcon from "../../img/Google_Icons-09-512.png";
import { signIn } from "next-auth/react";
import LoginImage from "../../img/king.png";
import { toast } from "react-toastify";

export default function LoginPanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    setLoading(true);
    setEmailError(false);
    setPasswordError(false);

    if (!email && !password) {
      toast.error("Pola nie mogą być puste.");
      setEmailError(true);
      setPasswordError(true);
      setLoading(false);
      return;
    }

    if (!email) {
      toast.error("Pole nie może być puste.");
      setEmailError(true);
      setLoading(false);
      return;
    }

    if (!password) {
      toast.error("Pole nie może być puste.");
      setPasswordError(true);
      setLoading(false);
      return;
    }

    const result = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    if (!result.ok) {
      setEmailError(true);
      setPasswordError(true);
      toast.error(result.error || "Wystąpił nieznany błąd.");
      setLoading(false);
    } else {
      toast.success("Zalogowano pomyślnie.");
      window.location.href = "/";
    }
  };

  return (
    <section className='max-w-md w-full rounded-xl border px-10 pt-10 pb-6 bg-white flex flex-col gap-4 justify-start items-center'>
      <Image src={LoginImage} className='h-auto w-[74px]' alt='LoginImage' />
      <h1 className='text-2xl text-center font-[900] tracking-wide font-nunito'>
        Witaj ponownie!
      </h1>
      <p className='pb-2 text-descriptionColor text-center'>
        Zaloguj się, używając swoich danych.
      </p>
      <Input
        type='text'
        labelText='Nazwa użytkownika lub e-mail'
        error={emailError}
        placeholderText='Podaj nazwę'
        onChange={(e) => (setEmail(e.target.value), setEmailError(false))}
      />
      <Input
        type='password'
        labelText='Hasło'
        variant='login'
        error={passwordError}
        placeholderText='••••••••••'
        onChange={(e) => (setPassword(e.target.value), setPasswordError(false))}
      />
      <Button
        type='button'
        variant='primary'
        onClick={onSubmit}
        disabled={loading}
      >
        {loading ? <LoadingElement /> : "Zaloguj się"}
      </Button>

      <div className='h-[1px] bg-borderColor w-full relative my-4'>
        <span className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%] bg-background px-2 text-sm text-descriptionColor uppercase'>
          lub
        </span>
      </div>
      <Button variant='secondary' onClick={() => signIn("google")}>
        <Image
          src={GoogleIcon}
          alt='Google Icon'
          title='Google Icon'
          className='w-[32px]'
        />
      </Button>
      <p className='pt-4 text-descriptionColor text-center'>
        Nie masz konta?{" "}
        <a href='/auth/rejestracja' className='text-primaryColor font-medium'>
          Zarejestruj się
        </a>
      </p>
    </section>
  );
}
