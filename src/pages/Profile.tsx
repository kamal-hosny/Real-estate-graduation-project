// External libraries
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed, Lock, Mail, Phone, User } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

// Internal components
import LottieHandler from "../components/common/feedback/LottieHandler/LottieHandler";
import Input from "../components/Form/Input/Input";
import Breadcrumb from "../components/Products/Breadcrumb";
import Button from "../components/ui/Button";

// Store and actions
import { authEditData } from "../store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addToast } from "../store/toasts/toastsSlice";
import { editUser } from "../store/user/act/actEditUser";
import { getOneUser } from "../store/user/act/actGetOneUser";

// Utils and validations
import { uploadToCloudinary } from "../utils/cloudinary";
import { editProfileSchema, editProfileType } from "../validations/editProfileSchema";

// Constants
const DEFAULT_AVATAR = "https://res.cloudinary.com/dizj9rluo/image/upload/v1744113485/defaultPerson_e7w75t.jpg";

// Types
interface BreadcrumbItem {
  label: string;
  link: string;
}

interface UpdateData {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  image: string;
  token: string;
  password?: string;
}

const Profile = () => {
  // Hooks and state
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  const [isEditing, setIsEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(DEFAULT_AVATAR);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Store selectors
  const { user, token } = useAppSelector((state) => state.auth);
  const { error, loading } = useAppSelector((state) => state.user);
  const userId = user?.id;

  const record = useAppSelector((state) =>
    userId && state.user.usersById[userId] ? state.user.usersById[userId] : null
  );

  // Form handling
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<editProfileType>({
    mode: "onBlur",
    resolver: zodResolver(editProfileSchema),
  });

  // Effects
  useEffect(() => {
    if (record) {
      reset({
        name: record.fullName || "",
        email: record.email || "",
        phone: record.phoneNumber || "",
        password: "",
      });
      setAvatarPreview(record.image || DEFAULT_AVATAR);
    }
  }, [record, reset]);

  useEffect(() => {
    if (userId && !record) {
      dispatch(getOneUser({ id: userId }));
    }
  }, [userId, dispatch, record]);

  useEffect(() => {
    return () => {
      if (avatarPreview.startsWith("blob:")) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  // Event handlers
  const handleAvatarChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        if (avatarPreview.startsWith("blob:")) {
          URL.revokeObjectURL(avatarPreview);
        }
        setAvatarPreview(URL.createObjectURL(file));
        setSelectedFile(file);
      }
    },
    [avatarPreview]
  );

  const handleCancel = useCallback(() => {
    reset({
      name: record?.fullName || "",
      email: record?.email || "",
      phone: record?.phoneNumber || "",
      password: "",
    });
    if (avatarPreview.startsWith("blob:")) {
      URL.revokeObjectURL(avatarPreview);
    }
    setAvatarPreview(record?.image || DEFAULT_AVATAR);
    setSelectedFile(null);
    setIsEditing(false);
    setSubmissionError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [avatarPreview, record, reset]);

  const onSubmit = async (data: editProfileType) => {
    if (!userId || !token) {
      setSubmissionError(t('Profile.userAuthRequired'));
      dispatch(
        addToast({ message: t('Profile.userAuthRequired'), type: "error" })
      );
      return;
    }

    try {
      setIsUploading(true);
      setSubmissionError(null);

      let newAvatarUrl = record?.image || DEFAULT_AVATAR;
      if (selectedFile) {
        const uploadedUrl = await uploadToCloudinary(selectedFile);
        if (!uploadedUrl) {
          throw new Error(t('Profile.updateError'));
        }
        newAvatarUrl = uploadedUrl.url;
      }

      const updateData: UpdateData = {
        id: userId,
        fullName: data.name,
        email: data.email,
        phoneNumber: data.phone,
        image: newAvatarUrl,
        token,
      };

      if (data.password) {
        updateData.password = data.password;
      }

      await dispatch(editUser(updateData)).unwrap();

      dispatch(
        authEditData({
          name: data.name,
          email: data.email,
          phone: data.phone,
          image: newAvatarUrl,
        })
      );

      await dispatch(getOneUser({ id: userId })).unwrap();

      dispatch(addToast({ message: t('Profile.updateSuccess'), type: "success" }));

      setIsEditing(false);
      setSelectedFile(null);
      setAvatarPreview(newAvatarUrl);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : t('Profile.updateError');
      setSubmissionError(errorMessage);
      dispatch(addToast({ message: errorMessage, type: "error" }));
    } finally {
      setIsUploading(false);
    }
  };

  // UI constants
  const breadcrumbItems: BreadcrumbItem[] = [{ label: "Home", link: "/" }];

  // Loading and error states
  if (loading === "pending") {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <LottieHandler 
          type="loading" 
          message={t('Profile.loadingProfile')} 
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <LottieHandler 
          type="error" 
          message={error} 
        />
      </div>
    );
  }

  if (!record) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <LottieHandler 
          type="error" 
          message={t('Profile.noProfileData')} 
        />
      </div>
    );
  }

  // Main render
  return (
    <div className="bg-section-color min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb 
          items={breadcrumbItems} 
          itemNow={t('Profile.title')} 
        />
        
        <h1 className="text-3xl font-bold text-color-text-1 text-center py-6">
          {t('Profile.title')}
        </h1>
        
        <div className="flex justify-center">
          <div className="bg-main-color-background rounded-xl shadow-lg p-8 w-full max-w-2xl">
            {submissionError && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                {submissionError}
              </div>
            )}
            
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-color-text-2 border-b border-color-border pb-4">
                  {t('Profile.accountSettings')}
                </h2>

                <div className="flex flex-col items-center gap-6">
                  <div className="relative group">
                    <img
                      src={avatarPreview}
                      alt={t('Profile.changeProfilePicture')}
                      className="w-32 h-32 flex items-center justify-center rounded-full object-cover border-4 border-color-border"
                    />
                    {isEditing && (
                      <div className="absolute inset-0  bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <label
                          htmlFor="avatar-upload"
                          className="cursor-pointer flex flex-col items-center justify-center w-full h-full  text-center text-white text-sm font-medium"
                          aria-label={t('Profile.changeProfilePicture')}
                        >
                          {t('Profile.changeProfilePicture')}
                          <input
                            id="avatar-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            ref={fileInputRef}
                            className="hidden"
                            aria-hidden="true"
                          />
                        </label>
                      </div>
                    )}
                  </div>

                  <div className="w-full space-y-4">
                    <div>
                      {isEditing ? (
                        <Input
                          label={t('Profile.name')}
                          name="name"
                          type="text"
                          placeholder={t('Profile.name')}
                          register={register}
                          icon={<User size={16} className="text-color-text-2" />}
                          error={errors?.name?.message}
                        />
                      ) : (
                        <p className="px-4 py-2.5 bg-section-color rounded-lg text-color-text-1 border border-transparent">
                          {record.fullName || t('Profile.notAvailable')}
                        </p>
                      )}
                    </div>

                    <div>
                      {isEditing ? (
                        <Input
                          label={t('Profile.email')}
                          name="email"
                          type="email"
                          placeholder={t('Profile.email')}
                          register={register}
                          icon={<Mail size={16} className="text-color-text-2" />}
                          error={errors?.email?.message}
                        />
                      ) : (
                        <p className="px-4 py-2.5 bg-section-color rounded-lg text-color-text-1">
                          {record.email || t('Profile.notAvailable')}
                        </p>
                      )}
                    </div>

                    <div>
                      {isEditing ? (
                        <Input
                          label={t('Profile.phone')}
                          name="phone"
                          type="tel"
                          placeholder={t('Profile.phone')}
                          register={register}
                          icon={<Phone size={16} className="text-color-text-2" />}
                          error={errors?.phone?.message}
                        />
                      ) : (
                        <p className="px-4 py-2.5 bg-section-color rounded-lg text-color-text-1">
                          {record.phoneNumber || t('Profile.notAvailable')}
                        </p>
                      )}
                    </div>

                    <div className="password relative">
                      {isEditing && (
                        <div>
                          <Input
                            label={t('Profile.password')}
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder={t('Profile.password')}
                            register={register}
                            icon={<Lock size={16} className="text-color-text-2" />}
                            error={errors?.password?.message}
                          />
                          <div
                            className="show-password absolute top-9 end-2 w-fit cursor-pointer text-color-text-2"
                            onClick={() => setShowPassword((prev) => !prev)}
                          >
                            {showPassword ? <Eye size={18} /> : <EyeClosed size={18} />}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-color-border">
                  {!isEditing ? (
                    <Button
                      type="button"
                      onClick={() => {
                        setIsEditing(true);
                        setSubmissionError(null);
                      }}
                      className="w-full sm:w-auto bg-button-color hover:bg-button-hover-color text-main-color-background px-8 py-2.5"
                    >
                      {t('Profile.editProfile')}
                    </Button>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        type="submit"
                        disabled={isUploading || isSubmitting}
                        className={`w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-8 py-2.5 ${
                          isUploading || isSubmitting
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        {isUploading ? t('Profile.uploading') : t('Profile.saveChanges')}
                      </Button>
                      <Button
                        type="button"
                        onClick={handleCancel}
                        disabled={isUploading || isSubmitting}
                        className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 text-black px-8 py-2.5"
                      >
                        {t('Profile.cancel')}
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