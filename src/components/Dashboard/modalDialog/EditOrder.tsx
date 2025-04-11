import { useCallback } from 'react';
import { RealProperty } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useForm } from 'react-hook-form';
import { supabase } from '../../../config/supabaseClient';
import { closeModal } from '../../../store/modal/modalSlice';
import { addToast } from '../../../store/toasts/toastsSlice';

type TTypeOrder = 'PurchaseOrders' | 'RentOrders' | 'SalesOrders' | null;
type FormData = {
  TypeOrder: 'Rejected' | 'Success' | 'Pending';
};

interface DataP {
  id: number;
  TypeOrder: 'Rejected' | 'Success' | 'Pending';
  created_at: string;
  userToken?: string;
  property: RealProperty;
  RentOrders?: string;
}

const EditOrder = () => {
  const dispatch = useAppDispatch();
  const { id, property, TypeOrder } = useAppSelector(
    (state) => state.modal.product as DataP
  );

  let TypeOrderSupa: TTypeOrder = null;

  if (property?.status === 'For Sale') {
    TypeOrderSupa = 'PurchaseOrders';
  } else if (property?.status === 'For Rent') {
    TypeOrderSupa = 'RentOrders';
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
  } = useForm<FormData>({
    defaultValues: {
      TypeOrder: TypeOrder || 'Pending',
    },
    mode: 'onChange',
  });

  const supabaseDeleteOrderSale = async () => {
    try {
      if (!TypeOrderSupa || !id) {
        throw new Error('Missing TypeOrder or id');
      }

      const { error } = await supabase.from(TypeOrderSupa).delete().eq('id', id);

      if (error) {
        throw new Error(`Failed to delete order: ${error.message}`);
      }

      dispatch(
        addToast({
          message: 'تم حذف الطلب بنجاح',
          type: 'success',
        })
      );
    } catch (error) {
      dispatch(
        addToast({
          message: 'فشل في حذف الطلب',
          type: 'error',
        })
      );
      throw error;
    }
  };

  const onPublish = async () => {
    const typeOrder = getValues('TypeOrder');
    if (typeOrder !== 'Success') {
      dispatch(
        addToast({
          message: 'يجب أن يكون نوع الطلب "Success" لإتمام الصفقة',
          type: 'warning',
        })
      );
      return;
    }

    try {
      await supabaseDeleteOrderSale();
      dispatch(
        addToast({
          message: 'تم إتمام الصفقة بنجاح',
          type: 'success',
        })
      );
      dispatch(closeModal());
    } catch (error) {
      dispatch(
        addToast({
          message: 'حدث خطأ أثناء إتمام الصفقة',
          type: 'error',
        })
      );
      console.error('Confirm error:', error);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      if (!TypeOrderSupa || !id) {
        dispatch(
          addToast({
            message: 'بيانات الطلب غير مكتملة',
            type: 'error',
          })
        );
        return;
      }

      const { error } = await supabase
        .from(TypeOrderSupa)
        .update({ TypeOrder: data.TypeOrder })
        .eq('id', id);

      if (error) {
        throw new Error(`Failed to update order: ${error.message}`);
      }

      dispatch(
        addToast({
          message: 'تم تحديث الطلب بنجاح',
          type: 'success',
        })
      );
      dispatch(closeModal());
    } catch (error) {
      dispatch(
        addToast({
          message: 'فشل في تحديث الطلب',
          type: 'error',
        })
      );
      console.error('Update error:', error);
    }
  };

  const cancel = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  const currentTypeOrder = watch('TypeOrder');

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
            {...register('TypeOrder', {
              required: 'يرجى اختيار نوع الطلب',
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
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
            لكي تستطيع نشر عقارك يجب أن يكون الطلب Success
          </p>
          <div
            className={`flex items-center gap-3 mt-6 ${
              currentTypeOrder === 'Success' ? 'justify-between' : 'justify-end'
            }`}
          >
            {currentTypeOrder === 'Success' && (
              <button
                type="button"
                onClick={onPublish}
                className="px-4 py-2 text-green-700 bg-green-100 rounded-lg hover:bg-green-200 transition-colors"
              >
                إتمام الصفقة
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

export default EditOrder;