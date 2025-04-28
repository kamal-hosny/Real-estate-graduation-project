// External libraries
import { Eye, Pencil, Trash2, UserRound } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

// Internal imports
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { openModal } from "../../../store/modal/modalSlice";
import { getOneUser } from "../../../store/user/act/actGetOneUser";
import { formatCurrency, textSlicer } from "../../../utils";
import Images from "../../ui/Images";

// Types
interface dataP {
  item: {
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
  };
  index: number;
}

const SalesTableBody = ({ item, index }: dataP) => {
  const { t } = useTranslation("");
  const dispatch = useAppDispatch();
  const usersById = useAppSelector((state) => state.user.usersById);
  const user = usersById[item.property.userId];
  const property = item.property;

  useEffect(() => {
    if (item.property.userId && !usersById[item.property.userId]) {
      dispatch(getOneUser({ id: item.property.userId }));
    }
  }, [item.property.userId, usersById, dispatch]);

  // Helper functions for translations
  const getStatusTranslation = (status: string) => {
    return t(`salesTableBody.status.${status}`, t("salesTableBody.status.Other"));
  };

  const getOrderTypeTranslation = (orderType: string) => {
    return t(`salesTableBody.orderType.${orderType}`, t("salesTableBody.orderType.Other"));
  };

  return (
    <tr 
      key={item.id} 
      className="hover:bg-gray-50 transition-colors"
    >
      <td className="px-6 py-4 text-sm font-medium text-gray-700">
        {index + 1}
      </td>

      <td className="px-6 py-4">
        <div className="flex flex-col gap-1">
          <span className="font-medium text-gray-900 text-left">
            {textSlicer(property.propertyTitle, 30)}
          </span>
          <span className="text-xs text-gray-500 text-left">
            {textSlicer(property.address, 50)}
          </span>
        </div>
      </td>

      <td className="px-6 py-4 text-sm text-gray-600">
        {property.propertyType}
      </td>

      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
        {formatCurrency(parseFloat(property.price) || 0)}
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            {user?.image ? (
              <img
                src={user.image}
                className="w-10 h-10 rounded-full object-cover"
                alt={user.fullName || t("salesTableBody.unknownUser")}
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <UserRound className="w-6 h-6 text-blue-600" />
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">
              {user?.fullName || t("salesTableBody.unknownUser")}
            </span>
            <span className="text-xs text-gray-500">
              {user?.phoneNumber || t("salesTableBody.noPhone")}
            </span>
          </div>
        </div>
      </td>

      <td className="px-6 py-4 text-sm text-gray-600">
        {item?.property?.propertyImages ? (
          <Images images={item?.property?.propertyImages} />
        ) : (
          <span>{t("salesTableBody.noImages")}</span>
        )}
      </td>

      <td className="px-6 py-4 text-sm text-gray-600">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            property.status === "For Sale"
              ? "bg-[#dcfce7] text-[#16a34a]"
              : "bg-[#ffedd5] text-[#ea580c]"
          }`}
        >
          {getStatusTranslation(property.status)}
        </span>
      </td>

      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            item.TypeOrder === "Pending"
              ? "bg-yellow-100 text-yellow-800"
              : item.TypeOrder === "Success"
              ? "bg-green-100 text-green-800"
              : item.TypeOrder === "Rejected"
              ? "bg-red-100 text-red-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {getOrderTypeTranslation(item.TypeOrder)}
        </span>
      </td>

      <td className="px-6 py-4">
        <div className="flex justify-center items-center gap-3">
          <button
            className="text-gray-400 hover:text-green-600 transition-colors"
            onClick={() => {
              dispatch(
                openModal({
                  name: "ShowPropertyDetails",
                  product: item,
                })
              );
            }}
          >
            <Eye size={20} className="stroke-current" />
          </button>

          <button
            className="text-gray-400 hover:text-blue-600 transition-colors"
            onClick={() => {
              dispatch(
                openModal({
                  name: "EditOrderSales",
                  product: item,
                })
              );
            }}
          >
            <Pencil size={20} className="stroke-current" />
          </button>

          <button
            onClick={() =>
              dispatch(
                openModal({
                  name: "DeleteOrder",
                  product: {
                    ...item,
                    property: { ...property },
                  },
                  type: "PurchaseOrders",
                })
              )
            }
            className="text-gray-400 hover:text-red-600 transition-colors"
          >
            <Trash2 size={20} className="stroke-current" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default SalesTableBody;