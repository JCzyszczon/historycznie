import React from "react";
import SuccessImage from "../../img/3eb9efb1b25e923c24eb.svg";
import Image from "next/image";
import Button from "../elements/Button";

function Step4() {
  const handleClick = () => {
    window.location.href = "/auth/logowanie";
  };
  return (
    <>
      <Image src={SuccessImage} alt='Success Image' className='w-full' />
      <section className='h-full flex flex-col justify-start items-center gap-4'>
        <h1 className='text-2xl font-[900] tracking-wide text-center font-nunito'>
          Konto zostało utworzone!
        </h1>
        <p className='pb-2 text-descriptionColor text-center'>
          Zaloguj się już teraz i zdobywaj wiedzę w przyjemny sposób.
        </p>
      </section>
      <Button variant='primary' onClick={handleClick}>
        Zaloguj się
      </Button>
    </>
  );
}

export default Step4;
