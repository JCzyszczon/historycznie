import React from "react";
import SuccessImage from "../../img/2210_w015_n003_1037b_p15_1037.jpg";
import Image from "next/image";
import Button from "../elements/Button";
import Castle from "../../img/castle.png";

function Step4() {
  const handleClick = () => {
    window.location.href = "/auth/logowanie";
  };
  return (
    <>
      <Image src={Castle} alt='RegistrationImage' className='h-auto w-[74px]' />
      <section className='h-full flex flex-col justify-start items-center gap-4 pt-4'>
        <h1 className='text-2xl font-[900] tracking-wide text-center font-nunito'>
          Witaj na pokładzie!
        </h1>
        <p className='pb-2 text-descriptionColor text-center'>
          Zaloguj się i odkrywaj historię tak jak lubisz najbardziej.
        </p>
      </section>
      <section className='w-full pb-12'>
        <Button variant='primary' onClick={handleClick} className=''>
          Zaloguj się
        </Button>
      </section>
    </>
  );
}

export default Step4;
