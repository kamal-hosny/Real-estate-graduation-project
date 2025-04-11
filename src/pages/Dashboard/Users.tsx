import { FaPhone, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { UserRound } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAllUser } from '../../store/user/act/actGetAllUser';
import { convertDate } from '../../utils/dateFun';

interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  image?: string;
  createdAt: string;
}

const Users = () => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const dispatch = useAppDispatch();
  const { records, loading, error } = useAppSelector((state) => state.user);
  const {token} = useAppSelector((state) => state.auth);
  const users: User[] = records.$values || [];

  useEffect(() => {
    dispatch(getAllUser(token || ""));
  }, [dispatch]);

  const formatPhoneNumberForWhatsApp = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.startsWith('+') ? cleaned : `+20${cleaned}`;
  };

  const sortedUsers = [...users].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-right">قائمة المستخدمين</h1>

      {loading === "pending" && <p className="text-center text-gray-600">جاري التحميل...</p>}
      {error && <p className="text-center text-red-600">خطأ: {error}</p>}
      {loading !== "pending" && !error && sortedUsers.length === 0 && (
        <p className="text-center text-gray-600">لا توجد بيانات للمستخدمين</p>
      )}

      {loading !== "pending" && !error && sortedUsers.length > 0 && (
        <>
          <div className="mb-8 text-right">
            <label className="block mb-2 text-sm font-medium text-gray-700">ترتيب حسب تاريخ التسجيل:</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
              className="border border-gray-300 rounded-lg p-2 w-64"
            >
              <option value="desc">الأحدث أولاً</option>
              <option value="asc">الأقدم أولاً</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedUsers.map((user, index) => (
              <div key={user.id} className="relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
                
                <span className='absolute -bottom-5 start-3 text-9xl font-bold text-[#e5e7eb]'>{index + 1}</span>

                <div className="flex items-start gap-4">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.fullName}
                      className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600"><UserRound className="w-16 h-16" /></span>
                    </div>
                  )}

                  <div className="flex-1 text-right">
                    <h2 className="text-xl font-semibold text-gray-800">{user.fullName}</h2>
                    <p className="text-gray-600 mt-1">{user.email}</p>
                    <p className="text-gray-600">{user.phoneNumber}</p>
                    <p className="text-sm text-gray-500 mt-2 flex flex-col">
                      <span>:تاريخ التسجيل</span>
                      <span>{ user.createdAt && convertDate(user.createdAt) }</span>
                    </p>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6 border-t pt-4">
                  <a
                    href={`tel:${user.phoneNumber}`}
                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                    aria-label="اتصال هاتفي"
                  >
                    <FaPhone className="text-xl" />
                  </a>
                  <a
                    href={`https://wa.me/${formatPhoneNumberForWhatsApp(user.phoneNumber)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                    aria-label="مراسلة عبر واتساب"
                  >
                    <FaWhatsapp className="text-xl" />
                  </a>
                  <a
                    href={`mailto:${user.email}`}
                    className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
                    aria-label="إرسال بريد إلكتروني"
                  >
                    <FaEnvelope className="text-xl" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Users;