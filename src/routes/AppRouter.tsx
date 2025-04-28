// External libraries
import { Suspense, lazy, useEffect } from "react";
import { useDispatch } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import i18n from "../language";

// Internal components
import LottieHandler from "../components/common/feedback/LottieHandler/LottieHandler";
import PageSuspenseFallback from "../components/common/feedback/PageSuspenseFallback/PageSuspenseFallback";
import { MainLayout, DashboardLayout } from "../layouts";


// Pages
import About from "../pages/About";
import Error from "../pages/Error";

// Lazy-loaded pages
const Home = lazy(() => import("../pages/Home"));
const Products = lazy(() => import("../pages/Products"));
const SingleProduct = lazy(() => import("../pages/SingleProduct"));
const Wishlist = lazy(() => import("../pages/Wishlist"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const AdvertiseProperty = lazy(() => import("../pages/AdvertiseProperty"));
const Profile = lazy(() => import("../pages/Profile"));
const ContactUs = lazy(() => import("../pages/ContactUs"));
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("../pages/TermsOfService"));

// Lazy-loaded dashboard pages
const HomeD = lazy(() => import("../pages/Dashboard/HomeD"));
const PurchaseRequests = lazy(() => import("../pages/Dashboard/PurchaseRequests"));
const SalesRequests = lazy(() => import("../pages/Dashboard/SalesRequests"));
const RentalRequests = lazy(() => import("../pages/Dashboard/RentalRequests"));
const Users = lazy(() => import("../pages/Dashboard/Users"));

// Store
import { AppDispatch } from "../store";
import { checkMobileWidth } from "../store/features/mobileWidth/mobileWidthThunk";

const AppRouter = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Handle window resize for mobile detection
  useEffect(() => {
    const handleResize = () => {
      dispatch(checkMobileWidth());
    };

    window.addEventListener("resize", handleResize);
    dispatch(checkMobileWidth());

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  // Handle language changes
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

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense
          fallback={
            <div className="relative login bg-section-color w-screen h-[calc(100vh-65px)] flex justify-center items-center">
              <LottieHandler 
                type="loading" 
                message="Loading please wait..." 
              />
            </div>
          }
        >
          <MainLayout />
        </Suspense>
      ),
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: (
            <PageSuspenseFallback>
              <Home />
            </PageSuspenseFallback>
          ),
        },
        {
          path: "properties",
          element: (
            <PageSuspenseFallback>
              <Products />
            </PageSuspenseFallback>
          ),
        },
        {
          path: "profile",
          element: (
            <PageSuspenseFallback>
              <Profile />
            </PageSuspenseFallback>
          ),
        },
        {
          path: "advertise-property",
          element: (
            <PageSuspenseFallback>
              <AdvertiseProperty />
            </PageSuspenseFallback>
          ),
        },
        {
          path: "singleProperty/:id",
          element: (
            <PageSuspenseFallback>
              <SingleProduct />
            </PageSuspenseFallback>
          ),
        },
        {
          path: "about",
          element: (
            <PageSuspenseFallback>
              <About />
            </PageSuspenseFallback>
          ),
        },
        {
          path: "contact",
          element: (
            <PageSuspenseFallback>
              <ContactUs />
            </PageSuspenseFallback>
          ),
        },
        {
          path: "terms",
          element: (
            <PageSuspenseFallback>
              <TermsOfService />
            </PageSuspenseFallback>
          ),
        },
        {
          path: "privacy",
          element: (
            <PageSuspenseFallback>
              <PrivacyPolicy />
            </PageSuspenseFallback>
          ),
        },
        {
          path: "wishlist",
          element: (
            <PageSuspenseFallback>
              <Wishlist />
            </PageSuspenseFallback>
          ),
        },
        {
          path: "login",
          element: (
            <PageSuspenseFallback>
              <Login />
            </PageSuspenseFallback>
          ),
        },
        {
          path: "register",
          element: (
            <PageSuspenseFallback>
              <Register />
            </PageSuspenseFallback>
          ),
        },
      ],
    },
    {
      path: "/dashboard",
      element: (
        <Suspense 
          fallback={
            <div className="relative login bg-section-color w-screen h-[calc(100vh-65px)] flex justify-center items-center">
              <LottieHandler 
                type="loading" 
                message="Loading Dashboard..." 
              />
            </div>
          }
        >
          <DashboardLayout />
        </Suspense>
      ),
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: (
            <PageSuspenseFallback>
              <HomeD />
            </PageSuspenseFallback>
          ),
        },
        {
          path: "purchase-requests",
          element: (
            <PageSuspenseFallback>
              <PurchaseRequests />
            </PageSuspenseFallback>
          ),
        },
        {
          path: "sales-requests",
          element: (
            <PageSuspenseFallback>
              <SalesRequests />
            </PageSuspenseFallback>
          ),
        },
        {
          path: "rental-requests",
          element: (
            <PageSuspenseFallback>
              <RentalRequests />
            </PageSuspenseFallback>
          ),
        },
        {
          path: "users",
          element: (
            <PageSuspenseFallback>
              <Users />
            </PageSuspenseFallback>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
