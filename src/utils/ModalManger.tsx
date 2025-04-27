
import { useDispatch } from "react-redux";
import { closeModal } from "../store/modal/modalSlice";

import Modal from "../layouts/modal/Modal";
import { useAppSelector } from "../store/hooks";
import { ComponentType } from "react";
import DeleteOrder from "../components/Dashboard/modalDialog/DeleteOrder";
import EditOrderSales from "../components/Dashboard/modalDialog/EditOrderSales";
import ShowUserDetails from "../components/Dashboard/modalDialog/ShowUserDetails";
import EditOrder from "../components/Dashboard/modalDialog/EditOrder";
import DeleteUser from "../components/Dashboard/modalDialog/DeleteUser";
import ShowPropertyDetails from "../components/Dashboard/modalDialog/ShowPropertyDetails";
import SettingsForProperty from "../components/Dashboard/modalDialog/SettingsForProperty";
import AssistantBotDialog from "../components/common/HomeModalDialog/AssistantBotDialog";

type ComponentsLookup = {
    [key: string]: ComponentType<any>;
  };

const ModalManager = () => {
  const dispatch = useDispatch();
  const { isOpen, componentName } = useAppSelector((state) => state.modal);

  const closeModalHandler = () => dispatch(closeModal());
  const componentsLookup : ComponentsLookup  = {
    DeleteOrder,
    EditOrderSales,
    ShowUserDetails,
    EditOrder,
    DeleteUser,
    ShowPropertyDetails,
    SettingsForProperty,
    AssistantBotDialog
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
