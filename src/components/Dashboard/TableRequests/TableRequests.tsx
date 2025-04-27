import LottieHandler from "../../common/feedback/LottieHandler/LottieHandler";
import TableBody from "./TableBody";
import { useTranslation } from "react-i18next";

interface dataTable {
  id: number;
  TypeOrder: string;
  created_at: string;
  userToken: string;
  clientId: string;
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

const TableRequests = ({ data }: { data: dataTable[] }) => {
  const { t } = useTranslation(""); // Use default namespace

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <table className="w-full text-center">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-sm font-semibold text-gray-500 text-center">
              {t("tableRequests.headers.id")}
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-500 text-center">
              {t("tableRequests.headers.property")}
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-500 text-center">
              {t("tableRequests.headers.type")}
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-500 text-center">
              {t("tableRequests.headers.price")}
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-500 text-center">
              {t("tableRequests.headers.createdBy")}
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-500 text-center">
              {t("tableRequests.headers.images")}
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-500 text-center">
              {t("tableRequests.headers.orderType")}
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-500 text-center">
              {t("tableRequests.headers.orderStatus")}
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-500 text-center">
              {t("tableRequests.headers.actions")}
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {data.map((property, index) => (
            <TableBody key={property.id} item={property} index={index} />
          ))}
        </tbody>
      </table>

      {data.length === 0 && (
        <div className="text-center py-12">
          <LottieHandler
            className="scale-75"
            type="empty"
            message={
              <p className="text-gray-500">{t("tableRequests.emptyMessage")}</p>
            }
          />
        </div>
      )}
    </div>
  );
};

export default TableRequests;