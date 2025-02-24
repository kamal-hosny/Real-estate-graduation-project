type TransactionType = "sale" | "rent";

interface IProps {
  filterType: TransactionType | null;
  setFilterType: (value: TransactionType | null) => void;
}

const TransactionTypeSelector = ({ filterType, setFilterType }: IProps) => {
  return (
    <select
      className="text-color-text-1 font-medium focus:outline-2 outline-cyan-500 bg-section-color border-color-border border-2 p-2 h-10 flex rounded justify-center cursor-pointer items-center text-xs"
      onChange={(e) => setFilterType(e.target.value as TransactionType)}
      value={filterType ?? ""}
    >
      <option value="sale">Sale</option>
      <option value="rent">Rent</option>
    </select>
  );
};

export default TransactionTypeSelector;
