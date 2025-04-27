import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { closeModal } from "../../../store/modal/modalSlice";
import { FiMail, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { UserRound } from "lucide-react";
import { convertDate } from "../../../utils/dateFun";
import { useTranslation } from "react-i18next";

interface UserData {
  fullName: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  image?: string;
}

const ShowUserDetails = () => {
  const { t } = useTranslation(""); // Use default namespace
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state?.modal?.product) as UserData | undefined;

  const handleClose = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  if (!userData) {
    return (
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 mx-4">
        <p className="text-gray-600 text-center">{t("ShowUserDetails.noData")}</p>
        <div className="flex justify-end">
          <button
            onClick={handleClose}
            className="px-5 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm shadow-sm hover:shadow-md"
          >
            {t("ShowUserDetails.button.close")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 mx-4">
      <div className="flex items-start gap-4 mb-6">
        <div className="shrink-0">
          {userData.image ? (
            <img
              src={userData.image}
              alt={t("ShowUserDetails.imageAlt")}
              className="w-20 h-20 rounded-full object-cover border-4 border-purple-50 shadow-sm"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center border-4 border-purple-50">
              <UserRound className="w-8 h-8 text-purple-600" />
            </div>
          )}
        </div>

        <div className="space-y-1">
          <h3 className="text-2xl font-bold text-gray-900 capitalize">
            {userData.fullName || t("ShowUserDetails.unknown")}
          </h3>
          <div className="space-y-0.5">
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <FiMail className="w-4 h-4 text-purple-600" />
              {userData.email || t("ShowUserDetails.unknown")}
            </p>
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <FiPhone className="w-4 h-4 text-blue-600" />
              {userData.phoneNumber || t("ShowUserDetails.unknown")}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-3 px-4 py-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-700">
            {t("ShowUserDetails.label.memberSince")}:
          </span>{" "}
          {userData.createdAt
            ? convertDate(userData.createdAt)
            : t("ShowUserDetails.unknown")}
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-3">
        <a
          href={userData.email ? `mailto:${userData.email}` : "#"}
          className={`flex-1 flex justify-center items-center p-3 rounded-xl transition-colors shadow-sm hover:shadow-md ${
            userData.email
              ? "bg-purple-100 hover:bg-purple-200"
              : "bg-gray-100 cursor-not-allowed"
          }`}
          aria-disabled={!userData.email}
        >
          <FiMail className="w-7 h-7 text-purple-600" />
        </a>
        <a
          href={userData.phoneNumber ? `https://wa.me/${userData.phoneNumber}` : "#"}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex-1 flex justify-center items-center p-3 rounded-xl transition-colors shadow-sm hover:shadow-md ${
            userData.phoneNumber
              ? "bg-green-100 hover:bg-green-200"
              : "bg-gray-100 cursor-not-allowed"
          }`}
          aria-disabled={!userData.phoneNumber}
        >
          <FaWhatsapp className="w-7 h-7 text-green-600" />
        </a>
        <a
          href={userData.phoneNumber ? `tel:${userData.phoneNumber}` : "#"}
          className={`flex-1 flex justify-center items-center p-3 rounded-xl transition-colors shadow-sm hover:shadow-md ${
            userData.phoneNumber
              ? "bg-blue-100 hover:bg-blue-200"
              : "bg-gray-100 cursor-not-allowed"
          }`}
          aria-disabled={!userData.phoneNumber}
        >
          <FiPhone className="w-7 h-7 text-blue-600" />
        </a>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleClose}
          className="px-5 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm shadow-sm hover:shadow-md"
        >
          {t("ShowUserDetails.button.close")}
        </button>
      </div>
    </div>
  );
};

export default ShowUserDetails;