import bannerImg from "../../../assets/banner/banner.jpg";
import Button from "../../ui/Button";

const Banner = () => {
  return (
    <div className="banner-oilfield bg-section-color py-4">
      <div className="container mx-auto px-4">
        <div
          className="card bg-gray-800 p-12 rounded-lg bg-cover bg-center h-[350px] flex flex-col justify-center gap-5"
          style={{ backgroundImage: `url(${bannerImg})` }}
        >
          <p className="title font-bold text-2xl text-white leading-[25px]">
          Welcome to <span>Aqarek</span>
          </p>
          <p className="description text-gray-300 font-semibold text-sm leading-[25px] max-w-sm">
          Discover your dream property effortlessly with Aqarek, your gateway to the perfect home or investment.
          </p>
          <Button className="transition-all duration-300 px-4 py-2 bg-transparent text-white border-2 border-white hover:bg-white hover:text-[#0a0a0a] font-semibold rounded-md cursor-pointer  w-fit">
            Explore Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
