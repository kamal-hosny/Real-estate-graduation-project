import LottieHandler from "../components/common/feedback/LottieHandler/LottieHandler";
import MainTitle from "../components/common/main/MainTitle";
import ProductCard from "../components/common/ProductCard/ProductCard";
import Breadcrumb from "../components/Products/Breadcrumb";
import { useAppSelector } from "../store/hooks";
import { Property } from "../types/product.types";

const breadcrumbItems = [{ label: "Home", link: "/" }];

const Wishlist = () => {
  const wishlist = useAppSelector((state) => state.wishlist?.items);
  return (
    <div className="bg-main-color-background">
      <div className="container mx-auto px-2 py-6 space-y-5">
        <Breadcrumb items={breadcrumbItems} itemNow={"Wishlist"} />
        <MainTitle title="Wishlist">
          Explore a wide range of high-quality materials and tools essential for
          the oilfield industry. From drilling equipment to maintenance tools,
          we provide everything you need to ensure efficient operations.
        </MainTitle>

        <div className="cards">
          <div
            className={
              `${wishlist?.length || 0 > 0 ? "grid grid-cols-1 max-md:justify-items-center  md:grid-cols-2 lg:grid-cols-3" : ""}  gap-4 justify-center`
            }
          >
            {wishlist?.length || 0 > 0 ? (
              wishlist?.map((product: Property) => (
                <ProductCard key={product.id} productData={product} />
              ))
            ) : (
              <div className="relative login bg-section-color w-full flex justify-center items-center ">
                <LottieHandler type="empty" message="Your wishlist is empty" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
