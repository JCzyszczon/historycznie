"use client";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useUserPoints } from "../../hooks/useUserPoints";

//const socket = io("http://localhost:3001/points");

const formatPoints = (points) => {
  if (points >= 10000) {
    return `${(points / 1000).toFixed(1).replace(".0", "")}k`;
  }
  return points.toString();
};

function UserPoints({ session }) {
  //const [points, setPoints] = useState(null);
  const { points, isLoading, isError } = useUserPoints(session.user.id);

  /*useEffect(() => {
    socket.emit("startMonitoring", session.user.id);

    socket.on("pointsUpdate", (updatedPoints) => {
      setPoints(updatedPoints);
    });

    return () => {
      socket.off("pointsUpdate");
      socket.disconnect();
    };
  }, [session.user.id]);*/

  return (
    <>
      {!isLoading ? (
        <p className='text-textColor font-[500] text-base'>
          {formatPoints(points)}
        </p>
      ) : (
        <p className='w-[70px] h-[24px] animate-pulse bg-gray-300 rounded-lg'></p>
      )}
    </>
  );
}

export default UserPoints;
