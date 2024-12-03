"use client";
import Link from "next/link";
import React from "react";
import { IoIosNotifications } from "react-icons/io";
import { useNotifications } from "../../hooks/useNotifications";

function NotificationsIcon({ session }) {
  const { notifications, isLoading, isError } = useNotifications(
    session.user.id
  );

  const hasUnread = notifications?.some((notif) => !notif.isRead);

  return (
    <Link
      href={`/powiadomienia`}
      className='flex justify-center items-center relative'
    >
      <IoIosNotifications className='text-2xl text-descriptionColor hover:text-textColor duration-200' />
      {hasUnread && !isLoading && !isError && (
        <span className='w-[8px] h-[8px] rounded-full absolute right-0 top-0 bg-primaryColor'></span>
      )}
    </Link>
  );
}

export default NotificationsIcon;
