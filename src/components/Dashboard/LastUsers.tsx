import { FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEffect } from 'react';
import { getAllUser } from '../../store/user/act/actGetAllUser';
import { convertDate } from '../../utils/dateFun';

const LastUsers = () => {
  const dispatch = useAppDispatch();
  const { records, loading, error } = useAppSelector((state) => state.user);
  const {token} = useAppSelector((state) => state.auth);


  useEffect(() => {
    dispatch(getAllUser(token || ""));
  }, [dispatch]);

 
  const lastFiveUsers: any[] = records 
    ? records
        .slice(-5)
    : [];


  if (loading === "pending") {
    return <div className="text-center p-6"></div>;
  }

  if (error) {
    return <div className="text-center p-6 text-red-500">خطأ: {error}</div>;
  }

  return (
    <div className="bg-[#f4f7fa] p-6 rounded-lg shadow-md border border-gray-200 h-fit">
      <div className="flex items-center justify-between mb-4">
        <span className="flex gap-2 items-center">
          <FaUsers className="text-gray-800 text-xl" />
          <h2 className="text-xl font-bold text-gray-800 text-right">
            آخر المستخدمين
          </h2>
        </span>

        <Link
          to="/dashboard/users"
          className="bg-blue-100 text-blue-600 px-4 py-2 text-sm rounded-md hover:bg-blue-200 transition-colors duration-300"
        >
          عرض المزيد
        </Link>
      </div>
      <div className="space-y-4">
        {lastFiveUsers.length > 0 ? (
          lastFiveUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-4 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
            >
              <img
                src={user.image || "https://res.cloudinary.com/dizj9rluo/image/upload/v1744113485/defaultPerson_e7w75t.jpg"} 
                alt={user.fullName}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1 text-right">
                <h3 className="text-sm font-semibold text-gray-800">
                  {user.fullName || "غير معروف"}
                </h3>
                <p className="text-xs text-gray-500 flex flex-col">
                  <span>:تاريخ التسجيل</span> <span>{convertDate(user.createdAt)}</span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">لا يوجد مستخدمين لعرضهم</p>
        )}
      </div>
    </div>
  );
};

export default LastUsers;