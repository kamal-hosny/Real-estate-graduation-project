// External imports
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

// Internal imports
import { RealProperty } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { supabase } from '../../../config/supabaseClient';
import { closeModal } from '../../../store/modal/modalSlice';
import { addToast } from '../../../store/toasts/toastsSlice';

// Types
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
  // Hooks
  const { t } = useTranslation("");
  const dispatch = useAppDispatch();
  const { id, property, TypeOrder } = useAppSelector(
    (state) => state.modal.product as DataP
  );

  // Form setup
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

  // Derived values
  const TypeOrderSupa: TTypeOrder = property?.status === 'For Sale' 
    ? 'PurchaseOrders' 
    : property?.status === 'For Rent' 
      ? 'RentOrders' 
      : null;

  const currentTypeOrder = watch('TypeOrder');

  // Event handlers
  const cancel = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  const supabaseDeleteOrderSale = async () => {
    try {
      if (!TypeOrderSupa || !id) {
        throw new Error('Missing TypeOrder or id');
      }

      const { error } = await supabase
        .from(TypeOrderSupa)
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error(`Failed to delete order: ${error.message}`);
      }

      dispatch(
        addToast({
          message: t("editOrder.deleteSuccess"),
          type: 'success',
        })
      );
    } catch (error) {
      dispatch(
        addToast({
          message: t("editOrder.deleteError"),
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
          message: t("editOrder.successRequired"),
          type: 'warning',
        })
      );
      return;
    }

    try {
      await supabaseDeleteOrderSale();
      dispatch(
        addToast({
          message: t("editOrder.publishSuccess"),
          type: 'success',
        })
      );
      dispatch(closeModal());
    } catch (error) {
      dispatch(
        addToast({
          message: t("editOrder.publishError"),
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
            message: t("editOrder.incompleteData"),
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
          message: t("editOrder.updateSuccess"),
          type: 'success',
        })
      );
      dispatch(closeModal());
    } catch (error) {
      dispatch(
        addToast({
          message: t("editOrder.updateError"),
          type: 'error',
        })
      );
      console.error('Update error:', error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {t("editOrder.title")}
        </h3>
        <p className="text-gray-500">
          {t("editOrder.description")}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("editOrder.typeOrderLabel")}
          </label>
          <select
            {...register('TypeOrder', {
              required: t("editOrder.typeOrderRequired"),
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Pending">
              {t("editOrder.typeOrderOptions.pending")}
            </option>
            <option value="Success">
              {t("editOrder.typeOrderOptions.success")}
            </option>
            <option value="Rejected">
              {t("editOrder.typeOrderOptions.rejected")}
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
            {t("editOrder.note")}
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
                {t("editOrder.publishButton")}
              </button>
            )}
            <span className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={cancel}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                {t("editOrder.cancelButton")}
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t("editOrder.saveButton")}
              </button>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditOrder;