// "use client";

// import Image from "next/image";
// import { CarImage } from "@/types";

// interface ImageCardProps {
//   image: CarImage;
// }

// export default function ImageCard({ image }: ImageCardProps) {
//   const isMain = image.angle === "main";

//   return (
//     <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-luxury-border bg-black/30 group">
//       <Image
//         src={image.url}
//         alt={`Car image ${image.angle}`}
//         fill
//         className="object-cover"
//       />

//       {/* ANGLE BADGE */}
//       <span className="absolute top-2 left-2 text-xs font-semibold px-2 py-1 rounded-md bg-luxury-accent/90 text-black uppercase">
//         {image.angle}
//       </span>

//       {/* ACTION BAR (still no logic) */}
//       <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 px-3 py-2 bg-black/60 opacity-0 group-hover:opacity-100 transition">
//         {!isMain && (
//           <button
//             type="button"
//             className="text-xs px-3 py-1 rounded-md bg-luxury-accent text-black font-medium"
//           >
//             Set as Main
//           </button>
//         )}

//         <button
//           type="button"
//           className="text-xs px-3 py-1 rounded-md border border-luxury-border text-luxury-text"
//         >
//           Replace
//         </button>

//         <button
//           type="button"
//           className="text-xs px-3 py-1 rounded-md border border-red-500/50 text-red-400"
//         >
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// }
/******************************* */
// "use client";

// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";

// import { CarImage } from "@/types";

// interface ImageCardProps {
//   image: CarImage;
//   carId: string;
// }

// export default function ImageCard({ image, carId }: ImageCardProps) {
//   const router = useRouter();
//   const isMain = image.angle === "main";

//   async function handleDelete() {
//     const confirmed = window.confirm(
//       "Are you sure you want to delete this image?"
//     );

//     if (!confirmed) return;

//     const toastId = toast.loading("Deleting image...");

//     try {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/admin/cars/${carId}/images/${image._id}`,
//         {
//           method: "DELETE",
//           headers: {
//             "x-api-key": process.env.NEXT_PUBLIC_ADMIN_API_KEY!,
//           },
//         }
//       );

//       if (!res.ok) {
//         const json = await res.json();
//         throw new Error(json?.message || "Delete failed");
//       }

//       toast.success("Image deleted");
//       router.refresh(); // 🔥 server is source of truth
//     } catch (err: any) {
//       console.error(err);
//       toast.error(err.message || "Failed to delete image");
//     } finally {
//       toast.dismiss(toastId);
//     }
//   }

//   return (
//     <div
//       className="
//         relative
//         aspect-[4/3]
//         rounded-xl
//         overflow-hidden
//         border border-luxury-border
//         bg-black/30
//         group
//       "
//     >
//       {/* IMAGE */}
//       <Image
//         src={image.url}
//         alt={`Car image ${image.angle}`}
//         fill
//         className="object-cover"
//       />

//       {/* ANGLE BADGE */}
//       <span
//         className="
//           absolute top-2 left-2
//           text-xs font-semibold
//           px-2 py-1 rounded-md
//           bg-luxury-accent/90 text-black
//           uppercase
//         "
//       >
//         {image.angle}
//       </span>

//       {/* ACTION BAR */}
//       <div
//         className="
//           absolute inset-x-0 bottom-0
//           flex items-center justify-center gap-2
//           px-3 py-2
//           bg-black/60
//           opacity-0 group-hover:opacity-100
//           transition
//         "
//       >
//         {!isMain && (
//           <button
//             type="button"
//             className="
//               text-xs px-3 py-1 rounded-md
//               bg-luxury-accent text-black
//               font-medium
//             "
//           >
//             Set as Main
//           </button>
//         )}

//         <button
//           type="button"
//           className="
//             text-xs px-3 py-1 rounded-md
//             border border-luxury-border
//             text-luxury-text
//           "
//         >
//           Replace
//         </button>

//         <button
//           type="button"
//           onClick={handleDelete}
//           className="
//             text-xs px-3 py-1 rounded-md
//             border border-red-500/50
//             text-red-400
//             hover:bg-red-500/10
//           "
//         >
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// }
/**************************** */

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import toast from "react-hot-toast";

import { CarImage } from "@/types";

interface ImageCardProps {
    image: CarImage;
    carId: string;
}

export default function ImageCard({ image, carId }: ImageCardProps) {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const isMain = image.angle === "main";

    /* ---------------- DELETE ---------------- */
    async function handleDelete() {
        const confirmed = window.confirm(
            "Are you sure you want to delete this image?"
        );
        if (!confirmed) return;

        const toastId = toast.loading("Deleting image...");

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/admin/cars/${carId}/images/${image._id}`,
                {
                    method: "DELETE",
                    headers: {
                        "x-api-key": process.env.NEXT_PUBLIC_ADMIN_API_KEY!,
                    },
                }
            );

            if (!res.ok) {
                const json = await res.json();
                throw new Error(json?.message || "Delete failed");
            }

            toast.success("Image deleted");
            router.refresh();
        } catch (err: any) {
            console.error(err);
            toast.error(err.message || "Failed to delete image");
        } finally {
            toast.dismiss(toastId);
        }
    }

    /* ---------------- REPLACE ---------------- */
    async function handleReplace(file: File) {
        const toastId = toast.loading("Replacing image...");

        try {
            const formData = new FormData();
            formData.append("image", file);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/admin/cars/${carId}/images/${image._id}`,
                {
                    method: "PUT",
                    headers: {
                        "x-api-key": process.env.NEXT_PUBLIC_ADMIN_API_KEY!,
                    },
                    body: formData,
                }
            );

            if (!res.ok) {
                const json = await res.json();
                throw new Error(json?.message || "Replace failed");
            }

            toast.success("Image replaced");
            router.refresh();
        } catch (err: any) {
            console.error(err);
            toast.error(err.message || "Failed to replace image");
        } finally {
            toast.dismiss(toastId);
        }
    }

    /* ---------------- SET AS MAIN ---------------- */
    // async function handleSetAsMain() {
    //     const toastId = toast.loading("Setting image as main...");

    //     try {
    //         const res = await fetch(
    //             `${process.env.NEXT_PUBLIC_API_URL}/api/admin/cars/${carId}/images/${image._id}/main`,
    //             {
    //                 method: "PUT",
    //                 headers: {
    //                     "x-api-key": process.env.NEXT_PUBLIC_ADMIN_API_KEY!,
    //                 },
    //             }
    //         );

    //         if (!res.ok) {
    //             const json = await res.json();
    //             throw new Error(json?.message || "Set as main failed");
    //         }

    //         toast.success("Image set as main");
    //         router.refresh();
    //     } catch (err: any) {
    //         console.error(err);
    //         toast.error(err.message || "Failed to set image as main");
    //     } finally {
    //         toast.dismiss(toastId);
    //     }
    // }

    return (
        <div
            className="
        relative
        aspect-[4/3]
        rounded-xl
        overflow-hidden
        border border-luxury-border
        bg-black/30
        group
      "
        >
            {/* IMAGE */}
            <Image
                src={image.url}
                alt={`Car image ${image.angle}`}
                fill
                className="object-cover"
            />

            {/* ANGLE BADGE */}
            <span
                className="
          absolute top-2 left-2
          text-xs font-semibold
          px-2 py-1 rounded-md
          bg-luxury-accent/90 text-black
          uppercase
        "
            >
                {image.angle}
            </span>

            {/* ACTION BAR */}
            <div
                className="
          absolute inset-x-0 bottom-0
          flex items-center justify-center gap-2
          px-3 py-2
          bg-black/60
          opacity-0 group-hover:opacity-100
          transition
        "
            >

                {/* REPLACE */}
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="
                        text-xs px-3 py-1 rounded-md
                        border border-luxury-border
                        text-luxury-text
                    "
                >
                    Replace
                </button>

                {/* DELETE */}
                <button
                    type="button"
                    onClick={handleDelete}
                    className="
            text-xs px-3 py-1 rounded-md
            border border-red-500/50
            text-red-400
            hover:bg-red-500/10
          "
                >
                    Delete
                </button>
            </div>

            {/* HIDDEN FILE INPUT */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleReplace(file);
                    e.target.value = "";
                }}
            />
        </div>
    );
}

