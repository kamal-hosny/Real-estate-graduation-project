import { Award, Building2, TrendingUp, Users } from "lucide-react";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer"; 

const AchievementsCards = [
  {
    id: 1,
    icon: <TrendingUp size={35} />,
    counter: 500,
    title: "successfulDeals",
    description: "transactionsCompleted",
    plus: true,
  },
  {
    id: 2,
    icon: <Building2 size={35} />,
    counter: 25,
    title: "yearsExperience",
    description: "businessBrokerage",
    plus: true,
  },
  {
    id: 3,
    icon: <Users size={35} />,
    counter: 1000,
    title: "happyClients",
    description: "satisfiedCustomers",
    plus: true,
  },
  {
    id: 4,
    icon: <Award size={35} />,
    counter: 15,
    title: "industryAwards",
    description: "recognitionExcellence",
    plus: false,
  },
];

const Achievements = () => {
  const { t } = useTranslation();
  
  const { ref, inView } = useInView({
    triggerOnce: true, 
    threshold: 0.5, 
  });

  return (
    <div className="banner-oilfield bg-main-color-background py-4" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="cards grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {AchievementsCards.map((x) => (
            <div
              className="card flex flex-col justify-center items-center gap-1"
              key={x.id}
            >
              <div className="icon rounded-full bg-section-color p-3 w-fit text-color-text-1">
                {x.icon}
              </div>
              <div className="flex items-center text-3xl font-bold text-color-text-1">
                {inView ? (
                  <CountUp end={x.counter} duration={3} />
                ) : (
                  0
                )}
                {x.plus ? "+" : ""}
              </div>
              <p className="text-color-text-1 font-medium">  {t(`achievements.${x.title}`)}</p>
              <p className="text-color-text-2"> {t(`achievements.${x.description}`)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;