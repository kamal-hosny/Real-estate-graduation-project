interface IProps {
  id?: string; // الرقم المرجعي
  type?: PropertyType; // نوع العقار
  status?: Status; // نوع العرض
  createdAt?: Date; // تاريخ الإضافة
  beds?: number; // عدد غرف النوم
  baths?: number; // عدد الحمامات
  rooms?: number; // عدد الغرف
  area?: number; // المساحة بالمتر المربع
  floor?: number; // رقم الطابق (للشقق)
  verification?: boolean; // التثبت
}

type PropertyType =
  | "Townhouse" // تاون هاوس
  | "Villa" // فيلا
  | "Private House" // منزل خاص
  | "Apartment" // شقة
  | "Office" // مكتب
  | "Shop"; // محل

type Status =
  | "For Sale" // معروض للبيع
  | "For Rent" // معروض للإيجار
  | "Sold" // تم البيع
  | "Rented"; // تم التأجير

const TableDetails = (product: IProps) => {
  const { id, type, status, createdAt, verification, beds, baths, rooms, area, floor } = product;

  return (
    <table className="table-auto w-full my-8 border-color-border border text-xs">
      <thead>
        <tr className="bg-section-color">
          <th className="px-4 py-3 text-left text-color-text-1 font-medium">العام</th>
          <th className="px-4 py-3 text-left text-color-text-1 font-medium">التفاصيل</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b border-color-border">
          <td className="px-4 py-3 text-color-text-2">نوع العقار</td>
          <td className="px-4 py-3 text-color-text-1">{type || "-"}</td>
        </tr>
        <tr className="border-b border-color-border">
          <td className="px-4 py-3 text-color-text-2">نوع العرض</td>
          <td className="px-4 py-3 text-color-text-1">{status || "-"}</td>
        </tr>
        <tr className="border-b border-color-border">
          <td className="px-4 py-3 text-color-text-2">الرقم المرجعي</td>
          <td className="px-4 py-3 text-color-text-1">{id || "-"}</td>
        </tr>
        <tr className="border-b border-color-border">
          <td className="px-4 py-3 text-color-text-2">التثبت</td>
          <td className="px-4 py-3 text-color-text-1">{verification ? "نعم" : "لا"}</td>
        </tr>
        <tr className="border-b border-color-border">
          <td className="px-4 py-3 text-color-text-2">تاريخ الإضافة</td>
          <td className="px-4 py-3 text-color-text-1">
            {createdAt ? new Date(createdAt).toLocaleDateString("ar-EG") : "-"}
          </td>
        </tr>
        <tr className="border-b border-color-border">
          <td className="px-4 py-3 text-color-text-2">عدد الغرف</td>
          <td className="px-4 py-3 text-color-text-1">{rooms || "-"}</td>
        </tr>
        <tr className="border-b border-color-border">
          <td className="px-4 py-3 text-color-text-2">عدد غرف النوم</td>
          <td className="px-4 py-3 text-color-text-1">{beds || "-"}</td>
        </tr>
        <tr className="border-b border-color-border">
          <td className="px-4 py-3 text-color-text-2">عدد الحمامات</td>
          <td className="px-4 py-3 text-color-text-1">{baths || "-"}</td>
        </tr>
        <tr className="border-b border-color-border">
          <td className="px-4 py-3 text-color-text-2">المساحة (م²)</td>
          <td className="px-4 py-3 text-color-text-1">{area || "-"}</td>
        </tr>
        {floor !== undefined && (
          <tr className="border-b border-color-border">
            <td className="px-4 py-3 text-color-text-2">رقم الطابق</td>
            <td className="px-4 py-3 text-color-text-1">{floor}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TableDetails;
