// External imports
import { Outlet } from "react-router-dom";

// Internal imports
import ToastList from "../../components/common/feedback/toast/ToastList";
import HeaderHorizontal from "../../pages/Dashboard/HeaderHorizontal";
import HeaderVertical from "../../pages/Dashboard/HeaderVertical";
import ModalManager from "../../utils/ModalManger";

/**
 * DashboardLayout component
 * 
 * A layout component that provides the main structure for the dashboard.
 * It includes vertical and horizontal headers, modal management, and toast notifications.
 */
const DashboardLayout = () => {
  return (
    <>
      {/* Toast notifications container */}
      <ToastList />

      {/* Modal management system */}
      <ModalManager />

      {/* Main dashboard layout */}
      <div className="">
        {/* Vertical header navigation */}
        <HeaderVertical />

        <div className="flex">
          {/* Horizontal header navigation */}
          <HeaderHorizontal />

          {/* Main content area */}
          <span 
            className="p-2 rtl w-full bg-[#f9fafb]"
          >
            <Outlet />
          </span>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
