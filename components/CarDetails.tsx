"use client";

import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment } from "react";
import { CarProps } from "@/types";

interface CarDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  car: CarProps;
}

const CarDetails = ({ isOpen, closeModal, car }: CarDetailsProps) => {
  // Filtrar campos internos
  const visibleFields = [
    { key: "make", label: "Make" },
    { key: "model", label: "Model" },
    { key: "trim", label: "Trim" },
    { key: "year", label: "Year" },
    { key: "color", label: "Color" },
    { key: "seats", label: "Seats" },
    { key: "fuelType", label: "Fuel Type" },
    { key: "transmission", label: "Transmission" },
    { key: "mileage", label: "Mileage" },
    { key: "pricePerDay", label: "Price / Day" },
    { key: "available", label: "Available" },
    { key: "features", label: "Features" },
    { key: "description", label: "Description" },
  ];

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={closeModal}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        {/* Modal */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5">
                
                {/* Botón de cerrar */}
                <button
                  type="button"
                  onClick={closeModal}
                  className="absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full"
                >
                  <Image src="/close.svg" alt="close" width={20} height={20} />
                </button>

                {/* Imagen principal */}
                <div className="flex-1 flex flex-col gap-3">
                  {/* <div className="relative w-full h-[220px] sm:h-[280px] bg-pattern bg-cover bg-center rounded-lg"> */}
                  <div className="relative w-full h-[260px] sm:h-[320px] md:h-[360px] bg-pattern bg-cover bg-center rounded-lg">
                    <Image
                      src={car.images.find(img => img.angle === "main")?.url || "/hero.png"}
                      alt={`${car.make} ${car.model}`}
                      fill
                      priority
                      className="object-contain p-2"
                    />
                  </div>

                  {/* Thumbnails */}
                  <div className="flex gap-3">
                    {car.images.map(img => (
                      <div
                        key={img.angle}
                        className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg"
                      >
                        <Image
                          src={img.url}
                          alt={`${car.make} ${car.model} ${img.angle}`}
                          fill
                          priority
                          className="object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Información del auto */}
                <div className="flex-1 flex flex-col gap-2">
                  <h2 className="font-semibold text-xl capitalize">{car.make} {car.model}</h2>
                  <div className="mt-3 flex flex-col gap-2">
                    {visibleFields.map(field => {
                      const value = (car as any)[field.key];
                      if (value === undefined || value === null) return null;
                      return (
                        <div key={field.key} className="flex justify-between w-full text-right">
                          <h4 className="text-grey capitalize">{field.label}</h4>
                          <p className="text-black-100 font-semibold">
                            {Array.isArray(value) ? value.join(", ") : String(value)}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CarDetails;




