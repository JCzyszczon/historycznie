import React from "react";

export default function Notification({ notifications }) {
  return (
    <section className='absolute sm:right-5 right-1/2 sm:translate-x-0 translate-x-1/2 w-full sm:max-w-[380px] max-w-full sm:px-0 px-4 text-center top-5 flex flex-col gap-2'>
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className='bg-red-500 text-white px-6 font-medium py-2 rounded-lg shadow-lg animate-fade-in-out w-full'
        >
          {notification.message}
        </div>
      ))}
    </section>
  );
}
