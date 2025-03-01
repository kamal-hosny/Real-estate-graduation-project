import { useEffect, useMemo, useState } from "react";
import Breadcrumb from "../components/Products/Breadcrumb";
import Search from "../components/Products/Search";
import ProductCard from "../components/common/ProductCard/ProductCard";
import Pagination from "../components/Products/Pagination";
import LimitSelector from "../components/Products/Selectors/LimitSelector";
import ProductCardSkeleton from "../components/SkeletonsUi/ProductCardSkeleton";
import LottieHandler from "../components/common/feedback/LottieHandler/LottieHandler";
import mainImage from "../assets/advertiseProperty/advertiseProperty.avif";
import TypeSelector from "../components/Products/Selectors/TypeSelector";
import TransactionTypeSelector from "../components/Products/Selectors/TransactionTypeSelector";
import VerificationSelector from "../components/Products/Selectors/VerificationSelector";
import { sampleProperties } from "../data/data";
import { useNavigate, useSearchParams } from "react-router-dom";

import { FaWhatsapp } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { Mail, X } from "lucide-react";
import { useTranslation } from "react-i18next";

type TransactionType = "sale" | "rent";
type PropertyType =
  | "Townhouse"
  | "Villa"
  | "Private House"
  | "Apartment"
  | "Office"
  | "Shop";

const validPropertyTypes: PropertyType[] = [
  "Townhouse",
  "Villa",
  "Private House",
  "Apartment",
  "Office",
  "Shop",
];

const breadcrumbItems = [{ label: "Home", link: "/" }];

const Products = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const getTypeUrl = searchParams.get("type");
  const getCompanyId = searchParams.get("companyId");

  console.log(getCompanyId);

  const initialPropertyType = validPropertyTypes.includes(
    getTypeUrl as PropertyType
  )
    ? (getTypeUrl as PropertyType)
    : null;

  // State management
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number | null>(1);
  const [limit, setLimit] = useState<number | null>(10);

  // Filters
  const [filterValues, setFilterValues] = useState<{
    propertyType: PropertyType | null;
    transactionType: TransactionType | null;
    verification: boolean;
  }>({
    propertyType: initialPropertyType,
    transactionType: null,
    verification: false,
  });

  const loading = null;
  const error = null;
  const products = sampleProperties.data.data;
  const meta = sampleProperties.meta;

  const { t } = useTranslation();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 200);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    setPageNumber(1);
  }, [debouncedSearchTerm, filterValues]);

  // Loading skeleton
  const loadingSkeleton = useMemo(() => {
    return Array.from({ length: 6 }, (_, index) => (
      <ProductCardSkeleton key={index} />
    ));
  }, []);

  if (error) {
    return (
      <div className="relative login bg-section-color w-screen h-[calc(100vh-65px)] flex justify-center items-center">
        <LottieHandler type="error" message={error} />
      </div>
    );
  }

  return (
    <div className="bg-section-color relative min-h-screen">
      {/* Hero Section with Background Image */}
      <div className="relative h-[300px] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat border-b-2 border-color-border"
          style={{ backgroundImage: `url(${mainImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div className="absolute z-[11] inset-0 flex justify-center items-center  bg-gradient-to-t from-black/60 to-transparent">
          <div className="title">
            <div className="flex justify-center items-center gap-4 flex-col translate-y-6">
              <p className="text-5xl max-sm:text-3xl text-white font-bold">
              {t("properties_page.hero.title")}
              </p>
              <p className="text-white max-sm:text-xs text-lg">
              {t("properties_page.hero.subtitle")}
              </p>
            </div>
          </div>
        </div>

        {/* Breadcrumb Container */}
        <div className="container relative mx-auto px-4 z-10 flex flex-col justify-end">
          <Breadcrumb items={breadcrumbItems} itemNow={"Properties"} />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        {getCompanyId && (
          <div className="bg-main-color-background p-4 rounded relative">
          <div className="flex flex-col md:flex-row gap-4 p-4 rounded-lg">
            <img
              className="w-full md:w-48 h-48 object-cover rounded-lg border-2 border-color-border"
              src="https://images.bayut.eg/thumbnails/18031029-240x180.webp"
              alt="Property preview"
            />

            <div className="flex flex-col gap-4 flex-1">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-color-text-1">
                {t("properties_page.contact.property_name")}
                </h2>
                <div className="bg-section-color p-3 rounded-lg">
                  <p className="text-color-text-2 font-medium">
                  {t("properties_page.contact.title")}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://wa.me/01203023"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 min-w-[150px]"
                >
                  <div className="bg-green-100 hover:bg-green-200 text-green-700 p-3 rounded-lg border-2 border-green-300 flex items-center justify-center gap-2 transition-colors">
                    <FaWhatsapp size={24} />
                    <span className="font-medium">{t("properties_page.contact.whatsapp")}</span>
                  </div>
                </a>

                <a href="tel:01203023" className="flex-1 min-w-[150px]">
                  <div className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-3 rounded-lg border-2 border-blue-300 flex items-center justify-center gap-2 transition-colors">
                    <IoIosCall size={24} />
                    <span className="font-medium">            {t("properties_page.contact.call")}</span>
                  </div>
                </a>

                <a href="mailto:kaml@gmail" className="flex-1 min-w-[150px]">
                  <div className="bg-red-100 hover:bg-red-200 text-red-700 p-3 rounded-lg border-2 border-red-300 flex items-center justify-center gap-2 transition-colors">
                    <Mail size={24} />
                    <span className="font-medium">
                    {t("properties_page.contact.email")}
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <span
            onClick={() => {
              navigate("/properties");
            }}
            className="bg-red-600 hover:bg-red-700 text-gray-200 hover:text-white transition-all absolute top-0 end-0 rounded"
          >
            <X className="cursor-pointer p-1 " />
          </span>
        </div>
        )}
        
        <div className={`relative z-10 mat flex justify-between gap-2 mt-6`}>
          {/* Products section */}
          <div className="products w-full bg-main-color-background border-2 border-color-border flex flex-col gap-4 p-2">
            <div className="head w-full space-y-4">
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              <div className="head-filtration flex flex-wrap gap-2">
                <LimitSelector limit={limit} setLimit={setLimit} />
                <TypeSelector
                  filterValues={filterValues.propertyType}
                  setFilterValues={(value) =>
                    setFilterValues((prev) => ({
                      ...prev,
                      propertyType: value,
                    }))
                  }
                />
                <TransactionTypeSelector
                  filterType={filterValues.transactionType}
                  setFilterType={(value) =>
                    setFilterValues((prev) => ({
                      ...prev,
                      transactionType: value,
                    }))
                  }
                />
                <VerificationSelector
                  isVerified={filterValues.verification}
                  setIsVerified={(value) =>
                    setFilterValues((prev) => ({
                      ...prev,
                      verification: value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="cards">
              <div
                className="grid grid-cols-1 w-full max-md:gap-2 max-lg:gap-3 gap-2 
                   max-md:justify-items-stretch md:grid-cols-1 lg:grid-cols-3"
              >
                {loading === "pending"
                  ? loadingSkeleton
                  : products.map((product: any) => (
                      <ProductCard key={product.id} productData={product} />
                    ))}
              </div>
            </div>
            <div className="pagination">
              <Pagination
                lastPage={meta?.last_page}
                currentPage={pageNumber}
                setCurrentPage={setPageNumber}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
