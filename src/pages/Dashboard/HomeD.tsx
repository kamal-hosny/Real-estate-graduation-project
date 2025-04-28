// External libraries
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import {
  FaBuilding,
  FaChartPie,
  FaDollarSign,
  FaKey,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";

// Internal components
import LastUsers from "../../components/Dashboard/LastUsers";

// Store hooks and actions
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getAllProperties } from "../../store/property/act/actGetAllProperties";

// Custom hooks
import { useGetPurchaseOrders } from "../../Hooks/Dashboard/useGetPurchaseOrders";
import { useGetRentalOrders } from "../../Hooks/Dashboard/useGetRentalOrders";
import { useGetSalesOrders } from "../../Hooks/Dashboard/useGetSalesOrders";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const HomeD = () => {
  // Hooks and state
  const { t } = useTranslation("");
  const dispatch = useAppDispatch();
  
  // Selectors
  const userLength = useAppSelector((state) => state?.user?.records?.length);
  const propertyLength = useAppSelector(
    (state) => state?.property?.records?.$values?.length
  );

  // Custom hooks for data fetching
  const { properties: SalesOrders } = useGetSalesOrders();
  const { properties: PurchaseOrders } = useGetPurchaseOrders();
  const { properties: RentalOrders } = useGetRentalOrders();

  // Stats data configuration
  const statsData = [
    {
      id: 1,
      title: t("homeD.stats.salesOrders.title"),
      description: t("homeD.stats.salesOrders.description"),
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
      title: t("homeD.stats.purchaseOrders.title"),
      description: t("homeD.stats.purchaseOrders.description"),
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
      title: t("homeD.stats.rentalOrders.title"),
      description: t("homeD.stats.rentalOrders.description"),
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
      title: t("homeD.stats.users.title"),
      description: t("homeD.stats.users.description"),
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
      title: t("homeD.stats.properties.title"),
      description: t("homeD.stats.properties.description"),
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

  // Chart data configuration
  const chartData = {
    labels: [
      t("homeD.chart.labels.purchaseOrders"),
      t("homeD.chart.labels.salesOrders"),
      t("homeD.chart.labels.rentalOrders"),
    ],
    datasets: [
      {
        data: [
          SalesOrders?.length || 0,
          PurchaseOrders?.length || 0,
          RentalOrders?.length || 0,
        ],
        backgroundColor: ["#4B9EFA", "#34D399", "#FBBF24"],
        hoverBackgroundColor: ["#6BB5FF", "#4EE4A5", "#FFD147"],
        borderWidth: 0,
      },
    ],
  };

  // Chart options configuration
  const centerText = {
    id: "centerText",
    beforeDatasetsDraw(chart: ChartJS<"doughnut">) {
      const { ctx, data } = chart;
      ctx.save();
      ctx.font = "bolder 20px Tajawal";
      ctx.textAlign = "center";
      ctx.fillStyle = "#4B5563";
      ctx.fillText(
        t("homeD.chart.centerText.totalOrders"),
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y - 10
      );
      ctx.font = "20px Tajawal";
      const total = data.datasets[0].data.reduce((a: number, b: number | null) => a + (b || 0), 0);
      ctx.fillText(
        total.toString(),
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y + 10
      );
    },
  };

  const options = {
    cutout: "70%",
    plugins: {
      legend: {
        position: "bottom" as const,
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
  } as const;

  // Fetch properties on component mount
  useEffect(() => {
    dispatch(getAllProperties());
  }, [dispatch]);

  return (
    <div className="p-6 w-full h-full bg-gray-50">
      {/* Header Section */}
      <div className="mb-8 text-start">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {t("homeD.welcomeTitle")}
        </h1>
        <p className="text-gray-600">{t("homeD.welcomeDescription")}</p>
      </div>

      {/* Stats Cards Grid */}
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
                {t("homeD.details")}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Chart and Last Users Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        {/* Chart Component */}
        <div className="bg-[#f4f7fa] p-6 rounded-lg shadow-md border border-gray-200 h-full">
          <div className="flex items-center gap-2 mb-4">
            <FaChartPie className="text-gray-800 text-xl" />
            <h2 className="text-xl font-bold text-gray-800 text-right">
              {t("homeD.chart.title")}
            </h2>
          </div>
          <div className="relative doughnut-container flex items-center justify-center">
            <div className="max-w-96">
              <Doughnut
                data={chartData}
                options={options}
                plugins={[centerText]}
              />
            </div>
          </div>
        </div>

        {/* Last Users Component */}
        <LastUsers />
      </div>
    </div>
  );
};

export default HomeD;