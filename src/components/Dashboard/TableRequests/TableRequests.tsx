
import TableBody from "./TableBody";


interface dataTable {
  id: number;
  TypeOrder: string;
  created_at: string;
  userToken: string;
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


const TableRequests = ({ data  }: { data: dataTable[] }) => {

 

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
          {
          data.map((property, index) => (
    <TableBody key={property.id} item={property} index={index}/>
          ))}
        </tbody>
      </table>

      {data.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">لا توجد طلبات شراء حاليا</p>
        </div>
      )}
    </div>
  );
};

export default TableRequests;
