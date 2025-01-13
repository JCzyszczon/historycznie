import React, { useState } from "react";
import Button from "../elements/Button";
import Input from "../elements/Input";
import { useUpdateUser } from "../../hooks/useUpdateUser";
import { toast } from "react-toastify";

function EditData({ user, mutateUser }) {
  const [username, setUsername] = useState(user.username);
  const [usernameError, setUsernameError] = useState(false);
  const [name, setName] = useState(user.name);
  const [nameError, setNameError] = useState(false);
  const [surname, setSurname] = useState(user.surname);
  const [surnameError, setSurnameError] = useState(false);
  const [email, setEmail] = useState(user.email);
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState("");

  const { updateUser } = useUpdateUser();

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_=,.?":{}|<>-])[A-Za-z\d!@#$%^&*()_=,.?":{}|<>-]{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  const handleChangeData = async () => {
    if (!username && !name && !surname) {
      toast.error("Pola nie mogą być puste.");
      setNameError(true);
      setUsernameError(true);
      setSurnameError(true);
      return;
    }

    if (!username) {
      toast.error("Pole nie może być puste.");
      setUsernameError(true);
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

    try {
      const updatedData = {
        username: username || undefined,
        name: name || undefined,
        surname: surname || undefined,
      };

      const result = await updateUser(user.id, updatedData);

      if (result) {
        toast.success(result.message || "Dane zostały zaktualizowane.");
        setUsernameError(false);
        setNameError(false);
        setSurnameError(false);
      }

      mutateUser();
    } catch (error) {
      setUsernameError(true);
      toast.error(error.message || "Wystąpił błąd podczas aktualizacji.");
    }
  };

  const handleChangeContact = async () => {
    if (!email) {
      toast.error("Pole nie może być puste.");
      setEmailError(true);
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error("Adres e-mail ma niepoprawny format.");
      setEmailError(true);
      return;
    }

    try {
      const updatedData = {
        email: email || undefined,
      };

      const result = await updateUser(user.id, updatedData);

      if (result) {
        toast.success(result.message || "Dane zostały zaktualizowane.");
        setEmailError(false);
      }

      mutateUser();
    } catch (error) {
      setEmailError(true);
      toast.error(error.message || "Wystąpił błąd podczas aktualizacji.");
    }
  };

  const handleChangePassword = async () => {
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
      const updatedData = {
        password: password || undefined,
      };

      const result = await updateUser(user.id, updatedData);

      if (result) {
        toast.success(result.message || "Dane zostały zaktualizowane.");
        setPasswordError(false);
      }

      mutateUser();
    } catch (error) {
      setPasswordError(true);
      toast.error(error.message || "Wystąpił błąd podczas aktualizacji.");
    }
  };

  return (
    <section className='w-full h-full flex flex-col justify-start items-center gap-2 overflow-y-scroll custom-scrollbar'>
      <section className='w-full flex flex-col justify-start items-start sm:py-12 gap-8 py-8 sm:px-8 px-4'>
        <section className='w-full border-b-2 border-borderColor py-2 px-4'>
          <h3 className='text-base font-bold'>Dane osobowe:</h3>
        </section>
        <section className='w-full flex flex-col justify-start items-center gap-2'>
          <Input
            labelText='Nazwa użytkownika'
            value={username}
            error={usernameError}
            className='max-w-[400px]'
            onChange={(e) => (
              setUsername(e.target.value), setUsernameError(false)
            )}
          />
          <Input
            labelText='Imię'
            value={name}
            error={nameError}
            className='max-w-[400px]'
            onChange={(e) => (setName(e.target.value), setNameError(false))}
          />
          <Input
            labelText='Nazwisko'
            value={surname}
            error={surnameError}
            className='max-w-[400px]'
            onChange={(e) => (
              setSurname(e.target.value), setSurnameError(false)
            )}
          />
          <div className='w-full max-w-[400px] flex justify-center items-center pt-4'>
            <Button
              onClick={handleChangeData}
              variant={
                name === user.name &&
                surname === user.surname &&
                username === user.username
                  ? "secondary"
                  : "primary"
              }
              disabled={
                name === user.name &&
                surname === user.surname &&
                username === user.username
                  ? true
                  : false
              }
              className='max-w-[240px]'
            >
              Aktualizuj dane
            </Button>
          </div>
        </section>
        <section className='w-full border-b-2 border-borderColor py-2 px-4'>
          <h3 className='text-base font-bold'>Dane kontaktowe:</h3>
        </section>
        <section className='w-full flex flex-col justify-start items-center gap-2'>
          <Input
            labelText='Adres e-mail'
            type='email'
            value={email}
            error={emailError}
            className='max-w-[400px]'
            onChange={(e) => (setEmail(e.target.value), setEmailError(false))}
          />
          <div className='w-full max-w-[400px] flex justify-center items-center pt-4'>
            <Button
              onClick={handleChangeContact}
              variant={email === user.email ? "secondary" : "primary"}
              disabled={email === user.email ? true : false}
              className='max-w-[240px]'
            >
              Zmień adres
            </Button>
          </div>
        </section>
        <section className='w-full border-b-2 border-borderColor py-2 px-4'>
          <h3 className='text-base font-bold'>Zmień hasło:</h3>
        </section>
        <section className='w-full flex flex-col justify-start items-center gap-2'>
          <Input
            labelText='Nowe hasło'
            type='password'
            placeholderText='••••••••••'
            error={passwordError}
            className='max-w-[400px]'
            onChange={(e) => handlePasswordChange(e.target.value)}
          />
          <div className='w-full max-w-[400px] flex flex-col justify-start items-start text-xs pt-2'>
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
          <div className='w-full max-w-[400px] flex justify-center items-center pt-4'>
            <Button
              onClick={handleChangePassword}
              variant={!password ? "secondary" : "primary"}
              disabled={!password ? true : false}
              className='max-w-[240px]'
            >
              Zmień hasło
            </Button>
          </div>
        </section>
      </section>
    </section>
  );
}

export default EditData;
