import React from "react";
import Input from "../../components/elements/Input";
import Castle from "../../img/castle.png";
import Image from "next/image";

function Step1({
  email,
  emailError,
  username,
  usernameError,
  onEmailChange,
  onUsernameChange,
}) {
  return (
    <>
      <Image src={Castle} alt='RegistrationImage' className='h-auto w-[74px]' />
      <h1 className='text-2xl font-[900] tracking-wide text-center font-nunito'>
        Załóż konto!
      </h1>
      <p className='pb-2 text-descriptionColor text-center'>
        Podaj swoje dane, aby dołączyć.
      </p>
      <section className='w-full h-full flex flex-col gap-4'>
        <Input
          type='email'
          labelText='E-mail'
          value={email}
          error={emailError}
          placeholderText='Adres e-mail'
          onChange={(e) => onEmailChange(e.target.value)}
        />
        <Input
          type='text'
          labelText='Nazwa użytkownika'
          value={username}
          error={usernameError}
          placeholderText='Podaj nazwę'
          onChange={(e) => onUsernameChange(e.target.value)}
        />
      </section>
    </>
  );
}

export default Step1;
