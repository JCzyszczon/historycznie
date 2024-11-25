import React, { useRef, useState } from "react";
import RegistrationImage from "../../img/e69974f04b05dcf07f2a.svg";
import Image from "next/image";

function Step3({ verificationCodeError, onVerificationCodeChange }) {
  const inputRefs = useRef([]);
  const [code, setCode] = useState(Array(5).fill(""));

  const handleInputChange = (event, index) => {
    const { value } = event.target;

    if (/^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      onVerificationCodeChange(newCode.join(""));

      if (value.length === 1 && index < 4) {
        inputRefs.current[index + 1].focus();
      }
    } else {
      event.target.value = "";
    }
  };

  return (
    <>
      <Image
        src={RegistrationImage}
        alt='RegistrationImage'
        className='h-[74px]'
      />
      <h1 className='text-2xl font-[900] tracking-wide text-center font-nunito'>
        Zweryfikuj e-mail!
      </h1>
      <p className='pb-2 text-descriptionColor text-center'>
        Wpisz 5 cyfrowy kod, aby aktywować konto.
      </p>
      <section className='w-full h-full flex gap-4 justify-center items-start pt-8'>
        {[...Array(5)].map((_, index) => (
          <input
            key={index}
            type='text'
            maxLength='1'
            ref={(el) => (inputRefs.current[index] = el)}
            onChange={(e) => handleInputChange(e, index)}
            className={`appearance-none font-extrabold focus:outline-none focus:ring-0 rounded-lg bg-gray-50 border text-gray-900 focus:ring-primaryColor focus:border-primaryColor w-full text-base ${
              verificationCodeError ? "border-red-500" : "border-borderColor"
            } py-5 text-center`}
          />
        ))}
      </section>
    </>
  );
}

export default Step3;
