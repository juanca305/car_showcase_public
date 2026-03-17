"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Props {
    carId: string;
    disabled?: boolean;
}

export default function UploadSingleImage({ carId, disabled }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleFileChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const file = e.target.files?.[0];
        if (!file) return;

        if (loading) return;
        setLoading(true);

        const toastId = toast.loading("Uploading image...");

        try {
            //   const formData = new FormData();
            //   formData.append("image", file);

            const formData = new FormData();
            formData.append("image", file);

            // 🔹 derive angle from filename
            const rawName = file.name.split(".")[0]?.toLowerCase();
            formData.append("angle", rawName);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/admin/cars/${carId}/images`,
                {
                    method: "POST",
                    headers: {
                        "x-api-key": process.env.NEXT_PUBLIC_ADMIN_API_KEY!,
                    },
                    body: formData,
                }
            );

            const json = await res.json();

            if (!res.ok) {
                toast.error(json?.message || "Upload failed");
                return;
            }

            toast.success("Image uploaded");
            router.refresh(); // 🔁 reload server data
        } catch (err) {
            console.error(err);
            toast.error("Upload error");
        } finally {
            toast.dismiss(toastId);
            setLoading(false);
            if (inputRef.current) inputRef.current.value = "";
        }
    }

    return (
        <>
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileChange}
            />

            <button
                type="button"
                disabled={disabled || loading}
                onClick={() => inputRef.current?.click()}
                className="
          px-5 py-2 rounded-xl
          bg-luxury-accent text-black
          font-semibold
          hover:bg-luxury-accentHover
          disabled:opacity-50
        "
            >
                Upload image
            </button>
        </>
    );
}
