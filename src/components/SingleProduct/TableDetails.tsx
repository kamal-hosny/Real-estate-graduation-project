import { useTranslation } from "react-i18next";

interface IProps {
  id?: string; // الرقم المرجعي
  type?: string; // نوع العقار
  status?: string; // نوع العرض
  createdAt?: Date; // تاريخ الإضافة
  beds?: number; // عدد غرف النوم
  baths?: number; // عدد الحمامات
  rooms?: number; // عدد الغرف
  area?: number; // المساحة بالمتر المربع
  floor?: number; // رقم الطابق (للشقق)
  verification?: boolean; // التثبت
}

// type PropertyType =
//   | "Townhouse" // تاون هاوس
//   | "Villa" // فيلا
//   | "Private House" // منزل خاص
//   | "Apartment" // شقة
//   | "Office" // مكتب
//   | "Shop"; // محل

// type Status =
//   | "For Sale" // معروض للبيع
//   | "For Rent" // معروض للإيجار
//   | "Sold" // تم البيع
//   | "Rented"; // تم التأجير

  const TableDetails = (product: IProps) => {
    const { t } = useTranslation(); // Hook to access translations
    const { id, type, status, createdAt, verification, beds, baths, rooms, area, floor } = product;
  
    return (
      <table className="table-auto w-full my-8 border-color-border border  text-xs">
        <thead>
          <tr className="bg-section-color">
            <th className="px-4 py-3 text-start text-color-text-1 font-medium">
              {t("tableDetails.general")}
            </th>
            <th className="px-4 py-3 text-start text-color-text-1 font-medium">
              {t("tableDetails.details")}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-color-border">
            <td className="px-4 py-3 text-color-text-2">
              {t("tableDetails.propertyType")}
            </td>
            <td className="px-4 py-3 text-color-text-1">
              {type ? t(`tableDetails.propertyTypes.${type.toLowerCase()}`) : "-"}
            </td>
          </tr>
          <tr className="border-b border-color-border">
            <td className="px-4 py-3 text-color-text-2">
              {t("tableDetails.offerType")}
            </td>
            <td className="px-4 py-3 text-color-text-1">
              {status ? t(`tableDetails.status.${status.toLowerCase().replace(" ", "")}`) : "-"}
            </td>
          </tr>
          <tr className="border-b border-color-border">
            <td className="px-4 py-3 text-color-text-2">
              {t("tableDetails.referenceNumber")}
            </td>
            <td className="px-4 py-3 text-color-text-1">{id || "-"}</td>
          </tr>
          <tr className="border-b border-color-border">
            <td className="px-4 py-3 text-color-text-2">
              {t("tableDetails.verification")}
            </td>
            <td className="px-4 py-3 text-color-text-1">
              {verification ? t("tableDetails.yes") : t("tableDetails.no")}
            </td>
          </tr>
          <tr className="border-b border-color-border">
            <td className="px-4 py-3 text-color-text-2">
              {t("tableDetails.dateAdded")}
            </td>
            <td className="px-4 py-3 text-color-text-1">
              {createdAt ? new Date(createdAt).toLocaleDateString() : "-"}
            </td>
          </tr>
          <tr className="border-b border-color-border">
            <td className="px-4 py-3 text-color-text-2">
              {t("tableDetails.numberOfRooms")}
            </td>
            <td className="px-4 py-3 text-color-text-1">{rooms || "-"}</td>
          </tr>
          <tr className="border-b border-color-border">
            <td className="px-4 py-3 text-color-text-2">
              {t("tableDetails.numberOfBedrooms")}
            </td>
            <td className="px-4 py-3 text-color-text-1">{beds || "-"}</td>
          </tr>
          <tr className="border-b border-color-border">
            <td className="px-4 py-3 text-color-text-2">
              {t("tableDetails.numberOfBathrooms")}
            </td>
            <td className="px-4 py-3 text-color-text-1">{baths || "-"}</td>
          </tr>
          <tr className="border-b border-color-border">
            <td className="px-4 py-3 text-color-text-2">
              {t("tableDetails.area")}
            </td>
            <td className="px-4 py-3 text-color-text-1">{area || "-"}</td>
          </tr>
          {floor !== undefined && (
            <tr className="border-b border-color-border">
              <td className="px-4 py-3 text-color-text-2">
                {t("tableDetails.floorNumber")}
              </td>
              <td className="px-4 py-3 text-color-text-1">{floor}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  };
  
  export default TableDetails;