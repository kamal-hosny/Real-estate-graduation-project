// External imports
import { Slash } from "lucide-react";
import { Link, useLocation } from 'react-router-dom';
import { Fragment } from "react/jsx-runtime";

// Internal imports
import { textSlicer } from "../../utils";

// Types
interface IBreadcrumb {
  label: string;
  link: string;
}

interface BreadcrumbProps {
  items: IBreadcrumb[];
  itemNow?: string | null;
}

// Component
const Breadcrumb = ({ items, itemNow = null }: BreadcrumbProps) => {
  const location = useLocation();
  const isWhite = ["/advertise-property", "/properties"].includes(location.pathname);

  // Early return if no items
  if (items.length === 0) {
    return null;
  }

  // Sub-components
  const Separator = () => <Slash size={15} />;

  return (
    <div>
      <ul 
        className={`
          flex 
          gap-2 
          text-xs 
          items-center
          ${isWhite ? "text-white" : "text-color-text-2"}
        `}
      >
        {items.map((item, index) => (
          <Fragment key={index}>
            <li 
              className="
                cursor-pointer 
                p-2 
                rounded-md 
                transition-all 
                hover:text-color-text-1 
                duration-300 
                flex 
                gap-2
              "
            >
              <Link to={item.link}>
                {item.label}
              </Link>
            </li>
            {index < items.length - 1 && <Separator />}
          </Fragment>
        ))}
        <Separator />
        <li 
          key="current" 
          className="
            p-2 
            rounded-md 
            transition-all 
            duration-300
          "
        >
          {textSlicer(itemNow || "")}
        </li>
      </ul>
    </div>
  );
};

export default Breadcrumb;