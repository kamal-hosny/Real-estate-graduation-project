import * as XLSX from 'xlsx';
import { convertDate } from '../dateFun';

interface User {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    image?: string;
    createdAt: string;
  }

export const exportToExcel = (users: User[]) => {
    console.log(users);
    
    if (!users){
        return console.error("Not User Found")
    }
    const data = users.map((user, index) => ({
      'عدد المستخدمين': index + 1,
      'الاسم الكامل': user.fullName,
      'البريد الإلكتروني': user.email,
      'رقم الهاتف': user.phoneNumber,
      'تاريخ التسجيل': convertDate(user.createdAt),
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
    XLSX.writeFile(workbook, 'users.xlsx');
  };