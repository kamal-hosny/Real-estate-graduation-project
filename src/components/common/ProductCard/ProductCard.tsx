import { Heart, Bed, Bath, Ruler, Building2 } from "lucide-react";
import { formatCurrency, textSlicer } from "../../../utils";
import Img from "../../ui/Img";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../store/wishlist/wishlistActions";
import { addToast } from "../../../store/toasts/toastsSlice";
import { RealProperty } from "../../../types/product.types";

import defaultPerson from "../../../assets/defaultImages/defaultPerson.jpeg";
import { useTranslation } from "react-i18next";
import { getOneUser } from "../../../store/user/act/actGetOneUser";

const ProductCard = ({ productData }: { productData: RealProperty }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector((state) => state?.wishlist?.items || []);
  const { t, i18n } = useTranslation();
  const isInWishlist = useMemo(
    () => wishlist.some((item) => item.propertyId === productData.propertyId),
    [wishlist, productData.propertyId]
  );
  const [isHeartFilled, setIsHeartFilled] = useState(isInWishlist);

  useEffect(() => {
    setIsHeartFilled(isInWishlist);
  }, [isInWishlist]);

  const toggleHeart = () => {
    if (isHeartFilled) {
      dispatch(removeFromWishlist(productData));
    } else {
      dispatch(addToWishlist(productData));
      dispatch(
        addToast({ message: "تمت الإضافة إلى المفضلة", type: "success" })
      );
    }
    setIsHeartFilled((prev) => !prev);
  };

  const image = (productData?.propertyImages as any)?.$values?.[0];

  const { record } = useAppSelector((state) => state?.user )

  const userData = record
  

  const pUserID = productData?.userId
useEffect(() => {
  dispatch(getOneUser({ id: pUserID}))
}, [dispatch,pUserID ])

  return (
    <div className="product-card border rounded-lg shadow-lg bg-section-color border-color-border hover:shadow-xl transition-shadow duration-300 text-right">
      <div className="relative image w-full h-64 rounded-t-lg overflow-hidden">
        <Img
          className="w-full h-full object-cover cursor-pointer transform hover:scale-105 transition-transform duration-300"
          src={
            image || "https://dummyimage.com/200x200"
          }
          alt={productData.propertyTitle}
          onClick={() => navigate(`/singleProperty/${productData.propertyId}`)}
        />

        <Heart
          onClick={toggleHeart}
          className={`cursor-pointer absolute top-4 bg-section-color left-4 p-2 w-10 h-10 border-color-border rounded-full transition-all ${
            isHeartFilled ? "text-red-500" : "text-color-text-2"
          }`}
          fill={isHeartFilled ? "red" : "none"}
        />

        <span className="absolute top-4 right-4 bg-blue-600 text-white py-1 px-3 text-sm rounded-full">
          {productData.propertyType}
        </span>
        <span
            className={`absolute top-[50px] right-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              productData.status === "For Sale"
                ? "bg-[#dcfce7] text-[#16a34a]"
                : "bg-[#ffedd5] text-[#ea580c]"
            }`}
          >
            {productData.status}
          </span>
      </div>

      <div className="body p-4 space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-color-text-1">
            {textSlicer(productData.propertyTitle, 30)}
          </h3>
        </div>

        <div className="flex items-center gap-2 text-color-text-2 ">
          <Building2 size={16} />
          <span>{productData.city}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-blue-600">
            {formatCurrency(productData.price)}
          </div>
          <div className="flex items-center border-color-border border gap-2 text-sm capitalize text-color-text-2">
          <span >{userData?.fullName ?? "unknown"}</span>
            <Img
              src={ userData?.image ?? defaultPerson}
              className="w-8 h-8 rounded-md border-color-border border object-cover"
              alt="User"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-2 border-t text-color-text-2 border-color-border">
          <div className="flex items-center gap-1">
            <Bed size={18} />
            <span>{productData.bedrooms}</span>
            <span className="text-sm">{t("ProductCard.bedrooms")}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath size={18} />
            <span>{productData.bathrooms}</span>
            <span className="text-sm">{t("ProductCard.bathroom")}</span>
          </div>
          <div className="flex items-center gap-1">
            <Ruler size={18} />
            <span>{productData.area}</span>
            <span className="text-sm">{t("ProductCard.meter")}</span>
          </div>
        </div>
      </div>
      <div className="foot flex justify-between items-center border-t-2 border-color-border">
        <div className="text-sm bg-section-color text-color-text-2 p-3 rounded space-x-2">
          <span>{t("ProductCard.Publish_time")}</span>{" "}
          <span>
            {new Date(productData.createdAt).toLocaleDateString(i18n.language, {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
