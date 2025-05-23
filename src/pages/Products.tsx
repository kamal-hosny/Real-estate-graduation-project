// External libraries
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

// Store
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getAllProperties } from "../store/property/act/actGetAllProperties";

// Types
import { RealProperty } from "../types";

// Components
import LottieHandler from "../components/common/feedback/LottieHandler/LottieHandler";
import ProductCard from "../components/common/ProductCard/ProductCard";
import Breadcrumb from "../components/Products/Breadcrumb";
import Search from "../components/Products/Search";
import UserCompany from "../components/Products/UserCompany";
import ProductCardSkeleton from "../components/SkeletonsUi/ProductCardSkeleton";

// Selectors
import LimitSelector from "../components/Products/Selectors/LimitSelector";
import TransactionTypeSelector from "../components/Products/Selectors/TransactionTypeSelector";
import TypeSelector from "../components/Products/Selectors/TypeSelector";
import VerificationSelector from "../components/Products/Selectors/VerificationSelector";

// Assets
import mainImage from "../assets/advertiseProperty/advertiseProperty.avif";

// Types
type TransactionType = "For Sale" | "For Rent" | "Sold" | "Rented";
type PropertyType =
  | "Townhouse"
  | "Villa"
  | "Private House"
  | "Apartment"
  | "Office"
  | "Shop";

// Constants
const breadcrumbItems = [{ label: "Home", link: "/" }];

// Helper Functions
const normalizePropertyType = (type: string | null): PropertyType | null => {
  if (!type) return null;

  const typeMap: { [key: string]: PropertyType } = {
    privatehouse: "Private House",
    townhouse: "Townhouse",
    villa: "Villa",
    apartment: "Apartment",
    office: "Office",
    shop: "Shop",
  };

  const normalizedType = type.toLowerCase().replace(/\s+/g, "");
  return typeMap[normalizedType] || null;
};

const Products = () => {
  // Hooks
  const [searchParams] = useSearchParams();
  const getTypeUrl = searchParams.get("type");
  const getCompanyId = searchParams.get("companyId");
  const initialPropertyType = normalizePropertyType(getTypeUrl);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  // State Management
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
  const [limit, setLimit] = useState<number | null>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Filter State
  const [filterValues, setFilterValues] = useState<{
    propertyType: PropertyType | null;
    transactionType: TransactionType | null;
    verification: boolean;
    companyId: string | null;
  }>({
    propertyType: initialPropertyType,
    transactionType: null,
    verification: false,
    companyId: getCompanyId,
  });

  // Data Fetching
  useEffect(() => {
    dispatch(getAllProperties());
  }, [dispatch]);

  // URL Parameter Effects
  useEffect(() => {
    setFilterValues({
      propertyType: initialPropertyType,
      transactionType: null,
      verification: false,
      companyId: getCompanyId,
    });
    setCurrentPage(1);
  }, [getCompanyId, initialPropertyType]);

  // Data Selection
  const { records, loading, error } = useAppSelector((state) => state?.property);
  const propertiesData = records.$values;

  // Search Debouncing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 200);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Property Filtering
  const filteredProperties = useMemo(() => {
    if (!propertiesData || !propertiesData.length) return [];
    
    let result = [...propertiesData];

    // Apply filters only if they have values
    if (filterValues.propertyType) {
      result = result.filter(
        (property: RealProperty) =>
          property.propertyType?.toLowerCase() === filterValues.propertyType?.toLowerCase()
      );
    }

    if (filterValues.transactionType) {
      result = result.filter(
        (property: RealProperty) =>
          property.status?.toLowerCase() === filterValues.transactionType?.toLowerCase()
      );
    }

    if (filterValues.verification) {
      result = result.filter(
        (property: RealProperty) => property.furnished === true
      );
    }

    if (filterValues.companyId) {
      result = result.filter(
        (property: RealProperty) => property.userId === filterValues.companyId
      );
    }

    if (debouncedSearchTerm.trim()) {
      const searchLower = debouncedSearchTerm.toLowerCase();
      result = result.filter((property: RealProperty) =>
        [
          property.propertyTitle,
          property.city,
          property.address,
          property.description,
        ].some((field) => field?.toLowerCase().includes(searchLower))
      );
    }

    // Sort by most recent first
    result.sort((a, b) => {
      const dateA = typeof a.createdAt === 'number' ? a.createdAt : 0;
      const dateB = typeof b.createdAt === 'number' ? b.createdAt : 0;
      return dateB - dateA;
    });

    return result;
  }, [
    propertiesData,
    filterValues.propertyType,
    filterValues.transactionType,
    filterValues.verification,
    filterValues.companyId,
    debouncedSearchTerm,
  ]);

  // Pagination Calculations
  const totalItems = filteredProperties.length;
  const itemsPerPage = limit || 10;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedProperties = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProperties.slice(startIndex, endIndex);
  }, [filteredProperties, currentPage, itemsPerPage]);

  // Event Handlers
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top of products section
      const productsSection = document.querySelector('.products');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // UI Components
  const getPaginationItems = () => {
    const maxPagesToShow = 5;
    const items = [];
    const ellipsis = <span className="px-3 py-1 text-gray-700">...</span>;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-3 py-1 rounded ${
              currentPage === i
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {i}
          </button>
        );
      }
    } else {
      const leftBound = Math.max(2, currentPage - 1);
      const rightBound = Math.min(totalPages - 1, currentPage + 1);

      items.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={`px-3 py-1 rounded ${
            currentPage === 1
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          1
        </button>
      );

      if (leftBound > 2) {
        items.push(<span key="left-ellipsis">{ellipsis}</span>);
      }

      for (let i = leftBound; i <= rightBound; i++) {
        items.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-3 py-1 rounded ${
              currentPage === i
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {i}
          </button>
        );
      }

      if (rightBound < totalPages - 1) {
        items.push(<span key="right-ellipsis">{ellipsis}</span>);
      }

      items.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`px-3 py-1 rounded ${
            currentPage === totalPages
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return items;
  };

  // Reset current page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filterValues, debouncedSearchTerm]);

  // Add loading and error states
  if (loading === "pending") {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 w-full max-md:gap-2 max-lg:gap-3 gap-2 max-md:justify-items-stretch md:grid-cols-1 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LottieHandler type="error" message={error} />
      </div>
    );
  }

  if (!propertiesData || propertiesData.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LottieHandler type="empty" message="No properties found. Please try adjusting your filters." />
      </div>
    );
  }

  // Main Render
  return (
    <div className="bg-section-color relative min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[300px] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat border-b-2 border-color-border"
          style={{ backgroundImage: `url(${mainImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div className="absolute z-[11] inset-0 flex justify-center items-center bg-gradient-to-t from-black/60 to-transparent">
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

        <div className="container relative mx-auto px-4 z-10 flex flex-col justify-end">
          <Breadcrumb items={breadcrumbItems} itemNow={"Properties"} />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        {filterValues.companyId && <UserCompany userId={filterValues.companyId} />}
        <div className="relative z-10 mat flex justify-between gap-2 mt-6">
          <div className="products w-full bg-main-color-background border-2 border-color-border flex flex-col gap-4 p-2">
            {/* Search and Filters */}
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

            {/* Products Grid */}
            <div className="cards">
              <div className="grid grid-cols-1 w-full max-md:gap-2 max-lg:gap-3 gap-2 max-md:justify-items-stretch md:grid-cols-1 lg:grid-cols-3">
                {paginatedProperties.length > 0 ? (
                  paginatedProperties.map((property: RealProperty) => (
                    <ProductCard
                      key={property.propertyId}
                      productData={property}
                    />
                  ))
                ) : (
                  <p className="text-center text-color-text-2 col-span-full py-4">
                    <LottieHandler type="empty" message="No products found." />
                  </p>
                )}
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination flex justify-center items-center gap-2 mt-4 flex-wrap">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50 hover:bg-gray-300"
                >
                  Previous
                </button>
                {getPaginationItems()}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50 hover:bg-gray-300"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;