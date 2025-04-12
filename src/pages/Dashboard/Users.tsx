import { FaPhone, FaWhatsapp, FaEnvelope, FaSearch, FaFileExcel } from 'react-icons/fa'; // أضفت FaFileExcel
import { Trash2, UserRound, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAllUser } from '../../store/user/act/actGetAllUser';
import { convertDate } from '../../utils/dateFun';
import { openModal } from '../../store/modal/modalSlice';
import LottieHandler from '../../components/common/feedback/LottieHandler/LottieHandler';
import { exportToExcel } from '../../utils/excel/usersSheet';

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
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useAppDispatch();
  const { records, loading, error } = useAppSelector((state) => state.user);
  const { token } = useAppSelector((state) => state.auth);
  const users: User[] = records.$values || [];

  useEffect(() => {
    dispatch(getAllUser(token || ""));
  }, [dispatch, token]);

  const formatPhoneNumberForWhatsApp = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.startsWith('+') ? cleaned : `+20${cleaned}`;
  };



  const filteredUsers = users.filter(user =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phoneNumber.includes(searchTerm)
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  return (
    <div className="p-8 bg-gray-100 min-h-screen font-sans">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-right tracking-tight">
        قائمة المستخدمين
      </h1>

      {/* Search, Filter & Export Section */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-10">
        {/* Search Bar */}
        <div className="relative flex-1 md:max-w-lg">
          <input
            type="text"
            placeholder="ابحث عن مستخدم..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-12 pl-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500 bg-white shadow-sm text-right transition-all duration-300 ease-in-out"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            )}
          </div>
          <FaSearch className="text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
        </div>

        {/* Sort & Export Buttons */}
        <div className="flex items-center gap-4">
          {/* Sort Filter */}
          <div className="flex items-center gap-3 bg-white py-2.5 px-4 rounded-xl border border-gray-200 shadow-sm">
            <label className="text-sm font-medium text-gray-600 whitespace-nowrap">ترتيب حسب:</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
              className="text-right pr-3 pl-8 py-1.5 bg-transparent border-none appearance-none focus:outline-none focus:ring-0 cursor-pointer bg-select-chevron bg-no-repeat bg-left"
              style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'%236B7280\'%3E%3Cpath d=\'M12 15.0006L7.7573 10.758L9.1715 9.34375L12 12.1722L14.8284 9.34375L16.2426 10.758L12 15.0006Z\'/%3E%3C/svg%3E")'}}
            >
              <option value="desc">الأحدث أولاً</option>
              <option value="asc">الأقدم أولاً</option>
            </select>
          </div>

          {/* Export Button */}
          <button
            onClick={() => exportToExcel(users)}
            className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-xl hover:bg-green-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
          >
            <FaFileExcel className="text-lg" />
            تصدير إلى Excel
          </button>
        </div>
      </div>

      {loading === "pending" && <p className="text-center text-gray-600 text-lg">جاري التحميل...</p>}
      {error && <p className="text-center text-red-600 text-lg">خطأ: {error}</p>}
      {loading !== "pending" && !error && sortedUsers.length === 0 && (
              <div className=" flex justify-center items-center ">
              <LottieHandler type="userNotFound" message={searchTerm ? (<p className='text-black'>لا توجد نتائج مطابقة للبحث</p>) : (<p className='text-black'>لا توجد بيانات للمستخدمين</p>)} />
            </div>
      )}

      {loading !== "pending" && !error && sortedUsers.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedUsers.map((user, index) => (
            <div
              key={user.id}
              className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 p-6 hover:-translate-y-1"
            >
              <span className="absolute -bottom-24 start-3 text-[200px] font-bold text-gray-100">
                {index + 1}
              </span>

              <div className="flex items-start gap-4">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.fullName}
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center">
                    <span className="text-blue-600"><UserRound className="w-16 h-16" /></span>
                  </div>
                )}

                <div className="flex-1 text-right">
                  <h2 className="text-xl capitalize font-semibold text-gray-800">{user.fullName}</h2>
                  <p className="text-gray-600 mt-1">{user.email}</p>
                  <p className="text-gray-600">{user.phoneNumber}</p>
                  <p className="text-sm text-gray-500 mt-2 flex flex-col">
                    <span>:تاريخ التسجيل</span>
                    <span>{user.createdAt && convertDate(user.createdAt)}</span>
                  </p>
                </div>
              </div>

              <div className="flex justify-between gap-3 mt-6 border-t pt-4">
                <div>
                  <button
                    onClick={() =>
                      dispatch(
                        openModal({
                          name: "DeleteUser",
                          product: { user },
                        })
                      )
                    }
                    className="p-2 bg-red-100 relative z-[1] text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    <Trash2 />
                  </button>
                </div>
                <div className="flex gap-3 items-center z-[1]">
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Users;