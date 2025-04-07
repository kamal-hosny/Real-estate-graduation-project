import { FaPhone, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { format } from 'date-fns';
import {  UserRound } from "lucide-react";
import { useState } from 'react';

const users = [
    {
      id: 1,
      name: 'محمد أحمد',
      email: 'mohamed.ahmed@example.com',
      phone: '+201234567890',
      createdAt: '2024-03-15',
      image: ''
    },
    {
      id: 2,
      name: 'فاطمة حسن',
      email: 'fatima.hassan@example.com',
      phone: '+201098765432',
      createdAt: '2024-02-28',
      image: 'https://via.placeholder.com/150/cccccc/000000?text=FH'
    },
    {
      id: 3,
      name: 'علي محمود',
      email: 'ali.mahmoud@example.com',
      phone: '+201112223344',
      createdAt: '2024-01-10',
      image: 'https://via.placeholder.com/150/cccccc/000000?text=AM'
    },
    {
      id: 4,
      name: 'أمينة السيد',
      email: 'amina.elsayed@example.com',
      phone: '+201554443322',
      createdAt: '2024-03-01',
      image: 'https://via.placeholder.com/150/cccccc/000000?text=AS'
    },
    {
      id: 5,
      name: 'خالد عبد الرحمن',
      email: 'khaled.abdelrahman@example.com',
      phone: '+201667778888',
      createdAt: '2024-02-15',
      image: 'https://via.placeholder.com/150/cccccc/000000?text=KA'
    },
    {
      id: 6,
      name: 'نورا مصطفى',
      email: 'nora.mostafa@example.com',
      phone: '+201923456789',
      createdAt: '2024-01-25',
      image: 'https://via.placeholder.com/150/cccccc/000000?text=NM'
    },
    {
      id: 7,
      name: 'ياسر نبيل',
      email: 'yasser.nabil@example.com',
      phone: '+201678905432',
      createdAt: '2024-03-10',
      image: 'https://via.placeholder.com/150/cccccc/000000?text=YN'
    },
    {
      id: 8,
      name: 'رحمة علي',
      email: 'rahma.ali@example.com',
      phone: '+201432109876',
      createdAt: '2024-02-05',
      image: 'https://via.placeholder.com/150/cccccc/000000?text=RA'
    },
    {
      id: 9,
      name: 'عمرو جمال',
      email: 'amr.gamal@example.com',
      phone: '+201556677889',
      createdAt: '2024-01-15',
      image: 'https://via.placeholder.com/150/cccccc/000000?text=AG'
    },
    {
      id: 10,
      name: 'إسراء وائل',
      email: 'esraa.wael@example.com',
      phone: '+201765432109',
      createdAt: '2024-03-05',
      image: 'https://via.placeholder.com/150/cccccc/000000?text=EW'
    },
    {
      id: 11,
      name: 'طارق فؤاد',
      email: 'tarek.fouad@example.com',
      phone: '+201889977665',
      createdAt: '2024-02-20',
      image: 'https://via.placeholder.com/150/cccccc/000000?text=TF'
    },
    {
      id: 12,
      name: 'سلمى كمال',
      email: 'salma.kamal@example.com',
      phone: '+201712345678',
      createdAt: '2024-01-05',
      image: 'https://via.placeholder.com/150/cccccc/000000?text=SK'
    },
    {
      id: 13,
      name: 'مصطفى حسن',
      email: 'mostafa.hassan@example.com',
      phone: '+201600000000',
      createdAt: '2024-03-20',
      image: 'https://via.placeholder.com/150/cccccc/000000?text=MH'
    },
    {
      id: 14,
      name: 'هبة أحمد',
      email: 'heba.ahmed@example.com',
      phone: '+201733334444',
      createdAt: '2024-02-10',
      image: 'https://via.placeholder.com/150/cccccc/000000?text=HA'
    },
    {
      id: 15,
      name: 'وليد خالد',
      email: 'waleed.khaled@example.com',
      phone: '+201844445555',
      createdAt: '2024-01-20',
      image: 'https://via.placeholder.com/150/cccccc/000000?text=WK'
    },
    {
      id: 16,
      name: 'منى صلاح',
      email: 'mona.salah@example.com',
      phone: '+201955556666',
      createdAt: '2024-03-12',
      image: 'https://via.placeholder.com/150/cccccc/000000?text=MS'
    },
    {
      id: 17,
      name: 'أحمد عصام',
      email: 'ahmed.essam@example.com',
      phone: '+201766667777',
      createdAt: '2024-02-25',
      image: 'https://via.placeholder.com/150/cccccc/000000?text=AE'
    },
    {
      id: 18,
      name: 'دينا رامي',
      email: 'dina.ramy@example.com',
      phone: '+201877778888',
      createdAt: '2024-01-30',
      image: 'https://via.placeholder.com/150/cccccc/000000?text=DR'
    },
    {
      id: 19,
      name: 'ياسين وليد',
      email: 'yassin.waleed@example.com',
      phone: '+201988889999',
      createdAt: '2024-03-08',
      image: 'https://via.placeholder.com/150/cccccc/000000?text=YW'
    },
    {
      id: 20,
      name: 'شيماء عادل',
      email: 'shaimaa.adil@example.com',
      phone: '+201599990000',
      createdAt: '2024-02-18',
      image: 'https://via.placeholder.com/150/cccccc/000000?text=SA'
    }
  ];

const Users = () => {
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');


  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd/MM/yyyy');
  };

   
    const sortedUsers = [...users].sort((a,b) => {
        const dataA = new Date(a.createdAt).getTime();
        const dataB = new Date(b.createdAt).getTime();
        return sortOrder === 'asc' ? dataA - dataB : dataB - dataA 
    })
      return (
        <div className="p-6 bg-gray-50 min-h-screen">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-right">قائمة المستخدمين</h1>
    
       
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
            {sortedUsers.map((user) => (
              <div key={user.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
                <div className="flex items-start gap-4">
                  {user.image ? (
                    <img 
                      src={user.image} 
                      alt={user.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600"><UserRound className='w-16 h-16' /></span>
                    </div>
                  )}
    
                  <div className="flex-1 text-right">
                    <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
                    <p className="text-gray-600 mt-1">{user.email}</p>
                    <p className="text-gray-600">{user.phone}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      تاريخ التسجيل: {formatDate(user.createdAt)}
                    </p>
                  </div>
                </div>
    
                <div className="flex justify-end gap-3 mt-6 border-t pt-4">
                  <a href={`tel:${user.phone}`} className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors" aria-label="اتصال هاتفي">
                    <FaPhone className="text-xl" />
                  </a>
                  <a href={`https://wa.me/${user.phone}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors" aria-label="مراسلة عبر واتساب">
                    <FaWhatsapp className="text-xl" />
                  </a>
                  <a href={`mailto:${user.email}`} className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors" aria-label="إرسال بريد إلكتروني">
                    <FaEnvelope className="text-xl" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    };
    
    export default Users;