import * as XLSX from "xlsx";

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return "غير متاح";
  const date = new Date(dateString);
  return isNaN(date.getTime())
    ? "غير متاح"
    : date.toLocaleDateString("ar-EG", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
};

export const exportToExcel = (exportData: any[]) => {
  const formattedData = exportData?.map((item: any, index: number) => ({
    "العدد": index + 1,
    "اسم العقار": item.property?.propertyTitle || "غير متاح",
    "معرف الطلب": item.id || "غير متاح",
    "نوع الطلب": item.TypeOrder || "غير متاح",
    "تاريخ الطلب": formatDate(item.created_at),
    "معرف العميل": item.userToken ? item.userToken.substring(0, 10) + "..." : "غير متاح", 
    "نوع العقار": item.property?.propertyType || "غير متاح",
    "السعر": item.property?.price ? Number(item.property.price) : "غير متاح",
    "المدينة": item.property?.city || "غير متاح",
    "العنوان": item.property?.address || "غير متاح",
    "المساحة": item.property?.area ? Number(item.property.area) : "غير متاح",
    "عدد الغرف": item.property?.bedrooms ? Number(item.property.bedrooms) : "غير متاح",
    "الحمامات": item.property?.bathrooms ? Number(item.property.bathrooms) : "غير متاح",
    "الحالة": item.property?.status || "غير متاح",
  }));

  const worksheet = XLSX.utils.json_to_sheet(formattedData, {
    header: [
      "العدد",
      "اسم العقار",
      "معرف الطلب",
      "نوع الطلب",
      "تاريخ الطلب",
      "معرف العميل",
      "نوع العقار",
      "السعر",
      "المدينة",
      "العنوان",
      "المساحة",
      "عدد الغرف",
      "الحمامات",
      "الحالة",
    ],
    skipHeader: false,
  });


  worksheet["!cols"] = [
    { wch: 5 }, // العدد
    { wch: 20 }, // اسم العقار
    { wch: 15 }, // معرف الطلب
    { wch: 10 }, // نوع الطلب
    { wch: 20 }, // تاريخ الطلب
    { wch: 15 }, // معرف العميل
    { wch: 15 }, // نوع العقار
    { wch: 10 }, // السعر
    { wch: 15 }, // المدينة
    { wch: 25 }, // العنوان
    { wch: 10 }, // المساحة
    { wch: 10 }, // عدد الغرف
    { wch: 10 }, // الحمامات
    { wch: 10 }, // الحالة
  ];


  worksheet["!rtl"] = true;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "PurchaseRequests");
  XLSX.writeFile(workbook, "PurchaseRequests.xlsx", { compression: true });
};