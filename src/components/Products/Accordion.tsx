import { ChevronDown } from "lucide-react";
import { memo, useState } from "react";

interface IAccordion {
  title: string;
  list: {
    _id: string;
    name: string;
  }[];
}


const Accordion = memo(({ title, list }: IAccordion) => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleAccordion = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="accordion w-full  rounded-md">
      <p
        className="font-semibold flex justify-between items-center text-color-text-1 cursor-pointer text-sm pb-2 rounded-md"
        onClick={toggleAccordion}
        aria-expanded={open}
      >
        <span>{title}</span>
        <ChevronDown
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </p>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden  ${
          open ? "max-h-40" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-2 text-sm text-color-text-1">
        {list &&
            list.map((x) => (
              <li
                key={x._id}
                className="bg-section-color text-color-text-2 p-1 rounded-sm cursor-pointer text-xs"
              >
                {x.name}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
});

export default Accordion;
