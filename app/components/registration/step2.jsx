import React from "react";
import Input from "../../components/elements/Input";

function Step2({
  name,
  nameError,
  surname,
  surnameError,
  onNameChange,
  onSurnameChange,
  password,
  passwordError,
  onPasswordChange,
  passwordRequirements,
}) {
  return (
    <>
      <section className='w-full h-full flex flex-col gap-4'>
        <Input
          type='text'
          labelText='Imię'
          value={name}
          error={nameError}
          placeholderText='Jan'
          onChange={(e) => onNameChange(e.target.value)}
        />
        <Input
          type='text'
          labelText='Nazwisko'
          error={surnameError}
          value={surname}
          placeholderText='Kowalski'
          onChange={(e) => onSurnameChange(e.target.value)}
        />
        <Input
          type='password'
          labelText='Hasło'
          error={passwordError}
          variant='registration'
          value={password}
          placeholderText='Ustaw hasło'
          onChange={(e) => onPasswordChange(e.target.value)}
        />
        <div className='w-full flex flex-col justify-start items-start text-xs'>
          <h3 className='font-extrabold pb-1'>Hasło musi składać się z:</h3>
          <ul className='list-disc pl-4 flex justify-between gap-6 items-start w-full'>
            <span className='w-1/2'>
              <li
                className={
                  passwordRequirements?.minLength
                    ? "text-primaryColor"
                    : "text-red-500"
                }
              >
                Co najmniej 8 znaków
              </li>
              <li
                className={
                  passwordRequirements?.number
                    ? "text-primaryColor"
                    : "text-red-500"
                }
              >
                Cyfry
              </li>
              <li
                className={
                  passwordRequirements?.uppercase
                    ? "text-primaryColor"
                    : "text-red-500"
                }
              >
                Dużej litery
              </li>
            </span>
            <span className='w-1/2'>
              <li
                className={
                  passwordRequirements?.lowercase
                    ? "text-primaryColor"
                    : "text-red-500"
                }
              >
                Małej litery
              </li>
              <li
                className={
                  passwordRequirements?.specialChar
                    ? "text-primaryColor"
                    : "text-red-500"
                }
              >
                Znaku specjalnego
              </li>
            </span>
          </ul>
        </div>
      </section>
    </>
  );
}

export default Step2;
