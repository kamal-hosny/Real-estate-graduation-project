import { Suspense, lazy, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// layouts
import LottieHandler from "../components/common/feedback/LottieHandler/LottieHandler";
import { MainLayout } from "../layouts";
import PageSuspenseFallback from "../components/common/feedback/PageSuspenseFallback/PageSuspenseFallback";
import Error from "../pages/Error";
import About from "../pages/About";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { checkMobileWidth } from "../store/features/mobileWidth/mobileWidthThunk";

import AdvertiseProperty from "../pages/AdvertiseProperty";
import Profile from "../pages/Profile";
import ContactUs from "../pages/ContactUs";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsOfService from "../pages/TermsOfService";

// pages
const Home = lazy(() => import("../pages/Home"));
const Products = lazy(() => import("../pages/Products"));
const SingleProduct = lazy(() => import("../pages/SingleProduct"));
const Wishlist = lazy(() => import("../pages/Wishlist"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));

const AppRouter = () => {
  const dispatch = useDispatch<AppDispatch>();

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

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense
          fallback={
            <div className="relative login bg-section-color w-screen h-[calc(100vh-65px)] flex justify-center items-center">
              <LottieHandler type="loading" message="Loading please wait..." />
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
          )
        },
        {
          path: "advertise-property",
          element: (
            <PageSuspenseFallback>
              <AdvertiseProperty />
            </PageSuspenseFallback>
          )
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
          path: "terms-of-service",
          element: (
            <PageSuspenseFallback>
              <TermsOfService />
            </PageSuspenseFallback>
          ),
        },
        {
          path: "privacy-policy",
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
        }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
