import { useTranslation } from "react-i18next";

type TransactionType = "For Sale" | "For Rent" | "Sold" | "Rented" ;
interface IProps {
  filterType: TransactionType | null;
  setFilterType: (value: TransactionType | null) => void;
}

const TransactionTypeSelector = ({ filterType, setFilterType }: IProps) => {
  const { t } = useTranslation();
  return (
    <select
      className="text-color-text-1 font-medium focus:outline-2 outline-cyan-500 bg-section-color border-color-border border-2 p-2 h-10 flex rounded justify-center cursor-pointer items-center text-xs"
      onChange={(e) => setFilterType(e.target.value as TransactionType)}
      value={filterType ?? ""}
    >
      <option value="">{t("properties_page.All_Status")}</option>
      <option value="For Sale">{t("properties_page.For_Sale")}</option>
      <option value="For Rent">{t("properties_page.For_Rent")}</option>
    </select>
  );
};

export default TransactionTypeSelector;
