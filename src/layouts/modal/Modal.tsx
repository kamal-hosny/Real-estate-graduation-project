import { ReactNode } from "react";
import { Helmet } from "react-helmet-async";

interface IProps {
  isOpen: boolean;
  children: ReactNode;
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