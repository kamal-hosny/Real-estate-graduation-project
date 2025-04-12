import { useState } from "react";
import { useGetRentalOrders } from "../../Hooks/Dashboard/useGetRentalOrders.ts";
import TableRequests from "../../components/Dashboard/TableRequests/TableRequests.tsx";
import LottieHandler from "../../components/common/feedback/LottieHandler/LottieHandler.tsx";
import { exportToExcel } from "../../utils/excel/purchaseRentalSheet.ts";
import { FaFileExcel } from "react-icons/fa";

const SalesRequests = () => {
  const { properties, loading, error } = useGetRentalOrders();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  // search & sort & filter
  const filteredData = properties
    ?.filter((item) =>
      item.property?.propertyTitle?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    ?.sort((a, b) => {
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

  if (error) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <LottieHandler type="error" message={error} />
      </div>
    );
  }
  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <LottieHandler type="loading" />
      </div>
    );
  }

  console.log(properties);
  

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
    <div className="flex flex-col justify-between gap-4 mb-6">
      <h2 className="text-2xl font-bold text-gray-900">طلبات الإيجار</h2>
      <div className="flex gap-4 items-center justify-between">
        <input
          type="text"
          placeholder="ابحث عن طلب..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
     <span className="flex items-center gap-4">
     <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="newest">الأحدث أولاً</option>
          <option value="oldest">الأقدم أولاً</option>
        </select>
        <button
          onClick={() => exportToExcel(filteredData || [])}
          className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-xl hover:bg-green-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
        >
          <FaFileExcel className="text-lg" />
          تصدير إلى Excel
        </button>
     </span>
      </div>
    </div>

    <TableRequests data={filteredData} />
  </div>
  );
};

export default SalesRequests;