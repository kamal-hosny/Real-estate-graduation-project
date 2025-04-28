/**
 * Modal component that displays content in a centered overlay with a semi-transparent background.
 * Prevents body scrolling when open and handles click events for closing.
 */

import { ReactNode } from "react";
import { Helmet } from "react-helmet-async";

interface IProps {
  /** Whether the modal is currently open */
  isOpen: boolean;
  /** Content to be displayed inside the modal */
  children: ReactNode;
  /** Callback function to handle modal closing */
  closeModalHandler: () => void;
}

const Modal = ({ isOpen, children, closeModalHandler }: IProps) => {
  return (
    <>
      <Helmet>
        <style>{`
          body {
            overflow: ${isOpen ? "hidden" : "auto"};
          }
        `}</style>
      </Helmet>

      {isOpen && (
        <div
          className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black bg-opacity-50"
          onClick={closeModalHandler}
        >
          <div
            className="relative w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;