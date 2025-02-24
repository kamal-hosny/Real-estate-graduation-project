import { Home, Briefcase, Users } from "lucide-react";
import MainTitle from "../common/main/MainTitle";
import { ReactNode } from "react";

type OurValuesCard = {
    id: number;
    name: string;
    icon: ReactNode;
    description: string;
};

const OurValuesCards: OurValuesCard[] = [
    {
        id: 1,
        name: "Trust & Integrity",
        icon: <Home className="text-[#a585f8] fill-current" />,
        description: `
        At RealEstateHub, we believe trust and integrity are the cornerstones of every real estate transaction. We ensure transparency and professionalism in all our dealings.
        `
    },
    {
        id: 2,
        name: "Expertise",
        icon: <Briefcase className="text-[#a585f8] fill-current" />,
        description: `
        Our team of experienced real estate professionals is dedicated to providing market insights and expert advice, helping clients make informed decisions.
        `
    },
    {
        id: 3,
        name: "Client-Centric Approach",
        icon: <Users className="text-[#a585f8] fill-current" />,
        description: `
        We prioritize our clients' needs and aspirations, ensuring personalized services that cater to their real estate goals and dreams.
        `
    },
    {
        id: 4,
        name: "Commitment to Excellence",
        icon: <Home className="text-[#a585f8] fill-current" />,
        description: `
        We are committed to delivering the best real estate solutions, ensuring a seamless and rewarding experience for buyers, sellers, and investors alike.
        `
    },
];

const OurValues = () => {
  return (
    <div className="py-4 text-color-text-1 flex justify-between items-center max-md:flex-col gap-4">
        <div className="flex-1">
            <MainTitle title="Our Values">
                At RealEstateHub, we take pride in providing exceptional real estate services. With a strong foundation of trust and expertise, we help clients navigate the property market with confidence.
            </MainTitle>
        </div>
        <div className="flex-[2] border-color-border border-2 rounded-md">
            <div className="cards grid grid-cols-2 max-md:grid-cols-1 shadow-xl">
                {OurValuesCards.map((card) => (
                    <div key={card.id} className="card bg-section-color space-y-3 p-8 max-md:p-6 border-color-border border-2 cursor-pointer hover:scale-105 transition">
                        <div className="title flex items-center justify-start gap-2">
                            <div className="icon flex justify-center items-center w-7 h-7 rounded-full border-[#a585f8] border-2 p-1.5">
                                {card.icon}
                            </div>
                            <p className="font-semibold text-color-text-1">{card.name}</p>
                        </div>
                        <div className="description text-xs text-color-text-2">
                            {card.description}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}

export default OurValues;