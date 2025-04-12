import * as XLSX from "xlsx";

// interface dataTable {
//   id: number;
//   TypeOrder: string;
//   created_at: string;
//   userToken: string;
//   clientId: string;
//   property: {
//     propertyId: number;
//     propertyTitle: string;
//     propertyType: string;
//     price: number;
//     status: string;
//     city: string;
//     address: string;
//     googleMapsLink: string;
//     totalRooms: number;
//     bathrooms: number;
//     bedrooms: number;
//     floorNumber: number;
//     area: number;
//     furnished: boolean;
//     description: string;
//     createdAt: number;
//     propertyImages: string[];
//     userId: string;
//   };
// }

export const exportToExcel = (exportData: any) => {
  const formattedData = exportData?.map((item: any, index: number) => ({
    "العدد": index + 1,
    "اسم العقار": item.property?.propertyTitle || "غير متاح",
    "معرف الطلب": item.id,
    "نوع الطلب": item.TypeOrder,
    "تاريخ الطلب": item.created_at
      ? new Date(item.created_at).toLocaleString()
      : "غير متاح",
    "معرف العميل": item.clientId,
    "نوع العقار": item.property?.propertyType || "غير متاح",
    "السعر": item.property?.price || "غير متاح",
    "المدينة": item.property?.city || "غير متاح",
    "العنوان": item.property?.address || "غير متاح",
    "المساحة": item.property?.area || "غير متاح",
    "عدد الغرف": item.property?.bedrooms || "غير متاح",
    "الحمامات": item.property?.bathrooms || "غير متاح",
    "الحالة": item.property?.status || "غير متاح",
  }));

  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "PurchaseRequests");
  XLSX.writeFile(workbook, "PurchaseRequests.xlsx");
};