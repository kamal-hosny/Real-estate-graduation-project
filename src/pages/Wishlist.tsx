import LottieHandler from "../components/common/feedback/LottieHandler/LottieHandler";
import MainTitle from "../components/common/main/MainTitle";
import ProductCard from "../components/common/ProductCard/ProductCard";
import Breadcrumb from "../components/Products/Breadcrumb";
import { useAppSelector } from "../store/hooks";
import { RealProperty } from "../types/product.types";
import { useTranslation } from "react-i18next";

const breadcrumbItems = [{ label: "Home", link: "/" }];

const Wishlist = () => {
  const { t } = useTranslation(); 
  const wishlist = useAppSelector((state) => state.wishlist?.items);

  console.log(wishlist);
  

  return (
    <div className="bg-main-color-background">
      <div className="container mx-auto px-2 py-6 space-y-5">
        <Breadcrumb items={breadcrumbItems} itemNow={t("wishlistPage.wishlist")} />
        <MainTitle title={t("wishlistPage.wishlist")}>
          {t("wishlistPage.wishlistDescription")}
        </MainTitle>

        <div className="cards">
          <div
            className={
              `${wishlist?.length || 0 > 0 ? "grid grid-cols-1 max-md:justify-items-center md:grid-cols-2 lg:grid-cols-3" : ""} gap-4 justify-center`
            }
          >
            {wishlist?.length || 0 > 0 ? (
              wishlist?.map((product: RealProperty) => (
                <ProductCard key={product.propertyId} productData={product} />
              ))
            ) : (
              <div className="relative login bg-section-color w-full flex justify-center items-center">
                <LottieHandler
                  type="empty"
                  message={t("wishlistPage.wishlistEmpty")}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;