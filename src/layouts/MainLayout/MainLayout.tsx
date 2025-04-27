import { Link, Outlet } from "react-router-dom";
import Footer from "../../components/common/Footer/Footer";
import Header from "../../components/common/Header/Header";
import ToastList from "../../components/common/feedback/toast/ToastList";

import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../store/hooks";
import ModalManager from "../../utils/ModalManger";

const MainLayout = () => {
  const { user } = useAppSelector((state ) => state.auth);
  const isAdmin = user?.roles?.$values[0] === "Admin"
  



  const { t } = useTranslation();

  return (
    <>
        <ModalManager />
    {isAdmin && (
      <Link
        to="dashboard"
        className=" block text-center bg-blue-900 p-1 text-xs text-white"
      >
        {t("dashboard_link")}
      </Link>
    )}
      <Header />
      <Outlet />
      <ToastList />
      <Footer />
    </>
  );
};

export default MainLayout;
