import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useCallback } from "react";
import { closeModal } from "../../../store/modal/modalSlice";
import { supabase } from "../../../config/supabaseClient";
import { addToast } from "../../../store/toasts/toastsSlice";
import { createProperty } from "../../../store/property/act/actCreateProperty";
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
      TypeOrder:
        (data?.TypeOrder as "Rejected" | "Success" | "Pending") || "Rejected",
    },
    mode: "onChange",
  });

  const supabaseEditOrderSale = async (typeOrder: FormData["TypeOrder"]) => {
    try {
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

      console.log("Order updated successfully:", responseData);
      return responseData;
    } catch (error) {
      console.error("Error updating order:", error);
      throw error;
    }
  };

  const supabaseDeleteOrderSale = async () => {
    try {
        
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

      console.log("Order deleted successfully");
    } catch (error) {
      console.error("Error deleting order:", error);
      throw error;
    }
  };

  const onSubmit = async (formData: FormData) => {
    try {
      await supabaseEditOrderSale(formData.TypeOrder);
      dispatch(addToast({ message: "تم تحديث البيانات", type: "success" }));
      dispatch(closeModal());
    } catch (error) {
      dispatch(addToast({ message: "حدث مشكلة أثناء التحديث", type: "error" }));
      console.error("Submit error:", error);
    }
  };

  const onPublish = async () => {
    const typeOrder = getValues("TypeOrder");
    if (typeOrder !== "Success") {
      dispatch(
        addToast({
          message: "يجب أن تكون القيمة Success لنشر العقار",
          type: "warning",
        })
      );
      return;
    }

    try {
      // Step 1: Update the order status to "Success"
      await supabaseEditOrderSale("Success");

      // Step 2: Publish the property via API
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
                createdAt:
                  new Date().toISOString().replace("Z", "+00:00").split(".")[0] +
                  "+00:00",
                propertyImages: data.property.propertyImages,
                userId: data.property.userId,
              },
              tokenUser: data.userToken || "",
        })
      )
        .unwrap()
        .then(async () => {
          await supabaseDeleteOrderSale();

          dispatch(addToast({ message: "تم نشر العقار بنجاح", type: "success" }));
          dispatch(closeModal());
        });
    } catch (error) {
      dispatch(
        addToast({ message: "حدث مشكلة ولم يتم نشر العقار", type: "error" })
      );
      console.error("Publish error:", error);
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
          تعديل الطلب
        </h3>
        <p className="text-gray-500">قم بتعديل نوع الطلب</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            نوع الطلب
          </label>
          <select
            {...register("TypeOrder", {
              required: "يرجى اختيار نوع الطلب",
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">اختر نوع الطلب</option>
            <option value="Pending">Pending</option>
            <option value="Success">Success</option>
            <option value="Rejected">Rejected</option>
          </select>
          {errors.TypeOrder && (
            <p className="text-red-500 text-sm mt-1">
              {errors.TypeOrder.message}
            </p>
          )}
        </div>

        <div>
          <p className="text-xs font-medium text-gray-400 text-center">
            لكي تستطيع نشر عقارك يجب ان يكون الطلب Success
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
                انشر العقار
              </button>
            )}
            <span className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={cancel}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                حفظ التعديلات
              </button>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditOrderSales;