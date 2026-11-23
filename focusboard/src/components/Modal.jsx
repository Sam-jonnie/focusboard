import { useEffect, useRef } from "react";

// Wraps the native <dialog>: gives focus trapping, Esc to close and aria-modal for free.
export default function Modal({ labelId, onClose, children, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    dialog.showModal();
    return () => dialog.close();
  }, []);
  return (
    <dialog
      ref={ref}
      className={`modal ${className}`}
      aria-labelledby={labelId}
      onCancel={(e) => { e.preventDefault(); onClose(); }}
      onClick={(e) => e.target === ref.current && onClose()} // click on backdrop
    >
      {children}
    </dialog>
  );
}
