"use client";
import React from "react";
import Button from "../elements/Button";
import Link from "next/link";
import Image from "next/image";
import GamePresentationImage from "../../img/prezentacja-gry2.png";
import GamePresentationImage2 from "../../img/prezentacja-gry4.png";
import GamePresentationImage3 from "../../img/prezentacja-gry5.png";
import ReactCompareImage from "react-compare-image";
import Footer from "./footer";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import StarozytnoscImage from "../../img/starożytność.jpg";
import MedievalImage from "../../img/średniowiecze.jpg";
import ModernEraImage from "../../img/nowożytność.jpg";
import WorldWarImage from "../../img/współczesność.png";
import { motion } from "framer-motion";
import TempleImage from "../../img/2210_w015_n003_1037b_p15_1037.jpg";
import Battle from "../../img/battle-2.png";

const charVariants = {
  hidden: { opacity: 0 },
  reveal: { opacity: 1 },
};

const charVariantsCards = {
  hidden: { rotate: 0 },
  reveal: { rotate: 6 },
};

const charVariantsCards2 = {
  hidden: { x: 0, y: 0, rotate: 0 },
  reveal: { x: "-20%", y: "-5%", rotate: "-10deg" },
};

const charVariantsCards3 = {
  hidden: { x: 0, y: 0, rotate: 0 },
  reveal: { x: "30%", y: "0%", rotate: "22deg" },
};

function MainPanel2() {
  return (
    <>
      <section className='w-full flex flex-col bg-background2 justify-start items-center min-h-screen sm:pb-28 pb-20 overflow-x-hidden'>
        <section className='w-full max-w-5xl sm:min-h-screen min-h-0 flex sm:flex-row flex-col gap-4 px-4'>
          <section className='w-full flex flex-1 justify-center min-h-[300px] items-center md:pt-0 pt-32'>
            <section className='w-full h-auto md:aspect-square aspect-auto relative rounded-2xl overflow-hidden drop-shadow-2xl'>
              <Image
                src={TempleImage}
                alt='Temple Image'
                className='w-full h-auto md:aspect-square aspect-auto object-cover brightness-50'
              />
              <span className='absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col gap-2 justify-center items-center select-none'>
                <Image
                  src={Battle}
                  alt='Swords Icon'
                  width={280}
                  height={280}
                  className='md:w-[80px] w-[40px] md:h-[80px] h-[40px]'
                />
                <h2 className='md:text-4xl text-xl font-extrabold font-nunito tracking-wide text-primaryColor duration-200 flex'>
                  Historycznie
                </h2>
              </span>
            </section>
          </section>
          <section className='w-full flex flex-col min-h-[600px] gap-4 flex-1 justify-center items-center'>
            <motion.h1
              initial='hidden'
              whileInView='reveal'
              transition={{ staggerChildren: 0.02 }}
              viewport={{ once: true, amount: 0.5 }}
              className='sm:text-4xl text-3xl font-nunito text-center font-extrabold text-primaryColor'
            >
              {"Odkryj historię na nowo".split("").map((char, index) => (
                <motion.span
                  key={char + index}
                  transition={{ duration: 0.5 }}
                  variants={charVariants}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>
            <p className='sm:text-2xl text-lg font-nunito text-descriptionColor text-center font-extrabold'>
              Darmowy, ciekawy i skuteczny sposób na naukę historii!
            </p>
            <Link href='/auth/rejestracja' className='w-full max-w-[300px]'>
              <Button variant='primary' className='!w-full !max-w-[300px]'>
                Rozpocznij
              </Button>
            </Link>
          </section>
        </section>
        <section className='w-full max-w-5xl flex sm:gap-1 gap-6 sm:flex-row flex-col-reverse sm:pb-40 pb-20 px-4'>
          <section className='w-full flex flex-col gap-4 flex-1 justify-center items-center p-2'>
            <motion.h2
              initial='hidden'
              whileInView='reveal'
              transition={{ staggerChildren: 0.02 }}
              viewport={{ once: true, amount: 0.5 }}
              className='md:text-4xl text-2xl font-nunito sm:text-start text-center font-extrabold text-primaryColor'
            >
              {"Daj się wciągnąć w niesamowitą rozgywkę."
                .split("")
                .map((char, index) => (
                  <motion.span
                    key={char + index}
                    transition={{ duration: 0.5 }}
                    variants={charVariants}
                  >
                    {char}
                  </motion.span>
                ))}
            </motion.h2>
            <p className='md:text-xl text-base font-nunito text-descriptionColor sm:text-start text-center font-extrabold'>
              Rywalizuj z innymi użytkownikami, uczestnicz w codziennych
              wyzwaniach i zdobywaj{" "}
              <span className='text-textColor'>wspaniałe nagrody!</span>
            </p>
          </section>
          <section className='w-full flex sm:min-h-[600px] min-h-[330px] flex-1 justify-center items-center p-2 relative'>
            <motion.span
              initial='hidden'
              whileInView='reveal'
              variants={charVariantsCards}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.5 }}
              className='w-auto sm:h-full h-[320px] max-h-[600px] absolute overflow-hidden rounded-xl z-[10] drop-shadow-xl'
            >
              <Image
                src={GamePresentationImage}
                alt='Game Presentation Image'
                className='w-full h-full'
                quality={100}
              />
            </motion.span>
            <motion.span
              initial='hidden'
              whileInView='reveal'
              variants={charVariantsCards2}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.5 }}
              className='w-auto sm:h-full h-[320px] max-h-[600px] border border-borderColor absolute overflow-hidden rounded-xl z-[8] drop-shadow-xl'
            >
              <Image
                src={GamePresentationImage2}
                alt='Game Presentation Image 2'
                className='w-full h-full'
                quality={100}
              />
            </motion.span>
            <motion.span
              initial='hidden'
              whileInView='reveal'
              variants={charVariantsCards3}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.5 }}
              className='w-auto sm:h-full h-[320px] max-h-[600px] border border-borderColor absolute overflow-hidden rounded-xl z-[9] drop-shadow-xl'
            >
              <Image
                src={GamePresentationImage3}
                alt='Game Presentation Image 3'
                className='w-full h-full'
                quality={100}
              />
            </motion.span>
          </section>
        </section>
        <section className='w-full h-[34px] bg-background sm:hidden flex'></section>
        <section className='w-full max-w-5xl flex gap-6 flex-col justify-center items-center sm:pt-0 pt-20 sm:pb-40 pb-20 px-4'>
          <section className='w-full max-w-[700px] flex flex-col gap-4 flex-1 justify-center items-center p-2'>
            <motion.h2
              initial='hidden'
              whileInView='reveal'
              transition={{ staggerChildren: 0.02 }}
              viewport={{ once: true, amount: 0.5 }}
              className='md:text-4xl text-2xl font-nunito text-center font-extrabold text-primaryColor'
            >
              {"Ulepszaj swój profil, zdobywaj osiągnięcia i dostosowywuj wygląd."
                .split("")
                .map((char, index) => (
                  <motion.span
                    key={char + index}
                    transition={{ duration: 0.5 }}
                    variants={charVariants}
                  >
                    {char}
                  </motion.span>
                ))}
            </motion.h2>
            <p className='md:text-xl text-base font-nunito text-descriptionColor text-center font-extrabold'>
              Podejmując różne aktywności na stronie - możesz zdobyć{" "}
              <span className='text-textColor'>osiągnięcia</span>, punkty i
              eksklusywne odznaki.
            </p>
          </section>
          <section className='w-full flex sm:min-h-[600px] min-h-fit flex-1 justify-center items-center p-2 relative'>
            <div className='w-full'>
              <ReactCompareImage
                leftImage='https://res.cloudinary.com/dmqmrsvmh/image/upload/f_auto,q_auto/vtmtyprse3xbmatb8lvz'
                rightImage='https://res.cloudinary.com/dmqmrsvmh/image/upload/f_auto,q_auto/qqwvm21dfjvudydnmcu7'
              />
            </div>
          </section>
        </section>
        <section className='w-full h-[34px] bg-background sm:hidden flex'></section>
        <section className='w-full max-w-5xl flex sm:gap-1 gap-6 sm:flex-row flex-col-reverse px-4 sm:pt-0 pt-20'>
          <section className='w-full flex flex-col gap-4 flex-1 justify-center items-center p-2'>
            <motion.h2
              initial='hidden'
              whileInView='reveal'
              transition={{ staggerChildren: 0.02 }}
              viewport={{ once: true, amount: 0.5 }}
              className='md:text-4xl text-2xl font-nunito sm:text-start text-center font-extrabold text-primaryColor'
            >
              {"Ucz się - jak chcesz i kiedy chcesz."
                .split("")
                .map((char, index) => (
                  <motion.span
                    key={char + index}
                    transition={{ duration: 0.5 }}
                    variants={charVariants}
                  >
                    {char}
                  </motion.span>
                ))}
            </motion.h2>
            <p className='md:text-xl text-base font-nunito text-descriptionColor sm:text-start text-center font-extrabold'>
              Wszystkie lekcje podzielone są na etapy historyczne oraz tematy,
              których przeczytanie zajemie ci od{" "}
              <span className='text-textColor'>kilku</span> do{" "}
              <span className='text-textColor'>kilkunastu</span> minut. Dzięki
              temu możesz uczyć się w busie, na przerwie czy w domu.
            </p>
          </section>
          <section className='w-full flex max-h-[600px] h-full min-h-[330px] flex-1 justify-center items-center p-2 relative'>
            <Swiper
              effect={"cards"}
              grabCursor={true}
              modules={[EffectCards]}
              className='mySwiper'
            >
              <SwiperSlide>
                <Image
                  src={StarozytnoscImage}
                  alt='Starozytność Image'
                  className='w-full h-[50%] object-cover'
                />
                <h4 className='sm:text-2xl text-xl text-center pt-4 font-nunito font-extrabold tracking-wide'>
                  Starożytność
                </h4>
                <section className='w-full flex justify-center items-center px-4 pb-4 pt-4'>
                  <section className='w-full h-full sm:text-base text-sm font-nunito text-descriptionColor rounded-2xl bg-background2 p-4'>
                    Odkryj tajemnice cywilizacji, które ukształtowały fundamenty
                    współczesnego świata - od starożytnego Egiptu po imperium
                    rzymskie.
                  </section>
                </section>
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src={MedievalImage}
                  alt='Medieval Image'
                  className='w-full h-[50%] object-cover'
                />
                <h4 className='sm:text-2xl text-xl text-center pt-4 font-nunito font-extrabold tracking-wide'>
                  Średniowiecze
                </h4>
                <section className='w-full flex justify-center items-center px-4 pb-4 pt-4'>
                  <section className='w-full h-full sm:text-base text-sm font-nunito text-descriptionColor rounded-2xl bg-background2 p-4'>
                    Wejdź w świat zamków, rycerzy i wielkich krucjat, gdzie
                    historia splata się z legendami i epickimi wydarzeniami.
                  </section>
                </section>
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src={ModernEraImage}
                  alt='Modern Era Image'
                  className='w-full h-[50%] object-cover'
                />
                <h4 className='sm:text-2xl text-xl text-center pt-4 font-nunito font-extrabold tracking-wide'>
                  Nowożytność
                </h4>
                <section className='w-full flex justify-center items-center px-4 pb-4 pt-4'>
                  <section className='w-full h-full sm:text-base text-sm font-nunito text-descriptionColor rounded-2xl bg-background2 p-4'>
                    Poznaj epokę odkryć geograficznych, wielkich wynalazków i
                    przemian, które na zawsze zmieniły oblicze świata.
                  </section>
                </section>
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src={WorldWarImage}
                  alt='World War Image'
                  className='w-full h-[50%] object-cover'
                />
                <h4 className='sm:text-2xl text-xl text-center pt-4 font-nunito font-extrabold tracking-wide'>
                  Współczesność
                </h4>
                <section className='w-full flex justify-center items-center px-4 pb-4 pt-4'>
                  <section className='w-full h-full sm:text-base text-sm font-nunito text-descriptionColor rounded-2xl bg-background2 p-4'>
                    Zgłębiaj burzliwą historię XX wieku - od wojen światowych po
                    narodziny współczesnych idei i technologii.
                  </section>
                </section>
              </SwiperSlide>
            </Swiper>
          </section>
        </section>
      </section>
      <Footer />
    </>
  );
}

export default MainPanel2;
