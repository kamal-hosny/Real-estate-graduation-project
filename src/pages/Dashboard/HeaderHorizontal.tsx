import { FaDollarSign, FaHome, FaKey, FaShoppingCart, FaUser } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const HeaderHorizontal = () => {
  const { t } = useTranslation(""); 

  const routes = [
    {
      name: t("headerHorizontal.routes.home"),
      link: "/dashboard/",
      icon: <FaHome />,
    },
    {
      name: t("headerHorizontal.routes.purchaseRequests"),
      link: "/dashboard/purchase-requests",
      icon: <FaShoppingCart />,
    },
    {
      name: t("headerHorizontal.routes.rentalRequests"),
      link: "/dashboard/rental-requests",
      icon: <FaKey />,
    },
    {
      name: t("headerHorizontal.routes.salesRequests"),
      link: "/dashboard/sales-requests",
      icon: <FaDollarSign />,
    },
    {
      name: t("headerHorizontal.routes.users"),
      link: "/dashboard/users",
      icon: <FaUser />,
    },
  ];

  return (
    <div className='bg-blue-900 min-h-screen p-2 border-e-2 border-[#e5e5e5]'>
      <ul className='flex flex-col gap-4 mt-2'>
        {routes.map((x, index) => (
          <NavLink
            key={index}
            to={x.link}
            className='text-white hover:bg-white hover:text-blue-900 active:bg-white active:text-blue-900 p-2 rounded-md'
          >
            <li className="flex items-center gap-2">
              <div className="icon">{x.icon}</div>
            </li>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default HeaderHorizontal;