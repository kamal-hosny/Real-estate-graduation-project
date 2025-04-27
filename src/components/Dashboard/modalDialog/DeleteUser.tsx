import { useCallback, useState } from "react";
import { closeModal } from "../../../store/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { deleteUser } from "../../../store/user/act/actDeleteUser";
import { addToast } from "../../../store/toasts/toastsSlice";
import { useTranslation } from "react-i18next";

const DeleteUser = () => {
  const { t } = useTranslation(""); // Use default namespace
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state?.modal?.product);
  const { token } = useAppSelector((state) => state?.auth);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await dispatch(
        deleteUser({
          id: user?.id,
          token: token || "",
        })
      ).unwrap();

      dispatch(closeModal());
      dispatch(addToast({
        message: t("deleteUser.successMessage"),
        type: "success",
      }));
    } catch (err) {
      dispatch(addToast({
        message: t("deleteUser.errorMessage"),
        type: "error"
      }));
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  const cancel = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  return (
    <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8 mx-4">
      {/* Header Section */}
      <div className="flex flex-col items-center mb-6">
        <div className="bg-red-50 p-4 rounded-full mb-4 animate-pulse">
          <svg
            className="w-12 h-12 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {t("deleteUser.title")}
        </h3>
        <p className="text-red-600 font-medium">{t("deleteUser.warning")}</p>
      </div>

      {/* User Details */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <div className="space-y-3 text-right">
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-500 font-medium">{t("deleteUser.fullNameLabel")}</span>
            <span className="text-gray-800">{user?.fullName}</span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-500 font-medium">{t("deleteUser.emailLabel")}</span>
            <span className="text-gray-800 break-all">{user?.email}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium">{t("deleteUser.phoneNumberLabel")}</span>
            <span className="text-gray-800">{user?.phoneNumber}</span>
          </div>
        </div>
      </div>

      <div className="text-center mb-8">
        <p className="text-gray-600 leading-relaxed text-sm">
          {t("deleteUser.confirmMessage")}
        </p>
      </div>

      <div className="flex justify-start gap-4">
        <button
          onClick={handleConfirm}
          disabled={isDeleting}
          className="px-6 py-3 text-white bg-red-600 rounded-xl hover:bg-red-700 transition-all duration-300 disabled:opacity-70 disabled:hover:bg-red-600 flex items-center justify-center gap-2 w-full"
        >
          {isDeleting && (
            <svg
              className="w-5 h-5 animate-spin text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
          )}
          {isDeleting ? t("deleteUser.deleting") : t("deleteUser.confirmButton")}
        </button>

        <button
          onClick={cancel}
          disabled={isDeleting}
          className="px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-300 disabled:opacity-50 w-full"
        >
          {t("deleteUser.cancelButton")}
        </button>
      </div>
    </div>
  );
};

export default DeleteUser;