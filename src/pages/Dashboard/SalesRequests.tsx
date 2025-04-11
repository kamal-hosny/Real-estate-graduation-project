
import PurchaseTableRequests from "../../components/Dashboard/TableRequests/SalesTableRequests.tsx";
import LottieHandler from "../../components/common/feedback/LottieHandler/LottieHandler.tsx";
import { useGetSalesOrders } from "../../Hooks/Dashboard/useGetSalesOrders.ts";

const GetSalesOrders = () => {
  const { properties, loading, error } = useGetSalesOrders();
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

  return (
    <div className="space-y-6 p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">طلبات البيع</h2>
      </div>
      <PurchaseTableRequests properties={properties}   />
    </div>
  );
};

export default GetSalesOrders;