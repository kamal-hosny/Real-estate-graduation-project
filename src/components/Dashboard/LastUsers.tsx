// External libraries
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Internal imports
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/rootReducer';
import { getAllUser } from '../../store/user/act/actGetAllUser';
import { TUser } from '../../types';
import { convertDate } from '../../utils/dateFun';

const LastUsers = () => {
  // Hooks
  const { t } = useTranslation("");
  const dispatch = useAppDispatch();
  const { records, loading, error } = useAppSelector((state) => state.user);
  const { token } = useAppSelector((state: RootState) => state.auth);

  // Effects
  useEffect(() => {
    dispatch(getAllUser(token || ""));
  }, [dispatch]);

  // Derived state
  const lastFiveUsers: TUser[] = records ? records.slice(-5) : [];

  // Loading state
  if (loading === "pending") {
    return <div className="text-center p-6"></div>;
  }

  // Error state
  if (error) {
    return (
      <div className="text-center p-6 text-red-500">
        {t("lastUsers.error", { error })}
      </div>
    );
  }

  return (
    <div className="bg-[#f4f7fa] p-6 rounded-lg shadow-md border border-gray-200 h-fit">
      {/* Header section */}
      <div className="flex items-center justify-between mb-4">
        <span className="flex gap-2 items-center">
          <FaUsers className="text-gray-800 text-xl" />
          <h2 className="text-xl font-bold text-gray-800 text-right">
            {t("lastUsers.title")}
          </h2>
        </span>

        <Link
          to="/dashboard/users"
          className="bg-blue-100 text-blue-600 px-4 py-2 text-sm rounded-md hover:bg-blue-200 transition-colors duration-300"
        >
          {t("lastUsers.viewMore")}
        </Link>
      </div>

      {/* Users list */}
      <div className="space-y-4">
        {lastFiveUsers.length > 0 ? (
          lastFiveUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-4 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
            >
              <img
                src={user.image || "https://res.cloudinary.com/dizj9rluo/image/upload/v1744113485/defaultPerson_e7w75t.jpg"}
                alt={user.fullName || t("lastUsers.unknownUser")}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1 text-right">
                <h3 className="text-sm font-semibold text-gray-800">
                  {user.fullName || t("lastUsers.unknownUser")}
                </h3>
                <p className="text-xs text-gray-500 flex flex-col">
                  <span>{t("lastUsers.registrationDate")}</span>
                  <span>{convertDate(user.createdAt)}</span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            {t("lastUsers.noUsers")}
          </p>
        )}
      </div>
    </div>
  );
};

export default LastUsers;