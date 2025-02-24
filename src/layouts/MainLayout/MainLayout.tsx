import { Outlet } from "react-router-dom";
import Footer from "../../components/common/Footer/Footer";
import Header from "../../components/common/Header/Header";
import ToastList from "../../components/common/feedback/toast/ToastList";

const MainLayout = () => {
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
