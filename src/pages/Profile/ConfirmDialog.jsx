import { useEffect } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";

export function ConfirmDialog({
  open,
  onClose,
  title,
  description,
  onConfirm,
  confirmText = "Ja, ta bort",
}) {
  useEffect(() => {
    function onEsc(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-[90%] max-w-md rounded-3xl bg-white/70 p-6 shadow-xl backdrop-blur-md border border-white/40">
        <div className="flex items-start gap-3">
          <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
          <div>
            <h2
              id="dialog-title"
              className="text-lg font-semibold text-gray-900"
            >
              {title}
            </h2>
            <p className="mt-1 text-sm text-gray-600">{description}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-2xl border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
          >
            Avbryt
          </button>
          <button
            onClick={onConfirm}
            className="rounded-2xl bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

ConfirmDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  onConfirm: PropTypes.func,
  confirmText: PropTypes.string,
};
