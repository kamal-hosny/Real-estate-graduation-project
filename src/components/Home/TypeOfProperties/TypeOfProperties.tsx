// External imports
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// Internal imports
import MainTitle from "../../common/main/MainTitle";
import Img from "../../ui/Img";

// Assets
import apartment from "../../../assets/TypeOfProperties/Apartment.avif";
import office from "../../../assets/TypeOfProperties/Office.avif";
import privateHouse from "../../../assets/TypeOfProperties/Private House.png";
import shop from "../../../assets/TypeOfProperties/Shop.avif";
import townhouseImg from "../../../assets/TypeOfProperties/Townhouse.png";
import villa from "../../../assets/TypeOfProperties/Villa.avif";

// type PropertyType =
//   | "Townhouse"       // تاون هاوس (بيت متلاصق)
//   | "Villa"           // فيلا
//   | "Private House"   // منزل خاص
//   | "Apartment"       // شقة
//   | "Office"          // مكتب
//   | "Shop"           // محل

// Types
interface Iproperties {
  id: number;
  img: string;
  title: string;
}

// Constants
const properties: Iproperties[] = [
  {
    id: 1,
    img: townhouseImg,
    title: "Townhouse",
  },
  {
    id: 2,
    img: villa,
    title: "Villa",
  },
  {
    id: 3,
    img: privateHouse,
    title: "Privatehouse",
  },
  {
    id: 4,
    img: apartment,
    title: "Apartment",
  },
  {
    id: 5,
    img: office,
    title: "Office",
  },
  {
    id: 6,
    img: shop,
    title: "Shop",
  },
];

const TypeOfProperties = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="type-of-properties py-8 bg-main-color-background">
      <div className="container mx-auto px-4">
        <MainTitle title={t(`typeOfProperties.PropertyTypes`)} />

        <div className="cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {properties.map((property) => (
            <div
              key={property.id}
              className="cursor-pointer hover:scale-105 transition-opacity card bg-section-color p-4 rounded-lg flex flex-col justify-center items-center shadow-md overflow-hidden hover:shadow-lg duration-300"
              onClick={() => navigate(`/properties?type=${property?.title}`)}
            >
              <Img
                src={property.img}
                alt={property.title}
                className="property-type-image w-16 h-16"
              />
              
              <div className="info p-4 text-center">
                <p className="title text-lg font-semibold text-color-text-1">
                  {t(`typeOfProperties.${property.title}`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TypeOfProperties;
