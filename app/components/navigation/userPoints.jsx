"use client";
import React from "react";
import { useUserPoints } from "../../hooks/useUserPoints";

const formatPoints = (points) => {
  if (points >= 10000) {
    return `${(points / 1000).toFixed(1).replace(".0", "")}k`;
  }
  return points.toString();
};

function UserPoints({ session }) {
  const { points, isLoading, isError } = useUserPoints(session.user.id);

  return (
    <>
      {isLoading || isError || points < 0 ? (
        <p className='w-[70px] h-[24px] animate-pulse bg-gray-300 rounded-lg'></p>
      ) : (
        <p className='text-textColor font-[500] text-base'>
          {formatPoints(points)}
        </p>
      )}
    </>
  );
}

export default UserPoints;
