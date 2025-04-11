import { Link, Outlet } from "react-router-dom";
import Footer from "../../components/common/Footer/Footer";
import Header from "../../components/common/Header/Header";
import ToastList from "../../components/common/feedback/toast/ToastList";
import i18n from "../../language";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../store/hooks";

const MainLayout = () => {
  const { user } = useAppSelector((state ) => state.auth);
  const isAdmin = user?.roles?.$values[0] === "Admin"
  

  useEffect(() => {
    const savedLang = localStorage.getItem("language") || "ar";
    i18n.changeLanguage(savedLang);
    document.documentElement.lang = savedLang;
    document.documentElement.dir = i18n.dir(savedLang);

    const handleLanguageChange = (lng: string) => {
      localStorage.setItem("language", lng);
      document.documentElement.lang = lng;
      document.documentElement.dir = i18n.dir(lng);
    };

    i18n.on("languageChanged", handleLanguageChange);
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, []);

  const { t } = useTranslation();

  return (
    <>
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
