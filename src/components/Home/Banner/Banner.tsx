import { Trans, useTranslation } from "react-i18next";
import bannerImg from "../../../assets/banner/banner.jpg";
import Button from "../../ui/Button";

const Banner = () => {
  const { t, i18n  } = useTranslation();

  return (
    <div className="banner-oilfield bg-section-color py-4">
    <div className="container mx-auto px-4">
      <div
        className="card bg-gray-800 p-12 rounded-lg bg-cover bg-center h-[350px] flex flex-col justify-center gap-5 relative overflow-hidden"
        style={{ 
          backgroundImage: `url(${bannerImg})`,
          transform: i18n.language === 'ar' ? 'scaleX(-1)' : 'none'
        }}
      >
        <div className={`relative z-10 ${i18n.language === 'ar' ? 'scale-x-[-1]' : ''}`}>
          <p className="title font-bold text-2xl text-white leading-[25px]">
            <Trans
              i18nKey="banner.welcomeMessage"
              components={{ 0: <span className="font-extrabold" /> }}
            />
          </p>
          
          <p className="description text-gray-300 font-semibold text-sm leading-[25px] max-w-sm">
            {t("banner.description", { brand: "Aqarek" })}
          </p>
          
          <Button className="transition-all duration-300 px-4 py-2 bg-transparent text-white border-2 border-white hover:bg-white hover:text-[#0a0a0a] font-semibold rounded-md cursor-pointer w-fit">
            {t("banner.exploreNow")}
          </Button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Banner;