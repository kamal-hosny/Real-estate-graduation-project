import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createPropertySchema,
  createPropertyType,
} from "../../validations/CreatePropertySchema";
import Input from "../Form/Input/Input";
import Select from "../Form/Select/Select";
import Img from "../ui/Img";
import { useTranslation } from "react-i18next";

import {
  FaBuilding,
  FaHome,
  FaTag,
  FaDollarSign,
  FaMapMarkerAlt,
  FaCity,
  FaLink,
  FaBed,
  FaBath,
  FaDoorOpen,
  FaRulerCombined,
} from "react-icons/fa";
import { FaStairs } from "react-icons/fa6";
import { uploadToCloudinary } from "../../utils/cloudinary";
import { supabase } from "../../config/supabaseClient";
import { useAppSelector } from "../../store/hooks";

const AdvertiseForm = () => {
  const { user, token } = useAppSelector((state ) => state.auth);
const userId = user?.id
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<createPropertyType>({
    resolver: zodResolver(createPropertySchema),
    defaultValues: {
      company: {
        name: "kamal hosny",
        email: "kamal@gmail.com",
        avatar:
          "https://scontent.fcai20-5.fna.fbcdn.net/v/t39.30808-6/471173919_604173548811444_6873304816673987611_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=2wDOodDY5x4Q7kNvgEJIi23&_nc_oc=AdhmnqFQ1HYafpCeU64_F14ipvKQauXrrKwfPpO8hHnTpG5fz4WPjJW2cn_-TK2hTnY&_nc_zt=23&_nc_ht=scontent.fcai20-5.fna&_nc_gid=Ast2SjxgtoOMKRfCCZZXOhw&oh=00_AYDMq0awBCHpHlKUbG31_N02e7Cknu2vqn-CGCPjtdIucg&oe=67BD74B3",
        phone: "01013655708",
      },
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<createPropertyType> = async (data) => {
    if(!token){
      return 
    }
    try {
      const files = data.location.images as FileList;
      if (!files || files.length === 0) {
        alert("Please select images to upload");
        return;
      }
      console.log("Uploading files...");
      const uploadPromises = Array.from(files).map((file) =>
        uploadToCloudinary(file)
      );
      const cloudinaryResults = await Promise.all(uploadPromises);
      const imageUrls = cloudinaryResults.map((result) => result.secure_url);

      const formData = {
        ...data,
        location: {
          ...data.location,
          images: imageUrls,
        },
      };
      console.log("Final Form Data:", formData);
      // Send data to Supabase
      const { data: salesOrderData, error } = await supabase

        .from("SalesOrders") 
        .insert([
          {
            userToken: token, 
            property: {
              "propertyId": 0,
              "propertyTitle": formData.title,
              "propertyType": formData.type,
              "price": formData.price,
              "status": formData.status,
              "city": formData.location.city,
              "address": formData.location.address,
              "googleMapsLink": formData.location.link,
              "totalRooms": formData.details.rooms,
              "bathrooms": formData.details.baths,
              "bedrooms": formData.details.beds,
              "floorNumber": formData.details.floor,
              "area": formData.details.area,
              "furnished": true,
              "description": formData.description ,
              "createdAt": Date.now(),
              "propertyImages": formData.location.images,
              "userId": userId
            }, 
            TypeOrder: "Pending",
          },
        ]);

      if (error) {
        console.error("Error inserting data into Supabase:", error);
        alert(`Failed to save data: ${error.message}`);
        return;
      }

      console.log("Data inserted successfully:", salesOrderData);
      alert("Property order submitted successfully!");

      // Reset the form after successful submission
      reset();
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-16 bg-main-color-background rounded-xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-color-text-1 mb-6">
        {t("formPropertyDetails.propertyDetails")}
      </h2>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label={t("formPropertyDetails.propertyTitle")}
            name="title"
            type="text"
            placeholder={t("formPropertyDetails.propertyTitlePlaceholder")}
            register={register}
            error={errors.title?.message}
            icon={
              <label htmlFor="title">
                <FaBuilding size={15} className="text-color-text-2" />
              </label>
            }
          />

          <Select
            label={t("formPropertyDetails.propertyType")}
            name="type"
            register={register}
            error={errors.type?.message}
            options={[
              { value: "", label: t("formPropertyDetails.selectType") },
              ...[
                "Townhouse",
                "Villa",
                "Privatehouse",
                "Apartment",
                "Office",
                "Shop",
              ].map((type) => ({
                value: type,
                label: t(`formPropertyDetails.${type.toLowerCase()}`),
              })),
            ]}
            icon={
              <label htmlFor="type">
                <FaHome size={15} className="text-color-text-2" />
              </label>
            }
            placeholder={t("formPropertyDetails.selectType")}
          />

          <Select
            label={t("formPropertyDetails.status")}
            name="status"
            register={register}
            error={errors.status?.message}
            options={["For Sale", "For Rent"].map((status) => ({
              value: status,
              label: t(
                `formPropertyDetails.${status.toLowerCase().replace(" ", "")}`
              ),
            }))}
            icon={
              <label htmlFor="status">
                <FaTag size={15} className="text-color-text-2" />
              </label>
            }
            placeholder={t("formPropertyDetails.selectStatus")}
          />

          <Input
            label={t("formPropertyDetails.price")}
            name="price"
            type="number"
            register={register}
            error={errors.price?.message}
            icon={
              <label htmlFor="price">
                <FaDollarSign size={15} className="text-color-text-2" />
              </label>
            }
            placeholder={t("formPropertyDetails.pricePlaceholder")}
          />
        </div>

        {/* Location Details */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-[#2563eb]">
            {t("formPropertyDetails.locationDetails")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label={t("formPropertyDetails.address")}
              name="location.address"
              type="text"
              register={register}
              error={errors.location?.address?.message}
              icon={
                <label htmlFor="location.address">
                  <FaMapMarkerAlt size={15} className="text-color-text-2" />
                </label>
              }
              placeholder={t("formPropertyDetails.addressPlaceholder")}
            />

            <Input
              label={t("formPropertyDetails.city")}
              name="location.city"
              type="text"
              register={register}
              error={errors.location?.city?.message}
              icon={
                <label htmlFor="location.city">
                  <FaCity size={15} className="text-color-text-2" />
                </label>
              }
              placeholder={t("formPropertyDetails.cityPlaceholder")}
            />

            <Input
              label={t("formPropertyDetails.googleMapsLink")}
              name="location.link"
              type="url"
              register={register}
              error={errors.location?.link?.message}
              icon={
                <label htmlFor="location.link">
                  <FaLink size={15} className="text-color-text-2" />
                </label>
              }
              placeholder={t("formPropertyDetails.googleMapsLinkPlaceholder")}
            />
          </div>
        </div>

        {/* Property Specifications */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-[#2563eb]">
            {t("formPropertyDetails.propertySpecifications")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input
              label={t("formPropertyDetails.bedrooms")}
              name="details.beds"
              type="number"
              register={register}
              error={errors.details?.beds?.message}
              icon={
                <label htmlFor="details.beds">
                  <FaBed size={15} className="text-color-text-2" />
                </label>
              }
              placeholder={t("formPropertyDetails.numberPlaceholder")}
            />

            <Input
              label={t("formPropertyDetails.bathrooms")}
              name="details.baths"
              type="number"
              register={register}
              error={errors.details?.baths?.message}
              icon={
                <label htmlFor="details.baths">
                  <FaBath size={15} className="text-color-text-2" />
                </label>
              }
              placeholder={t("formPropertyDetails.numberPlaceholder")}
            />

            <Input
              label={t("formPropertyDetails.totalRooms")}
              name="details.rooms"
              type="number"
              register={register}
              error={errors.details?.rooms?.message}
              icon={
                <label htmlFor="details.rooms">
                  <FaDoorOpen size={15} className="text-color-text-2" />
                </label>
              }
              placeholder={t("formPropertyDetails.numberPlaceholder")}
            />

            <Input
              label={t("formPropertyDetails.area")}
              name="details.area"
              type="number"
              register={register}
              error={errors.details?.area?.message}
              icon={
                <label htmlFor="details.area">
                  <FaRulerCombined size={15} className="text-color-text-2" />
                </label>
              }
              placeholder={t("formPropertyDetails.areaPlaceholder")}
            />

            <Input
              label={t("formPropertyDetails.floorNumber")}
              name="details.floor"
              type="number"
              register={register}
              error={errors.details?.floor?.message}
              icon={
                <label htmlFor="details.floor">
                  <FaStairs size={15} className="text-color-text-2" />
                </label>
              }
              placeholder={t("formPropertyDetails.numberPlaceholder")}
            />

            <div className="flex items-center gap-2 mt-6">
              <input
                type="checkbox"
                {...register("details.verification")}
                className="form-checkbox"
              />
              <label className="text-gray-700">
                {t("formPropertyDetails.furnished")}
              </label>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-[#2563eb]">
            {t("formPropertyDetails.description")}
          </h3>
          <div className="relative">
            <textarea
              {...register("description")}
              className="ps-8 min-h-32 p-2 bg-section-color text-sm w-full border border-color-border rounded placeholder-color-text-2 text-color-text-1 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              placeholder={t("formPropertyDetails.descriptionPlaceholder")}
            />
            <span className="absolute start-3 top-3">
              <FaRulerCombined size={15} className="text-color-text-2" />
            </span>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>
        {/* Description & Photos */}
        <div className="space-y-6">
          <div>
            <Controller
              name="location.images"
              control={control}
              rules={{
                required: t("formPropertyDetails.imagesRequired"),
                validate: {
                  maxFiles: (files) =>
                    files.length <= 10 ||
                    t("formPropertyDetails.maxImagesError"),
                  validType: (files) =>
                    Array.from(files).every((file) =>
                      file.type.startsWith("image/")
                    ) || t("formPropertyDetails.imageTypeError"),
                },
              }}
              render={({ field, fieldState }) => (
                <div>
                  <label className="block text-gray-700 mb-2">
                    {t("formPropertyDetails.propertyImages")}
                  </label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <input
                      type="file"
                      id="fileInput"
                      multiple
                      accept="image/jpeg, image/png"
                      onChange={(e) => {
                        const files = e.target.files;
                        if (files) {
                          field.onChange(files);
                        }
                      }}
                      className="hidden"
                    />
                    <label
                      htmlFor="fileInput"
                      className="cursor-pointer text-blue-600 hover:text-blue-800"
                    >
                      {t("formPropertyDetails.clickToUpload")}
                    </label>

                    {fieldState.error && (
                      <p className="text-red-500 text-sm mt-1">
                        {fieldState.error.message}
                      </p>
                    )}

                    <p className="text-gray-500 text-sm mt-2">
                      {t("formPropertyDetails.imageConstraints")}
                    </p>

                    {field.value && (
                      <div className="mt-4 grid grid-cols-4 gap-2">
                        {Array.from(field.value as FileList).map(
                          (file, index) => (
                            <div key={index} className="relative group">
                              <Img
                                src={URL.createObjectURL(file)}
                                alt={`${t("formPropertyDetails.image")} ${
                                  index + 1
                                }`}
                                className="w-full h-24 object-cover rounded transition-opacity group-hover:opacity-75"
                              />
                              <button
                                type="button"
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                onClick={() => {
                                  const files = Array.from(
                                    field.value as FileList
                                  );
                                  const newFiles = files.filter(
                                    (_, i) => i !== index
                                  );
                                  const dataTransfer = new DataTransfer();
                                  newFiles.forEach((file) =>
                                    dataTransfer.items.add(file)
                                  );
                                  field.onChange(dataTransfer.files);
                                  URL.revokeObjectURL(
                                    URL.createObjectURL(file)
                                  );
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                              <span className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-2 rounded">
                                {index + 1}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
        >
          {isSubmitting
            ? t("formPropertyDetails.submitting")
            : t("formPropertyDetails.submitForReview")}
        </button>
      </form>
    </div>
  );
};

export default AdvertiseForm;
