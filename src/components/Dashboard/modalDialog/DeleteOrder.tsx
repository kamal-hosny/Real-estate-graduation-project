import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { closeModal } from "../../../store/modal/modalSlice";
import { supabase } from "../../../config/supabaseClient";
import { addToast } from "../../../store/toasts/toastsSlice";

type TTypeOrder = "PurchaseOrders" | "RentOrders" | "SalesOrders";

const DeleteOrder = () => {
  const dispatch = useAppDispatch();
  const { id, property } = useAppSelector((state) => state?.modal?.product);

  const TypeOrder: TTypeOrder | null = property?.status === "For Sale" 
    ? "PurchaseOrders" 
    : property?.status === "For Rent" 
    ? "RentOrders" 
    : null;

  const confirmLog = useCallback(async () => {
    try {
      if (!TypeOrder || !id) {
        throw new Error("Missing TypeOrder or id");
      }

      const { error } = await supabase
        .from(TypeOrder)
        .delete()
        .eq("id", id);

      if (error) {
        throw error;
      }

      dispatch(addToast({ message: "تم حذف الطلب", type: "success" }));
    } catch (err) {
      dispatch(
        addToast({ message: "حدثت مشكلة، من فضلك راجع البيانات", type: "error" })
      );
      console.error(err);
    } finally {
      dispatch(closeModal());
    }
  }, [dispatch, id, TypeOrder]);

  const cancel = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    await confirmLog();
    setIsDeleting(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
      <div className="flex justify-center mb-4">
        <div className="bg-red-100 p-3 rounded-full">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
      </div>

      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">حذف الطلب</h3>
        <p className="text-gray-500">
          هل أنت متأكد من رغبتك في حذف هذا الطلب؟ لا يمكن التراجع عن هذا
          الإجراء.
        </p>
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={cancel}
          disabled={isDeleting}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          إلغاء
        </button>
        <button
          onClick={handleConfirm}
          disabled={isDeleting}
          className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDeleting ? "جاري الحذف..." : "نعم، احذف الطلب"}
        </button>
      </div>
    </div>
  );
};

export default DeleteOrder;