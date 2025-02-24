import React from "react";
import MainTitle from "../common/main/MainTitle";


type Achievement = {
  title: string;
  description: string;
};

const OurAchievements: React.FC = () => {
  const achievements: Achievement[] = [
    {
      title: "5+ Years of Real Estate Excellence",
      description:
        "With over five years in the real estate industry, we’ve built a reputation for trust, quality service, and successful property transactions."
    },
    {
      title: "Hundreds of Happy Clients",
      description:
        "Our growing client base reflects our commitment to helping individuals and businesses find their perfect properties with ease and confidence."
    },
    {
      title: "Award-Winning Real Estate Services",
      description:
        "Recognized for excellence, we have earned industry awards for outstanding property management, customer satisfaction, and innovative solutions."
    }
  ];

  return (
    <div className="flex flex-col gap-6 py-4">
      <MainTitle title="Our Achievements">
        Over the years, we have expanded our reach and expertise in the real estate market. From a small agency to a trusted industry leader, our mission remains focused on delivering quality service and exceptional property solutions to meet our clients' needs.
      </MainTitle>
      <div className="cards grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-6">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className="card px-4 py-6 space-y-3 border-color-border border-2 rounded shadow-xl bg-section-color"
          >
            <div className="title text-color-text-1 font-medium text-lg">
              {achievement.title}
            </div>
            <div className="title text-color-text-2 text-xs leading-6">
              {achievement.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurAchievements;