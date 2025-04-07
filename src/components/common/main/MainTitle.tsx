import { Sparkle } from "lucide-react";
import { ReactNode } from "react";

interface IMainTitle {
    title: string
    children?: string | ReactNode
} 

const MainTitle = ({title, children}: IMainTitle) => {
  return (
    <div>
      {/*  */}
      <div className="stars flex justify-start items-center gap-2 ">
        <Sparkle size={20} className="text-color-text-2 fill-current" />
        <Sparkle
          size={15}
          className="text-color-text-2 fill-current opacity-60"
        />
        <Sparkle
          size={10}
          className="text-color-text-2 fill-current opacity-30"
        />
      </div>
      {/*  */}
      <div className="p-2 space-y-3">
        <div className="title text-2xl font-semibold text-color-text-1 ">
          {title}
        </div>
        <div className="text-color-text-2 text-xs leading-6">
         {children}
        </div>
      </div>
      {/*  */}
    </div>
  );
};

export default MainTitle;
