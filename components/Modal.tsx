"use client";
import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { getFocusableElements, nextFocus, usePortal } from "../utility/modalHelper";

interface ModalProps {
  open?: boolean;
  onClose: VoidFunction;
  children?: React.ReactNode;
  closeOnClickOutside?: boolean;
  closeOnEsc?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  children,
  closeOnClickOutside = true,
  closeOnEsc = true,
  onClose,
  open = true,
}) => {
  const portal = usePortal();
  const previousFocus = useRef<HTMLElement | null>(null);

  const container = useRef<HTMLDivElement>(null);
  const onOverlayClick = (e: React.MouseEvent) => {
    if (!container.current?.contains(e.target as Node)) onClose();
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!open) return;

      switch (e.key) {
        case "Escape": {
          if (closeOnEsc) onClose();
          break;
        }
        case "Tab": {
          e.preventDefault();
          nextFocus(getFocusableElements(container.current), !e.shiftKey);
          break;
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeOnEsc, onClose, open]);

  useEffect(() => {
    // aria-hidden
    document.getElementById("root")?.setAttribute("aria-hidden", open.toString());
    portal.current?.setAttribute("aria-hidden", (!open).toString());

    if (open) {
      previousFocus.current = (document.activeElement as HTMLElement) ?? null;
      nextFocus(getFocusableElements(container.current));
      document.body.style.overflow = "hidden";
    } else {
      previousFocus.current?.focus?.();
      previousFocus.current = null;
      document.body.style.overflow = "visible";
    }
  }, [open, portal]);

  return ReactDOM.createPortal(
    <div
      id="modalRef"
      onClick={closeOnClickOutside ? onOverlayClick : undefined}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4 dark:bg-transparent ${
        open ? "backdrop-blur" : "hidden"
      }`}
    >
      <div className="w-full max-w-xl" ref={container}>
        <div className="rounded-lg bg-white p-5 text-black shadow-lg dark:bg-slate-900 dark:text-white">
          <div className="w-full text-right">
            <button
              className="right-4 top-4 h-8 w-8 rounded-lg p-1 hover:bg-slate-200 dark:hover:bg-slate-800"
              onClick={onClose}
            >
              <svg className="text-gray-700 dark:text-white" viewBox="0 0 24 24" fill="none">
                <g strokeWidth="0"></g>
                <g strokeLinecap="round" strokeLinejoin="round"></g>
                <g>
                  <path
                    d="M16 8L8 16M8.00001 8L16 16"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </g>
              </svg>
            </button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>,
    portal.current
  );
};

export default Modal;
