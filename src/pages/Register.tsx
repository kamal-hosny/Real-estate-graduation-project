import {
  Eye,
  EyeClosed,
  Lock,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { useState } from "react";
import Button from "../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Form/Input/Input";
import { registerSchema, registerType } from "../validations/registerSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { actAuthRegister } from "../store/auth/authSlice";
import { useAppDispatch } from "../store/hooks";
import { useTranslation } from "react-i18next";




const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<registerType>({
    mode: "onBlur",
    resolver: zodResolver(registerSchema),
  });

  const { t } = useTranslation();

  const onSubmit: SubmitHandler<registerType> = (data) => {
    console.log(data);

    dispatch(
      actAuthRegister({
        name: data.name,
        Email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
      })
    ).unwrap()
    .then(() => {
      navigate("/VerifyYourAccount", {
        state: {email: data.email}
      });
    }).catch((err) => {
      console.log(err);
    })

  };

  return (
    <div className="relative bg-section-color w-screen py-10 flex justify-center items-center">
      <div className="p-6 bg-main-color-background rounded space-y-6 w-96 shadow-md">
        {/* Header */}
        <div className="space-y-2">
          <p className="text-lg font-semibold text-color-text-1">
          {t("register.title")}
          </p>
          <p className="text-xs text-color-text-2">
          {t("register.subtitle")}
          </p>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="text-color-text-1 space-y-4">
          {/* First Name and Last Name */}
          <div className="">
            {/* First Name */}
            <div className="name">
              <Input
                 label={t("register.name")}
                name="name"
                type={"text"}
                placeholder={t("register.name_placeholder")}
                register={register}
                icon={<User size={16} className="text-color-text-2" />}
                error={errors.name?.message && t(errors.name.message)}
              />
            </div>
          </div>
          {/* Email */}
          <div className="Email">
            <Input
             label={t("register.email")}
              name="email"
              type="Email"
              placeholder={t("register.email_placeholder")}
              register={register}
              icon={<Mail size={16} className="text-color-text-2" />}
              error={errors.email?.message && t(errors.email.message)}
            />
          </div>



          {/* Phone Number */}
          <div className="phoneNumber">
            <Input
                label={t("register.phone")}
              name="phoneNumber"
              type="text"
              placeholder={t("register.phone_placeholder")}
              register={register}
              icon={<Phone size={16} className="text-color-text-2" />}
              error={errors.phoneNumber?.message && t(errors.phoneNumber.message)}
            />
          </div>



          {/* Password Field */}
          <div className="password relative">
            <Input
              label={t("register.password")}
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder={t("register.password_placeholder")}
              register={register}
              icon={<Lock size={16} className="text-color-text-2" />}
              error={errors.password?.message && t(errors.password.message)}
            />
            <div
              className="show-password absolute top-9 end-2 w-fit cursor-pointer text-color-text-2"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <Eye size={18} /> : <EyeClosed size={18} />}
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="confirmPassword relative">
            <Input
              label={t("register.confirm_password")}
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder={t("register.confirm_password_placeholder")}
              register={register}
              icon={<Lock size={16} className="text-color-text-2" />}
              error={errors.confirmPassword?.message && t(errors.confirmPassword.message)}
            />
            <div
              className="show-password absolute top-9 end-2 w-fit cursor-pointer text-color-text-2"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? <Eye size={18} /> : <EyeClosed size={18} />}
            </div>
          </div>

          {/* Register Button */}
          <div className="btn">
            <Button
              type="submit"
              disabled={isSubmitting}
              className={`bg-button-color hover:bg-button-hover-color w-full text-main-color-background font-semibold ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Registering..." :  t("register.button")}
            </Button>
          </div>

          <div className="text-center text-sm">
          {t("register.have_account")}{" "}
            <span className="font-medium text-cyan-500 cursor-pointer">
              <Link to={"/login"}>
              {t("register.login")}
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
