interface IProps {
    isVerified: boolean;
    setIsVerified: (value: boolean) => void;
}

const VerificationSelector = ({ isVerified, setIsVerified }: IProps) => {
  return (
    <select 
      className="text-color-text-1 font-medium focus:outline-2 outline-cyan-500 bg-section-color border-color-border border-2 p-2 h-10 flex rounded justify-center cursor-pointer items-center text-xs"
      value={isVerified.toString()}
      onChange={(e) => setIsVerified(e.target.value === "true")}
    >
        <option value="false">Unverified</option>
        <option value="true">Verified</option>
    </select>
  )
}

export default VerificationSelector;