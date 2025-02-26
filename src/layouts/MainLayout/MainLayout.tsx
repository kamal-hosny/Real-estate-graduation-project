import { Outlet } from "react-router-dom";
import Footer from "../../components/common/Footer/Footer";
import Header from "../../components/common/Header/Header";
import ToastList from "../../components/common/feedback/toast/ToastList";
import i18n from "../../language";
import { useEffect } from "react";

const MainLayout = () => {
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

  return (
    <>
      <Header />
      <Outlet />
      <ToastList />
      <Footer />
    </>
  );
};

export default MainLayout;
