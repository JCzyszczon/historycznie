import React from "react";
import { FaImagePortrait, FaImage, FaUser } from "react-icons/fa6";

function EditNavbar({ activePanel, setActivePanel }) {
  return (
    <>
      <section className='w-full max-w-[240px] border-r-2 border-borderColor sm:flex hidden'>
        <ul className='w-full h-full flex flex-col justify-start items-center gap-10 py-24 text-lg font-bold font-nunito text-borderColor'>
          <li
            onClick={() => setActivePanel("Avatars")}
            className={`w-full cursor-pointer text-center border-r-[4px] py-1 ${
              activePanel === "Avatars"
                ? "border-primaryColor text-textColor hover:text-textColor"
                : "border-transparent hover:text-descriptionColor"
            } duration-200 translate-x-[2px]`}
          >
            Twój Awatar
          </li>
          <li
            onClick={() => setActivePanel("Banners")}
            className={`w-full cursor-pointer text-center border-r-[4px] py-1 ${
              activePanel === "Banners"
                ? "border-primaryColor text-textColor hover:text-textColor"
                : "border-transparent hover:text-descriptionColor"
            } duration-200 translate-x-[2px]`}
          >
            Tło profilu
          </li>
          <li
            onClick={() => setActivePanel("Data")}
            className={`w-full cursor-pointer text-center border-r-[4px] py-1 ${
              activePanel === "Data"
                ? "border-primaryColor text-textColor hover:text-textColor"
                : "border-transparent hover:text-descriptionColor"
            } duration-200 translate-x-[2px]`}
          >
            Dane użytkownika
          </li>
        </ul>
      </section>
      <section className='sm:hidden flex w-full py-4 px-6 text-2xl text-borderColor border-b border-borderColor'>
        <ul className='w-full flex justify-start items-center gap-8'>
          <li
            onClick={() => setActivePanel("Avatars")}
            className={`h-full cursor-pointer ${
              activePanel === "Avatars" && "text-primaryColor"
            } duration-200`}
          >
            <FaImagePortrait />
          </li>
          <li
            onClick={() => setActivePanel("Banners")}
            className={`h-full cursor-pointer ${
              activePanel === "Banners" && "text-primaryColor"
            } duration-200`}
          >
            <FaImage />
          </li>
          <li
            onClick={() => setActivePanel("Data")}
            className={`h-full cursor-pointer ${
              activePanel === "Data" && "text-primaryColor"
            } duration-200`}
          >
            <FaUser />
          </li>
        </ul>
      </section>
    </>
  );
}

export default EditNavbar;
