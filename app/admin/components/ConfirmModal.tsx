"use client";

type ConfirmModalProps = {
  open: boolean;
  title: string;
  description?: string;

  confirmText?: string;
  cancelText?: string;

  variant?: "default" | "danger";

  onConfirm: () => void;
  onCancel: () => void;

  loading?: boolean;
};

export default function ConfirmModal({
  open,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
  onConfirm,
  onCancel,
  loading = false,
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div
        onClick={onCancel}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative w-[92%] max-w-md rounded-2xl border border-white/10 bg-luxury-surface p-6 shadow-xl">
        <h3 className="text-lg font-semibold text-white">{title}</h3>

        {description && (
          <p className="mt-2 text-sm text-white/70">{description}</p>
        )}

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="
              px-4 py-2 rounded-lg text-sm font-medium
              border border-white/10
              text-white
              hover:bg-white/5 transition
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className={`
              px-4 py-2 rounded-lg text-sm font-semibold transition
              disabled:opacity-50 disabled:cursor-not-allowed
              ${
                variant === "danger"
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-luxury-accent text-black hover:bg-luxury-accentHover"
              }
            `}
          >
            {loading ? "Working..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
