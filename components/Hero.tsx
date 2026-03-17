"use client";

import Image from "next/image"
import CustomButton from "./CustomButton"

const Hero = () => {
  const handleScroll = () => {
    const element = document.getElementById("discover");
    element?.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <div className="bg-luxury-bg text-luxury-text">
      <div className="hero">
        <div className="flex-1 pt-24 sm:pt-28 lg:pt-32 xl:pt-36 pb-16 sm:pb-20 padding-x">

          <h1 className="hero-title--lux-white text-[36px] sm:text-[48px] lg:text-[60px]">
            A Smarter Way to
            <span className="lux-highlight block">Buy Your Next Car</span>
          </h1>

          <p className="hero__subtitle ">
            Explore new and pre-owned vehicles, compare options, estimate payments,
            and start your car-buying journey online.
          </p>

          <CustomButton
            title="Browse Inventory"
            containerStyles="
              bg-luxury-accent
              text-black font-semibold
              rounded-full
              mt-8 sm:mt-10
              px-6 py-3
              text-sm sm:text-base
              transition-all duration-300
              hover:bg-luxury-accentHover
              hover:shadow-[0_6px_22px_rgba(180,150,255,0.35)]
              active:scale-[.97]
            "
            handleClick={handleScroll}
          />

        </div>

        <div className="hero__image-container">
          <div className="hero__image">
            <Image src="/Lincoln_Navigator_Burgundy.png" alt="hero" fill className="object-contain" />

          </div>
          <div className="hero__image-overlay" />
        </div>

      </div>
    </div>
  )
}

export default Hero