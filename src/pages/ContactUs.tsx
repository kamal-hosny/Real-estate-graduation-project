// External libraries
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

// Store
import { addToast } from "../store/toasts/toastsSlice";
import { useAppDispatch } from "../store/hooks";

interface ContactUsData {
  name: string;
  email: string;
  phone: string;
  inquiry_type: "technical" | "sales" | "partnership" | "other" | "";
  message: string;
}

const ContactUs = () => {
  const form = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactUsData>();

  const onSubmit = async (data: ContactUsData) => {
    console.log(data);
    console.log(form.current);

    if (form.current) {
      try {
        const result = await emailjs.sendForm(
          "service_bet01au",
          "template_q25l7nr",
          form.current,
          "SbM6lp_8WtqxEQPLm"
        );
        console.log("SUCCESS!", result.text);
        dispatch(
          addToast({ 
            message: "تم أرسال الاستفسار بنجاح", 
            type: "success" 
          })
        );
      } catch (error) {
        console.log("FAILED...", error);
        dispatch(
          addToast({ 
            message: "من فضلك راجع البيانات أو عد تحميل الصفحه", 
            type: "error" 
          })
        );
      }
    }
  };

  return (
    <div 
      className="min-h-screen bg-section-color py-12 px-4 sm:px-6 lg:px-8" 
      dir={i18n.dir()}
    >
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-color-text-1 text-center mb-8">
          {t('contact.title')}
        </h1>

        <form
          ref={form}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 bg-main-color-background p-8 rounded-lg shadow-md border-color-border border"
        >
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-color-text-1 mb-2">
              {t('contact.name_label')}
            </label>
            <input
              {...register("name", { required: "الاسم مطلوب" })}
              className={`py-2 px-4 bg-section-color text-sm w-full border border-color-border rounded placeholder-color-text-2 text-color-text-1 focus:ring-2 focus:ring-cyan-500 focus:outline-none ${
                errors.name ? "border-red-500" : "border-color-border"
              }`}
              placeholder={t('contact.name_placeholder')}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-color-text-1 mb-2">
              {t('contact.email_label')}
            </label>
            <input
              type="email"
              {...register("email", {
                required: t('contact.email_required'),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t('contact.email_invalid')
                },
              })}
              className={`py-2 px-4 bg-section-color text-sm w-full border border-color-border rounded placeholder-color-text-2 text-color-text-1 focus:ring-2 focus:ring-cyan-500 focus:outline-none ${
                errors.email ? "border-red-500" : "border-color-border"
              }`}
              placeholder={t('contact.email_placeholder')}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-sm font-medium text-color-text-1 mb-2">
              {t('contact.phone_label')}
            </label>
            <input
              type="tel"
              {...register("phone", {
                required: t('contact.phone_required'),
                pattern: {
                  value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                  message: t('contact.phone_invalid')
                },
              })}
              className={`py-2 px-4 bg-section-color text-sm w-full border border-color-border rounded placeholder-color-text-2 text-color-text-1 focus:ring-2 focus:ring-cyan-500 focus:outline-none ${
                errors.phone ? "border-red-500" : "border-color-border"
              }`}
              placeholder={t('contact.phone_placeholder')}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Inquiry Type Field */}
          <div>
            <label className="block text-sm font-medium text-color-text-1 mb-2">
              {t('contact.inquiry_label')}
            </label>
            <select
              {...register("inquiry_type", { 
                required: t('contact.inquiry_required') 
              })}
              className={`py-2 px-4 bg-section-color text-sm w-full border border-color-border rounded placeholder-color-text-2 text-color-text-1 focus:ring-2 focus:ring-cyan-500 focus:outline-none ${
                errors.inquiry_type ? "border-red-500" : "border-color-border"
              }`}
            >
              <option value="">
                {t('contact.inquiry_placeholder')}
              </option>
              <option value="technical">
                {t('contact.inquiry_technical')}
              </option>
              <option value="sales">
                {t('contact.inquiry_sales')}
              </option>
              <option value="partnership">
                {t('contact.inquiry_partnership')}
              </option>
              <option value="other">
                {t('contact.inquiry_other')}
              </option>
            </select>
            {errors.inquiry_type && (
              <p className="text-red-500 text-sm mt-1">
                {errors.inquiry_type.message}
              </p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-sm font-medium text-color-text-1 mb-2">
              {t('contact.message_label')}
            </label>
            <textarea
              {...register("message", {
                required: t('contact.message_required'),
                minLength: {
                  value: 20,
                  message: t('contact.message_min_length')
                },
              })}
              className={`py-2 px-4 bg-section-color text-sm w-full border border-color-border rounded placeholder-color-text-2 text-color-text-1 focus:ring-2 focus:ring-cyan-500 focus:outline-none ${
                errors.message ? "border-red-500" : "border-color-border"
              }`}
              placeholder={t('contact.message_placeholder')}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
          >
            {isSubmitting ? t('contact.sending') : t('contact.send_button')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;