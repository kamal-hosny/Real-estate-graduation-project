// External imports
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// Internal imports
import Button from "../ui/Button";

const Banner = () => {
  const { t } = useTranslation();

  return (
    <div 
      className="p-10 flex justify-between max-md:flex-col max-md:text-center max-md:gap-8 items-center bg-section-color rounded"
    >
      <div className="contact space-y-4">
        <div className="title text-color-text-1 font-bold text-2xl">
          {t("company_banner.title")}
        </div>
        <div className="title text-color-text-2 text-xs leading-6 max-w-[800px]">
          {t("company_banner.subtitle")}
        </div>
      </div>

      <div>
        <Link to="/properties">
          <Button 
            className="bg-button-color hover:bg-button-hover-color text-main-color-background font-bold"
          >
            {t("company_banner.cta")}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Banner;