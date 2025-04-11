import { useTranslation } from "react-i18next";

interface IProps {
    isVerified: boolean;
    setIsVerified: (value: boolean) => void;
}

const VerificationSelector = ({ isVerified, setIsVerified }: IProps) => {
  const { t } = useTranslation();

  
  return (
    <select 
      className="text-color-text-1 font-medium focus:outline-2 outline-cyan-500 bg-section-color border-color-border border-2 p-2 h-10 flex rounded justify-center cursor-pointer items-center text-xs"
      value={isVerified.toString()}
      onChange={(e) => setIsVerified(e.target.value === "true")}
    >
        <option value="false">{t("ProductCard.Unfurnished")}</option>
        <option value="true">{t("ProductCard.Furnished")}</option>
    </select>
  )
}

export default VerificationSelector;