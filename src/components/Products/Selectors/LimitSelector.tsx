import { useTranslation } from "react-i18next";

interface IProps {
    limit: number | null,
    setLimit : React.Dispatch<
   React.SetStateAction<number | null>
 >
}

const LimitSelector = ({limit, setLimit}: IProps) => {
  const { t } = useTranslation();
  return (
    <select 
    className="text-color-text-1 font-medium focus:outline-2 outline-cyan-500 bg-section-color border-color-border border-2 p-2 h-10 flex rounded justify-center cursor-pointer items-center text-xs"
    value={limit ?? 10}
    onChange={(e) => setLimit(Number(e.target.value))}
    >
   <option value="5">{t("properties_page.Show 5 Products")}</option>
        <option value="10">{t("properties_page.Show 10 Products")}</option>
        <option value="20">{t("properties_page.Show 20 Products")}</option>
        <option value="30">{t("properties_page.Show 30 Products")}</option>
        <option value="40">{t("properties_page.Show 40 Products")}</option>
        <option value="50">{t("properties_page.Show 50 Products")}</option>
        <option value="999999">{t("properties_page.All")}</option>
    </select>
  )
}

export default LimitSelector