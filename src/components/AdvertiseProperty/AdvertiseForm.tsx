import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createPropertySchema,
  createPropertyType,
} from "../../validations/CreatePropertySchema";
import Input from "../Form/Input/Input";
import Select from "../Form/Select/Select";
import Img from "../ui/Img";

import { FaBuilding, FaHome, FaTag, FaDollarSign, FaMapMarkerAlt, FaCity, FaLink, FaBed, FaBath, FaDoorOpen, FaRulerCombined } from "react-icons/fa";
import { FaStairs } from "react-icons/fa6";

const AdvertiseForm = () => {
  const {
    register,
    handleSubmit,
    control,
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

  const onSubmit: SubmitHandler<createPropertyType> = (data) => {
    console.log(data);
  };

  return (
    <div className="max-w-4xl mx-auto mt-16 bg-main-color-background rounded-xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-color-text-1 mb-6">
        Property Details
      </h2>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Property Title*"
            name="title"
            type="text"
            placeholder="Modern 3-Bedroom Apartment"
            register={register}
            error={errors.title?.message}
            icon={<label htmlFor="title"><FaBuilding size={15} className=" text-color-text-2" /></label>}
          />

          <Select
            label="Property Type*"
            name="type"
            register={register}
            error={errors.type?.message}
            options={[
              { value: "", label: "Select Type" },
              ...[
                "Townhouse",
                "Villa",
                "Private House",
                "Apartment",
                "Office",
                "Shop",
              ].map((type) => ({ value: type, label: type })),
            ]}
            icon={<label htmlFor="type"><FaHome size={15} className=" text-color-text-2" /></label>}
             placeholder={"0"}
          />

          <Select
            label="Status*"
            name="status"
            register={register}
            error={errors.status?.message}
            options={["For Sale", "For Rent"].map((status) => ({
              value: status,
              label: status,
            }))}
            icon={<label htmlFor="status"><FaTag size={15} className=" text-color-text-2" /></label>}
            placeholder={"0"}
          />

          <Input
            label="Price ( ج.م )*"
            name="price"
            type="number"
            register={register}
            error={errors.price?.message}
            icon={<label htmlFor="price"><FaDollarSign size={15} className=" text-color-text-2" /></label>}
            placeholder={"0"}
          />
        </div>
        {/* Location Details */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-[#2563eb]">
            Location Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Address*"
              name="location.address"
              type="text"
              register={register}
              error={errors.location?.address?.message}
              icon={<label htmlFor="location.address"><FaMapMarkerAlt size={15} className=" text-color-text-2" /></label>}
              placeholder={"0"}
            />

            <Input
              label="City*"
              name="location.city"
              type="text"
              register={register}
              error={errors.location?.city?.message}
              icon={<label htmlFor="location.city"><FaCity size={15} className=" text-color-text-2" /></label>}
              placeholder={"0"}
            />

            <Input
              label="Google Maps Link"
              name="location.link"
              type="url"
              register={register}
              error={errors.location?.link?.message}
              icon={<label htmlFor="location.link"><FaLink size={15} className=" text-color-text-2" /></label>}
              placeholder={"0"}
            />
          </div>
        </div>
        {/* Property Details */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-[#2563eb]">
            Property Specifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input
              label="Bedrooms*"
              name="details.beds"
              type="number"
              register={register}
              error={errors.details?.beds?.message}
              icon={<label htmlFor="details.beds"><FaBed size={15} className=" text-color-text-2" /></label>}
              placeholder={"0"}
            />

            <Input
              label="Bathrooms*"
              name="details.baths"
              type="number"
              register={register}
              error={errors.details?.baths?.message}
              icon={<label htmlFor="details.baths"><FaBath size={15} className=" text-color-text-2" /></label>}
              placeholder={"0"}
            />

            <Input
              label="Total Rooms*"
              name="details.rooms"
              type="number"
              register={register}
              error={errors.details?.rooms?.message}
              icon={<label htmlFor="details.rooms"><FaDoorOpen size={15} className=" text-color-text-2" /></label>}
              placeholder={"0"}
            />

            <Input
              label="Area (m²)*"
              name="details.area"
              type="number"
              register={register}
              error={errors.details?.area?.message}
              icon={<label htmlFor="details.area"><FaRulerCombined size={15} className=" text-color-text-2" /></label>}
              placeholder={"0"}
            />

            <Input
              label="Floor Number"
              name="details.floor"
              type="number"
              register={register}
              error={errors.details?.floor?.message}
              icon={ <label htmlFor="details.floor"><FaStairs size={15} className=" text-color-text-2" /></label>}
              placeholder={"0"}
            />

            <div className="flex items-center gap-2 mt-6">
              <input
                type="checkbox"
                {...register("details.verification")}
                className="form-checkbox"
              />
              <label className="text-gray-700">Furnished</label>
            </div>
          </div>
        </div>
        {/* Description & Photos */}
        <div className="space-y-6">
          <div>
            <Controller
              name="location.images"
              control={control}
              rules={{
                required: "Images are required",
                validate: {
                  maxFiles: (files) =>
                    files.length <= 10 || "Maximum 10 images allowed",
                  validType: (files) =>
                    Array.from(files).every((file) =>
                      file.type.startsWith("image/")
                    ) || "Only image files allowed (JPEG, PNG)",
                },
              }}
              render={({ field, fieldState }) => (
                <div>
                  <label className="block text-gray-700 mb-2">
                    Property Images*
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
                      Click to upload images
                    </label>

                    {fieldState.error && (
                      <p className="text-red-500 text-sm mt-1">
                        {fieldState.error.message}
                      </p>
                    )}

                    <p className="text-gray-500 text-sm mt-2">
                      Maximum 10 images (JPEG, PNG)
                    </p>

                    {/* Display selected images */}
                    {field.value && (
                      <div className="mt-4 grid grid-cols-4 gap-2">
                        {Array.from(field.value as FileList).map(
                          (file, index) => (
                            <div key={index} className="relative group">
                              <Img
                                src={URL.createObjectURL(file)}
                                alt={`Image ${index + 1}`}
                                className="w-full h-24 object-cover rounded transition-opacity group-hover:opacity-75"
                              />

                              {/* Delete button */}
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

                                  // Create new FileList
                                  const dataTransfer = new DataTransfer();
                                  newFiles.forEach((file) =>
                                    dataTransfer.items.add(file)
                                  );

                                  // Update field value
                                  field.onChange(dataTransfer.files);

                                  // Cleanup memory
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
        </div>{" "}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
        >
          {isSubmitting ? "Submitting..." : "Submit for Review"}
        </button>
      </form>
    </div>
  );
};

export default AdvertiseForm;
