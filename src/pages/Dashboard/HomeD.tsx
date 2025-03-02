import { FaShoppingCart, FaDollarSign, FaKey } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HomeD = () => {
  const statsData = [
    {
      id: 1,
      title: 'طلبات الشراء',
      description: 'عدد الطلبات النشطة حالياً',
      icon: FaShoppingCart,
      count: 15,
      link: '/dashboard/purchase-requests',
      color: {
        bg: 'bg-blue-100',
        text: 'text-blue-600',
        hover: 'hover:bg-blue-200'
      }
    },
    {
      id: 2,
      title: 'طلبات البيع',
      description: 'العروض المقدمة حالياً',
      icon: FaDollarSign,
      count: 8,
      link: '/dashboard/sales-requests',
      color: {
        bg: 'bg-green-100',
        text: 'text-green-600',
        hover: 'hover:bg-green-200'
      }
    },
    {
      id: 3,
      title: 'طلبات الإيجار',
      description: 'العقارات المؤجرة حالياً',
      icon: FaKey,
      count: 5,
      link: '/dashboard/rental-requests',
      color: {
        bg: 'bg-orange-100',
        text: 'text-orange-600',
        hover: 'hover:bg-orange-200'
      }
    },
  ];

  return (
    <div className="p-6 w-full h-full">
      <div className="mb-8 text-r">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          مرحبًا بك في لوحة التحكم
        </h1>
        <p className="text-gray-600">
          هنا يمكنك متابعة جميع معاملاتك العقارية وإدارتها بسهولة
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsData.map((item) => (
          <div key={item.id} className="bg-[#f4f7fa] rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className={`${item.color.bg} p-3 rounded-full`}>
                <item.icon className={`${item.color.text} text-2xl`} />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
            </div>
            <p className="text-gray-600 mb-4">{item.description}</p>
            <div className="flex justify-between items-center">
              <span className={`text-3xl font-bold ${item.color.text}`}>{item.count}</span>
              <Link 
                to={item.link}
                className={`${item.color.bg} ${item.color.text} px-4 py-2 rounded-md ${item.color.hover} transition-colors`}
              >
                التفاصيل
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeD;