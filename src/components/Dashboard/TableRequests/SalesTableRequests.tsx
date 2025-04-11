import PurchaseTableBody from "./SalesTableBody";

// تعريف نوع البيانات للـ property
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
  const propertiesArray = Array.isArray(properties)
    ? properties
    : properties?.$values || [];

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <table className="w-full text-center">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-sm font-semibold text-gray-500 text-center">
              #
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-500 text-center">
              العقار
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-500 text-center">
              النوع
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-500 text-center">
              السعر
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-500 text-center">
              المستخدم
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-500 text-center">
              صور
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-500 text-center">
              نوع الطلب
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-500 text-center">
              حالة الطلب
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-500 text-center">
              الإجراءات
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {propertiesArray.map((item: DataP, index: number) => (
            <PurchaseTableBody key={item.id} item={item} index={index}  />
          ))}
        </tbody>
      </table>

      {propertiesArray.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">لا توجد طلبات البيع حاليا</p>
        </div>
      )}
    </div>
  );
};

export default SalesTableRequests;