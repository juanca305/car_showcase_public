"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";

interface Props {
  carId: string;
  disabled?: boolean;
}

export default function PublishCarButton({ carId, disabled }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handlePublish() {
    if (loading) return;

    setLoading(true);
    const toastId = toast.loading("Publishing car...");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/cars/${carId}/publish`,
        {
          method: "PUT",
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_ADMIN_API_KEY!,
          },
        }
      );

      const json = await res.json();

      if (!res.ok) {
        toast.error(json?.message || "Publish failed");
        return;
      }

      toast.success("Car published 🚀");
      router.push("/admin/cars");
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      toast.dismiss(toastId);
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handlePublish}
      disabled={disabled || loading}
      className="
        px-5 py-2 rounded-xl
        bg-luxury-accent
        text-black
        font-semibold
        disabled:opacity-50
      "
    >
      {disabled ? "Already Published" : "Save & Publish"}
    </button>
  );
}
