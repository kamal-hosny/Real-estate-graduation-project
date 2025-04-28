// External imports
import { Briefcase, Home, Users } from "lucide-react";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

// Internal imports
import MainTitle from "../common/main/MainTitle";

// Types
type OurValuesCard = {
    id: number;
    nameKey: string;
    icon: ReactNode;
    descriptionKey: string;
};

// Constants
const OurValuesCards: OurValuesCard[] = [
    {
        id: 1,
        nameKey: "trust",
        icon: <Home className="text-blue-400 fill-current" />,
        descriptionKey: "trust_desc"
    },
    {
        id: 2,
        nameKey: "expertise",
        icon: <Briefcase className="text-blue-400 fill-current" />,
        descriptionKey: "expertise_desc"
    },
    {
        id: 3,
        nameKey: "client_centric",
        icon: <Users className="text-blue-400 fill-current" />,
        descriptionKey: "client_centric_desc"
    },
    {
        id: 4,
        nameKey: "excellence",
        icon: <Home className="text-blue-400 fill-current" />,
        descriptionKey: "excellence_desc"
    },
];

const OurValues = () => {
    const { t } = useTranslation();

    return (
        <div className="py-4 text-color-text-1 flex justify-between items-center max-md:flex-col gap-4">
            <div className="flex-1">
                <MainTitle title={t("our_values.title")}>
                    {t("our_values.description")}
                </MainTitle>
            </div>

            <div className="flex-[2] border-color-border border-2 rounded-md">
                <div className="cards grid grid-cols-2 max-md:grid-cols-1 shadow-xl">
                    {OurValuesCards.map((card) => (
                        <div
                            key={card.id}
                            className="card bg-section-color space-y-3 p-8 max-md:p-6 border-color-border border-2 cursor-pointer hover:scale-105 transition"
                        >
                            <div className="title flex items-center justify-start gap-2">
                                <div className="icon flex justify-center items-center w-7 h-7 rounded-full border-[#85a8f8] border-2 p-1.5">
                                    {card.icon}
                                </div>
                                <p className="font-semibold text-color-text-1">
                                    {t(`our_values.cards.${card.nameKey}.name`)}
                                </p>
                            </div>
                            <div className="description text-xs text-color-text-2">
                                {t(`our_values.cards.${card.nameKey}.description`)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OurValues;