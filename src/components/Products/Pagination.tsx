// External imports
import { ArrowLeft, ArrowRight } from "lucide-react";

// Internal imports
import Button from "../ui/Button";

interface IProps {
  lastPage: number | null;
  currentPage: number | null;
  setCurrentPage: React.Dispatch<React.SetStateAction<number | null>>;
}

const Pagination = ({ lastPage, currentPage, setCurrentPage }: IProps) => {
  const next = () => {
    if (currentPage === null || currentPage === lastPage) return;
    setCurrentPage(currentPage + 1);
  };

  const prev = () => {
    if (currentPage === null || currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flex items-center gap-2 justify-center py-2">
      <Button
        onClick={prev}
        disabled={currentPage === null || currentPage === 1}
        className="border-color-text-2 border rounded-e-none !p-0.5 text-color-text-2 h-8 hover:text-main-color-background hover:bg-color-text-1 w-8 disabled:text-color-text-2 disabled:hover:bg-main-color-background disabled:cursor-auto disabled:border-color-text-2"
      >
        <ArrowLeft />
      </Button>

      <div className="text-color-text-2">
        Page <strong className="text-color-text-1">{currentPage}</strong> of{" "}
        <strong className="text-color-text-1">{lastPage || 1}</strong>
      </div>

      <Button
        disabled={currentPage === null || currentPage === lastPage}
        onClick={next}
        className="border-color-text-2 border rounded-s-none !p-0.5 text-color-text-2 h-8 hover:text-main-color-background hover:bg-color-text-1 w-8 disabled:text-color-text-2 disabled:hover:bg-main-color-background disabled:cursor-auto disabled:border-color-text-2"
      >
        <ArrowRight />
      </Button>
    </div>
  );
};

export default Pagination;