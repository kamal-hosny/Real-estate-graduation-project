import { Eye, EyeClosed, Lock, Mail } from "lucide-react";
import { useState } from "react";
import Button from "../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginSchema, loginType } from "../validations/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../components/Form/Input/Input";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { actAuthLogin } from "../store/auth/authSlice";

const Login = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const sttt = useAppSelector((state) => state.auth);

  console.log(sttt);
  

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<loginType>({
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<loginType> = (data) => {
    console.log(data);
    dispatch(
      actAuthLogin({
        Email: data.email,
        password: data.password}))
      .unwrap()
      .then(() => {
        navigate("/");
      }).catch((err) =>{
        console.log(err);
      })
    

  };

  return (
    <div className="relative login bg-section-color w-screen h-[calc(100vh-65px)] flex justify-center items-center">
      <div className="p-4 bg-main-color-background rounded space-y-4 w-96 shadow">
        {/* Header */}
        <div className="space-y-2">
          <p className="text-lg font-semibold text-color-text-1">
            Login Your Account
          </p>
          <p className="text-xs text-color-text-2">
            Get started with our app, just create an account and enjoy the experience.
          </p>
        </div>

        {/* Form */}
        <form className="text-color-text-1 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div className="email relative">
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your Email"
            register={register}
            icon={<Mail size={16} className="text-color-text-2" />}
            error={errors.email?.message}
          />
          </div>

          {/* Password Field */}
          <div className="password relative">
          <Input
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your Password"
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

          {/* Forgot Password */}
          <div className="forgot-password flex justify-end">
            <Link to="/forgotPassword" className="text-xs font-medium text-cyan-500 cursor-pointer">
              Forgot password?
            </Link>
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
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </div>

          {/* Sign Up Link */}
          <div className="dont-account text-center text-sm">
            Don't have an account?{" "}
            <span className="font-medium text-cyan-500 cursor-pointer">
              <Link to="/register">Sign Up</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
