import { Outlet } from "react-router-dom";
import HeaderHorizontal from "../../pages/Dashboard/HeaderHorizontal";
import HeaderVertical from "../../pages/Dashboard/HeaderVertical";
import ModalManager from "../../utils/ModalManger";
const DashboardLayout = () => {
  return (
    <>
          <ModalManager />
    <div className="">
        <HeaderVertical />
    <div className="flex">
        <HeaderHorizontal />
           <span className="p-2 rtl w-full bg-[#f9fafb]" >
           <Outlet />
           </span>
    </div>
    </div>
    </>
  )
}

export default DashboardLayout