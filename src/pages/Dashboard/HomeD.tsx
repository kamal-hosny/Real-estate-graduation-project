import {
  FaShoppingCart,
  FaDollarSign,
  FaKey,
  FaUser,
  FaBuilding,
  FaChartPie,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import LastUsers from "../../components/Dashboard/LastUsers";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import { getAllProperties } from "../../store/property/act/actGetAllProperties";
import { useGetSalesOrders } from "../../Hooks/Dashboard/useGetSalesOrders.ts";
import { useGetPurchaseOrders } from "../../Hooks/Dashboard/useGetPurchaseOrders.ts";
import { useGetRentalOrders } from "../../Hooks/Dashboard/useGetRentalOrders.ts";
ChartJS.register(ArcElement, Tooltip, Legend);

const HomeD = () => {
  const dispatch = useAppDispatch()
  const userLength = useAppSelector((state) => state?.user?.records?.$values?.length)
  const propertyLength = useAppSelector((state) => state?.property?.records?.$values?.length)

  const { properties : SalesOrders } = useGetSalesOrders();
  const { properties : PurchaseOrders } = useGetPurchaseOrders()
  const { properties : RentalOrders } = useGetRentalOrders()


  const statsData = [
    {
      id: 1,
      title: "طلبات البيع",
      description: "العروض المقدمة حالياً",
      icon: FaDollarSign,
      count: SalesOrders?.length || 0,
      link: "/dashboard/sales-requests",
      color: {
        bg: "bg-blue-100",
        text: "text-blue-600",
        hover: "hover:bg-blue-200",
      },
    },
    {
      id: 2,
      title: "طلبات الشراء",
      description: "عدد الطلبات النشطة حالياً",
      icon: FaShoppingCart,
      count: PurchaseOrders?.length || 0,
      
      link: "/dashboard/purchase-requests",
      color: {
        bg: "bg-green-100",
        text: "text-green-600",
        hover: "hover:bg-green-200",
      },
    },
    {
      id: 3,
      title: "طلبات الإيجار",
      description: "العقارات المؤجرة حالياً",
      icon: FaKey,
      count: RentalOrders?.length || 0,
      link: "/dashboard/rental-requests",
      color: {
        bg: "bg-orange-100",
        text: "text-orange-600",
        hover: "hover:bg-orange-200",
      },
    },
    {
      id: 4,
      title: "عدد المستخدمين",
      description: "المستخدمين المسجلين في الموقع",
      icon: FaUser,
      count: userLength || 0,
      link: "/dashboard/users",
      color: {
        bg: "bg-purple-100",
        text: "text-purple-600",
        hover: "hover:bg-purple-200",
      },
    },
    {
      id: 5,
      title: "العقارات المتاحة",
      description: "عدد العقارات المتاحة حالياً",
      icon: FaBuilding,
      count: propertyLength || 0,
      link: "/properties",
      color: {
        bg: "bg-red-100",
        text: "text-red-600",
        hover: "hover:bg-red-200",
      },
    },
  ];

  const chartData = {
    labels: ["طلبات الشراء", "طلبات البيع", "طلبات الإيجار"],
    datasets: [
      {
        data: [PurchaseOrders?.length || 0, SalesOrders?.length || 0, RentalOrders?.length || 0],
        backgroundColor: ["#4B9EFA", "#34D399", "#FBBF24"],
        hoverBackgroundColor: ["#6BB5FF", "#4EE4A5", "#FFD147"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "70%",
    plugins: {
      legend: {
        position: "bottom",
        rtl: true,
        labels: {
          font: {
            family: "Tajawal, sans-serif",
          },
        },
      },
      tooltip: {
        rtl: true,
        bodyFont: {
          family: "Tajawal, sans-serif",
        },
      },
    },
  };

  const centerText = {
    id: "centerText",
    beforeDatasetsDraw(chart: any) {
      const { ctx, data } = chart;
      ctx.save();
      ctx.font = "bolder 20px Tajawal";
      ctx.textAlign = "center";
      ctx.fillStyle = "#4B5563";
      ctx.fillText(
        "إجمالي الطلبات",
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y - 10
      );
      ctx.font = "20px Tajawal";
      ctx.fillText(
        data.datasets[0].data.reduce((a: any, b: any) => a + b, 0),
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y + 10
      );
    },
  };

useEffect(() => {
  dispatch(getAllProperties())
}, [dispatch])

  return (
    <div className="p-6 w-full h-full bg-gray-50">
      <div className="mb-8 text-right">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          مرحبًا بك في لوحة التحكم
        </h1>
        <p className="text-gray-600">
          هنا يمكنك متابعة جميع معاملاتك العقارية وإدارتها بسهولة
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {statsData.map((item) => (
          <div
            key={item.id}
            className="bg-[#f4f7fa] rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`${item.color.bg} p-3 rounded-full`}>
                <item.icon className={`${item.color.text} text-2xl`} />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                {item.title}
              </h2>
            </div>
            <p className="text-gray-600 mb-4">{item.description}</p>
            <div className="flex justify-between items-center">
              <span className={`text-3xl font-bold ${item.color.text}`}>
                {item.count}
              </span>
              <Link
                to={item.link}
                className={`${item.color.bg} ${item.color.text} px-4 py-2 rounded-md ${item.color.hover} transition-colors duration-300`}
              >
                التفاصيل
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 ">
        {/* Chart */}
        <div className="bg-[#f4f7fa] p-6 rounded-lg shadow-md border border-gray-200 h-full">
          <div className="flex items-center gap-2 mb-4 ">
            <FaChartPie className="text-gray-800 text-xl" />
            <h2 className="text-xl font-bold text-gray-800 text-right">
              توزيع الطلبات
            </h2>
          </div>
          <div className="relative doughnut-container flex items-center justify-center ">
            <div className="max-w-96">
              <Doughnut
                data={chartData}
                options={options as any}
                plugins={[centerText]}
              />
            </div>
          </div>
        </div>

        {/* Last users */}
  <LastUsers />


      </div>
    </div>
  );
};

export default HomeD;
