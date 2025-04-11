import LottieHandler from "../../components/common/feedback/LottieHandler/LottieHandler.tsx";
import TableRequests from "../../components/Dashboard/TableRequests/TableRequests.tsx";
import { useGetPurchaseOrders } from "../../Hooks/Dashboard/useGetPurchaseOrders.ts";

const PurchaseRequests = () => {
 const { properties, error, loading } = useGetPurchaseOrders()

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
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-900">طلبات الشراء</h2>
    </div>

    <TableRequests data={properties} />
  </div>
  )
}

export default PurchaseRequests