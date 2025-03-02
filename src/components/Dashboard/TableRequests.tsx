import { Property } from "../../types/product.types"
import { Pencil, Trash2, UserRound } from "lucide-react";
import { formatCurrency } from "../../utils";
import { useAppDispatch } from "../../store/hooks";
import { openModal } from "../../store/modal/modalSlice";

const TableRequests = ({data}: {data: Property[]}) => {
  const dispatch = useAppDispatch()
  
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
    <table className="w-full text-center">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-4 text-sm font-semibold text-gray-500 text-center">#</th>
          <th className="px-6 py-4 text-sm font-semibold text-gray-500 text-center">العقار</th>
          <th className="px-6 py-4 text-sm font-semibold text-gray-500 text-center">النوع</th>
          <th className="px-6 py-4 text-sm font-semibold text-gray-500 text-center">السعر</th>
          <th className="px-6 py-4 text-sm font-semibold text-gray-500 text-center">الشركة</th>
          <th className="px-6 py-4 text-sm font-semibold text-gray-500 text-center">الحالة</th>
          <th className="px-6 py-4 text-sm font-semibold text-gray-500 text-center">الإجراءات</th>
        </tr>
      </thead>
      
      <tbody className="divide-y divide-gray-200">
        {data.map((property, index) => (
          <tr key={property.id} className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4 text-sm font-medium text-gray-700">{index + 1}</td>
            
            <td className="px-6 py-4 ">
              <div className="flex flex-col gap-1 ">
                <span className="font-medium text-gray-900">{property.title}</span>
                <span className="text-xs text-gray-500">{property.location.address}</span>
              </div>
            </td>
            
            <td className="px-6 py-4 text-sm text-gray-600">{property.type}</td>
            
            <td className="px-6 py-4 text-sm font-semibold text-gray-900">
              { formatCurrency(property.price || 0)}
            </td>
            
            <td className="px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  {property.company.avatar ? (
                    <img 
                      src={property.company.avatar}
                      className="w-10 h-10 rounded-full object-cover"
                      alt={property.company.name}
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-xs text-blue-600"><UserRound /></span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{property.company.name}</span>
                  <span className="text-xs text-gray-500">{property.company.phone}</span>
                </div>
              </div>
            </td>
            
            <td className="px-6 py-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                property.status === 'For Sale' ? 'bg-green-100 text-green-800' :
                property.status === 'Sold' ? 'bg-red-100 text-red-800' :
                property.status === 'For Rent' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {property.status}
              </span>
            </td>
            
            <td className="px-6 py-4">
              <div className="flex justify-center items-center gap-4">
                <button  className="text-gray-400 hover:text-blue-600 transition-colors">
                  <Pencil size={20} className="stroke-current" />
                </button>
                <button onClick={() => dispatch(openModal({
  name: "DeleteOrder",
  product: {
    ...property,
    createdAt: property.createdAt.toISOString() 
  }
}))} className="text-gray-400 hover:text-red-600 transition-colors">
                  <Trash2 size={20} className="stroke-current" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {data.length === 0 && (
      <div className="text-center py-12">
        <p className="text-gray-500">لا توجد طلبات شراء حاليا</p>
      </div>
    )}
  </div>
  )
}

export default TableRequests