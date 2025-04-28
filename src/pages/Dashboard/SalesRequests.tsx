// External imports
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaFileExcel } from "react-icons/fa";

// Internal imports
import LottieHandler from "../../components/common/feedback/LottieHandler/LottieHandler.tsx";
import PurchaseTableRequests from "../../components/Dashboard/TableRequests/SalesTableRequests.tsx";
import { useGetSalesOrders } from "../../Hooks/Dashboard/useGetSalesOrders.ts";
import { exportToExcel } from "../../utils/excel/SalesSheet.ts";

const GetSalesOrders = () => {
  // Hooks
  const { t } = useTranslation("");
  const { properties, loading, error } = useGetSalesOrders();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  // Data processing
  const filteredData = properties
    ?.filter((item) =>
      item.property?.propertyTitle?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    ?.sort((a, b) => {
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

  // Error handling
  if (error) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <LottieHandler 
          type="error" 
          message={error} 
        />
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <LottieHandler type="loading" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {t("getSalesOrders.title")}
        </h2>

        <div className="flex gap-4 items-center justify-between">
          <input
            type="text"
            placeholder={t("getSalesOrders.searchPlaceholder")}
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
              <option value="newest">
                {t("getSalesOrders.sortOptions.newestFirst")}
              </option>
              <option value="oldest">
                {t("getSalesOrders.sortOptions.oldestFirst")}
              </option>
            </select>

            <button
              onClick={() => exportToExcel(filteredData || [])}
              className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-xl hover:bg-green-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
            >
              <FaFileExcel className="text-lg" />
              {t("getSalesOrders.exportToExcel")}
            </button>
          </span>
        </div>
      </div>

      <PurchaseTableRequests properties={filteredData} />
    </div>
  );
};

export default GetSalesOrders;