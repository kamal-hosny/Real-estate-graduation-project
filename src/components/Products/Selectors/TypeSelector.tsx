import { useTranslation } from "react-i18next";

type PropertyType = 
  | "Townhouse"       // تاون هاوس
  | "Villa"           // فيلا
  | "Private House"   // منزل خاص
  | "Apartment"       // شقة
  | "Office"          // مكتب
  | "Shop"           // محل


interface IProps {
    filterValues: PropertyType | null,
    setFilterValues : (value: PropertyType | null) => void
}

const TypeSelector = ({filterValues, setFilterValues}: IProps) => {
  const { t } = useTranslation();
  return (
    <select 
    className="text-color-text-1 font-medium focus:outline-2 outline-cyan-500 bg-section-color border-color-border border-2 p-2 h-10 flex rounded justify-center cursor-pointer items-center text-xs"
    value={filterValues || ""}
    onChange={(e) => setFilterValues(e.target.value as PropertyType || null)}
    >
    
        <option value="">{t("properties_page.All_Property_Types")}</option>
        <option value="Townhouse">{t("properties_page.Townhouse")}</option>
        <option value="Villa">{t("properties_page.Villa")}</option>
        <option value="Private House">{t("properties_page.Private_House")}</option>
        <option value="Apartment">{t("properties_page.Apartment")}</option>
        <option value="Office">{t("properties_page.Office")}</option>
        <option value="Shop">{t("properties_page.Shop")}</option>
    
    </select>
  )
}

export default TypeSelector