// External imports
import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Sun, Moon } from "lucide-react";

// Internal imports
import { RootState } from "../../../../store/rootReducer";
import { toggleDarkMode } from "../../../../store/features/darkMode/darkModeSlice";
import Button from "../../../ui/Button";

const DarkMode = memo(() => {
  const dispatch = useDispatch();
  const { isDarkMode } = useSelector((state: RootState) => state.darkMode) || { isDarkMode: false };

  const handleToggle = () => {
    dispatch(toggleDarkMode());
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <Button
      onClick={handleToggle}
      className="bg-transparent !text-color-text-1 hover:bg-section-color !p-2"
    >
      {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
    </Button>
  );
});

export default DarkMode;