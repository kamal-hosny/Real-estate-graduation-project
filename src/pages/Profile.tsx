import { useEffect, useRef, useState, useCallback } from "react";
import Breadcrumb from "../components/Products/Breadcrumb";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getOneUser } from "../store/user/act/actGetOneUser";
import LottieHandler from "../components/common/feedback/LottieHandler/LottieHandler";
import { useForm } from "react-hook-form";
import {
  editProfileSchema,
  editProfileType,
} from "../validations/editProfileSchema";
import Button from "../components/ui/Button";
import { editUser } from "../store/user/act/actEditUser";
import { uploadToCloudinary } from "../utils/cloudinary";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../components/Form/Input/Input";
import { Mail, User, Lock, Eye, EyeClosed } from "lucide-react";
import { addToast } from "../store/toasts/toastsSlice";
import { authEditData } from "../store/auth/authSlice";

const DEFAULT_AVATAR =
  "https://res.cloudinary.com/dizj9rluo/image/upload/v1744113485/defaultPerson_e7w75t.jpg";

interface BreadcrumbItem {
  label: string;
  link: string;
}

const Profile = () => {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);


  const [isEditing, setIsEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(DEFAULT_AVATAR);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { user, token } = useAppSelector((state) => state.auth);
  const { record, error, loading } = useAppSelector((state) => state.user);
  const userId = user?.id;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<editProfileType>({
    mode: "onBlur",
    resolver: zodResolver(editProfileSchema),
  });

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
    if (userId) {
      dispatch(getOneUser({ id: userId }));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    return () => {
      if (avatarPreview.startsWith("blob:")) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

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

  const onSubmit = async (data: editProfileType) => {
    if (!userId || !token) {
      setSubmissionError("User authentication required.");
      dispatch(
        addToast({ message: "User authentication required.", type: "error" })
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
          throw new Error("Failed to upload image");
        }
        newAvatarUrl = uploadedUrl.url;
      }

      const updateData: any = {
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

      dispatch(addToast({ message: "تم تحديث بيانات حسابك", type: "success" }));

      setIsEditing(false);
      setSelectedFile(null);
      setAvatarPreview(newAvatarUrl);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update profile.";
      setSubmissionError(errorMessage);
      dispatch(addToast({ message: errorMessage, type: "error" }));
    } finally {
      setIsUploading(false);
    }
  };

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


  const breadcrumbItems: BreadcrumbItem[] = [{ label: "Home", link: "/" }];


  if (loading === "pending") {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <LottieHandler type="loading" message="جارٍ تحميل الملف الشخصي..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <LottieHandler type="error" message={error} />
      </div>
    );
  }


  if (!record) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <LottieHandler type="error" message="لا توجد بيانات للملف الشخصي." />
      </div>
    );
  }


  return (
    <div className="bg-section-color min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={breadcrumbItems} itemNow="Profile" />
        <h1 className="text-3xl font-bold text-color-text-1 text-center py-6">
          ملفك الشخصي
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
                  إعدادات الحساب
                </h2>

                <div className="flex flex-col items-center gap-6">
                  <div className="relative group">
                    <img
                      src={avatarPreview}
                      alt="User avatar"
                      className="w-32 h-32 rounded-full object-cover border-4 border-color-border"
                    />
                    {isEditing && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <label
                          htmlFor="avatar-upload"
                          className="cursor-pointer text-white text-sm font-medium"
                          aria-label="Change profile picture"
                        >
                          تغيير
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
                          label="اسمك"
                          name="name"
                          type="text"
                          placeholder="أدخل اسمك الجديد"
                          register={register}
                          icon={
                            <User size={16} className="text-color-text-2" />
                          }
                          error={errors?.name?.message}
                        />
                      ) : (
                        <p className="px-4 py-2.5 bg-section-color rounded-lg text-color-text-1 border border-transparent">
                          {record.fullName || "غير متوفر"}
                        </p>
                      )}
                    </div>

                    <div>
                      {isEditing ? (
                        <Input
                          label="بريدك الإلكتروني"
                          name="email"
                          type="email"
                          placeholder="أدخل بريدك الإلكتروني الجديد"
                          register={register}
                          icon={
                            <Mail size={16} className="text-color-text-2" />
                          }
                          error={errors?.email?.message}
                        />
                      ) : (
                        <p className="px-4 py-2.5 bg-section-color rounded-lg text-color-text-1">
                          {record.email || "غير متوفر"}
                        </p>
                      )}
                    </div>

                    <div>
                      {isEditing ? (
                        <Input
                          label="رقم هاتفك"
                          name="phone"
                          type="tel"
                          placeholder="أدخل رقم هاتفك"
                          register={register}
                          icon={
                            <User size={16} className="text-color-text-2" />
                          }
                          error={errors?.phone?.message}
                        />
                      ) : (
                        <p className="px-4 py-2.5 bg-section-color rounded-lg text-color-text-1">
                          {record.phoneNumber || "غير متوفر"}
                        </p>
                      )}
                    </div>

                    <div className="password relative">
                      {isEditing && (
                        <div>
                          <Input
                            label="كلمة المرور الجديدة (اختياري)"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="أدخل كلمة المرور الجديدة (اختياري)"
                            register={register}
                            icon={
                              <Lock size={16} className="text-color-text-2" />
                            }
                            error={errors?.password?.message}
                          />
                          <div
                            className="show-password absolute top-9 end-2 w-fit cursor-pointer text-color-text-2"
                            onClick={() => setShowPassword((prev) => !prev)}
                          >
                            {showPassword ? (
                              <Eye size={18} />
                            ) : (
                              <EyeClosed size={18} />
                            )}
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
                      تعديل الملف الشخصي
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
                        {isUploading ? "جارٍ التحميل..." : "حفظ التغييرات"}
                      </Button>
                      <Button
                        type="button"
                        onClick={handleCancel}
                        disabled={isUploading || isSubmitting}
                        className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 text-black px-8 py-2.5"
                      >
                        إلغاء
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