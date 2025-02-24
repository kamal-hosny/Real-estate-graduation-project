


import { Heart, Bed, Bath, Ruler, Building2 } from "lucide-react";
import { formatCurrency } from "../../../utils";
import Img from "../../ui/Img";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../store/wishlist/wishlistActions";
import { addToast } from "../../../store/toasts/toastsSlice";
import { Property } from "../../../types/product.types";

import defaultPerson from "../../../assets/defaultImages/defaultPerson.jpeg"

interface IProductCard {
  productData: Property;
  grid?: boolean;
}

const ProductCard = ({ productData }: IProductCard) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector((state) => state?.wishlist?.items || []);
  const isInWishlist = useMemo(
    () => wishlist.some((item) => item.id === productData.id),
    [wishlist, productData.id]
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

  return (
    <div className="product-card border rounded-lg shadow-lg bg-section-color border-color-border hover:shadow-xl transition-shadow duration-300 text-right">
      <div className="relative image w-full h-64 rounded-t-lg overflow-hidden">
        <Img
          className="w-full h-full object-cover cursor-pointer transform hover:scale-105 transition-transform duration-300"
          src={productData.location.images[0] || "https://dummyimage.com/200x200"}
          alt={productData.title}
          onClick={() => navigate(`/singleProperty/${productData.id}`)}
        />
        
        <Heart
          onClick={toggleHeart}
          className={`cursor-pointer absolute top-4 bg-section-color left-4 p-2 w-10 h-10 border-color-border rounded-full transition-all ${
            isHeartFilled ? "text-red-500" : "text-color-text-2"
          }`}
          fill={isHeartFilled ? "red" : "none"}
        />
        
        <span className="absolute top-4 right-4 bg-blue-600 text-white py-1 px-3 text-sm rounded-full">
          {productData.type}
        </span>
      </div>

      <div className="body p-4 space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-color-text-1">{productData.title}</h3>
          <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-sm">
            {productData.status}
          </span>
        </div>

        <div className="flex items-center gap-2 text-color-text-2 ">
          <Building2 size={16} />
          <span>{productData.location.city}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-blue-600">
            {formatCurrency(productData.price)} 
          </div>
          <div className="flex items-center gap-2 text-sm text-color-text-2">
            <Img 
              src={productData.company.avatar || defaultPerson} 
              className="w-8 h-8 rounded-full border-color-border border object-cover"
              alt={productData.company.name}
            />
            <span>{productData.company.name}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-2 border-t text-color-text-2 border-color-border">
          <div className="flex items-center gap-1">
            <Bed size={18}  />
            <span >{productData.details.beds}</span>
            <span className="text-sm">غرف</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath size={18}  />
            <span>{productData.details.baths}</span>
            <span className="text-sm">حمام</span>
          </div>
          <div className="flex items-center gap-1">
            <Ruler size={18}  />
            <span>{productData.details.area}</span>
            <span className="text-sm">م²</span>
          </div>
        </div>  
      </div>
      <div className="foot flex justify-between items-center border-t-2 border-color-border">
<div className="text-sm bg-section-color text-color-text-2 p-3  rounded space-x-2">
          <span>
          Publish time: 
          </span>
       <span>
       {
        new Date(productData.createdAt).toLocaleDateString('en', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
       }
       </span>
          
        </div>

       
</div>
    </div>
  );
};

export default ProductCard;