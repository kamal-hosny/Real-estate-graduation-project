import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getOneUser } from "../../../store/user/act/actGetOneUser";
import { formatCurrency, textSlicer } from "../../../utils";
import { Eye, Pencil, Trash2, User, UserRound } from "lucide-react";
import { openModal } from "../../../store/modal/modalSlice";
import Images from "../../ui/Images";
import { Link } from "react-router-dom";

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

const TableBody = ({ item, index }: dataP) => {
  const dispatch = useAppDispatch();
  const { record: user } = useAppSelector((state) => state.user);

  const getUserData = (id: string) => {
    if (id) {
      dispatch(getOneUser({ id }));
    }
  };

  useEffect(() => {
    if (item.property.userId) {
      getUserData(item.property.userId);
    }
  }, [item.property.userId]);

  const property = item.property;
  const images = (item?.property?.propertyImages as any).$values;

  console.log(property);
  

  return (
    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 text-sm font-medium text-gray-700">
        {index + 1}
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-col gap-1">
          <span className="font-medium text-gray-900 text-start">
            {textSlicer(property.propertyTitle, 30)}
          </span>
          <span className="text-xs text-gray-500 text-start">
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
                alt={user.fullName}
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-xs text-blue-600">
                  <UserRound />
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">
              {user?.fullName || "غير معروف"}
            </span>
            <span className="text-xs text-gray-500">
              {user?.phoneNumber || "غير متوفر"}
            </span>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-600">
        {item?.property?.propertyImages ? (
          <Images images={images} />
        ) : (
          <span>لا يوجد صور</span>
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
          {property.status}
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
          {item.TypeOrder}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex justify-center items-center gap-3">
          <button className="text-gray-400 cursor-pointer hover:text-purple-600 transition-colors">
            <User
              onClick={() => {
                dispatch(
                  openModal({
                    name: "ShowUserDetails",
                    product: user,
                  })
                );
              }}
              size={20}
              className="stroke-current"
            />
          </button>

          <Link
            className="text-gray-400 cursor-pointer hover:text-green-600 transition-colors"
            to={`/singleProperty/${property?.propertyId}`}
          >
            <Eye size={20} className="stroke-current" />
          </Link>

          <button
            className="text-gray-400 cursor-pointer hover:text-blue-600 transition-colors"
            onClick={() => {
              dispatch(
                openModal({
                  name: "EditOrder",
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
                })
              )
            }
            className="text-gray-400 cursor-pointer hover:text-red-600 transition-colors"
          >
            <Trash2 size={20} className="stroke-current" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableBody;
