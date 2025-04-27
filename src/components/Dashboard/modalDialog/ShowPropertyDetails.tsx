import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import {
  FaMoneyBillAlt,
  FaHome,
  FaRulerCombined,
  FaBed,
  FaBath,
  FaDoorOpen,
  FaBuilding,
  FaMapMarkerAlt,
  FaCity,
  FaMapMarkedAlt,
  FaTimes,
} from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ReactNode, useCallback } from "react";
import { closeModal } from "../../../store/modal/modalSlice";

const ShowPropertyDetails = () => {
  const dispatch = useAppDispatch();
  const { property } = useAppSelector((state) => state?.modal?.product);

  const cancel = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  if (!property) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50 backdrop-blur-sm" onClick={cancel}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden border border-blue-50" onClick={(e: any) => e.stopPropagation()}>
        {/* Header Section */}
        <div className="flex justify-between items-center px-8 py-6 bg-blue-25 border-b border-blue-100">
          <h2 className="text-3xl font-bold text-blue-900 flex items-center gap-3 tracking-tight">
            <FaBuilding className="text-blue-600" />
            {property?.propertyTitle}
          </h2>
          <button
            onClick={cancel}
            className="text-blue-300 hover:text-blue-700 transition-colors duration-200 p-2 -mr-2"
          >
            <FaTimes className="text-2xl" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* Image Gallery */}
          {property?.propertyImages?.length > 0 && (
            <div className="px-8 pt-6 pb-4">
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                pagination={{
                  clickable: true,
                  bulletClass: "swiper-pagination-bullet bg-blue-100",
                  bulletActiveClass: "swiper-pagination-bullet-active bg-blue-600",
                }}
                loop={true}
                className="swiper-container shadow-lg rounded-xl overflow-hidden"
              >
                {property.propertyImages.map((img: string, index: number) => (
                  <SwiperSlide key={index}>
                    <div className="h-96 relative">
                      <img
                        src={img}
                        alt={`Property ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                      <span className="absolute top-4 right-4 bg-blue-600 text-white py-1 px-3 text-sm rounded-full shadow-sm">
                        {property.propertyType}
                      </span>
                      <span
                        className={`absolute top-[50px] right-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          property.status === "For Sale"
                            ? "bg-green-100 text-green-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {property.status}
                      </span>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}

          {/* Details Sections */}
          <div className="px-8 py-6 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Property Details Column */}
              <div className="space-y-4">
                <SectionHeading title="Property Details" />
                <DetailItem
                  icon={<FaMoneyBillAlt />}
                  title="Price"
                  value={`$${property?.price?.toLocaleString()}`}
                  accent="text-green-600"
                />
                <DetailItem
                  icon={<FaHome />}
                  title="Type"
                  value={property?.propertyType}
                />
                <DetailItem
                  icon={<FaRulerCombined />}
                  title="Area"
                  value={`${property?.area?.toLocaleString()} sqm`}
                />
              </div>

              {/* Features Column */}
              <div className="space-y-4">
                <SectionHeading title="Features" />
                <div className="grid grid-cols-2 gap-4">
                  <DetailItem
                    icon={<FaBed />}
                    title="Bedrooms"
                    value={property?.bedrooms}
                    compact
                  />
                  <DetailItem
                    icon={<FaBath />}
                    title="Bathrooms"
                    value={property?.bathrooms}
                    compact
                  />
                  <DetailItem
                    icon={<FaDoorOpen />}
                    title="Total Rooms"
                    value={property?.totalRooms}
                    compact
                  />
                  <DetailItem
                    icon={<FaBuilding />}
                    title="Floor"
                    value={property?.floorNumber}
                    compact
                  />
                </div>
                <div className={`p-4 rounded-lg ${property?.furnished ? 'bg-green-25 border border-green-100' : 'bg-amber-25 border border-amber-100'}`}>
                  <FaBuilding className="inline mr-2 text-lg text-green-600" />
                  <span className={`font-medium ${property?.furnished ? 'text-green-700' : 'text-amber-700'}`}>
                    {property?.furnished ? "Fully Furnished" : "Unfurnished"}
                  </span>
                </div>
              </div>
            </div>

            {/* Location Section */}
            <div className="space-y-4">
              <SectionHeading title="Location" />
              <div className="grid grid-cols-2 gap-4">
                <DetailItem
                  icon={<FaMapMarkerAlt />}
                  title="Address"
                  value={property?.address}
                  fullWidth
                />
                <DetailItem 
                  icon={<FaCity />}
                  title="City"
                  value={property?.city}
                  fullWidth
                />
              </div>
            </div>

            {/* Description Section */}
            <div className="space-y-4">
              <SectionHeading title="Description" />
              <p className="text-gray-700 leading-relaxed text-justify whitespace-pre-line bg-blue-25 rounded-lg p-5 border border-blue-50">
                {property?.description}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="flex gap-4 items-center p-6 bg-blue-25 border-t border-blue-100">
          {property?.googleMapsLink && (
            <a
              href={property.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all font-medium shadow-sm hover:shadow-blue-200"
            >
              <FaMapMarkedAlt className="text-xl" />
              View on Map
            </a>
          )}
          <button
            onClick={cancel}
            className="flex-1 flex items-center justify-center gap-3 px-6 py-3 text-blue-700 bg-white rounded-lg border border-blue-100 hover:border-blue-200 hover:bg-blue-50 transition-all font-medium shadow-sm hover:shadow-blue-100"
          >
            <FaTimes className="text-xl" />
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};

// Section Heading Component
const SectionHeading = ({ title }: { title: string }) => (
  <h3 className="text-xl font-semibold text-blue-900 flex items-center gap-3 pb-2 border-b border-blue-100">
    <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
    {title}
  </h3>
);

// Detail Item Component
const DetailItem = ({ 
  icon, 
  title, 
  value, 
  accent, 
  compact,
  fullWidth 
}: { 
  icon: ReactNode;
  title: string;
  value: string | number;
  accent?: string;
  compact?: boolean;
  fullWidth?: boolean;
}) => (
  <div className={`${fullWidth ? 'w-full' : 'w-auto'} ${compact ? 'p-2.5' : 'p-3.5'} flex items-center gap-4 bg-white rounded-lg border border-blue-50 hover:border-blue-100 transition-colors`}>
    <span className={`text-blue-600 ${compact ? 'text-lg p-2' : 'text-xl p-2.5'} bg-blue-25 rounded-lg`}>
      {icon}
    </span>
    <div className="flex-1">
      <span className={`${compact ? 'text-sm' : 'text-base'} font-medium text-blue-500/90`}>
        {title}
      </span>
      <span className={`block ${compact ? 'text-lg' : 'text-xl'} ${accent || 'text-blue-900'} font-semibold mt-0.5`}>
        {value}
      </span>
    </div>
  </div>
);

export default ShowPropertyDetails;