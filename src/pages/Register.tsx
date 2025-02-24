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

  const onSubmit: SubmitHandler<registerType> = (data) => {
    console.log(data);

    dispatch(
      actAuthRegister({
        contactName: data.firstName,
        lastName: data.lastName,
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
            Create Your Account
          </p>
          <p className="text-xs text-color-text-2">
            Get started with our app, just create an account and enjoy the experience.
          </p>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="text-color-text-1 space-y-4">
          {/* First Name and Last Name */}
          <div className="grid grid-cols-2 gap-4">
            {/* First Name */}
            <div className="firstName">
              <Input
                label="First Name"
                name="firstName"
                type={"text"}
                placeholder="First Name"
                register={register}
                icon={<User size={16} className="text-color-text-2" />}
                error={errors.firstName?.message}
              />
            </div>
            {/* Last Name */}
            <div className="lastName">
              <Input
                label="Last Name"
                name="lastName"
                type={"text"}
                placeholder="Last Name"
                register={register}
                icon={<User size={16} className="text-color-text-2" />}
                error={errors.lastName?.message}
              />
            </div>
          </div>
          {/* Email */}
          <div className="Email">
            <Input
              label="Email"
              name="email"
              type="Email"
              placeholder="Your Email"
              register={register}
              icon={<Mail size={16} className="text-color-text-2" />}
              error={errors.email?.message}
            />
          </div>



          {/* Phone Number */}
          <div className="phoneNumber">
            <Input
              label="Phone Number"
              name="phoneNumber"
              type="text"
              placeholder="Your Phone Number"
              register={register}
              icon={<Phone size={16} className="text-color-text-2" />}
              error={errors.phoneNumber?.message}
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
              className="show-password absolute top-9 right-2 w-fit cursor-pointer text-color-text-2"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <Eye size={18} /> : <EyeClosed size={18} />}
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="confirmPassword relative">
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your Password"
              register={register}
              icon={<Lock size={16} className="text-color-text-2" />}
              error={errors.confirmPassword?.message}
            />
            <div
              className="show-password absolute top-9 right-2 w-fit cursor-pointer text-color-text-2"
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
              {isSubmitting ? "Registering..." : "Register"}
            </Button>
          </div>

          <div className="text-center text-sm">
            Already have an account?
            <span className="font-medium text-cyan-500 cursor-pointer">
              <Link to={"/login"}>
              Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
