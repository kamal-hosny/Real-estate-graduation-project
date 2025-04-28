import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { supabase } from "../../../config/supabaseClient";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { closeModal } from "../../../store/modal/modalSlice";
import { createProperty } from "../../../store/property/act/actCreateProperty";
import { addToast } from "../../../store/toasts/toastsSlice";
import { RealProperty } from "../../../types";

type FormData = {
  TypeOrder: "Rejected" | "Success" | "Pending";
};

interface DataP {
  id: number;
  TypeOrder: string;
  created_at: string;
  userToken?: string;
  property: RealProperty;
}

const EditOrderSales = () => {
  const { t } = useTranslation("");
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.modal.product as DataP);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
  } = useForm<FormData>({
    defaultValues: {
      TypeOrder: (data?.TypeOrder as "Rejected" | "Success" | "Pending") || "Rejected",
    },
    mode: "onChange",
  });

  const supabaseEditOrderSale = async (typeOrder: FormData["TypeOrder"]) => {
    if (!data?.id) {
      throw new Error("No order ID provided");
    }

    const { data: responseData, error } = await supabase
      .from("SalesOrders")
      .update({
        userToken: data?.userToken,
        property: { ...data.property, status: data?.property?.status },
        TypeOrder: typeOrder,
      })
      .eq("id", data.id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update order: ${error.message}`);
    }

    return responseData;
  };

  const supabaseDeleteOrderSale = async () => {
    if (!data?.id) {
      throw new Error("No order ID provided for deletion");
    }

    const { error } = await supabase
      .from("SalesOrders")
      .delete()
      .eq("id", data?.id);

    if (error) {
      throw new Error(`Failed to delete order: ${error.message}`);
    }
  };

  const onSubmit = async (formData: FormData) => {
    try {
      await supabaseEditOrderSale(formData.TypeOrder);
      dispatch(addToast({ 
        message: t("editOrderSales.updateSuccess"), 
        type: "success" 
      }));
      dispatch(closeModal());
    } catch {
      dispatch(addToast({ 
        message: t("editOrderSales.updateError"), 
        type: "error" 
      }));
    }
  };

  const onPublish = async () => {
    const typeOrder = getValues("TypeOrder");
    if (typeOrder !== "Success") {
      dispatch(
        addToast({
          message: t("editOrderSales.successRequired"),
          type: "warning",
        })
      );
      return;
    }

    try {
      await supabaseEditOrderSale("Success");

      await dispatch(
        createProperty({
          property: {
            propertyId: 0,
            propertyTitle: data.property.propertyTitle,
            propertyType: data.property.propertyType,
            price: data.property.price,
            status: data.property.status,
            city: data.property.city,
            address: data.property.address,
            googleMapsLink: data.property.googleMapsLink,
            totalRooms: data.property.totalRooms,
            bathrooms: data.property.bathrooms,
            bedrooms: data.property.bedrooms,
            floorNumber: data.property.floorNumber,
            area: data.property.area,
            furnished: data.property.furnished,
            description: data.property.description,
            createdAt: new Date().toISOString().replace("Z", "+00:00").split(".")[0] + "+00:00",
            propertyImages: data.property.propertyImages,
            userId: data.property.userId,
          },
          tokenUser: data.userToken || "",
        })
      )
        .unwrap()
        .then(async () => {
          await supabaseDeleteOrderSale();
          dispatch(addToast({ 
            message: t("editOrderSales.publishSuccess"), 
            type: "success" 
          }));
          dispatch(closeModal());
        });
    } catch {
      dispatch(
        addToast({ 
          message: t("editOrderSales.publishError"), 
          type: "error" 
        })
      );
    }
  };

  const cancel = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  const currentTypeOrder = watch("TypeOrder");

  return (
    <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {t("editOrderSales.title")}
        </h3>
        <p className="text-gray-500">
          {t("editOrderSales.description")}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("editOrderSales.typeOrderLabel")}
          </label>
          <select
            {...register("TypeOrder", {
              required: t("editOrderSales.typeOrderRequired"),
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">
              {t("editOrderSales.typeOrderPlaceholder")}
            </option>
            <option value="Pending">
              {t("editOrderSales.typeOrderOptions.pending")}
            </option>
            <option value="Success">
              {t("editOrderSales.typeOrderOptions.success")}
            </option>
            <option value="Rejected">
              {t("editOrderSales.typeOrderOptions.rejected")}
            </option>
          </select>
          {errors.TypeOrder && (
            <p className="text-red-500 text-sm mt-1">
              {errors.TypeOrder.message}
            </p>
          )}
        </div>

        <div>
          <p className="text-xs font-medium text-gray-400 text-center">
            {t("editOrderSales.note")}
          </p>
          <div
            className={`flex items-center gap-3 mt-6 ${
              currentTypeOrder === "Success" ? "justify-between" : "justify-end"
            }`}
          >
            {currentTypeOrder === "Success" && (
              <button
                type="button"
                onClick={onPublish}
                className="px-4 py-2 text-green-700 bg-green-100 rounded-lg hover:bg-green-200 transition-colors"
              >
                {t("editOrderSales.publishButton")}
              </button>
            )}
            <span className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={cancel}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                {t("editOrderSales.cancelButton")}
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t("editOrderSales.saveButton")}
              </button>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditOrderSales;