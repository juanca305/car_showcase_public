"use client";

import CustomButton from "./CustomButton";

const Hero = () => {
  const handleScroll = () => {
    const element = document.getElementById("discover");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="
        relative w-full
        h-[52vh] sm:h-[64vh] md:h-[68vh] lg:h-[90vh]
        flex items-start lg:items-center pt-[90px] lg:pt-0

        bg-[url('/chevy-hero.png')]
        bg-cover
        bg-[position:80%_center]
        sm:bg-[position:85%_center]
        lg:bg-[position:88%_center]
      "
    >
      {/* Gradient overlay (ALL devices) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="max-w-[1440px] mx-auto padding-x">
          <div className="max-w-md sm:max-w-lg lg:max-w-xl">
            <h1 className="
              hero-title--lux-white
              text-[26px] sm:text-[38px] md:text-[44px] lg:text-[56px] xl:text-[64px]
              leading-tight
            ">
              A Smarter Way to
              <span className="lux-highlight block">
                Buy Your Next Car
              </span>
            </h1>
            <p className="
              hero__subtitle
              mt-5 sm:mt-5 lg:mt-6
              text-[13px] sm:text-[16px] md:text-[17px] lg:text-[20px]
              max-w-sm sm:max-w-md md:max-w-md lg:max-w-lg
            ">
              Explore new and pre-owned vehicles, compare options, estimate payments,
              and start your car-buying journey online.
            </p>

            <CustomButton
              title="Browse Inventory"
              containerStyles="
                bg-luxury-accent
                text-black font-semibold
                rounded-full
                mt-6
                px-5 py-2.5
                text-sm sm:text-base
              "
              handleClick={handleScroll}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

/*************************************************** */
// "use client";

// import Image from "next/image"
// import CustomButton from "./CustomButton"

// const Hero = () => {
//   const handleScroll = () => {
//     const element = document.getElementById("discover");
//     element?.scrollIntoView({ behavior: "smooth" });
//   }
//   return (
//     <div className="bg-luxury-bg text-luxury-text">
//       <div className="hero">
//         <div className="flex-1 pt-24 sm:pt-28 lg:pt-32 xl:pt-36 pb-16 sm:pb-20 padding-x">

//           <h1 className="hero-title--lux-white text-[36px] sm:text-[48px] lg:text-[60px]">
//             A Smarter Way to
//             <span className="lux-highlight block">Buy Your Next Car</span>
//           </h1>

//           <p className="hero__subtitle ">
//             Explore new and pre-owned vehicles, compare options, estimate payments,
//             and start your car-buying journey online.
//           </p>

//           <CustomButton
//             title="Browse Inventory"
//             containerStyles="
//               bg-luxury-accent
//               text-black font-semibold
//               rounded-full
//               mt-8 sm:mt-10
//               px-6 py-3
//               text-sm sm:text-base
//               transition-all duration-300
//               hover:bg-luxury-accentHover
//               hover:shadow-[0_6px_22px_rgba(180,150,255,0.35)]
//               active:scale-[.97]
//             "
//             handleClick={handleScroll}
//           />

//         </div>

//         <div className="hero__image-container">
//           <div className="hero__image">
//             <Image src="/Lincoln_Navigator_Burgundy.png" alt="hero" fill className="object-contain" />

//           </div>
//           <div className="hero__image-overlay" />
//         </div>

//       </div>
//     </div>
//   )
// }

// export default Hero