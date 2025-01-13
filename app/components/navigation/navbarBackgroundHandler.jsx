"use client";

import { useEffect } from "react";

export default function NavbarBackgroundHandler() {
  useEffect(() => {
    const header = document.querySelector("header");

    const handleScroll = () => {
      if (window.scrollY > 0) {
        header.classList.remove("sm:bg-transparent", "sm:py-8");
        header.classList.add("bg-background", "py-4");
      } else {
        header.classList.add("sm:bg-transparent", "sm:py-8");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return null;
}
