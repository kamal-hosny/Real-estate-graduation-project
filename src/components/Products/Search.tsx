import { memo } from "react";
import { useTranslation } from "react-i18next";

interface ISearch {
  searchTerm: string | null;
  setSearchTerm: (value: string) => void;
}

const Search = memo(({ searchTerm, setSearchTerm }: ISearch) => {
  const { t } = useTranslation();
  
  

  return (
    <div className="search flex">
      <input
        type="text"
        className="w-full rounded-s p-2 bg-section-color border-2 text-color-text-1 border-color-border focus:ring-2 focus:border-cyan-500 focus:outline-none "
        placeholder={t("ProductCard.search")}
        value={searchTerm || ""}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
});

export default memo(Search);