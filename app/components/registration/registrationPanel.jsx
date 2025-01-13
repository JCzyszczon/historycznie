"use client";
import React, { useState } from "react";
import Button from "../elements/Button";
import Image from "next/image";
import GoogleIcon from "../../img/Google_Icons-09-512.png";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";
import LoadingElement from "../elements/loadingElement";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

export default function RegistrationPanel() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [registrationLoading, setRegistrationLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [surnameError, setSurnameError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationCodeError, setVerificationCodeError] = useState(false);
  const [verificationLoading, setVerificationLoading] = useState(false);

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_=,.?":{}|<>-])[A-Za-z\d!@#$%^&*()_=,.?":{}|<>-]{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailChange = (value) => (setEmail(value), setEmailError(false));

  const handlePasswordChange = (value) => {
    const requirements = {
      minLength: value.length >= 8,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      specialChar: /[!@#$%^&*()_=,.?":{}|<>-]/.test(value),
      number: /\d/.test(value),
    };

    setPassword(value);
    setPasswordRequirements(requirements);
    setPasswordError(false);
  };

  const handleNameChange = (value) => (setName(value), setNameError(false));

  const handleSurnameChange = (value) => (
    setSurname(value), setSurnameError(false)
  );

  const handleUsernameChange = (value) => (
    setUsername(value), setUsernameError(false)
  );

  const handleVerificationCodeChange = (value) => {
    setVerificationCode(value);
    setVerificationCodeError(false);
  };

  const checkExistingData = async () => {
    setLoading(true);

    if (!email && !username) {
      toast.error("Pola nie mogą być puste.");
      setEmailError(true);
      setUsernameError(true);
      setLoading(false);
      return;
    }

    if (!email) {
      toast.error("Pole nie może być puste.");
      setEmailError(true);
      setLoading(false);
      return;
    }

    if (!username) {
      toast.error("Pole nie może być puste.");
      setUsernameError(true);
      setLoading(false);
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error("Adres e-mail ma niepoprawny format.");
      setEmailError(true);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/check?email=${email}&username=${username}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (response) {
        const data = await response.json();
        if (data.error) {
          toast.error(data.error || "Wystąpił nieznany błąd.");
          if (data.error.includes("e-mail")) {
            setEmailError(true);
          }
          if (data.error.includes("użytkownika")) {
            setUsernameError(true);
          }
        } else {
          setStep(2);
        }
      } else {
        toast.error("Błąd serwera. Spróbuj ponownie później.");
      }
    } catch (error) {
      toast.error("Błąd serwera. Spróbuj ponownie później.");
    } finally {
      setLoading(false);
    }
  };

  const registerNewUser = async () => {
    if (!name && !surname && !password) {
      toast.error("Pola nie mogą być puste.");
      setNameError(true);
      setSurnameError(true);
      setPasswordError(true);
      return;
    }

    if (!name) {
      toast.error("Pole nie może być puste.");
      setNameError(true);
      return;
    }

    if (!surname) {
      toast.error("Pole nie może być puste.");
      setSurnameError(true);
      return;
    }

    if (!password) {
      toast.error("Pole nie może być puste.");
      setPasswordError(true);
      return;
    }

    if (!passwordRegex.test(password)) {
      toast.error("Hasło nie spełnia wymagań.");
      setPasswordError(true);
      return;
    }

    try {
      setRegistrationLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            username: username,
            name: name,
            surname: surname,
            password: password,
          }),
        }
      );
      if (response) {
        const data = await response.json();
        if (data.error) {
          toast.error(data.error || "Wystąpił nieznany błąd.");
        } else {
          setStep(3);
        }
      } else {
        toast.error("Błąd serwera. Spróbuj ponownie później.");
      }
    } catch (error) {
      toast.error("Błąd serwera. Spróbuj ponownie później.");
    } finally {
      toast.success("Zapisano dane użytkownika.");
      setRegistrationLoading(false);
    }
  };

  const verifyNewUser = async () => {
    if (!verificationCode) {
      toast.error("Pole nie może być puste.");
      setVerificationCodeError(true);
      return;
    }

    try {
      setVerificationLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/verify`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            verificationCode: verificationCode,
          }),
        }
      );
      if (response) {
        const data = await response.json();
        if (data.error) {
          toast.error(data.error || "Wystąpił nieznany błąd.");
        } else {
          setStep(4);
        }
      } else {
        toast.error("Błąd serwera. Spróbuj ponownie później.");
      }
    } catch (error) {
      toast.error("Błąd serwera. Spróbuj ponownie później.");
    } finally {
      toast.success("Zweryfikowano użytkownika.");
      setVerificationLoading(false);
    }
  };

  return (
    <section className='max-w-md w-full rounded-xl h-[647px] border px-10 pt-10 pb-6 bg-white flex flex-col gap-4 justify-start items-center relative overflow-hidden'>
      <span
        className={`absolute top-0 left-0 h-[6px] ${
          step === 1
            ? "w-1/4"
            : step === 2
            ? "w-1/2"
            : step === 3
            ? "w-3/4"
            : step === 4
            ? "w-full"
            : "w-0"
        } bg-primaryColor duration-1000`}
      ></span>
      {step === 1 ? (
        <Step1
          email={email}
          username={username}
          emailError={emailError}
          usernameError={usernameError}
          onEmailChange={handleEmailChange}
          onUsernameChange={handleUsernameChange}
        />
      ) : step === 2 ? (
        <Step2
          name={name}
          surname={surname}
          nameError={nameError}
          surnameError={surnameError}
          password={password}
          passwordError={passwordError}
          passwordRequirements={passwordRequirements}
          onNameChange={handleNameChange}
          onSurnameChange={handleSurnameChange}
          onPasswordChange={handlePasswordChange}
        />
      ) : step === 3 ? (
        <Step3
          verificationCodeError={verificationCodeError}
          onVerificationCodeChange={handleVerificationCodeChange}
        />
      ) : step === 4 ? (
        <Step4 />
      ) : (
        <></>
      )}
      {step === 1 ? (
        <Button
          variant='primary'
          disabled={loading}
          onClick={() => checkExistingData()}
        >
          {loading ? <LoadingElement /> : "Dalej"}
        </Button>
      ) : step === 2 ? (
        <section className='w-full flex justify-between gap-2'>
          <Button variant='secondary' onClick={() => setStep(step - 1)}>
            Wróć
          </Button>
          <Button
            variant='primary'
            disabled={registrationLoading}
            onClick={() => registerNewUser()}
          >
            {registrationLoading ? <LoadingElement /> : "Dalej"}
          </Button>
        </section>
      ) : step === 3 ? (
        <>
          <Button
            variant='primary'
            disabled={verificationLoading}
            onClick={() => verifyNewUser()}
          >
            {verificationLoading ? <LoadingElement /> : "Potwierdź"}
          </Button>
          <p className='pt-4 text-descriptionColor text-center'>
            Nie dostałeś kodu?{" "}
            <a href='/auth/logowanie' className='text-primaryColor font-medium'>
              Wyślij ponownie
            </a>
          </p>
        </>
      ) : (
        <></>
      )}
      {(step === 1 || step === 2) && (
        <>
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
            Masz już konto?{" "}
            <span
              onClick={() => signIn()}
              className='text-primaryColor cursor-pointer font-medium'
            >
              Zaloguj się
            </span>
          </p>
        </>
      )}
    </section>
  );
}
