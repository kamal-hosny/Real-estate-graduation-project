import { useState } from "react";
import {
  ArrowBigLeftDash,
  ArrowBigRightDash,
  ChevronRight,
  Heart,
  Mail,
  MapPinned,
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
import { FaWhatsapp } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { Property } from "../types/product.types";
import defaultPerson from "../assets/defaultImages/defaultPerson.jpeg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const breadcrumbItems = [
  { label: "Home", link: "/" },
  { label: "Properties", link: "/properties" },
];

const property: Property = {
  id: "123456",
  title: "Luxury Sea View Villa",
  status: "For Sale",
  type: "Villa",
  price: 2500000,
  description: "Luxury villa with prime location, featuring large garden and private pool.",
  createdAt: new Date("2024-02-15"),
  location: {
    address: "King Fahd Road, Jeddah",
    city: "Jeddah",
    link: "https://maps.google.com/example",
    images: [
      "https://img-4.aqarmap.com.eg/new-aqarmap-media/slider-photo-watermarked-large-webp/2310/6537d4004ee58710796084.jpg",
      "https://img-0.aqarmap.com.eg/new-aqarmap-media/slider-photo-watermarked-large-webp/2310/6537d4013fe5d301910253.jpg",
      "https://img-1.aqarmap.com.eg/new-aqarmap-media/slider-photo-watermarked-large-webp/2310/6537d40124cfa453601509.jpg",
    ],
  },
  details: {
    beds: 5,
    baths: 4,
    rooms: 7,
    area: 450,
    floor: 2,
    verification: true,
  },
  company: {
    id: "comp-001",
    name: "Modern Real Estate Co.",
    phone: "+966500000000",
    email: "info@realestate.com",
    avatar: "https://i.pinimg.com/736x/b9/e2/cf/b9e2cf0eb61ee715798c2c380c721e45.jpg",
  },
};

const SingleProperty = () => {
  const { t } = useTranslation(); 
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const defaultImg = "https://dummyimage.com/300x300";

  // Wishlist
  const wishlist = useAppSelector((state) => state?.wishlist?.items ?? []);
  const isProductInWishlist = wishlist.some(
    (item: any) => item.id === property?.id
  );
  const [isHeartFilled, setIsHeartFilled] = useState(isProductInWishlist);

  const toggleHeart = () => {
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

  return (
    <div className="container mx-auto px-2 py-4 space-y-5 bg-section-color md:max-w-[70%]">
      <Breadcrumb
        items={[
          { label: t("singlePropertyPage.home"), link: "/" },
          { label: t("singlePropertyPage.properties"), link: "/properties" },
        ]}
        itemNow={property?.title || t("singlePropertyPage.property")}
      />
      <div className="productPage flex flex-col gap-y-4">
        <div className="relative imageSection rounded-t border-color-border border bg-main-color-background max-w-full">
          <Swiper
            className="swiper relative custom-pagination"
            spaceBetween={0}
            loop={true}
            slidesPerView={1}
            pagination={{
              type: "fraction",
            }}
            navigation={{
              nextEl: ".swiper-next-singleProduct",
              prevEl: ".swiper-prev-singleProduct",
            }}
            modules={[Navigation, Pagination]}
          >
            {property.location.images.map((img, index) => (
              <SwiperSlide key={index}>
                <Img
                  loading="lazy"
                  className="w-full cursor-grab border-color-border rounded-t object-cover h-[500px] hover:scale-105 transition-all"
                  src={img ?? defaultImg}
                  alt={t("singlePropertyPage.propertyImage")}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <Heart
            onClick={toggleHeart}
            className={`cursor-pointer absolute top-4 left-4 z-10 opacity-70 hover:opacity-100 p-2 w-10 h-10 border-color-border border-2 rounded-full transition-all ${
              isHeartFilled ? "text-red-500 bg-section-color" : "text-gray-400 bg-white"
            }`}
            fill={isHeartFilled ? "red" : "none"}
          />

          {property.location.images.length > 1 && (
            <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full z-10 p-1">
              <div className="swiper-prev-singleProduct opacity-70 hover:opacity-100 transition-all bg-section-color border-2 border-color-border p-1.5 text-color-text-2 hover:text-color-text-1 rounded-full cursor-pointer">
                <ArrowBigLeftDash size={20} />
              </div>
              <div className="swiper-next-singleProduct opacity-70 hover:opacity-100 transition-all bg-section-color border-2 border-color-border p-1.5 text-color-text-2 hover:text-color-text-1 rounded-full cursor-pointer">
                <ArrowBigRightDash size={20} />
              </div>
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="details">
          <div className="head flex flex-col gap-3 w-full">
            <div className="date-type text-color-text-2 text-xs font-medium">
              {property.type} - {new Date(property.createdAt).toLocaleDateString()}
            </div>
            <h1 className="title text-color-text-1 text-3xl font-medium">
              {property.title}
            </h1>
            <div className="location text-color-text-2 font-medium flex gap-2 items-center">
              <MapPinned />
              {property.location.city} - {property.location.address}
            </div>
            <div className="price font-semibold text-color-text-1">
              <span>
                {t("singlePropertyPage.startingFrom")} {formatCurrency(property.price)}
              </span>
            </div>

            <Button className="bg-button-color hover:bg-button-hover-color text-main-color-background w-fit">
              {t("singlePropertyPage.placeOrder")}
            </Button>
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
        <div className="company flex flex-col gap-4">
          <div className="head flex items-center justify-between">
            <h2 className="text-2xl font-medium text-color-text-1">
              {t("singlePropertyPage.publisher")}
            </h2>
            <p
              onClick={() => {
                navigate(`/properties?companyId=${property?.company?.id}`);
              }}
              className="text-color-text-2 cursor-pointer transition-all hover:text-color-text-1 flex items-end"
            >
              <span>{t("singlePropertyPage.viewMore")}</span>{" "}
              <ChevronRight size={20} />
            </p>
          </div>
          <div className="card flex items-center gap-4">
            <div>
              <Img
                className="w-16 h-16 object-cover rounded-full border-color-border border-2"
                src={property?.company?.avatar || defaultPerson}
                alt={property?.company?.name || "name"}
              />
            </div>
            <div className="space-y-1">
              <p className="text-color-text-1 font-medium">{property?.company?.name}</p>
              <p className="text-color-text-2">{property?.company?.email}</p>
            </div>
          </div>
        </div>
        <hr className="border-color-border border-2" />
        <div className="contact-buttons grid grid-cols-3 gap-2 w-full">
          <a href={`https://wa.me/${property?.company?.phone}`} target="_blank" rel="noreferrer">
            <div className="bg-green-100 text-green-700 p-3 rounded flex items-center justify-center border-green-300 border-2 cursor-pointer hover:bg-green-200">
              <FaWhatsapp size={30} />
            </div>
          </a>
          <a href={`tel:${property?.company?.phone}`}>
            <div className="bg-blue-100 text-blue-700 p-3 rounded flex items-center justify-center border-blue-300 border-2 cursor-pointer hover:bg-blue-200">
              <IoIosCall size={30} />
            </div>
          </a>
          <a href={`mailto:${property?.company?.email}`}>
            <div className="bg-red-100 text-red-700 p-3 rounded flex items-center justify-center border-red-300 border-2 cursor-pointer hover:bg-red-200">
              <Mail size={30} />
            </div>
          </a>
        </div>
        <div className="property-details flex flex-col gap-2">
          <h2 className="text-2xl font-medium text-color-text-1">
            {t("singlePropertyPage.propertyDetails")}
          </h2>
          <TableDetails
            area={property.details.area}
            baths={property.details.baths}
            beds={property.details.beds}
            createdAt={property.createdAt}
            floor={property.details.floor}
            id={property.id}
            key={property.id}
            rooms={property.details.rooms}
            status={property.status}
            type={property.type}
            verification={property.details.verification}
          />
        </div>
        <hr className="border-color-border border-2" />
        <div className="location-map flex flex-col gap-2">
          <h2 className="text-2xl font-semibold text-color-text-1">
            {t("singlePropertyPage.locationOnMap")}
          </h2>
          <iframe
            title={t("singlePropertyPage.googleMapLocation")}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23916.266845252336!2d31.358976!3d30.077747200000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583df81720ed69%3A0xb597301dcb56aacf!2z2LPZitiq2Yog2LPZhtiq2LEg2KfZhNmF2KfYuNip!5e1!3m2!1sar!2seg!4v1739970399410!5m2!1sar!2seg"
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
  );
};

export default SingleProperty;