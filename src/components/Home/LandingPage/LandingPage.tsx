import { Link } from "react-router-dom";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import landingPage1 from "../../../assets/landingPage/LandingPage1.avif";
import landingPage2 from "../../../assets/landingPage/LandingPage2.webp";
import Button from "../../ui/Button";
import Img from "../../ui/Img";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
const LandingPage = () => {

  const { t, i18n } = useTranslation();
  const [swiperKey, setSwiperKey] = useState(Date.now());

  useEffect(() => {
    setSwiperKey(Date.now());
  }, [i18n.language]);

  return (
    <div className="landing-page relative">
      <div className="flex flex-col justify-center items-center gap-6 floating-content absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 z-[2]">
        <div style={{textShadow: "0px 0px 20px #000000"}} className="landing-page-info text-center flex flex-col justify-center items-center gap-4">
          <p className="title font-bold text-5xl space-x-1">
          <span className="text-[#ffffff]" style={{textShadow: "0px 0px 20px #000000"}}>
  {t('landingPage.title')}
</span>
          </p>
          <p style={{textShadow: "0px 0px 10px #000000"}} className="description text-[#e5e7eb] w-10/12 max-md:w-96 leading-6 font-medium text-sm">
          {t('landingPage.description')}
          </p>
        </div>
        <div className="flex gap-4">

  <Link to={"/Properties"}>
  <Button
      className="bg-button-color hover:bg-button-hover-color text-main-color-background font-semibold px-6 py-2.5 rounded-lg shadow-md transition-all duration-300"
    >
    {t('landingPage.cta.getStarted')}
    </Button>

    
  </Link>
  <Link to={"/about"}>
  
  <Button
      className="bg-transparent border-2 border-color-border text-white hover:bg-white  hover:text-[#0a0a0a] font-semibold px-6 py-2.5 rounded-lg shadow-md transition-all duration-300"
    >
      {t('landingPage.cta.learnMore')}
    </Button>

  </Link>
</div>

      </div>

      <Swiper
        key={swiperKey}
        dir={i18n.dir()}
        className="swiper relative"
        modules={[Autoplay]}
        spaceBetween={0}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        slidesPerView={1}
      >
        <SwiperSlide>
          <div className="relative">
            <Img
              className="swiperSlide-img w-full h-[calc(100vh-65px)] object-cover"
              src={landingPage1}
              alt="Landing Page 1"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <Img
              className="swiperSlide-img w-full h-[calc(100vh-65px)] object-cover"
              src={landingPage2}
              alt="Landing Page 2"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default LandingPage;