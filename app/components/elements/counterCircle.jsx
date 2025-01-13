import React from "react";

const CounterCircle = ({ timeLeft, totalTime }) => {
  // Obliczanie procentowego wypełnienia
  const radius = 30; // Promień koła
  const circumference = 2 * Math.PI * radius; // Obwód koła
  const offset = circumference - (timeLeft / totalTime) * circumference; // Przesunięcie dasharray

  // Kolor zmienia się w zależności od pozostałego czasu
  const getBorderColor = () => {
    if (timeLeft / totalTime > 0.5) return "#00ff00"; // Zielony
    if (timeLeft / totalTime > 0.25) return "#ffa500"; // Pomarańczowy
    return "#ff0000"; // Czerwony
  };

  return (
    <div className='flex justify-center items-center'>
      <svg
        className='w-[80px] h-[80px] transform -rotate-90'
        viewBox='0 0 80 80'
      >
        {/* Tło koła */}
        <circle
          cx='40'
          cy='40'
          r={radius}
          fill='none'
          stroke='#e5e5e5'
          strokeWidth='5'
        />
        {/* Wypełnienie */}
        <circle
          cx='40'
          cy='40'
          r={radius}
          fill='none'
          stroke={getBorderColor()}
          strokeWidth='5'
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.5s linear" }}
        />
      </svg>
      {/* Tekst */}
      <div className='absolute text-lg font-extrabold text-textColor'>
        {timeLeft}
      </div>
    </div>
  );
};

export default CounterCircle;
