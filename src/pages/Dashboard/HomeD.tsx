import {
  FaShoppingCart,
  FaDollarSign,
  FaKey,
  FaUser,
  FaBuilding,
  FaChartPie,
  FaUsers,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const HomeD = () => {
  const statsData = [
    {
      id: 1,
      title: "طلبات الشراء",
      description: "عدد الطلبات النشطة حالياً",
      icon: FaShoppingCart,
      count: 15,
      link: "/dashboard/purchase-requests",
      color: {
        bg: "bg-blue-100",
        text: "text-blue-600",
        hover: "hover:bg-blue-200",
      },
    },
    {
      id: 2,
      title: "طلبات البيع",
      description: "العروض المقدمة حالياً",
      icon: FaDollarSign,
      count: 8,
      link: "/dashboard/sales-requests",
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
      count: 5,
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
      count: 235,
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
      count: 89,
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
        data: [15, 8, 5],
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

  // بيانات وهمية لآخر المستخدمين
  const lastUsers = [
    {
      id: 1,
      name: "أحمد محمد",
      joinDate: "2025-04-05",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "سارة علي",
      joinDate: "2025-04-04",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: 3,
      name: "خالد عبدالله",
      joinDate: "2025-04-03",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: 4,
      name: "فاطمة حسن",
      joinDate: "2025-04-02",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      id: 5,
      name: "محمود صالح",
      joinDate: "2025-04-01",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    },
  ];

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
        <div className="bg-[#f4f7fa] p-6 rounded-lg shadow-md border border-gray-200 h-fit">
          <div className="flex items-center justify-between mb-4">
            <span className="flex gap-2 items-center">
              <FaUsers className="text-gray-800 text-xl" />
              <h2 className="text-xl font-bold text-gray-800 text-right">
                آخر المستخدمين
              </h2>
            </span>

            <Link
              to={"/dashboard/users"}
              className={`bg-blue-100 text-blue-600 px-4 py-2 text-sm rounded-md hover:bg-blue-200 transition-colors duration-300`}
            >
              عرض المزيد
            </Link>
          </div>
          <div className="space-y-4">
            {lastUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-4 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 text-right">
                  <h3 className="text-sm font-semibold text-gray-800">
                    {user.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    تاريخ التسجيل: {user.joinDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeD;
