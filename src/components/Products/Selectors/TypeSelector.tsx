type PropertyType = 
  | "Townhouse"
  | "Villa" 
  | "Private House"
  | "Apartment"
  | "Office"
  | "Shop";



interface IProps {
    filterValues: PropertyType | null,
    setFilterValues : (value: PropertyType | null) => void
}

const TypeSelector = ({filterValues, setFilterValues}: IProps) => {
  return (
    <select 
    className="text-color-text-1 font-medium focus:outline-2 outline-cyan-500 bg-section-color border-color-border border-2 p-2 h-10 flex rounded justify-center cursor-pointer items-center text-xs"
    value={filterValues || ""}
    onChange={(e) => setFilterValues(e.target.value as PropertyType || null)}
    >
     <option value="">All Property Types</option>
        <option value="Townhouse">Townhouse</option>
        <option value="Villa">Villa</option>
        <option value="Private House">Private House</option>
        <option value="Apartment">Apartment</option>
        <option value="Office">Office</option>
        <option value="Shop">Shop</option>
    </select>
  )
}

export default TypeSelector