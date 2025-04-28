// External imports
import { useEffect, useState } from "react";

// Types
interface IProps {
  filterPrice: {
    from: string;
    to: string;
  };
  setFilterPrice: React.Dispatch<
    React.SetStateAction<{
      from: string;
      to: string;
    }>
  >;
  onPriceChange: (price: { from: string; to: string }) => void;
}

const FilterByPrice = ({ filterPrice, onPriceChange }: IProps) => {
  // State
  const [localPrice, setLocalPrice] = useState(filterPrice);

  // Effects
  useEffect(() => {
    setLocalPrice(filterPrice);
  }, [filterPrice]);

  useEffect(() => {
    const handler = setTimeout(() => {
      onPriceChange(localPrice);
    }, 500);

    return () => clearTimeout(handler);
  }, [localPrice, onPriceChange]);

  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLocalPrice((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Render
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="from flex flex-col gap-1">
        <label 
          htmlFor="from" 
          className="text-color-text-2"
        >
          Min
        </label>
        <input
          type="number"
          min={0}
          id="from"
          value={localPrice.from}
          onChange={handleChange}
          placeholder="0"
          className="p-2 bg-section-color text-sm w-full border border-color-border rounded placeholder-color-text-2 text-color-text-1 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
        />
      </div>

      <div className="to flex flex-col gap-1">
        <label 
          htmlFor="to" 
          className="text-color-text-2"
        >
          Max
        </label>
        <input
          type="number"
          id="to"
          min={0}
          value={localPrice.to}
          onChange={handleChange}
          placeholder="99999"
          className="p-2 bg-section-color text-sm w-full border border-color-border rounded placeholder-color-text-2 text-color-text-1 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default FilterByPrice;