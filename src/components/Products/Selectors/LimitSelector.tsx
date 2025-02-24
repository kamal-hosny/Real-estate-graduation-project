
interface IProps {
    limit: number | null,
    setLimit : React.Dispatch<
   React.SetStateAction<number | null>
 >
}

const LimitSelector = ({limit, setLimit}: IProps) => {
  return (
    <select 
    className="text-color-text-1 font-medium focus:outline-2 outline-cyan-500 bg-section-color border-color-border border-2 p-2 h-10 flex rounded justify-center cursor-pointer items-center text-xs"
    value={limit ?? 10}
    onChange={(e) => setLimit(Number(e.target.value))}
    >
        <option value="5">Show 5 Products</option>
        <option value="10">Show 10 Products</option>
        <option value="20">Show 20 Products</option>
        <option value="30">Show 30 Products</option>
        <option value="40">Show 40 Products</option>
        <option value="50">Show 50 Products</option>
        <option value="999999">All</option>
    </select>
  )
}

export default LimitSelector