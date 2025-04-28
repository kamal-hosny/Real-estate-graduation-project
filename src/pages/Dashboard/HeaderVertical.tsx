// External libraries
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { House, Languages } from "lucide-react";

// Internal imports
import i18n from "../../language";

const HeaderVertical = () => {
  // Hooks
  const { t } = useTranslation("");
  const [direction, setDirection] = useState(document.dir || "ltr");

  // Effect for handling direction changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setDirection(document.dir || "ltr");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["dir"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="p-4 bg-[#f4f7fa] border-b border-[#e5e5e5] flex justify-between items-center">
      {/* Logo Section */}
      <div className="logo flex gap-2 items-center">
        <div className="icon">
          <House className="bg-blue-900 text-white p-1 rounded w-6 h-6" />
        </div>
        <div className="title font-bold text-sm">
          {t("headerVertical.title")}
        </div>
      </div>

      {/* Actions Section */}
      <span className="flex items-center gap-4">
        {/* Language Switch Button */}
        {direction === "rtl" ? (
          <li
            onClick={() => i18n.changeLanguage("en")}
            className="flex cursor-pointer items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors bg-blue-100 text-blue-600 hover:bg-blue-200"
          >
            <Languages size={18} />
            <span className="text-xs">تحويل اللغة إلي الانجليزية</span>
          </li>
        ) : (
          <li
            onClick={() => i18n.changeLanguage("ar")}
            className="flex cursor-pointer items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors bg-blue-100 text-blue-600 hover:bg-blue-200"
          >
            <Languages size={18} />
            <span className="text-xs">Switch to Arabic</span>
          </li>
        )}

        {/* Store Link */}
        <Link
          to={"/"}
          className="bg-blue-100 text-blue-600 px-3 py-1.5 text-xs font-medium rounded-md hover:bg-blue-200 transition-colors"
        >
          {t("headerVertical.goToStore")}
        </Link>
      </span>
    </div>
  );
};

export default HeaderVertical;
