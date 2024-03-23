import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Modal({ open, onClose, children, className }) {
  return (
    <div
      onClick={onClose}
      className={`
        fixed inset-0 flex justify-center items-center transition-colors px-8 py-4
        ${open ? "visible bg-primary/20 text-secondary backdrop-blur" : "invisible"}
      `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          ${className}
          bg-preprimary rounded-xl shadow px-2 pt-6 pb-2 transition-all flex flex-col gap-6 w-full
          ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 w-8 h-8 rounded-full text-primary bg-secondary hover:bg-preprimary hover:text-presecondary"
        >
          <FontAwesomeIcon icon="fa-solid fa-xmark" />
        </button>
        {children}
      </div>
    </div>
  );
}
