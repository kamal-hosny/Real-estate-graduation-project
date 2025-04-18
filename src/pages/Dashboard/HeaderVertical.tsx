import { House } from "lucide-react";
import { Link } from "react-router-dom";

const HeaderVertical = () => {
  return (
    <div className="p-4 bg-[#f4f7fa] border-b-2 border-[#e5e5e5] flex justify-between items-center">
      <div className="logo flex gap-2">
        <div className="icon">
          <House className="bg-blue-900 text-white p-1 rounded" />
        </div>
        <div className="title font-bold">Aqarek Dashboard</div>
      </div>
      <span className="flex items-center gap-">
      <Link to={"/"} className="bg-blue-100 text-blue-600 px-4 py-2 text-xs font-medium rounded-md hover:bg-blue-200 transition-colors">
        الذهاب إلي المتجر
      </Link>
      </span>
    </div>
  );
};

export default HeaderVertical;
