import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useTranslation } from "react-i18next";
import { deleteProperty } from "../../../store/property/act/actDeleteProperty";
import { addToast } from "../../../store/toasts/toastsSlice";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { closeModal } from "../../../store/modal/modalSlice";

const SettingsForProperty = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { product } = useAppSelector((state) => state?.modal);
  const { token } = useAppSelector((state) => state?.auth);
  const { t } = useTranslation();

  const deleteThisProperty = () => {
    if (product?.propertyId && token) {
      dispatch(
        deleteProperty({
          idProperty: product?.propertyId,
          tokenUser: token,
        })
      )
        .unwrap()
        .then(() => {
          navigate("./properties");
          cancel();
          dispatch(
            addToast({
              message: t("SettingsForProperty.delete_success_message"),
              type: "success",
            })
          );
        })
        .catch((error) => {
          dispatch(
            addToast({
              message: t("SettingsForProperty.delete_error_message"),
              type: "error",
            })
          );
          console.log(error);
        });
    }
  };

  const cancel = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  return (
    <div className="bg-main-color-background border-color-border border-2 rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 w-full max-w-[448px] mx-auto backdrop-blur-sm">
      {/* Header Section */}
      <div className="bg-section-color rounded-lg p-4 mb-4 sm:mb-6 border border-color-border">
        <h3 className="text-lg sm:text-xl font-bold text-color-text-1 text-right">
          {t("SettingsForProperty.advanced_settings_title")}
        </h3>
        <p className="text-xs sm:text-sm text-color-text-2 mt-2 text-right">
          {t("SettingsForProperty.advanced_settings_description")}
        </p>
      </div>

      {/* Actions Container */}
      <div className="space-y-6 sm:space-y-8">
        {/* Delete Section */}
        <div className="group hover:bg-section-color transition-colors rounded-xl p-4 border border-color-border">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="bg-section-color border-color-border border rounded-full p-2 sm:p-2.5">
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
            <div className="flex-1 text-right">
              <h4 className="text-sm sm:text-md font-semibold text-red-600">
                {t("SettingsForProperty.delete_property_title")}
              </h4>
              <p className="text-xs sm:text-sm text-color-text-2 mt-2 leading-5">
                {t("SettingsForProperty.delete_property_description")}
                <br />
                <span className="text-red-500 font-medium">
                  {t("SettingsForProperty.delete_property_warning")}
                </span>
              </p>
            </div>
          </div>
          <button
            onClick={deleteThisProperty}
            className="mt-4 w-full py-2 sm:py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors text-sm sm:text-base"
          >
            {t("SettingsForProperty.confirm_delete_button")}
          </button>
        </div>
      </div>

      {/* Footer Note */}
      <p className="text-xs text-color-text-2 text-center mt-4 sm:mt-6">
        {t("SettingsForProperty.auto_save_note")}
      </p>
    </div>
  );
};

export default SettingsForProperty;