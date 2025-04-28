// External libraries
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Store
import { actAuthLogin } from "../store/auth/authSlice";
import { useAppDispatch } from "../store/hooks";
import { addToast } from "../store/toasts/toastsSlice";

// Components
import Input from "../components/Form/Input/Input";
import Button from "../components/ui/Button";

// Validations
import { loginSchema, loginType } from "../validations/loginSchema";

const Login = () => {
  const location = useLocation();
  const { email } = location.state || {};
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<loginType>({
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: email || null
    }
  });

  const onSubmit: SubmitHandler<loginType> = (data) => {
    console.log(data);
    dispatch(
      actAuthLogin({
        email: data.email,
        password: data.password
      })
    )
      .unwrap()
      .then(() => {
        dispatch(
          addToast({ 
            message: "تم تسجيل الدخول", 
            type: "success" 
          })
        );
        navigate("/");
      })
      .catch((err) => {
        addToast({ 
          message: "من فضلك راجع البيانات واعد التسجيل", 
          type: "error" 
        });
        console.log(err);
      });
  };

  return (
    <div className="relative login bg-section-color w-screen h-[calc(100vh-65px)] flex justify-center items-center">
      <div className="p-4 bg-main-color-background rounded space-y-4 w-96 shadow">
        {/* Header */}
        <div className="space-y-2">
          <p className="text-lg font-semibold text-color-text-1">
            {t("login.title")}
          </p>
          <p className="text-xs text-color-text-2">
            {t("login.subtitle")}
          </p>
        </div>

        {/* Form */}
        <form 
          className="text-color-text-1 space-y-4" 
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Email Field */}
          <div className="email relative">
            <Input
              label={t("login.email_label")}
              name="email"
              type="email"
              placeholder={t("login.email_placeholder")}
              register={register}
              icon={<Mail size={16} className="text-color-text-2" />}
              error={errors.email?.message}
            />
          </div>

          {/* Password Field */}
          <div className="password relative">
            <Input
              label={t("login.password_label")}
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder={t("login.password_placeholder")}
              register={register}
              icon={<Lock size={16} className="text-color-text-2" />}
              error={errors.password?.message}
            />
            <div
              className="show-password absolute top-9 end-2 w-fit cursor-pointer text-color-text-2"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <Eye size={18} /> : <EyeClosed size={18} />}
            </div>
          </div>

          {/* Login Button */}
          <div className="btn">
            <Button
              type="submit"
              disabled={isSubmitting}
              className={`bg-button-color hover:bg-button-hover-color w-full text-main-color-background font-semibold ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? t("login.logging_in") : t("login.login_button")}
            </Button>
          </div>

          {/* Sign Up Link */}
          <div className="dont-account text-center text-sm">
            {t("login.no_account")}{" "}
            <span className="font-medium text-cyan-500 cursor-pointer">
              <Link to="/register">
                {t("login.signup")}
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
