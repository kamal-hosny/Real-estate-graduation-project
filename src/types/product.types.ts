
export type Property = {
  id: string;
  title: string;
  status: Status;
  type: PropertyType;
  price: number;
  description: string;
  createdAt: Date;
  location: {
    address: string;
    city: string;
    link?: string; // رابط خرائط جوجل
    images: string[]; // مصفوفة صور الموقع
  };
  details: {
    beds: number; // عدد الغرف النوم
    baths: number; // عدد الحمامات
    rooms: number; // عدد الغرف
    area: number; // المساحة بالمتر المربع
    floor?: number; // رقم الطابق (للشقق)
    verification?: boolean; // التأثيث
  };
  company: { 
    id: string;
    name: string; // اسم الشركة
    phone: string; // رقم الهاتف
    email: string; // البريد الإلكتروني
    avatar?: string; // صورة البروفيل
  };
};

type PropertyType = 
  | "Townhouse"       // تاون هاوس (بيت متلاصق)
  | "Villa"           // فيلا
  | "Private House"   // منزل خاص
  | "Apartment"       // شقة
  | "Office"          // مكتب
  | "Shop"           // محل

type Status = 
  | "For Sale"       // معروض للبيع
  | "For Rent"       // معروض للإيجار
  | "Sold"           // تم البيع
  | "Rented"         // تم التأجير

export type TProductResponse = {
  data: {
    data: Property[]; 
    
  };
  meta: {
    page: number;
    limit: number;
    last_page: number;
  };
};

