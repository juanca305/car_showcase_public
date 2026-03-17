"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react"; // or any icon you like

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // show after scrolling down 400px
      setShow(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!show) return null;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="
        fixed bottom-6 right-6 
        bg-primary-blue text-white shadow-lg
        w-12 h-12 flex items-center justify-center 
        rounded-full hover:bg-blue-700 transition
      "
    >
      <ArrowUp size={22} />
    </button>
  );
}
