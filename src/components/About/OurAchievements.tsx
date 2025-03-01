import React from "react";
import { useTranslation } from "react-i18next";
import MainTitle from "../common/main/MainTitle";

type Achievement = {
  titleKey: string;
  descriptionKey: string;
};

const OurAchievements: React.FC = () => {
  const { t } = useTranslation();

  const achievements: Achievement[] = [
    {
      titleKey: "years_excellence",
      descriptionKey: "years_excellence_desc"
    },
    {
      titleKey: "happy_clients",
      descriptionKey: "happy_clients_desc"
    },
    {
      titleKey: "award_winning",
      descriptionKey: "award_winning_desc"
    }
  ];

  return (
    <div className="flex flex-col gap-6 py-4">
      <MainTitle title={t("company_achievements.title")}>
        {t("company_achievements.description")}
      </MainTitle>
      
      <div className="cards grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-6">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className="card px-4 py-6 space-y-3 border-color-border border-2 rounded shadow-xl bg-section-color"
          >
            <div className="title text-color-text-1 font-medium text-lg">
              {t(`company_achievements.cards.${achievement.titleKey}.title`)}
            </div>
            <div className="title text-color-text-2 text-xs leading-6">
              {t(`company_achievements.cards.${achievement.titleKey}.description`)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurAchievements;