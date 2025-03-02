
import { useDispatch } from "react-redux";
import { closeModal } from "../store/modal/modalSlice";

import Modal from "../layouts/modal/Modal";
import { useAppSelector } from "../store/hooks";
import { ComponentType } from "react";
import DeleteOrder from "../components/Dashboard/modalDialog/DeleteOrder";

type ComponentsLookup = {
    [key: string]: ComponentType<any>;
  };

const ModalManager = () => {
  const dispatch = useDispatch();
  const { isOpen, componentName } = useAppSelector((state) => state.modal);

  const closeModalHandler = () => dispatch(closeModal());
  const componentsLookup : ComponentsLookup  = {
    DeleteOrder,
  };
  let renderComponent: JSX.Element | null = null;;

  if (componentName) {
    const SelectedComponent = componentsLookup[componentName] ;
    if (SelectedComponent) {
      renderComponent = <SelectedComponent />;
    }
  }

  return (
    <Modal isOpen={isOpen} closeModalHandler={closeModalHandler}>
      {renderComponent}
      
    </Modal>
  );
};

export default ModalManager;
