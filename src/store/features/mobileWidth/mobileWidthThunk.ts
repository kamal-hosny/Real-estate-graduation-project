import { AppDispatch } from "../..";
import { setMobileWidth } from "./mobileWidthSlice";

export const checkMobileWidth = () => (dispatch: AppDispatch) => {
  if (window.innerWidth <= 768) {
    dispatch(setMobileWidth(true));  
  } else {
    dispatch(setMobileWidth(false)); 
  }
};
