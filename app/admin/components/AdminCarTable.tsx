"use client";

import { useRouter } from "next/navigation";
import { CarProps } from "@/types";
import Link from "next/link";

import { useState } from "react";
import ConfirmModal from "./ConfirmModal";

import toast from "react-hot-toast";
import { PlayCircle } from "lucide-react";

interface AdminCarTableProps {
  cars: CarProps[];
  mode?: "active" | "trash";
}

export default function AdminCarTable({
  cars,
  mode = "active",
}: AdminCarTableProps) {
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmTitle, setConfirmTitle] = useState("");
  const [confirmDescription, setConfirmDescription] = useState("");
  const [confirmVariant, setConfirmVariant] = useState<"default" | "danger">(
    "default",
  );
  const [confirmText, setConfirmText] = useState("Confirm");

  const [pendingId, setPendingId] = useState<string | null>(null);
  const [pendingAction, setPendingAction] = useState<
    "delete" | "restore" | "permanent"
  >("delete");

  const [isWorking, setIsWorking] = useState(false);

  // ---------------------------
  // Helpers
  // ---------------------------
  function resetConfirmState() {
    setConfirmOpen(false);
    setPendingId(null);
    setPendingAction("delete");
    setConfirmTitle("");
    setConfirmDescription("");
    setConfirmVariant("default");
    setConfirmText("Confirm");
  }

  // ---------------------------
  // API actions
  // ---------------------------
  async function handleDelete(id: string) {
    if (isWorking) return;
    const loadingToast = toast.loading("Deleting car...");

    try {
      //const res = await fetch(`/api/admin/cars/${id}`, { method: "DELETE" });
      const res = await fetch(`${API_URL}/api/admin/cars/${id}`, {
        method: "DELETE",
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_ADMIN_API_KEY!,
        },
      });
      const json = await res.json().catch(() => null);

      if (!res.ok) {
        toast.error(json?.message || "Delete failed. Please try again.");
        return;
      }

      toast.success("Car moved to trash ✅");
      router.refresh();
    } catch (error) {
      console.error("handleDelete error:", error);
      toast.error("Something went wrong while deleting the car.");
    } finally {
      toast.dismiss(loadingToast);
    }
  }

  async function handleRestore(id: string) {
    if (isWorking) return;
    const loadingToast = toast.loading("Restoring car...");

    try {
      // const res = await fetch(`/api/admin/cars/${id}/restore`, {
      //   method: "PUT",
      // });

      const res = await fetch(`${API_URL}/api/admin/cars/${id}/restore`, {
        method: "PUT",
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_ADMIN_API_KEY!,
        },
      });

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        toast.error(json?.message || "Restore failed.");
        return;
      }

      toast.success("Car restored ✅");
      router.refresh();
    } catch (error) {
      console.error("handleRestore error:", error);
      toast.error("Something went wrong.");
    } finally {
      toast.dismiss(loadingToast);
    }
  }

  async function handlePermanentDelete(id: string) {
    if (isWorking) return;
    const loadingToast = toast.loading("Deleting car forever...");

    try {
      // const res = await fetch(`/api/admin/cars/${id}/permanent`, {
      //   method: "DELETE",
      // });

      const res = await fetch(`${API_URL}/api/admin/cars/${id}/permanent`, {
        method: "DELETE",
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_ADMIN_API_KEY!,
        },
      });

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        toast.error(json?.message || "Permanent delete failed.");
        return;
      }

      toast.success("Car permanently deleted ✅");
      router.refresh();
    } catch (error) {
      console.error("handlePermanentDelete error:", error);
      toast.error("Something went wrong while deleting forever.");
    } finally {
      toast.dismiss(loadingToast);
    }
  }

  async function handleToggleVisibility(id: string) {
    if (isWorking) return;
    const loadingToast = toast.loading("Updating visibility...");

    try {
      // const res = await fetch(`/api/admin/cars/${id}/visibility`, {
      //   method: "PUT",
      // });

      const res = await fetch(`${API_URL}/api/admin/cars/${id}/visibility`, {
        method: "PUT",
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_ADMIN_API_KEY!,
        }
      });

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        toast.error(json?.message || "Failed to update visibility.");
        return;
      }

      toast.success(json?.message || "Visibility updated ✅");
      router.refresh();
    } catch (err) {
      console.error("handleToggleVisibility error:", err);
      toast.error("Something went wrong updating visibility.");
    } finally {
      toast.dismiss(loadingToast);
    }
  }

  // ---------------------------
  // Render
  // ---------------------------
  return (
    <div className="rounded-2xl border border-luxury-border bg-luxury-surface/80 overflow-hidden">
      {/* HEADER */}
      <div className="px-6 py-4 border-b border-luxury-border">
        <h2 className="text-lg font-semibold text-luxury-text">
          {mode === "trash" ? "Trash Cars" : "Active Cars"}
        </h2>
        <p className="text-sm text-luxury-muted">
          {mode === "trash"
            ? "Restore or permanently delete vehicles"
            : "Manage vehicles, pricing, and availability"}
        </p>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-black/30 text-luxury-muted">
            <tr>
              <th className="px-6 py-3 text-left">Vehicle</th>
              <th className="px-6 py-3 text-left">Condition</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Status</th>

              {/* ✅ Keep actions aligned to the right, like desktop originally */}
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {cars.map((car) => (
              <tr key={car._id} className="hover:bg-white/5 transition">

                {/* VEHICLE */}
                <td className="px-6 py-4">
                  <div className="flex lg:flex-row md:flex-col flex-row md:items-start items-center gap-4">
                    {/* Thumbnail */}
                    <div className="relative h-14 w-14 rounded-lg overflow-hidden border border-white/10 bg-black/20 shrink-0">
                      {car.images?.[0]?.url ? (
                        <img
                          src={car.images[0].url}
                          alt={`${car.make} ${car.model}`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-xs text-luxury-muted">
                          No image
                        </div>
                      )}
                    </div>

                    {/* ✅ CHANGE: remove forced min width on tablet (it steals space)
                     - md:min-w-0 allows shrinking */}
                    <div className="flex flex-col md:min-w-0 min-w-[140px]">
                      <span className="font-medium text-luxury-text">
                        {car.make} {car.model}
                      </span>

                      <span className="text-xs text-luxury-muted">
                        {car.year}
                      </span>
                    </div>
                  </div>
                </td>

                {/* CONDITION */}
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-3 items-start">
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-medium w-fit
                        ${car.condition === "new"
                          ? "bg-emerald-500/15 text-emerald-400"
                          : "bg-blue-500/15 text-blue-400"
                        }`}
                    >
                      {car.condition === "new" ? "New" : "Used"}
                    </span>

                    {car.certified && (
                      <span className="px-2 py-1 rounded-md text-xs font-medium w-fit bg-luxury-accent/15 text-luxury-accent">
                        Certified
                      </span>
                    )}
                  </div>
                </td>

                {/* PRICE */}
                <td className="px-6 py-4 text-luxury-text font-semibold whitespace-nowrap">
                  ${car.price?.toLocaleString() || "—"}
                </td>

                {/* STATUS */}
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-2">
                    {/* Inventory status */}
                    <span
                      className={`inline-flex items-center gap-2 text-xs font-medium w-fit
                        ${car.isDeleted ? "text-red-400" : "text-emerald-400"}`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full
                          ${car.isDeleted ? "bg-red-400" : "bg-emerald-400"}`}
                      />
                      {car.isDeleted ? "Deleted" : "Active"}
                    </span>

                    {/* Visibility status */}
                    <span
                      className={`inline-flex items-center gap-2 text-xs font-medium w-fit
                        ${car.available ? "text-blue-400" : "text-zinc-400"}`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full
                          ${car.available ? "bg-blue-400" : "bg-zinc-500"}`}
                      />
                      {car.available ? "Visible" : "Hidden"}
                    </span>
                  </div>
                </td>

                {/* ACTIONS */}
                <td className="px-6 py-4">
                  {/* ✅ Keep desktop layout (horizontal actions)
                      ✅ Make tablet wrap nicely using flex-wrap */}
                  {mode === "trash" ? (
                    // ✅ TRASH MODE: ONLY Restore + Delete Forever
                    <div className="flex flex-wrap items-center justify-end gap-3 md:gap-5 py-1">
                      <button
                        disabled={isWorking}
                        onClick={() => {
                          if (isWorking) return;
                          setPendingId(car._id);
                          setPendingAction("restore");

                          setConfirmTitle("Restore this car?");
                          setConfirmDescription(
                            "This car will return to Active Inventory.",
                          );
                          setConfirmVariant("default");
                          setConfirmText("Restore");

                          setConfirmOpen(true);
                        }}
                        className={`
                          px-3 py-1.5 rounded-md text-xs font-medium
                          text-emerald-400 border border-emerald-400/30
                          hover:bg-emerald-400/10 transition
                          ${isWorking ? "opacity-50 cursor-not-allowed" : ""}
                        `}
                      >
                        Restore
                      </button>

                      <button
                        disabled={isWorking}
                        onClick={() => {
                          if (isWorking) return;
                          setPendingId(car._id);
                          setPendingAction("permanent");

                          setConfirmTitle("Delete forever?");
                          setConfirmDescription(
                            "This will permanently remove the car and cannot be undone.",
                          );
                          setConfirmVariant("danger");
                          setConfirmText("Delete Forever");

                          setConfirmOpen(true);
                        }}
                        className={`
                          px-3 py-1.5 rounded-md text-xs font-medium
                          text-red-400 border border-red-400/30
                          hover:bg-red-400/10 transition
                          ${isWorking ? "opacity-50 cursor-not-allowed" : ""}
                        `}
                      >
                        Delete Forever
                      </button>
                    </div>
                  ) : (
                    // ✅ ACTIVE MODE: Full actions
                    // <div className="flex flex-wrap items-center justify-end gap-3 md:gap-5 py-1">
                    <div className="hidden md:grid lg:flex grid-cols-2 gap-x-6 gap-y-3 justify-end">
                      {/* Edit / Images */}
                      <Link
                        href={`/admin/cars/${car._id}/edit`}
                        className="text-sm text-luxury-accent hover:underline"
                      >
                        Edit
                      </Link>

                      <Link
                        href={`/admin/cars/${car._id}/images`}
                        className="text-sm text-luxury-muted hover:text-luxury-text"
                      >
                        Images
                      </Link>

                      {/* Divider (desktop only) */}
                      <span className="hidden lg:block h-5 w-px bg-white/10 mx-1" />

                      {/* Hide / Show */}
                      <button
                        disabled={isWorking}
                        onClick={() => handleToggleVisibility(car._id)}
                        className={`
                          px-3 py-1.5 rounded-md text-xs font-medium
                          ${car.available
                            ? "text-blue-400 border border-blue-400/30 hover:bg-blue-400/10"
                            : "text-zinc-400 border border-zinc-400/30 hover:bg-zinc-400/10"
                          }
                          transition
                          ${isWorking ? "opacity-50 cursor-not-allowed" : ""}
                        `}
                      >
                        {car.available ? "Hide" : "Show"}
                      </button>

                      {/* Delete */}
                      <button
                        disabled={isWorking}
                        onClick={() => {
                          if (isWorking) return;
                          setPendingId(car._id);
                          setPendingAction("delete");

                          setConfirmTitle("Delete this car?");
                          setConfirmDescription(
                            "This will move the car to Trash. You can restore it later.",
                          );
                          setConfirmVariant("danger");
                          setConfirmText("Delete");

                          setConfirmOpen(true);
                        }}
                        className={`
                          px-3 py-1.5 rounded-md inline-flex items-center justify-center text-xs text-center min-w-[54px] w-full font-medium
                          text-red-400 border border-red-400/30
                          hover:bg-red-400/10 transition
                          ${isWorking ? "opacity-50 cursor-not-allowed" : ""}
                        `}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CONFIRM MODAL */}
      <ConfirmModal
        open={confirmOpen}
        title={confirmTitle}
        description={confirmDescription}
        confirmText={confirmText}
        cancelText="Cancel"
        variant={confirmVariant}
        loading={isWorking}
        onCancel={() => {
          if (isWorking) return;
          resetConfirmState();
        }}
        onConfirm={async () => {
          if (!pendingId || isWorking) return;

          setIsWorking(true);
          setConfirmOpen(false); // ✅ close immediately (best UX)

          try {
            if (pendingAction === "delete") await handleDelete(pendingId);
            if (pendingAction === "restore") await handleRestore(pendingId);
            if (pendingAction === "permanent")
              await handlePermanentDelete(pendingId);
          } finally {
            resetConfirmState();
            setIsWorking(false);
          }
        }}
      />
    </div>
  );
}
