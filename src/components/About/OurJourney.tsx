import Img from "../ui/Img";
import MainTitle from "../common/main/MainTitle";

import realEstateImg from "../../assets/about/about2.jpeg";

type MilestoneCard = {
    id: number;
    name: string;
    number: number;
};

const milestoneCards: MilestoneCard[] = [
    {
        id: 1,
        name: "Happy Customers",
        number: 500
    },
    {
        id: 2,
        name: "Properties Sold",
        number: 300
    },
    {
        id: 3,
        name: "Years in Business",
        number: 15
    }
];

const OurJourney = () => {
  return (
    <div className="flex justify-between items-center gap-6 py-4 max-md:flex-col">
      <div className="content flex flex-col flex-1 gap-4 ">

        <MainTitle title="Our Journey">
          At RealEstateHub, we are committed to providing premium real estate solutions. With a proven track record and a dedicated team, we have successfully helped numerous clients find their dream properties.
        </MainTitle>

        <div className="cards flex justify-center gap-2 items-center">
          {milestoneCards.map((card) => (
            <div key={card.id} className="card flex-1 p-3 bg-section-color border-color-border border space-y-2 rounded">
              <p className="text-color-text-1 text-xl font-semibold">{card.number}+</p>
              <p className="text-color-text-2 text-xs">{card.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="image flex-1 border-color-border border-2 rounded-md overflow-hidden">
        <Img
          className="w-full h-full"
          src={realEstateImg}
          alt="Our Journey in Real Estate"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default OurJourney;
