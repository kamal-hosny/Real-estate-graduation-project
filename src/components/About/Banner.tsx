import { Link } from "react-router-dom";
import Button from "../ui/Button";

const Banner = () => {
  return (
    <div className="p-10 flex justify-between max-md:flex-col max-md:text-center max-md:gap-8 items-center bg-section-color rounded">
        <div className="contact space-y-4">
        <div className="title text-color-text-1 font-bold text-2xl">
              Find Your Dream Property with Aqarek
            </div>
            <div className="title text-color-text-2 text-xs leading-6 max-w-[800px]">
              Discover, Buy, Rent, and Invest in the Best Real Estate Properties
              with ease. Your dream home or investment is just a click away!
            </div>
        </div>
        <div>
        <Link to="/properties" >
            <Button className="bg-button-color hover:bg-button-hover-color text-main-color-background font-bold" >
              
              Explore Properties</Button>
              </Link>
        </div>
    </div>
  );
};

export default Banner;
