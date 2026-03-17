"use client";

import Image from "next/image";
import { useState } from "react";

interface CarGalleryProps {
    images: {
        url: string;
        angle: string;
    }[];
    title: string;
}

export default function CarGallery({ images, title }: CarGalleryProps) {
    const [activeImage, setActiveImage] = useState(
        images.find(img => img.angle === "main") || images[0]
    );

    if (!images || images.length === 0) {
        return (
            <div className="h-full flex items-center justify-center text-luxury-muted">
                No images available
            </div>
        );
    }

    const angle = activeImage.angle;

    const imageClass =
        angle === "roof"
            ? "object-contain p-8"
            : "object-cover";
    //const isHero = angle === "main";

    return (
        <div className="flex flex-col gap-4">

            {/* MAIN IMAGE */}
            <div className="
                relative
                w-full
                min-h-[380px]
                sm:min-h-[460px]
                lg:min-h-[520px]
                rounded-2xl
                overflow-hidden
                border border-luxury-border   
                ">
                <Image
                    src={activeImage.url}
                    alt={title}
                    fill
                    priority
                    className="object-cover"
                />
            </div>

            {/* className={`${isHero ? "object-cover " : "object-contain "}`} */}

            {/* THUMBNAILS */}
            <div className="grid grid-cols-4 gap-3">
                {images.map((img) => {
                    const isActive = img.url === activeImage.url;
                    return (
                        <button
                            key={img.url}
                            onClick={() => setActiveImage(img)}
                            className={`
                              relative h-[72px] rounded-xl overflow-hidden border
                              transition-all
                              ${isActive
                                    ? "border-luxury-accent ring-2 ring-luxury-accent/30"
                                    : "border-luxury-border hover:border-luxury-borderStrong"}
                            `}
                        >
                            <Image
                                src={img.url}
                                alt={`${title} ${img.angle}`}
                                fill
                                className="object-contain p-2"
                            />
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
