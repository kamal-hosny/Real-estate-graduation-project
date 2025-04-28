// External imports
import { useTranslation } from "react-i18next";
import { Link, Outlet } from "react-router-dom";

// Internal imports
import Footer from "../../components/common/Footer/Footer";
import Header from "../../components/common/Header/Header";
import ToastList from "../../components/common/feedback/toast/ToastList";
import { useAppSelector } from "../../store/hooks";
import ModalManager from "../../utils/ModalManger";

const MainLayout = () => {
  // Hooks
  const { t } = useTranslation();
  const { user } = useAppSelector((state) => state.auth);
  
  // Derived state
  const isAdmin = user?.roles?.$values[0] === "Admin";

  return (
    <>
      <ModalManager />
      
      {isAdmin && (
        <Link
          to="dashboard"
          className="block text-center bg-blue-900 p-1 text-xs text-white"
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
