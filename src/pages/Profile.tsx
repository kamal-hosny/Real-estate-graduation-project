import { useEffect } from "react";
import Breadcrumb from "../components/Products/Breadcrumb";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getOneUser } from "../store/user/act/actGetOneUser";
import LottieHandler from "../components/common/feedback/LottieHandler/LottieHandler";

type UserData = {
  name: string;
  phone: string;
  email: string;
  avatar?: string;
};

const breadcrumbItems = [{ label: "Home", link: "/" }];

const Profile = () => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);
  const userId = user?.id;

  const { record, error, loading } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (userId) {
      dispatch(getOneUser({ id: userId }));
    }
  }, [userId, dispatch]);

  const userData: UserData = record
    ? {
        email: record.email || "---",
        name: record.fullName || "---",
        phone: record.phoneNumber || "---",
        avatar:
          record.image ||
          "https://res.cloudinary.com/dizj9rluo/image/upload/v1744113485/defaultPerson_e7w75t.jpg",
      }
    : {
        name: "---",
        email: "---",
        phone: "---",
        avatar:
          "https://res.cloudinary.com/dizj9rluo/image/upload/v1744113485/defaultPerson_e7w75t.jpg",
      };

  if (error) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <LottieHandler type="error" message={error} />
      </div>
    );
  }
  if (loading === "pending") {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <LottieHandler type="loading" message={loading} />
      </div>
    );
  }

  return (
    <div className="bg-section-color min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={breadcrumbItems} itemNow={"Profile"} />
        <h1 className="text-3xl font-bold text-color-text-1 text-center py-6">
          Your Profile
        </h1>
        <div className="flex justify-center">
          <div className="bg-main-color-background rounded-xl shadow-lg p-8 w-full max-w-2xl">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-color-text-2 border-b border-color-border pb-4">
                Your Account
              </h2>

              <div className="flex flex-col items-center gap-6">
                <div className="relative group">
                  <img
                    src={userData.avatar}
                    alt="Avatar"
                    className="w-32 h-32 rounded-full object-cover border-4 border-color-border"
                  />
                </div>

                <div className="w-full space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-color-text-2 mb-2">
                      Company Name
                    </label>
                    <p className="px-4 py-2.5 bg-section-color rounded-lg text-color-text-1 border border-transparent">
                      {userData.name}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-color-text-2 mb-2">
                      Email
                    </label>
                    <p className="px-4 py-2.5 bg-section-color rounded-lg text-color-text-1">
                      {userData.email}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-color-text-2 mb-2">
                      Phone Number
                    </label>
                    <p className="px-4 py-2.5 bg-section-color rounded-lg text-color-text-1">
                      {userData.phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;