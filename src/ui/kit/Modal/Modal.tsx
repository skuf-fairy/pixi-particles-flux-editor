import React, { PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { Cross } from "src/ui/components/icons/Cross";
import "./Modal.style.scss";

interface Props {
  onClose: () => void;
}

export function Modal({ onClose, children }: PropsWithChildren<Props>) {
  return createPortal(
    <div className="modal" onClick={onClose}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close-button" onClick={onClose}>
          <Cross className="modal__close-icon" />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
