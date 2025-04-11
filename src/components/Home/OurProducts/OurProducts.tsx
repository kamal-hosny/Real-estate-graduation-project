import { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation } from "swiper/modules";
import Button from "../../ui/Button";
import ProductCard from "../../common/ProductCard/ProductCard";
import { ArrowLeft, ArrowRight } from "lucide-react";
import LottieHandler from "../../common/feedback/LottieHandler/LottieHandler";
import ProductCardSkeleton from "../../SkeletonsUi/ProductCardSkeleton";
import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../store/hooks";

const OurProducts = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const { t } = useTranslation();



  const {records, loading, error} = useAppSelector((state) => state?.property)

  const getLastTenP = records.$values.slice(-10).reverse()

  const totalSlides = getLastTenP.length;

  const loadingSkeleton = useMemo(() => (
    Array.from({ length: 6 }, (_, index) => (
      <SwiperSlide key={index}>
        <ProductCardSkeleton />
      </SwiperSlide>
    ))
  ), []);

  if (error) {
    return (
      <div className="relative login bg-section-color w-screen h-[calc(100vh-65px)] flex justify-center items-center">
        <LottieHandler type="error" message="Something went wrong!" />
      </div>
    );
  }

  return (
    <div className="OurProducts py-8 bg-main-color-background">
      <div className="container mx-auto px-4 space-y-6">
        <div className="head flex justify-between items-center">
        <p className="main-title text-2xl font-bold text-color-text-1">
    {t("ourProducts.featuredProperty")}
  </p>
          <Link to="/products">
            <Button className="border-button-color border-2 text-color-text-1 hover:bg-button-hover-color hover:text-main-color-background">
            {t("ourProducts.viewAll")}
            </Button>
          </Link>
        </div>

        <Swiper
          className="cards"
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          navigation={{ nextEl: ".swiper-next", prevEl: ".swiper-prev" }}
          modules={[Navigation]}
          breakpoints={{
            576: { slidesPerView: 1.8 },
            768: { slidesPerView: 2.3 },
            991: { slidesPerView: 3 },
            1280: { slidesPerView: 3.5 },
          }}
          onSlideChange={(swiper) => setCurrentSlide((swiper.realIndex % totalSlides) + 1)}
        >
          {loading === "pending" ? loadingSkeleton : getLastTenP.map((property) => (
            <SwiperSlide key={property.propertyId}>
              <ProductCard productData={property} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex items-center justify-between">
          <div className="counter text-color-text-2 space-x-1">
            <span className="text-color-text-1">{String(currentSlide).padStart(2, "0")}</span>
            <span>of</span>
            <span>{String(totalSlides).padStart(2, "0")}</span>
          </div>
          <div className="swiper-navigation flex gap-4">
            <button  className="swiper-prev border-2 border-color-border p-2 text-color-text-2 hover:text-color-text-1 rounded-full cursor-pointer">
              <ArrowLeft size={28} />
            </button>
            <button  className="swiper-next border-2 border-color-border p-2 text-color-text-2 hover:text-color-text-1 rounded-full cursor-pointer">
              <ArrowRight size={28} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurProducts;