import { useEffect, useState } from "react";
import {
  ArrowBigLeftDash,
  ArrowBigRightDash,
  Bot,
  Heart,
  MapPinned,
  Settings,
} from "lucide-react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import Breadcrumb from "../components/Products/Breadcrumb";
import Button from "../components/ui/Button";
import { formatCurrency } from "../utils";
import TableDetails from "../components/SingleProduct/TableDetails";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addToast } from "../store/toasts/toastsSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../store/wishlist/wishlistActions";
import Img from "../components/ui/Img";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getOneProperty } from "../store/property/act/actGetOneProperty";
import LottieHandler from "../components/common/feedback/LottieHandler/LottieHandler";
import { getTimeSincePost } from "../utils/dateFun";
import { supabase } from "../config/supabaseClient";
import UserDataSingleProduct from "../components/SingleProduct/UserDataSingleProduct";
import { openModal } from "../store/modal/modalSlice";

interface PropertyImages {
  $id: string;
  $values: string[];
}

interface RealProperty {
  propertyId: number;
  propertyTitle: string;
  propertyType: string;
  status: string;
  price: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  totalRooms: number;
  floorNumber: number;
  furnished: boolean;
  city: string;
  address: string;
  description: string;
  createdAt: string;
  googleMapsLink: string;
  propertyImages: PropertyImages;
  userId: string;
}

interface WishlistItem {
  propertyId: number;
}

const SingleProperty = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const direction = i18n.dir();

  const defaultImg = "https://dummyimage.com/300x300";
  const { record, loading, error } = useAppSelector((state) => state?.property);
  const property = record as RealProperty | null;
  const wishlist = useAppSelector(
    (state) => state?.wishlist?.items ?? []
  ) as WishlistItem[];
  const { token, user } = useAppSelector((state) => state?.auth);

  const isProductInWishlist = wishlist.some(
    (item) => item.propertyId === property?.propertyId
  );
  const [isHeartFilled, setIsHeartFilled] = useState(isProductInWishlist);

  const isAdmin = useAppSelector(
    (state) => state?.auth?.user?.roles?.$values[0]
  );

  useEffect(() => {
    setIsHeartFilled(isProductInWishlist);
  }, [isProductInWishlist]);

  useEffect(() => {
    if (id) {
      dispatch(getOneProperty({ id }));
    }
  }, [dispatch, id, i18n.language]);

  const toggleHeart = () => {
    if (!property) return;
    if (isHeartFilled) {
      dispatch(removeFromWishlist(property));
    } else {
      dispatch(addToWishlist(property));
      dispatch(
        addToast({
          message: t("singlePropertyPage.addedToWishlist"),
          type: "success",
        })
      );
    }
    setIsHeartFilled((prev) => !prev);
  };

  const getEmbeddableMapUrl = (url: string): string => {
    if (url.includes("maps.app.goo.gl")) {
      console.warn(
        "Short URL detected. Please use an embeddable Google Maps URL."
      );
      return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.123456789!2d31.123456789!3d29.987654321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z2YXYrdin2YHYuNipINin2YTZhdi52Kkg2KPZh9mE2YjZhA!5e0!3m2!1sar!2seg!4v1698765432100!5m2!1sar!2seg";
    }
    return url;
  };

  const purchaseOrder = async () => {
    if (!token) {
      return dispatch(
        addToast({
          message: t("singlePropertyPage.unauthenticatedError"),
          type: "warning",
        })
      );
    }
    if (!property) {
      return dispatch(
        addToast({
          message: t("singlePropertyPage.noPropertyFound"),
          type: "error",
        })
      );
    }

    const { error } = await supabase.from("PurchaseOrders").insert([
      {
        userToken: token,
        property: {
          ...property,
          createdAt: property.createdAt,
        },
        TypeOrder: "Pending",
        clientId: user?.id,
      },
    ]);

    if (error) {
      console.error("Purchase Order Error:", error.message);
      dispatch(
        addToast({
          message: `${t("singlePropertyPage.purchaseError")}: ${error.message}`,
          type: "error",
        })
      );
    } else {
      dispatch(
        addToast({
          message: t("singlePropertyPage.purchaseSuccess"),
          type: "success",
        })
      );
    }
  };

  const rentOrder = async () => {
    if (!token) {
      return dispatch(
        addToast({
          message: t("singlePropertyPage.unauthenticatedError"),
          type: "warning",
        })
      );
    }
    if (!property) {
      return dispatch(
        addToast({
          message: t("singlePropertyPage.noPropertyFound"),
          type: "error",
        })
      );
    }

    const { error } = await supabase.from("RentOrders").insert([
      {
        userToken: token,
        property: {
          ...property,
          createdAt: property.createdAt,
        },
        TypeOrder: "Pending",
        clientId: user?.id,
      },
    ]);

    if (error) {
      console.error("Rent Order Error:", error.message);
      dispatch(
        addToast({
          message: `${t("singlePropertyPage.rentError")}: ${error.message}`,
          type: "error",
        })
      );
    } else {
      dispatch(
        addToast({
          message: t("singlePropertyPage.rentSuccess"),
          type: "success",
        })
      );
    }
  };

  if (error) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <LottieHandler type="error" message={error} />
      </div>
    );
  }
  if (loading === "pending") {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <LottieHandler type="loading" message={t("loading")} />
      </div>
    );
  }
  if (!property) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <LottieHandler
          type="error"
          message={t("singlePropertyPage.noPropertyFound")}
        />
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-2 py-4 space-y-5 bg-section-color md:max-w-[70%]">
        <Breadcrumb
          items={[
            { label: t("singlePropertyPage.home"), link: "/" },
            { label: t("singlePropertyPage.properties"), link: "/properties" },
          ]}
          itemNow={property.propertyTitle || t("singlePropertyPage.property")}
        />
        <div className="productPage flex flex-col gap-y-4">
          <div className="relative imageSection rounded-t border-color-border border bg-main-color-background max-w-full">
            <Swiper
              className="swiper relative custom-pagination"
              spaceBetween={0}
              loop={property.propertyImages.$values.length > 1}
              slidesPerView={1}
              pagination={{ type: "fraction" }}
              navigation={{
                nextEl: ".swiper-next-singleProduct",
                prevEl: ".swiper-prev-singleProduct",
              }}
              modules={[Navigation, Pagination]}
            >
              {property.propertyImages.$values.map((img, index) => (
                <SwiperSlide key={index}>
                  <Img
                    loading="lazy"
                    className="w-full cursor-grab border-color-border rounded-t object-cover h-[500px] hover:scale-105 transition-all"
                    src={img || defaultImg}
                    alt={t("singlePropertyPage.propertyImage")}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <Heart
              onClick={toggleHeart}
              className={`cursor-pointer absolute top-4 left-4 z-10 opacity-70 hover:opacity-100 p-2 w-10 h-10 border-color-border border-2 rounded-full transition-all ${
                isHeartFilled
                  ? "text-red-500 bg-section-color"
                  : "text-gray-400 bg-white"
              }`}
              fill={isHeartFilled ? "red" : "none"}
            />
            {property.propertyImages.$values.length > 1 && (
              <div
                className={`absolute top-1/2 -translate-y-1/2 flex justify-between w-full z-10 p-1 ${
                  direction === "rtl" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div className=" swiper-prev-singleProduct opacity-70 hover:opacity-100 transition-all bg-section-color border-2 border-color-border p-1.5 text-color-text-2 hover:text-color-text-1 rounded-full cursor-pointer">
                  <ArrowBigLeftDash size={20} />
                </div>
                <div className="swiper-next-singleProduct opacity-70 hover:opacity-100 transition-all bg-section-color border-2 border-color-border p-1.5 text-color-text-2 hover:text-color-text-1 rounded-full cursor-pointer">
                  <ArrowBigRightDash size={20} />
                </div>
              </div>
            )}
          </div>

          <div className="details">
            <div className="head flex flex-col gap-3 w-full">
              <div className="date-type text-color-text-2 text-xs font-medium">
                {property.propertyType} - {t("singlePropertyPage.posted")}{" "}
                {getTimeSincePost(property.createdAt, i18n)}
              </div>
              <h1 className="title text-color-text-1 text-3xl font-medium">
                {property.propertyTitle}
              </h1>
              <div className="location text-color-text-2 font-medium flex gap-2 items-center">
                <MapPinned />
                {property.city} - {property.address}
              </div>
              <div className="price font-semibold text-color-text-1">
                {property.status === "For Rent"
                  ? `${t("singlePropertyPage.monthlyRent")} ${formatCurrency(
                      property.price
                    )}`
                  : formatCurrency(property.price)}
              </div>

              {property.status === "For Rent" && (
                <Button
                  onClick={rentOrder}
                  className="bg-button-color hover:bg-button-hover-color text-main-color-background w-fit"
                >
                  {t("singlePropertyPage.submitRentRequest")}
                </Button>
              )}
              {property.status === "For Sale" && (
                <Button
                  onClick={purchaseOrder}
                  className="bg-button-color hover:bg-button-hover-color text-main-color-background w-fit"
                >
                  {t("singlePropertyPage.submitPurchaseRequest")}
                </Button>
              )}
              {(property.status === "Sold" || property.status === "Rented") && (
                <p className="text-color-text-1 font-medium">
                  {property.status === "Sold"
                    ? t("singlePropertyPage.sold")
                    : t("singlePropertyPage.rented")}
                </p>
              )}
            </div>
          </div>

          <hr className="border-color-border border-2" />
          <div className="description flex flex-col gap-2">
            <h2 className="text-2xl font-medium text-color-text-1">
              {t("singlePropertyPage.description")}
            </h2>
            <p className="text-color-text-1">{property.description}</p>
          </div>
          <hr className="border-color-border border-2" />

          <UserDataSingleProduct userId={property?.userId || null} />
          <hr className="border-color-border border-2" />

          <div className="property-details flex flex-col gap-2">
            <h2 className="text-2xl font-medium text-color-text-1">
              {t("singlePropertyPage.propertyDetails")}
            </h2>
            <TableDetails
              area={property.area}
              baths={property.bathrooms}
              beds={property.bedrooms}
              createdAt={new Date(property.createdAt)}
              floor={property.floorNumber}
              id={property.propertyId.toString()}
              rooms={property.totalRooms}
              status={property.status}
              type={property.propertyType}
              verification={property.furnished}
            />
          </div>
          <hr className="border-color-border border-2" />
          <div className="location-map flex flex-col gap-2">
            <h2 className="text-2xl font-semibold text-color-text-1">
              {t("singlePropertyPage.locationOnMap")}
            </h2>
            <iframe
              title={t("singlePropertyPage.googleMapLocation")}
              src={getEmbeddableMapUrl(property.googleMapsLink)}
              className="w-full"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

{/* AssistantBotDialog */}
<div
  className="rounded-full p-[2px] fixed bottom-[85px] end-6 
  bg-[rgb(var(--section-color))] 
  shadow-[0_0_15px_-3px_rgba(var(--button-color),0.3)]
  hover:shadow-[0_0_25px_-5px_rgba(var(--button-color),0.5)]
  transition-all duration-500 group border border-[rgb(var(--color-border))]"
  onClick={() => {
    dispatch(openModal({ name: "AssistantBotDialog", product: property }));
  }}
>
  <div className="relative bg-[rgba(var(--main-color-background),0.8)] backdrop-blur-sm rounded-full p-2 transition-colors duration-300 cursor-pointer">
    <Bot className="w-7 h-7 
      text-[rgb(var(--button-color))] 
      animate-[pulse-glow_2s_ease-in-out_infinite] 
      group-hover:animate-[color-change_3s_linear_infinite,glow_1.5s_ease-in-out_infinite]" />
    
    <div className="absolute inset-0 rounded-full 
      bg-[rgba(var(--button-color),0.1)] 
      blur-[12px] group-hover:blur-[15px] 
      transition-all duration-1000" />
  </div>
</div>

{/* SettingsForProperty */}
{isAdmin && (
  <div
    className="bg-section-color border-color-border border-2 p-2 rounded-full 
    fixed bottom-8 end-6 cursor-pointer flex items-center justify-center text-color-text-2 hover:text-color-text-1"
    style={{ width: '46px', height: '46px' }} 
         
    onClick={() => {
      dispatch(
        openModal({
          name: "SettingsForProperty",
          product: property,
        })
      );
    }}
         >
    <Settings className="w-7 h-7  mx-auto" /> 
  </div>
)}
      
    </>
  );
};

export default SingleProperty;
