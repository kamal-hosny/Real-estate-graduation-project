
import { FaDollarSign, FaHome, FaKey, FaShoppingCart, FaUser } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const routes = [
    {
        name: "الصفحه الرئسيه",
        link: "/dashboard/",
        icon: <FaHome />
    },
    {
        name: "طلبات الشراء",
        link: "/dashboard/purchase-requests",
        icon: <FaShoppingCart />
    },
    {
        name: "طلبات الإيجار",
        link: "/dashboard/rental-requests",
        icon: <FaKey />
    },
    {
        name: "طلبات البيع",
        link: "/dashboard/sales-requests",
        icon: <FaDollarSign />
    },
    {
        name: "المستخدمين",
        link: "/dashboard/users",
        icon: <FaUser />
    },
]

const HeaderHorizontal = () => {
  return (
    <div className='bg-blue-900 min-h-screen p-2 border-e-2 border-[#e5e5e5] '>
        <ul className='flex flex-col gap-4 mt-2'>
            {routes.map((x, index) => (
                <NavLink key={index} to={x.link} className=' text-white hover:bg-white hover:text-blue-900 active:bg-white active:text-blue-900 p-2 rounded-md'>
                    <li>
                        <div className="icon">
                        {x.icon}
                        </div>
                    </li>
                </NavLink>
            ))}
        </ul>
    </div>
  )
}

export default HeaderHorizontal