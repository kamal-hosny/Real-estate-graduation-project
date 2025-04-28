// External imports
import { useTranslation } from "react-i18next";

// Internal imports
import realEstateImg from "../../assets/about/about2.jpeg";
import MainTitle from "../common/main/MainTitle";
import Img from "../ui/Img";

// Types
type MilestoneCard = {
    id: number;
    nameKey: string; 
    number: number;
};

// Constants
const milestoneCards: MilestoneCard[] = [
    {
        id: 1,
        nameKey: "happy_customers",
        number: 500
    },
    {
        id: 2,
        nameKey: "properties_sold",
        number: 300
    },
    {
        id: 3,
        nameKey: "years_in_business",
        number: 15
    }
];

const OurJourney = () => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-between items-center gap-6 py-4 max-md:flex-col">
      <div className="content flex flex-col flex-1 gap-4 ">
        <MainTitle title={t("our_journey.title")}>
          {t("our_journey.description")}
        </MainTitle>

        <div className="cards flex justify-center gap-2 items-center">
          {milestoneCards.map((card) => (
            <div key={card.id} className="card flex-1 p-3 bg-section-color border-color-border border space-y-2 rounded">
              <p className="text-color-text-1 text-xl font-semibold">{card.number}+</p>
              <p className="text-color-text-2 text-xs">
                {t(`our_journey.milestones.${card.nameKey}`)}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="image flex-1 border-color-border border-2 rounded-md overflow-hidden">
        <Img
          className="w-full h-full"
          src={realEstateImg}
          alt={t("our_journey.image_alt")}
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default OurJourney;