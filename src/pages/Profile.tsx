import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import Breadcrumb from "../components/Products/Breadcrumb";
import Button from "../components/ui/Button";
import { editProfileType } from "../validations/editProfileSchema";

type UserData = {
  name: string;
  phone: string;
  email: string;
  avatar?: string;
};

const breadcrumbItems = [{ label: "Home", link: "/" }];

const Profile = () => {
  const [userData, setUserData] = useState<UserData>({
    name: "Tech Corp",
    email: "example@gmail.com",
    phone: "+009 3342 3432",
    avatar:
      "https://i.pinimg.com/736x/27/2b/77/272b77466a0788a20360ba6876a07575.jpg",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(userData.avatar);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<editProfileType>({ defaultValues: userData });

  useEffect(() => {
    reset(userData);
  }, [userData, reset]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: UserData) => {
    console.log(data);
    
    const newUserData = {
      ...data,
      avatar: avatarPreview || userData.avatar,
    };
    setUserData(newUserData);
    reset(newUserData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    reset(userData);
    setAvatarPreview(userData.avatar);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setIsEditing(false);
  };

  return (
    <div className="bg-section-color min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={breadcrumbItems} itemNow={"Profile"} />
        <h1 className="text-3xl font-bold text-color-text-1 text-center py-6">
          Your Profile
        </h1>
        <div className="flex justify-center">
          <div className="bg-main-color-background rounded-xl shadow-lg p-8 w-full max-w-2xl">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-color-text-2 border-b border-color-border pb-4">
                  Account Settings
                </h2>

                <div className="flex flex-col items-center gap-6">
                  <div className="relative group">
                    <img
                      src={avatarPreview}
                      alt="Avatar"
                      className="w-32 h-32 rounded-full object-cover border-4 border-color-border"
                    />
                    {isEditing && (
                      <div className="absolute inset-0 overflow-hidden flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <label
                          htmlFor="avatar-upload"
                          className="cursor-pointer p-24  text-white text-sm font-medium"
                        >
                          Change
                          <input
                            id="avatar-upload"
                            type="file"
                            onChange={handleAvatarChange}
                            ref={fileInputRef}
                            className="hidden"
                          />
                        </label>
                      </div>
                    )}
                  </div>

                  <div className="w-full space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-color-text-2 mb-2">
                        Company Name
                      </label>
                      {isEditing ? (
                        <>
                          <input
                            {...register("name", {
                              required: "Company name is required",
                            })}
                            className="w-full text-color-text-1 px-4 py-2.5 text-sm border border-color-border rounded-lg bg-section-color focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          />
                          {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.name.message}
                            </p>
                          )}
                        </>
                      ) : (
                        <p className="px-4 py-2.5 bg-section-color rounded-lg text-color-text-1 border border-transparent">
                          {userData.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-color-text-2 mb-2">
                        Email
                      </label>
                      {isEditing ? (
                        <>
                          <input
                            {...register("email", {
                              required: "Email is required",
                              pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address",
                              },
                            })}
                            className="w-full text-color-text-1 px-4 py-2.5 text-sm border border-color-border rounded-lg bg-section-color focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          />
                          {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.email.message}
                            </p>
                          )}
                        </>
                      ) : (
                        <p className="px-4 py-2.5 bg-section-color rounded-lg text-color-text-1">
                          {userData.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-color-text-2 mb-2">
                        Phone Number
                      </label>
                      {isEditing ? (
                        <>
                          <input
                            {...register("phone", {
                              required: "Phone number is required",
                              pattern: {
                                value: /^\+?[0-9\s-]+$/,
                                message: "Invalid phone number",
                              },
                            })}
                            className="w-full text-color-text-1 px-4 py-2.5 text-sm border border-color-border rounded-lg bg-section-color focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          />
                          {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.phone.message}
                            </p>
                          )}
                        </>
                      ) : (
                        <p className="px-4 py-2.5 bg-section-color rounded-lg text-color-text-1">
                          {userData.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-color-border">
                  {!isEditing ? (
                    <Button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="w-full sm:w-auto bg-button-color hover:bg-button-hover-color text-main-color-background px-8 py-2.5"
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        type="submit"
                        className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-8 py-2.5"
                      >
                        Save Changes
                      </Button>
                      <Button
                        type="button"
                        onClick={handleCancel}
                        className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 text-black px-8 py-2.5"
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;