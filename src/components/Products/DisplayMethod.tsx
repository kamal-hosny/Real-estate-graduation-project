import { LayoutGrid } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface IDisplayMethod {
  cardGrid: boolean;
  setCardGrid: Dispatch<SetStateAction<boolean>>;
}

const DisplayMethod = ({cardGrid, setCardGrid}: IDisplayMethod) => {



  const changeGridTrue = () => {
    setCardGrid(true);
  };


  return (
    <div className="flex gap-2">
      <button className="Lgrid" >
        <LayoutGrid
          onClick={changeGridTrue}
          className={` ${cardGrid ? "border-cyan-500 text-cyan-500" : ""} text-color-text-2 cursor-pointer bg-section-color p-1.5 h-10 w-10 rounded border-color-border border-2` }
        />
      </button>
     
    </div>
  );
};

export default DisplayMethod;
