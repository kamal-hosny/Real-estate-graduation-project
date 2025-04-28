// External imports
import { useTranslation } from "react-i18next";

// Internal imports
import LottieHandler from "../../common/feedback/LottieHandler/LottieHandler";
import PurchaseTableBody from "./SalesTableBody";

// Types
interface DataP {
  id: number;
  TypeOrder: string;
  created_at: string;
  property: {
    propertyId: number;
    propertyTitle: string;
    propertyType: string;
    price: string;
    status: string;
    city: string;
    address: string;
    googleMapsLink: string;
    totalRooms: string;
    bathrooms: string;
    bedrooms: string;
    floorNumber: string;
    area: string;
    furnished: boolean;
    description: string;
    createdAt: number;
    propertyImages: string[];
    userId: string;
  };
}

interface SalesTableRequestsProps {
  properties: DataP[] | { $values: DataP[] };
}

const SalesTableRequests = ({ properties }: SalesTableRequestsProps) => {
  const { t } = useTranslation("");
  const propertiesArray = Array.isArray(properties)
    ? properties
    : properties?.$values || [];

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <table className="w-full text-center">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-sm font-semibold text-gray-500 text-center">
              {t("salesTableRequests.headers.id")}
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-500 text-center">
              {t("salesTableRequests.headers.property")}
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-500 text-center">
              {t("salesTableRequests.headers.type")}
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-500 text-center">
              {t("salesTableRequests.headers.price")}
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-500 text-center">
              {t("salesTableRequests.headers.user")}
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-500 text-center">
              {t("salesTableRequests.headers.images")}
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-500 text-center">
              {t("salesTableRequests.headers.orderType")}
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-500 text-center">
              {t("salesTableRequests.headers.orderStatus")}
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-500 text-center">
              {t("salesTableRequests.headers.actions")}
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {propertiesArray.map((item: DataP, index: number) => (
            <PurchaseTableBody
              key={item.id}
              item={item}
              index={index}
            />
          ))}
        </tbody>
      </table>

      {propertiesArray.length === 0 && (
        <div className="text-center py-12">
          <LottieHandler
            className="scale-75"
            type="empty"
            message={
              <p className="text-gray-500">
                {t("salesTableRequests.emptyMessage")}
              </p>
            }
          />
        </div>
      )}
    </div>
  );
};

export default SalesTableRequests;