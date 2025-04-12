import { useGetRentalOrders } from "../../Hooks/Dashboard/useGetRentalOrders.ts";
import TableRequests from "../../components/Dashboard/TableRequests/TableRequests.tsx";
import LottieHandler from "../../components/common/feedback/LottieHandler/LottieHandler.tsx";

const SalesRequests = () => {
  const { properties, loading, error } = useGetRentalOrders();

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
    <div className="space-y-6 p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">طلبات البيع</h2>
      </div>
      <TableRequests data={properties} />
    </div>
  );
};

export default SalesRequests;