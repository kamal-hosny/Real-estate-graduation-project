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
        <>
          <div
            onClick={closeModalHandler}
            className="fixed inset-0 bg-black bg-opacity-50 z-[5]"
          />
          <div className="fixed inset-0 z-[6] flex items-center justify-center p-4">
            {children}
          </div>
        </>
      )}
    </>
  );
};

export default Modal;
